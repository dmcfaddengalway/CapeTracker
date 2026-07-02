/* =========================================================================
   PLAYER SYNC — pulls skill levels from the RuneMetrics profile endpoint
   (https://runescape.wiki/w/Application_programming_interface#Profile) via
   our own Netlify Function proxy (netlify/functions/runemetrics.js).

   RuneMetrics is unofficial/undocumented and, per the wiki, doesn't send
   permissive CORS headers for third-party origins — a direct browser fetch
   gets blocked. Routing through a same-origin serverless function sidesteps
   that entirely, since CORS only applies to browser requests, not
   server-to-server ones. The function forwards RuneMetrics' response
   (status + body) through unchanged, so the parsing below is identical to
   what it would be against the real endpoint.

   Shape drift risk: if/when an official Jagex API ships, the field names
   will likely differ. Only RUNEMETRICS_SKILL_IDS (data.js), the parsing
   below, and the upstream URL in the Netlify Function should need updating.
   ========================================================================= */
import { RUNEMETRICS_SKILL_IDS } from './data.js';

const SYNC_ENDPOINT = '/.netlify/functions/runemetrics';
const QUESTS_ENDPOINT = '/.netlify/functions/runequests';
const HISCORES_ENDPOINT = '/.netlify/functions/runehiscores';

/** Fetches a player's skill levels from RuneMetrics via our proxy function.
 *  Returns {skills: {id: level}, meta: {...}}.
 *  Throws an Error whose .message is one of a small set of known codes
 *  (NETWORK_ERROR, HTTP_xxx, PROFILE_xxx, UNEXPECTED_SHAPE) so callers
 *  can show a specific, honest status message instead of a generic failure. */
export async function fetchPlayerStats(rsn){
  const url = `${SYNC_ENDPOINT}?user=${encodeURIComponent(rsn)}`;

  let res;
  try{
    res = await fetch(url);
  }catch(networkErr){
    // The browser couldn't reach our own function at all — e.g. offline,
    // or this page isn't running on Netlify (functions only exist there,
    // not on a plain static host or a file:// preview).
    throw new Error('NETWORK_ERROR');
  }

  if(!res.ok) throw new Error(`HTTP_${res.status}`);

  let data;
  try{
    data = await res.json();
  }catch(parseErr){
    throw new Error('UNEXPECTED_SHAPE');
  }

  if(data.error) throw new Error(`PROFILE_${data.error}`);
  if(!Array.isArray(data.skillvalues)) throw new Error('UNEXPECTED_SHAPE');

  // sv.level is trusted as-is — verified against a live profile pull that
  // RuneMetrics already reports the correct current level per skill,
  // including past 99 (e.g. a real account showed Invention/Necromancy/
  // Thieving/Herblore already at 120, Dungeoneering at 113, and several other
  // skills sitting at their own real intermediate values in the 100s despite
  // hundreds of millions of xp). That rules out "capped at 99, derive virtual
  // level from xp via the generic wiki formula" — that generic 100-120 curve
  // doesn't match every skill's real curve, so recomputing from xp would
  // silently overstate several of them instead of fixing anything.
  const skills = {};
  data.skillvalues.forEach(sv=>{
    const id = RUNEMETRICS_SKILL_IDS[sv.id];
    if(id && typeof sv.level === 'number') skills[id] = sv.level;
  });

  return {
    skills,
    meta: {
      totalSkill: data.totalskill,
      totalXp: data.totalxp,
      combatLevel: data.combatlevel,
      questsComplete: data.questscomplete,
    },
  };
}

/** Fetches a player's RuneScore from the RS3 HiScores lite feed via our
 *  runehiscores proxy function (see that file's comment for the caveats
 *  around RuneScore's undocumented position in that feed).
 *  Returns {runescore: number|null} — null means "unranked" (RuneScore
 *  under the ~500 HiScores cutoff), not an error.
 *  Throws the same known error codes as fetchPlayerStats/fetchPlayerQuests
 *  (NETWORK_ERROR, HTTP_xxx, PROFILE_xxx, UNEXPECTED_SHAPE). */
export async function fetchPlayerRuneScore(rsn){
  const url = `${HISCORES_ENDPOINT}?player=${encodeURIComponent(rsn)}`;

  let res;
  try{
    res = await fetch(url);
  }catch(networkErr){
    throw new Error('NETWORK_ERROR');
  }

  if(!res.ok) throw new Error(`HTTP_${res.status}`);

  let data;
  try{
    data = await res.json();
  }catch(parseErr){
    throw new Error('UNEXPECTED_SHAPE');
  }

  // The function already normalizes its own errors to our shared codes
  // (HTTP_xxx / PROFILE_NOT_FOUND / UNEXPECTED_SHAPE / UPSTREAM_UNREACHABLE)
  // — no re-prefixing needed here, unlike the raw RuneMetrics error strings
  // fetchPlayerStats/fetchPlayerQuests have to wrap themselves.
  if(data.error) throw new Error(data.error);

  return { runescore: typeof data.runescore === 'number' ? data.runescore : null };
}

/* =========================================================================
   QUEST SYNC — pulls per-quest completion from the RuneMetrics /quests
   endpoint via our own proxy (netlify/functions/runequests.js). Unlike the
   profile endpoint, this is the closest thing to "achievement" data
   RuneMetrics exposes: no endpoint (official or unofficial) returns
   Completionist/MQC-style achievement completion, but quest completion is
   fully available and quest completion is itself one of the ~102
   Completionist Cape achievements (and the entirety of Quest Cape).
   ========================================================================= */

// Title suffixes are the primary signal RuneMetrics gives for quest type —
// there's no dedicated field. Order matters only in that both are checked;
// anything left over falls through to the canonical lists below.
const TYPE_SUFFIXES = [
  { suffix: ' (miniquest)', type: 'miniquest' },
  { suffix: ' (saga)', type: 'saga' },
];

// RuneMetrics doesn't always include the "(miniquest)"/"(saga)" suffix —
// e.g. it returns bare "Helping Laniakea" even though it's a real
// miniquest. These are the canonical titles from
// https://runescape.wiki/w/Miniquests (56 total; the 5 Fremennik Sagas are
// technically a subset of that page's list, but get their own `saga` type
// here since the app already treats them as a separate filter category).
// Fallback classifier for anything the suffix check above missed.
const KNOWN_SAGAS = new Set([
  "Nadir", "Thok It To 'Em", "Thok Your Block Off", "Three's Company", "Vengeance",
]);
const KNOWN_MINIQUESTS = new Set([
  "A Guild of Our Own", "Bar Crawl", "Benedict's World Tour", "Boric's Task I",
  "Boric's Task II", "Boric's Task III", "Civil War I", "Civil War II", "Civil War III",
  "Damage Control", "Desert Slayer Dungeon", "Doric's Task I", "Doric's Task II",
  "Doric's Task III", "Doric's Task IV", "Doric's Task V", "Doric's Task VI",
  "Doric's Task VII", "Doric's Task VIII", "Enter the Abyss", "Eye for an Eye",
  "Father and Son", "Final Destination", "Flag Fall", "From Tiny Acorns",
  "Ghosts from the Past", "Harbinger", "Head of the Family", "Helping Laniakea",
  "Hopespear's Will", "In Memory of the Myreque", "Jed Hunter", "Koschei's Troubles",
  "Lair of Tarn Razorlor", "Lost Her Marbles", "Mahjarrat Memories", "One Foot in the Grave",
  "Purple Cat", "Rebuilding Edgeville", "Sheep Shearer", "Spiritual Enlightenment",
  "Tales of Nomad", "Tales of the God Wars", "The Curse of Zaros", "The General's Shadow",
  "The Hunt for Surok", "The Lost Toys", "Tortle Combat", "Tuai Leit's Own",
  "Wandering Ga'al", "Witch's Potion",
]);

function classifyQuestTitle(rawTitle){
  for(const { suffix, type } of TYPE_SUFFIXES){
    if(rawTitle.endsWith(suffix)){
      return { type, title: rawTitle.slice(0, -suffix.length) };
    }
  }
  if(KNOWN_SAGAS.has(rawTitle)) return { type: 'saga', title: rawTitle };
  if(KNOWN_MINIQUESTS.has(rawTitle)) return { type: 'miniquest', title: rawTitle };
  return { type: 'quest', title: rawTitle };
}

/** Fetches a player's full quest list (with per-quest completion) from
 *  RuneMetrics via our proxy function.
 *
 *  A handful of entries (e.g. "Recipe for Disaster", "Dimension of
 *  Disaster") are series parents rather than real quests — RuneMetrics
 *  flags them with a sentinel `difficulty` of 250, and each of their real
 *  chapters shows up as its own entry titled "<parent>: <chapter>". Those
 *  are grouped under `series` and excluded from the flat `quests` array so
 *  a parent and its chapters don't both count toward the totals.
 *
 *  Returns {
 *    quests: [{title, type, status, completed, difficulty, members, questPoints, userEligible}],
 *    series: [{title, type, chapters: [...same shape as quests entries...], completed, completedCount, totalCount}],
 *    completedCount, totalCount, // each series counts as ONE quest here (not one per chapter) — matches the wiki's
 *                                // headline quest count; `chapters` above still has the full per-chapter detail for display
 *  }.
 *  Throws an Error whose .message is one of a small set of known codes
 *  (NETWORK_ERROR, HTTP_xxx, PROFILE_xxx, UNEXPECTED_SHAPE), same
 *  convention as fetchPlayerStats(). */
export async function fetchPlayerQuests(rsn){
  const url = `${QUESTS_ENDPOINT}?user=${encodeURIComponent(rsn)}`;

  let res;
  try{
    res = await fetch(url);
  }catch(networkErr){
    throw new Error('NETWORK_ERROR');
  }

  if(!res.ok) throw new Error(`HTTP_${res.status}`);

  let data;
  try{
    data = await res.json();
  }catch(parseErr){
    throw new Error('UNEXPECTED_SHAPE');
  }

  // The wiki documents this endpoint as returning a bare array, but the
  // live response is actually an object: {quests: [...], loggedIn: "..."}.
  // Accept either shape defensively — RuneMetrics reports errors (bad
  // name, private profile, etc.) as an object with an `error` field
  // instead, which has to be checked before assuming `.quests` exists.
  let questList;
  if(Array.isArray(data)){
    questList = data;
  }else if(data && Array.isArray(data.quests)){
    questList = data.quests;
  }else if(data && data.error){
    throw new Error(`PROFILE_${data.error}`);
  }else{
    throw new Error('UNEXPECTED_SHAPE');
  }

  const normalized = questList.map(q => {
    const { type, title } = classifyQuestTitle(q.title);
    return {
      rawTitle: q.title, // kept only to prefix-match series chapters below
      title,
      type,
      status: q.status,
      completed: q.status === 'COMPLETED',
      difficulty: q.difficulty,
      members: !!q.members,
      questPoints: q.questPoints,
      userEligible: !!q.userEligible,
    };
  });

  // Group series chapters under their parent (see function doc above).
  const seriesParents = normalized.filter(q => q.difficulty === 250);
  const chapterRawTitles = new Set();
  const usedParentRawTitles = new Set();
  const series = [];
  seriesParents.forEach(parent => {
    const prefix = `${parent.rawTitle}: `;
    const rawChapters = normalized.filter(q => q.rawTitle.startsWith(prefix));
    if(rawChapters.length === 0) return; // sentinel difficulty but no matching chapters found — treat as a normal standalone entry instead of silently dropping it
    rawChapters.forEach(c => chapterRawTitles.add(c.rawTitle));
    usedParentRawTitles.add(parent.rawTitle);
    const chapters = rawChapters.map(({ rawTitle, ...rest }) => rest);
    series.push({
      title: parent.title,
      type: parent.type,
      members: parent.members,
      chapters,
      completedCount: chapters.filter(c => c.completed).length,
      totalCount: chapters.length,
      completed: chapters.every(c => c.completed),
    });
  });

  // Standalone quests: everything except series parents (grouped above)
  // and their chapters (nested under `series`, so they'd otherwise appear
  // twice — once flat, once nested).
  const quests = normalized
    .filter(q => !usedParentRawTitles.has(q.rawTitle) && !chapterRawTitles.has(q.rawTitle))
    .map(({ rawTitle, ...rest }) => rest); // rawTitle was only needed for the grouping above

  // Totals count each series as ONE quest, not one per chapter — this
  // matches how the wiki's headline quest count treats series like Recipe
  // for Disaster and Dimension of Disaster (a series title, not N separate
  // quests). Dimension of Disaster in particular is mostly replays of
  // quests that are *already* counted standalone elsewhere in this list
  // (Demon Slayer, Defender of Varrock, Shield of Arrav, Curse of Arrav all
  // appear both on their own and again as a "Dimension of Disaster: ___"
  // chapter) — counting every chapter individually inflated totals well
  // past the game's real quest count. `chapters` is still kept in full on
  // each series entry so the UI can display and track them individually;
  // only the aggregate total/completed counts are collapsed to one-per-series.
  const seriesDone = series.filter(s => s.completed).length;

  return {
    quests,
    series,
    completedCount: quests.filter(q => q.completed).length + seriesDone,
    totalCount: quests.length + series.length,
  };
}
