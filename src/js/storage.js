/* =========================================================================
   STORAGE — persists tracker state to the browser's localStorage (JSON),
   plus the derived-state calculations (skill/achievement completion %)
   that read from that state.

   Skill levels are shared globally — your Prayer level is the same fact
   regardless of which cape tab you're looking at, so it lives in one place
   (state.skills) rather than being duplicated per cape. Achievements and
   custom items genuinely differ per cape, so those stay under state[capeId].
   ========================================================================= */
import { CAPES, getCape, ALL_SKILLS } from './data.js';
import { QUEST_REQUIREMENTS, normaliseQuestKey } from './questRequirements.js';

// id -> display name, for annotating "missing skill" chips on quest rows.
const SKILL_NAMES = Object.fromEntries(ALL_SKILLS.map(s => [s.id, s.name]));

const STORAGE_KEY = 'cape-tracker-data';
const LEGACY_KEY = 'mqc-tracker-data'; // single-cape version, migrated in on first load

// meta.totalLevel/totalXp/combatLevel/runescore are all last-synced snapshots
// (from the RuneMetrics + HiScores proxies in api.js) — persisted here so the
// Player dashboard has something to show on reload without forcing a re-sync.
export const state = {
  meta: { rsn: '', totalLevel: null, totalXp: null, combatLevel: null, runescore: null, syncedAt: null },
  skills: {},
  // Populated by a quest sync (main.js, via api.js's fetchPlayerQuests).
  // Named `questSync` rather than `quests` deliberately — CAPES includes a
  // cape with id:'quests', and state[c.id] below claims that key for its
  // own {checked, custom} shape, so `state.quests` would collide with it.
  // `list` is the flat per-quest completion array (excluding series
  // parents/chapters, which live in `series` instead — see api.js's
  // fetchPlayerQuests). Empty until synced at least once, at which point
  // the Quest Cape tab switches from its static stub to rendering this live.
  questSync: { rsn: '', list: [], series: [], completedCount: 0, totalCount: 0, syncedAt: null },
  // The "Journey" page's own state — a cross-cape planning layer on top of
  // the per-cape checklists above, not a replacement for them.
  // pin: the one long-running background grind you're pointing at right
  //   now — either {kind:'skill', skillId, target} (progress read straight
  //   from state.skills) or {kind:'achievement', capeId, achId} (progress is
  //   just that achievement's own checked state on its home cape).
  // weeklyTheme: a tag string (e.g. 'Lore') the weekly pick is drawn from.
  // weeklyPick: {capeId, achId} of the currently-suggested weekly task —
  //   sticks until "Reroll" is clicked, so it isn't dropped by e.g. reloading.
  journey: { pin: null, weeklyTheme: null, weeklyPick: null },
};
CAPES.forEach(c => { state[c.id] = { checked: {}, custom: [] }; });

/** Thin wrappers around localStorage so every call site gets the same
 *  try/catch handling — localStorage can throw (private browsing quota,
 *  disabled storage, corrupted values) and a tracker like this should
 *  degrade gracefully rather than crash the page. */
function readRaw(key){
  try{
    return localStorage.getItem(key);
  }catch(e){
    console.error(`localStorage read of "${key}" failed`, e);
    return null;
  }
}

function writeRaw(key, value){
  try{
    localStorage.setItem(key, value);
    return true;
  }catch(e){
    console.error(`localStorage write of "${key}" failed`, e);
    return false;
  }
}

/** Merges any legacy per-cape skillLevels objects into one shared map,
 *  taking the highest value found for each skill id (levels only ever go
 *  up in-game, so the highest recorded entry is the most trustworthy). */
function mergeSkillLevels(...sources){
  const merged = {};
  sources.forEach(src=>{
    if(!src) return;
    Object.entries(src).forEach(([id, lvl])=>{
      if(merged[id] == null || lvl > merged[id]) merged[id] = lvl;
    });
  });
  return merged;
}

/** Loads saved state from localStorage into the shared `state` object,
 *  migrating from older storage formats/keys where necessary. Resolves
 *  once state is ready to render — callers should await this before the
 *  first render() call. */
export async function loadState(){
  const raw = readRaw(STORAGE_KEY);
  if(raw){
    try{
      const parsed = JSON.parse(raw);
      CAPES.forEach(c=>{
        if(parsed[c.id]) state[c.id] = Object.assign({checked:{}, custom:[]}, parsed[c.id]);
      });
      if(parsed.skills){
        // Already-migrated shared format
        state.skills = parsed.skills;
      }else{
        // Migrating from the old per-cape skillLevels format — merge everything
        // ever entered on any cape tab into the new shared map.
        state.skills = mergeSkillLevels(...CAPES.map(c => parsed[c.id] && parsed[c.id].skillLevels));
        saveState();
      }
      if(parsed.questSync){
        state.questSync = Object.assign({rsn:'', list:[], series:[], completedCount:0, totalCount:0, syncedAt:null}, parsed.questSync);
      }
      state.meta = Object.assign({rsn:'', totalLevel:null, totalXp:null, combatLevel:null, runescore:null, syncedAt:null}, parsed.meta || {});
      // Absent entirely on any save from before the Journey page existed —
      // defaults to "nothing pinned/picked yet" rather than erroring.
      state.journey = Object.assign({pin:null, weeklyTheme:null, weeklyPick:null}, parsed.journey || {});
      return;
    }catch(e){
      console.error('Saved cape-tracker data was corrupted, ignoring it', e);
      // fall through to legacy-migration / fresh-start below
    }
  }

  // Try migrating the old single-cape (MQC-only) storage format
  const legacyRaw = readRaw(LEGACY_KEY);
  if(legacyRaw){
    try{
      const old = JSON.parse(legacyRaw);
      state.skills = old.skillLevels || {};
      state.mqc = {
        checked: old.checked || {},
        custom: old.custom || [],
      };
      saveState();
    }catch(e){
      console.error('Legacy mqc-tracker-data was corrupted, ignoring it', e);
    }
  }
}

let saveTimer;
/** Debounced save (250ms) so rapid edits — e.g. typing a skill level —
 *  don't hit localStorage on every keystroke. */
export function saveState(){
  clearTimeout(saveTimer);
  saveTimer = setTimeout(()=>{
    writeRaw(STORAGE_KEY, JSON.stringify(state));
  }, 250);
}

/* ---------------- CALCULATIONS ---------------- */
export function estimateHours(timeStr){
  if(/month|week|day/i.test(timeStr)) return 0; // background/time-gated, excluded from active-hour sum
  const nums = timeStr.match(/(\d+(\.\d+)?)/g);
  if(!nums) return 0;
  let hrs = nums.length >= 2 ? (parseFloat(nums[0]) + parseFloat(nums[1])) / 2 : parseFloat(nums[0]);
  if(/\bmin\b/i.test(timeStr)) hrs = hrs / 60; // "~5 min" etc — don't count as 5 hours
  return hrs;
}

/** Tallies done/total per quest type (quest/miniquest/saga) across
 *  standalone entries and every series — each series counts as ONE unit
 *  toward its type's total (done only once every chapter is done), matching
 *  how the wiki's headline quest count treats series like Recipe for
 *  Disaster rather than counting each chapter separately (see the comment
 *  in api.js's fetchPlayerQuests for why — chapters like "Dimension of
 *  Disaster: Demon Slayer" largely duplicate quests already counted
 *  standalone). `synced` is a {list, series} shape — either state.questSync
 *  directly, or a fetchPlayerQuests() result reshaped to match (main.js
 *  does this right after a sync, before it's saved into state). */
export function questTypeCounts(synced){
  const counts = { quest: {done:0, total:0}, miniquest: {done:0, total:0}, saga: {done:0, total:0} };
  const tally = item => {
    const bucket = counts[item.type];
    if(!bucket) return; // unrecognized type — shouldn't happen, but don't crash
    bucket.total++;
    if(item.completed) bucket.done++;
  };
  synced.list.forEach(tally);
  synced.series.forEach(s => tally({ type: s.type, completed: s.completed }));
  return counts;
}

/** Sums Quest Points across every *completed* quest — standalone entries
 *  plus completed chapters inside series (e.g. Recipe for Disaster) — since
 *  neither the RuneMetrics profile endpoint nor the HiScores feed exposes a
 *  player's total Quest Points directly. `synced` is a {list, series} shape,
 *  same convention as questTypeCounts above. */
export function totalQuestPoints(synced){
  const sumCompleted = items => items.reduce((sum, q) =>
    sum + (q.completed && typeof q.questPoints === 'number' ? q.questPoints : 0), 0);
  const listPoints = sumCompleted(synced.list);
  const seriesPoints = synced.series.reduce((sum, s) => sum + sumCompleted(s.chapters), 0);
  return listPoints + seriesPoints;
}

export function capeStats(capeId){
  const cape = getCape(capeId);
  const st = state[capeId];
  const metSkills = cape.skills.filter(s => (state.skills[s.id] ?? 1) >= s.req).length;
  const doneAch = cape.achievements.filter(a => st.checked[a.id]).length;
  const doneCustom = st.custom.filter(c => c.done).length;

  // Quest Cape has no static achievement list (see data.js) — once quests
  // are synced (main.js, via api.js's fetchPlayerQuests), treat remaining
  // *quests* (not miniquests or sagas — those are separate Completionist
  // Cape achievements, not part of Quest Cape's own requirement) as this
  // cape's achievement-equivalent units so its tab %, hero stats, and any
  // future prerequisite badges reflect real progress.
  const questSynced = capeId === 'quests' && state.questSync.totalCount > 0;
  const questCounts = questSynced ? questTypeCounts(state.questSync).quest : null;
  const questTotal = questCounts ? questCounts.total : 0;
  const questDone = questCounts ? questCounts.done : 0;

  const totalUnits = cape.skills.length + cape.achievements.length + st.custom.length + questTotal;
  const doneUnits = metSkills + doneAch + doneCustom + questDone;

  // Master Completionist and Master Trimmed Completionist have no independent
  // achievement list of their own (see data.js) — per the wiki, they're just
  // "hold both prerequisite capes at once". Their own skills list is also
  // fully redundant with those same prereqs (see data.js comments), so a
  // plain doneUnits/totalUnits here would only ever reflect skill progress
  // and completely ignore the ~100 achievements each prerequisite actually
  // carries. Instead, derive "Overall" as a weighted blend of the
  // prerequisite capes' own pct — weighted by each one's total unit count
  // (skills + achievements), so e.g. Completionist's ~130 units count for
  // more than Master Max's ~32 — a true reflection of how much of the
  // combined requirement is done, not just skills.
  let pct;
  if(cape.achievements.length === 0 && cape.requires.length > 0){
    const reqStats = cape.requires.map(id => capeStats(id));
    const weights = reqStats.map(s => s.totalSkills + s.totalAch);
    const weightSum = weights.reduce((a,b) => a+b, 0);
    pct = weightSum ? Math.round(reqStats.reduce((sum,s,i) => sum + s.pct*weights[i], 0) / weightSum) : 0;
  } else {
    pct = totalUnits ? Math.round((doneUnits/totalUnits)*100) : 0;
  }

  return {
    metSkills, totalSkills: cape.skills.length,
    doneAch: doneAch + questDone, totalAch: cape.achievements.length + questTotal,
    pct,
  };
}

/* ---------------- QUEST ELIGIBILITY ---------------- */
/* Works out, from a player's synced skill levels + quest completion, which
   quests they can currently do vs. what's still blocking each one. Requirement
   data comes from QUEST_REQUIREMENTS (questRequirements.js). Quests with no
   entry there (e.g. very new ones the source dataset predates) return status
   'unknown' rather than a guess. There is no boost data in the source, so
   every skill requirement is treated as a hard level — a quest is only 'can'
   once you genuinely have every listed level. */

/** Set of normalised keys for every quest the player has completed — used to
 *  check whether a quest's prerequisite quests are done. Draws from both flat
 *  quest entries and completed chapters inside series. */
export function buildCompletedQuestSet(synced){
  const set = new Set();
  (synced.list || []).forEach(q => { if(q.completed) set.add(normaliseQuestKey(q.title)); });
  (synced.series || []).forEach(s => (s.chapters || []).forEach(c => { if(c.completed) set.add(normaliseQuestKey(c.title)); }));
  return set;
}

/** Whether a specific quest (by title) is done according to RuneMetrics sync
 *  — used to tie a non-quest-cape achievement (e.g. Master Max's "Complete
 *  The Knight's Sword") to the same quest tracked on the Quest Cape tab, so
 *  the two never disagree. Returns false if no quest sync has happened yet,
 *  so unsynced players can still check the achievement off by hand. */
export function isQuestCompleted(title){
  if(!state.questSync.rsn) return false;
  return buildCompletedQuestSet(state.questSync).has(normaliseQuestKey(title));
}

/** Whether we have any synced skill data to judge eligibility against — with
 *  an empty skills map every requirement looks unmet, which would be
 *  misleading, so the UI only offers eligibility filtering once this is true. */
export function hasSkillData(){
  return state.skills && Object.keys(state.skills).length > 0;
}

/** Eligibility verdict for one quest.
 *  Returns { status, known, missingSkills:[{id,name,req,have}], missingQuests:[keys], totalReqLevels }.
 *  status is one of:
 *    'done'    — already completed (per RuneMetrics)
 *    'can'     — all skill levels met and all prerequisite quests complete
 *    'skills'  — blocked only by skill level(s)
 *    'quests'  — skills met, blocked only by prerequisite quest(s)
 *    'both'    — blocked by both skills and prerequisite quests
 *    'unknown' — no requirement data for this quest */
export function questEligibility(title, completed, skills, completedSet){
  const req = QUEST_REQUIREMENTS[normaliseQuestKey(title)];
  // Stub entries (see questRequirements.js) are placeholders pending hand
  // compilation — treat them the same as "no entry" so we never claim a
  // quest is doable just because its requirements haven't been filled in yet.
  if(!req || req.__stub) return { status: completed ? 'done' : 'unknown', known:false, missingSkills:[], missingQuests:[], totalReqLevels:0 };

  const allSkills = [];
  const missingSkills = [];
  let totalReqLevels = 0;
  Object.entries(req.skills).forEach(([id, lvl])=>{
    totalReqLevels += lvl;
    const have = skills[id] ?? 1;
    const entry = { id, name: SKILL_NAMES[id] || id, req: lvl, have, met: have >= lvl };
    allSkills.push(entry);
    if(!entry.met) missingSkills.push(entry);
  });
  // Unmet first (biggest shortfall first), then met ones by requirement.
  allSkills.sort((a,b) => (a.met - b.met) || ((b.req - b.have) - (a.req - a.have)));
  missingSkills.sort((a,b) => (b.req - b.have) - (a.req - a.have));

  const missingQuests = (req.prerequisites || []).filter(k => !completedSet.has(k));

  let status;
  if(completed) status = 'done';
  else if(missingSkills.length === 0 && missingQuests.length === 0) status = 'can';
  else if(missingSkills.length > 0 && missingQuests.length > 0) status = 'both';
  else if(missingSkills.length > 0) status = 'skills';
  else status = 'quests';

  return { status, known:true, allSkills, missingSkills, missingQuests, totalReqLevels };
}

/* ---------------- QUEST UNBLOCK COUNT ("do this first") ---------------- */
/* QUEST_REQUIREMENTS only ever gets read one direction above — "are this
   quest's own prerequisites satisfied yet". This flips it: for a given
   quest, how many *other* quests sit somewhere behind it in the tree, so
   finishing it is worth more than just its own single checkbox. The
   underlying prerequisites data doesn't change at runtime, so the reverse
   graph and its transitive closure are both built once per session and
   memoized — only the *live* filtering against a player's own completedSet
   happens per call. */

/** childrenOf[key] = every quest key that lists `key` as a DIRECT
 *  prerequisite. Built once from the static QUEST_REQUIREMENTS. Prereq
 *  references that don't resolve to a real key (a handful — quests the
 *  source dataset predates, see questRequirements.js's own header comment)
 *  are skipped rather than crashing on an undefined lookup later. */
const CHILDREN_OF = (() => {
  const map = {};
  Object.keys(QUEST_REQUIREMENTS).forEach(key=>{
    (QUEST_REQUIREMENTS[key].prerequisites || []).forEach(p=>{
      if(!QUEST_REQUIREMENTS[p]) return;
      (map[p] ||= []).push(key);
    });
  });
  return map;
})();

// key -> Set of every quest key transitively behind it (computed lazily,
// cached forever — the prerequisite graph itself is static game data).
const DESCENDANT_CACHE = new Map();

function transitiveDescendants(key, seen){
  if(DESCENDANT_CACHE.has(key)) return DESCENDANT_CACHE.get(key);
  seen = seen || new Set();
  if(seen.has(key)) return new Set(); // defensive cycle guard — the real graph is a DAG
  seen.add(key);
  const result = new Set();
  (CHILDREN_OF[key] || []).forEach(child=>{
    result.add(child);
    transitiveDescendants(child, seen).forEach(x => result.add(x));
  });
  DESCENDANT_CACHE.set(key, result);
  return result;
}

/** How many *not-yet-completed* quests sit transitively behind this one —
 *  the "do this first" number. Finishing an already-done descendant doesn't
 *  unlock anything anymore, so this always filters the static transitive
 *  set against the player's live completedSet rather than caching a final
 *  count (that part genuinely does change every sync). Returns 0 for a
 *  quest with no entry in QUEST_REQUIREMENTS, same "no data, no guess"
 *  convention as questEligibility. */
export function getUnblockCount(title, completedSet){
  const key = normaliseQuestKey(title);
  if(!QUEST_REQUIREMENTS[key]) return 0;
  let count = 0;
  transitiveDescendants(key).forEach(k => { if(!completedSet.has(k)) count++; });
  return count;
}

/** Highest requirement a skill already has via this cape's prerequisite chain
 *  (transitively). Returns null if no prerequisite cape tracks that skill. */
export function getPrereqSkillReq(cape, skillId, seen){
  seen = seen || new Set();
  let best = null;
  cape.requires.forEach(reqId=>{
    if(seen.has(reqId)) return;
    seen.add(reqId);
    const reqCape = getCape(reqId);
    const direct = reqCape.skills.find(sk => sk.id === skillId);
    if(direct) best = best === null ? direct.req : Math.max(best, direct.req);
    const transitive = getPrereqSkillReq(reqCape, skillId, seen);
    if(transitive !== null) best = best === null ? transitive : Math.max(best, transitive);
  });
  return best;
}

/* ---------------- JOURNEY (cross-cape planning) ---------------- */
/* Everything below reads across every cape at once, rather than one tab's
   own data — the point of the Journey page is exactly this: aggregating
   what's otherwise scattered across separate cape tabs. Quest Cape is
   naturally excluded from all of it (cape.achievements is always [] there —
   its real list only exists post-sync as a totally different quest-shaped
   structure, see questEligibility above), and capes with no achievements
   of their own (Max, Master Completionist, Master Trimmed) drop out too
   since there's nothing on their list to surface. */

/** Every not-yet-checked Timegated achievement across every cape, grouped
 *  by which cape it belongs to. Timegated tasks trickle in on their own
 *  clock regardless of what else you're doing, so "is there anything
 *  ticking that I haven't started yet" is the single most useful cross-cape
 *  question this page answers — this is a plain reshaping of the fields all
 *  the other renderers already read (cape.achievements, state[capeId].checked). */
export function getCrossCapeTimegated(){
  const rows = [];
  CAPES.forEach(cape=>{
    if(!cape.achievements.length) return;
    const st = state[cape.id];
    cape.achievements
      .filter(a => a.tags.includes('Timegated') && !st.checked[a.id])
      .forEach(a => rows.push({ capeId: cape.id, capeName: cape.short, achievement: a }));
  });
  return rows;
}

/** Every theme worth offering in the weekly-pick dropdown, unioned across
 *  every cape — same tags players already see as filter chips on each cape
 *  tab, rather than inventing a second taxonomy. Respects each cape's own
 *  `filterTags` curation where it exists (MQC's 307 items carry 40+ granular
 *  wiki sub-tags — see renderFilters/data.js — a "theme" dropdown built from
 *  the raw union would surface all of those too). Every achievement still
 *  carries its broad tag (Lore/Skills/Activities/etc.) alongside any
 *  granular one, so picking from the curated set doesn't miss anything —
 *  getWeeklyPool below still matches on the achievement's full tag list.
 *  Excludes Timegated — that's the dedicated module above, not a theme. */
export function getJourneyThemeTags(){
  const present = new Set();
  CAPES.forEach(cape=>{
    if(!cape.achievements.length) return;
    const tags = cape.filterTags || [...new Set(cape.achievements.flatMap(a => a.tags))];
    tags.forEach(t => present.add(t));
  });
  present.delete('Timegated');
  return [...present].sort();
}

/** Every not-yet-checked achievement across every cape carrying the given
 *  tag — the candidate pool the weekly pick is drawn from. */
export function getWeeklyPool(theme){
  if(!theme) return [];
  const rows = [];
  CAPES.forEach(cape=>{
    if(!cape.achievements.length) return;
    const st = state[cape.id];
    cape.achievements
      .filter(a => a.tags.includes(theme) && !st.checked[a.id])
      .forEach(a => rows.push({ capeId: cape.id, capeName: cape.short, achievement: a }));
  });
  return rows;
}

/** Picks a random entry from the given theme's pool, avoiding the current
 *  pick when there's another option available (so hitting Reroll on a pool
 *  of 2+ always actually changes the suggestion). Returns null if the pool
 *  is empty (theme fully cleared, or nothing tagged with it). */
export function pickWeeklyItem(theme, avoid){
  const pool = getWeeklyPool(theme);
  if(pool.length === 0) return null;
  const candidates = pool.length > 1 && avoid
    ? pool.filter(r => !(r.capeId === avoid.capeId && r.achievement.id === avoid.achId))
    : pool;
  const pick = candidates[Math.floor(Math.random() * candidates.length)];
  return { capeId: pick.capeId, achId: pick.achievement.id };
}

/** Resolves state.journey.pin into something renderable, or null if nothing
 *  is pinned (or the pin points at an achievement id that no longer exists
 *  — defensive, in case a future data.js edit ever renames/removes one). */
export function resolvePin(){
  const pin = state.journey.pin;
  if(!pin) return null;
  if(pin.kind === 'skill'){
    const name = SKILL_NAMES[pin.skillId] || pin.skillId;
    const cur = state.skills[pin.skillId] ?? 1;
    return { kind:'skill', skillId: pin.skillId, name, cur, target: pin.target, met: cur >= pin.target };
  }
  const cape = getCape(pin.capeId);
  if(!cape) return null;
  const achievement = cape.achievements.find(a => a.id === pin.achId);
  if(!achievement) return null;
  const done = !!state[pin.capeId].checked[pin.achId];
  return { kind:'achievement', capeId: pin.capeId, capeName: cape.short, achievement, done };
}
