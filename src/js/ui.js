/* =========================================================================
   UI — all DOM rendering and event wiring for the tracker. Reads/writes
   the shared `state` object from storage.js and persists via saveState();
   reads static game content from data.js.
   ========================================================================= */
import { getCape, SKILL_ICON_BASE, SKILL_ICONS, ALL_SKILLS, MEMBERS_ICON, F2P_ICON, QUESTS_ICON, AREA_TASKS_ICON, DND_ICON, getSharedAchievement } from './data.js';
import { state, saveState, capeStats, estimateHours, getPrereqSkillReq, questTypeCounts, totalQuestPoints, buildCompletedQuestSet, questEligibility, hasSkillData, getCrossCapeTimegated, getJourneyThemeTags, pickWeeklyItem, resolvePin, getUnblockCount, isQuestCompleted } from './storage.js';

// 'capes' = the per-cape tracker (hero/skills/achievements/tips/custom);
// 'player' = the dedicated RSN-sync + dashboard page. See render() below,
// which shows/hides #capeView vs #playerView based on this.
let activeView = 'capes';
let activeCape = 'max';
let activeFilter = 'all';
let searchTerm = '';
let sortMode = 'alpha';
let questEligFilter = 'all'; // Quest Cape only: 'all' | 'can' | 'skills' | 'quests' — filter by what's blocking a quest
let questSort = 'alpha';     // Quest Cape only: 'alpha' | 'canFirst' | 'gapAsc' | 'reqAsc'
let skillsAccordionOpen = {}; // per-cape open/closed state, resets on reload — deliberately lightweight
let questsAccordionOpen = {}; // per-type ('quest'/'miniquest'/'saga') collapsed-by-default "completed" state

// Rebuilt at the top of every renderQuestChecklist() from the current sync, so
// the per-row helpers (questRowHTML etc.) can look up eligibility without
// threading it through every call. Only meaningful while the Quest Cape view
// is rendering.
let _eligSkills = {};
let _eligCompletedSet = new Set();
function eligFor(title, completed){
  return questEligibility(title, completed, _eligSkills, _eligCompletedSet);
}

// Whole-section collapse state (Skill requirements / achievements section) —
// shared across every cape tab since #skillsBody/#achBody are static DOM
// nodes that just get their inner content swapped on cape switch, so a
// collapsed section stays collapsed as you move between capes.
let sectionsCollapsed = { skills: false, achievements: false, timegated: false };

// Whether the sidebar's "Choose a cape" list is collapsed — in-memory only,
// same convention as sectionsCollapsed above.
let capeNavCollapsed = false;

// Quest Cape's achievement area is always split into these three sections
// (no filter — everything shown at once), see renderQuestChecklist below.
const QUEST_TYPE_SECTIONS = [
  { key: 'quest', heading: 'Quests' },
  { key: 'miniquest', heading: 'Miniquests' },
  { key: 'saga', heading: 'Sagas' },
];

/* ---------------- RENDER: TABS ---------------- */
// Related capes are grouped into a single two-segment pill so the base cape
// and its "harder" sibling read as one unit: Quest|MQC, Max|Master Max,
// Comp|Trim, Master Comp|Master Trim. Order here = group + tab order.
const CAPE_TAB_GROUPS = [
  ['quests', 'mqc'],
  ['max', 'mastermax'],
  ['comp', 'trim'],
  ['mastercomp', 'mastertrim'],
];

function renderCapeTabs(){
  const el = document.getElementById('capeTabs');
  el.innerHTML = '';
  CAPE_TAB_GROUPS.forEach(group=>{
    const groupEl = document.createElement('div');
    groupEl.className = 'cape-tab-group';
    group.forEach(id=>{
      const c = getCape(id);
      const stats = capeStats(c.id);
      const achieved = stats.pct === 100;
      const isActive = activeView === 'capes' && c.id === activeCape;
      const btn = document.createElement('button');
      btn.className = 'cape-tab-seg' + (isActive ? ' active' : '') + (achieved ? ' achieved' : '');
      btn.innerHTML = `<span class="cape-tab-label">${achieved ? '<span class="cape-tab-star">★</span> ' : ''}${c.short}</span><span class="pct">${stats.pct}%</span>`;
      btn.addEventListener('click', ()=>{
        activeView = 'capes'; activeCape = c.id; activeFilter = 'all'; searchTerm = '';
        document.getElementById('searchBox').value = '';
        render();
      });
      groupEl.appendChild(btn);
    });
    el.appendChild(groupEl);
  });

  document.getElementById('playerNavBtn').classList.toggle('active', activeView === 'player');
  document.getElementById('journeyNavBtn').classList.toggle('active', activeView === 'journey');
  // Once synced, show the player's RSN instead of the generic "Player" label
  // — same fallback state.meta.rsn already uses on the Player page itself.
  document.getElementById('playerNavLabel').textContent = state.meta.rsn || 'Player';
}

/* ---------------- RENDER: HERO ---------------- */
function renderHero(){
  const cape = getCape(activeCape);
  const stats = capeStats(activeCape);

  document.getElementById('heroTitle').textContent = cape.name;
  document.getElementById('heroBlurb').innerHTML = `${cape.blurb} <a href="${cape.wikiUrl}" target="_blank" rel="noopener">Wiki page →</a>`;

  const prereqEl = document.getElementById('prereqs');
  prereqEl.innerHTML = '';
  cape.requires.forEach(reqId=>{
    const reqCape = getCape(reqId);
    const reqStats = capeStats(reqId);
    const met = reqStats.pct === 100;
    const badge = document.createElement('span');
    badge.className = 'prereq-badge' + (met ? ' met' : '');
    badge.textContent = `${met ? '✓' : '○'} Requires ${reqCape.name} (${reqStats.pct}%)`;
    prereqEl.appendChild(badge);
  });

  document.getElementById('statSkills').textContent = `${stats.totalSkills ? stats.metSkills : 0}/${stats.totalSkills}`;
  document.getElementById('statAch').textContent = `${stats.totalAch ? stats.doneAch : 0}/${stats.totalAch}`;
  document.getElementById('statPct').textContent = `${stats.pct}%`;

  // A cape with zero total requirements (Max, Master Completionist, Master
  // Trimmed Completionist — see the matching check in renderAch) has nothing
  // meaningful to show here either; "0/0" reads like a bug, not a fact.
  document.getElementById('statAchWrap').style.display = stats.totalAch ? '' : 'none';

  // Capes with a real wiki image (Quest, Master Quest, Completionist,
  // Trimmed Completionist, Max, Master Max) show that instead of the
  // generic placeholder silhouette. Shown at full opacity — only the
  // placeholder's progress fill (below) still fades with progress.
  const svgEl = document.getElementById('capeSvg');
  const imgEl = document.getElementById('capeImg');
  if(cape.image){
    imgEl.src = cape.image;
    imgEl.alt = cape.name;
    imgEl.style.display = '';
    svgEl.style.display = 'none';
  } else {
    imgEl.style.display = 'none';
    svgEl.style.display = '';
    document.getElementById('capeProgress').style.opacity = 0.35 + (stats.pct/100)*0.5;
  }
}

/* ---------------- RENDER: SKILLS ---------------- */
function skillIcon(id, size){
  const file = SKILL_ICONS[id];
  if(!file) return '';
  return `<img class="skill-icon" src="${SKILL_ICON_BASE}${file}" alt="" loading="lazy" width="${size}" height="${size}" onerror="this.style.display='none'" />`;
}

/** Read-only tile mirroring the in-game skills-tab look: icon, then current
 *  level and the level needed shown together as "cur / req". A gold border
 *  (via the "met" class) is the only indicator once the requirement is
 *  satisfied — no separate corner badge. Skill levels are display-only here;
 *  the only way to change one is a RuneMetrics sync (see main.js) — there's
 *  no input to edit by hand. */
function skillTileHTML(s, cur, isMet){
  return `
    <div class="skill-tile${isMet ? ' met' : ''}" title="${s.name}: ${cur}/${s.req}">
      <div class="skill-tile-icon">${skillIcon(s.id, 32)}</div>
      <div class="skill-tile-level">${cur} <span class="req">/ ${s.req}</span></div>
      <div class="skill-tile-name">${s.name}</div>
    </div>
  `;
}

function renderSkills(){
  const cape = getCape(activeCape);
  const section = document.getElementById('skillsSection');
  const grid = document.getElementById('skillsGrid');
  const accWrap = document.getElementById('skillsAccordion');

  if(cape.skills.length === 0){
    section.style.display = 'none';
    return;
  }
  section.style.display = '';

  // Split into "needs pushing further" vs "already satisfied by a prerequisite cape"
  const elevated = [];
  const redundant = [];
  cape.skills.forEach(s=>{
    const prereqReq = getPrereqSkillReq(cape, s.id);
    if(prereqReq !== null && s.req <= prereqReq) redundant.push(s);
    else elevated.push(s);
  });

  const tilesHTML = list => list.map(s=>{
    const cur = state.skills[s.id] ?? 1;
    return skillTileHTML(s, cur, cur >= s.req);
  }).join('');

  grid.innerHTML = tilesHTML(elevated);

  if(redundant.length > 0){
    const prereqNames = cape.requires.map(id => getCape(id).short).join(' + ');
    const isOpen = !!skillsAccordionOpen[activeCape];
    const metCount = redundant.filter(s => (state.skills[s.id] ?? 1) >= s.req).length;
    accWrap.innerHTML = `
      <div class="skills-accordion">
        <button class="skills-accordion-toggle${isOpen ? ' open' : ''}" id="skillsAccToggle">
          <span>Already covered by ${prereqNames} — ${redundant.length} skill${redundant.length===1?'':'s'} (${metCount}/${redundant.length} met)</span>
          <span class="chev">▸</span>
        </button>
        <div class="skills-accordion-body skills-tile-grid${isOpen ? ' open' : ''}" id="skillsAccBody">
          ${tilesHTML(redundant)}
        </div>
      </div>
    `;
    document.getElementById('skillsAccToggle').addEventListener('click', ()=>{
      skillsAccordionOpen[activeCape] = !skillsAccordionOpen[activeCape];
      renderSkills();
    });
  }else{
    accWrap.innerHTML = '';
  }

  // Small info box for any skill-level footnotes (e.g. Quest Cape's shared
  // "one of these four to 85" Sins of the Father requirement) — pulled out
  // of the individual tile tooltips so they read as prose instead of being
  // buried in a hover title.
  const noteEl = document.getElementById('skillsNote');
  const notes = [...new Set(cape.skills.map(s => s.note).filter(Boolean))];
  noteEl.innerHTML = notes.map(n => `<div class="skills-note">${n}</div>`).join('');
}

/* ---------------- RENDER: ACHIEVEMENTS ---------------- */
/** Sets the requirements-section heading text + its leading icon. Quest
 *  Cape and Master Quest Cape show live quest lists, so they get the
 *  Quests icon; every other cape's requirements read more like the game's
 *  Area Tasks achievement category, so they get that icon instead. */
function setAchHeading(cape){
  document.getElementById('achHeadingText').textContent = cape.achHeading;
  document.getElementById('achHeadingIcon').src =
    (cape.id === 'quests' || cape.id === 'mqc') ? QUESTS_ICON : AREA_TASKS_ICON;
}

function wikiSearch(title){
  return 'https://runescape.wiki/index.php?search=' + encodeURIComponent(title.replace(/\(.*?\)/g,'').split('/')[0].trim());
}

function renderFilters(){
  const container = document.getElementById('filters');

  // Quest Cape no longer has a type filter — Quests/Miniquests/Sagas are
  // always shown together as their own sections (see renderQuestChecklist).
  if(activeCape === 'quests'){
    container.innerHTML = '';
    return;
  }

  const cape = getCape(activeCape);
  if(cape.achievements.length === 0){ container.innerHTML=''; return; }
  const present = new Set();
  cape.achievements.forEach(a=>a.tags.forEach(t=>present.add(t)));
  // Capes with a curated filterTags list (see data.js — currently just MQC,
  // whose full wiki tag set is far too granular for a filter row) only offer
  // that shortlist; everything else falls back to every tag actually used.
  // 'Timegated' is excluded here — those tasks always get their own
  // full-width subsection below (see renderAch) rather than a filter chip.
  const tags = (cape.filterTags ? cape.filterTags.filter(t => present.has(t)) : [...present])
    .filter(t => t !== 'Timegated');
  const all = ['all', ...tags];
  container.innerHTML = '';
  all.forEach(t=>{
    const btn = document.createElement('button');
    btn.textContent = t === 'all' ? 'All' : t;
    if(t === activeFilter) btn.classList.add('active');
    btn.addEventListener('click', ()=>{ activeFilter = t; renderFilters(); renderAch(); });
    container.appendChild(btn);
  });
}

const QUEST_TYPE_LABELS = { quest: 'Quest', miniquest: 'Miniquest', saga: 'Saga' };

/** Type pill (Quest/Miniquest/Saga) — same visual language as the
 *  achievement-card tag pills elsewhere (see .pill.* in style.css). */
function questTypePill(type){
  return `<span class="pill type-${type}">${QUEST_TYPE_LABELS[type] || type}</span>`;
}

/** Wraps a type pill for the compact "completed" grid (see questCompactHTML),
 *  where it's a plain flex child rather than living inside .ach-body — the
 *  .ach-card grid layout used elsewhere needs the pill placed inside
 *  .ach-body itself (see questRowHTML/seriesRowHTML) or it lands in the
 *  card's fixed 30px icon column instead of the body column. */
function questTypeBadge(type){
  return `<div class="ach-meta"><div class="ach-tags">${questTypePill(type)}</div></div>`;
}

const STATUS_DOTS = {
  COMPLETED: { cls: 'completed', label: 'Completed' },
  STARTED: { cls: 'started', label: 'Started' },
  NOT_STARTED: { cls: 'not-started', label: 'Not started' },
};

/** Small colour-coded status dot (green/yellow/red) replacing the old plain
 *  checkmark — hover shows the exact RuneMetrics status via the native
 *  title tooltip, so the colour alone doesn't have to carry all the meaning. */
function statusDotHTML(status){
  const info = STATUS_DOTS[status] || { cls: 'not-started', label: status || 'Unknown' };
  return `<span class="status-dot ${info.cls}" title="${info.label}"></span>`;
}

/** Membership-requirement badge — hotlinks the wiki's own hosted copies of
 *  the same P2P/F2P icons used on every quest infobox there, rather than
 *  storing local copies of Jagex's artwork (same approach as SKILL_ICONS
 *  above). Falls back to hiding itself if the wiki image ever 404s. */
function membersIconHTML(isMembers){
  const src = isMembers ? MEMBERS_ICON : F2P_ICON;
  const label = isMembers ? 'Members' : 'Free-to-play';
  return `<img class="members-icon" src="${src}" alt="${label}" title="${label}" width="15" height="15" loading="lazy" onerror="this.style.display='none'" />`;
}

// Eligibility filter chips shown above the quest list once skills are synced.
// `test` decides whether a given eligibility verdict falls in that bucket —
// note 'skills'/'quests' both include 'both' (a quest blocked by skills AND
// prerequisite quests legitimately belongs to both buckets).
const ELIG_FILTERS = [
  { key:'all',    label:'All',           test: () => true },
  { key:'can',    label:'Eligible',      test: e => e.status === 'can' },
  { key:'skills', label:'Missing skills',test: e => e.missingSkills.length > 0 },
  { key:'quests', label:'Missing quests',test: e => e.missingQuests.length > 0 },
];

/** Small coloured verdict badge for an incomplete quest — mirrors the status
 *  dot's colour language (green = go, amber = skill-blocked, red = quest-locked). */
function eligBadgeHTML(e){
  switch(e.status){
    case 'can':     return '<span class="elig-badge can">Eligible</span>';
    case 'skills':  return '<span class="elig-badge skills">Needs skills</span>';
    case 'quests':  return '<span class="elig-badge quests">Needs quests</span>';
    case 'both':    return '<span class="elig-badge both">Needs skills + quests</span>';
    case 'unknown': return '<span class="elig-badge unknown" title="No requirement data for this quest in the bundled dataset">Reqs unknown</span>';
    default:        return '';
  }
}

/** "Unlocks N" badge — only shown when there's actually something behind a
 *  quest worth knowing about, so it doesn't clutter the ~1 in 4 quests that
 *  are dead ends in the tree. Shown regardless of the active sort mode (not
 *  just under "Unblocks the most"), since it's the plain-language reason
 *  behind that ordering, not just a side effect of choosing it. */
function unblockBadgeHTML(title){
  const n = getUnblockCount(title, _eligCompletedSet);
  if(n === 0) return '';
  return `<span class="elig-badge unblocks" title="${n} other remaining quest${n===1?'':'s'} require this one, directly or through a prerequisite chain">🔓 Unlocks ${n}</span>`;
}

/** Requirement detail for a quest: every skill requirement as a tag (met ones
 *  green-bordered, e.g. "60 Herblore have 75"), tucked inside a collapsed
 *  accordion so the card stays compact, plus a separate chip for any
 *  prerequisite quests still to do (native <details> — no re-render needed to
 *  toggle, though it re-collapses when the list itself re-renders). */
function eligDetailHTML(e){
  const out = [];
  if(e.allSkills && e.allSkills.length){
    const metCount = e.allSkills.filter(s => s.met).length;
    const tags = e.allSkills.map(s =>
      `<span class="req-skill${s.met ? ' met' : ''}">${s.req} ${s.name} <span class="have">have ${s.have}</span></span>`).join('');
    out.push(
      `<details class="req-accordion">` +
        `<summary>${e.allSkills.length} skill requirement${e.allSkills.length===1?'':'s'} · ${metCount}/${e.allSkills.length} met</summary>` +
        `<div class="req-skill-grid">${tags}</div>` +
      `</details>`);
  }
  if(e.missingQuests.length){
    out.push(`<div class="elig-missing"><span class="miss-quest">${e.missingQuests.length} quest${e.missingQuests.length===1?'':'s'} first</span></div>`);
  }
  return out.join('');
}

/** One quest (or one series chapter) as an ach-card-style row. Reused for
 *  standalone quests, series chapters (indented under their parent), and
 *  rows inside the completed accordion — all read-only, since the truth
 *  comes from RuneMetrics and resets on every re-sync rather than being
 *  something to track locally. When skills are synced, incomplete quests get
 *  an eligibility badge + the specific skills/quests blocking them. */
function questRowHTML(q, {indent} = {}){
  const showElig = hasSkillData() && !q.completed;
  const e = showElig ? eligFor(q.title, q.completed) : null;
  const badge = e ? eligBadgeHTML(e) : '';
  const detail = e ? eligDetailHTML(e) : '';
  // Doesn't need hasSkillData() — unlike the eligibility badge, this only
  // depends on quest completion, not synced skill levels.
  const unblock = !q.completed ? unblockBadgeHTML(q.title) : '';
  // Status words ("not started") are dropped — the coloured status dot already
  // says that. The type pill is dropped too — every row already lives under a
  // Quests/Miniquests/Sagas heading. The eligibility badge takes the pill's old
  // spot in the bottom row.
  const qp = q.questPoints ? `${q.questPoints} quest point${q.questPoints===1?'':'s'}` : '';
  return `
    <div class="ach-card${q.completed ? ' done' : ''}${e ? ' elig-' + e.status : ''}"${indent ? ' style="margin-inline-start:34px;"' : ''}>
      ${statusDotHTML(q.status)}
      <div class="ach-body">
        <div class="ach-title">${membersIconHTML(q.members)} ${q.title}</div>
        ${qp ? `<div class="ach-req">${qp}</div>` : ''}
        ${detail}
        <div class="ach-bottom-row">
          <div class="ach-tags">${badge}${unblock}</div>
          <a class="wiki-link" href="${wikiSearch(q.title)}" target="_blank" rel="noopener">wiki →</a>
        </div>
      </div>
    </div>
  `;
}

/** A series (e.g. "Recipe for Disaster") as a header row plus its chapters
 *  indented underneath — chapters already count individually toward the
 *  Quest Cape totals (see api.js), this is purely a display grouping. */
function seriesRowHTML(s){
  const seriesStatus = s.completed
    ? 'COMPLETED'
    : (s.chapters.some(c => c.status !== 'NOT_STARTED') ? 'STARTED' : 'NOT_STARTED');
  return `
    <div class="ach-card${s.completed ? ' done' : ''}">
      ${statusDotHTML(seriesStatus)}
      <div class="ach-body">
        <div class="ach-title">${membersIconHTML(s.members)} ${s.title} <span class="skill-tag" style="margin-inline-start:8px;">${s.completedCount}/${s.totalCount} chapters</span></div>
        <div class="ach-req">Quest series</div>
      </div>
    </div>
    ${s.chapters.map(c => questRowHTML(c, {indent:true})).join('')}
  `;
}

/** Completed quests/series shrink down to just a name + type pill, laid out
 *  in a dense grid — the full status dot / req text / wiki link a remaining
 *  item needs doesn't add anything once something's already done. */
function questCompactHTML(title, type){
  return `
    <div class="quest-compact done">
      <span class="quest-compact-title">${title}</span>
      ${questTypeBadge(type)}
    </div>
  `;
}

/** Builds one of the three always-visible Quests/Miniquests/Sagas sections.
 *  Returns '' if nothing of this type matches the current search, so the
 *  caller can drop empty sections entirely rather than showing a heading
 *  over nothing. */
/** Orders the remaining (incomplete) standalone quests by the active quest
 *  sort mode. All eligibility-aware modes fall back to alphabetical as a
 *  tie-breaker so the order is stable. */
function sortRemainingQuests(list){
  const arr = list.slice();
  const alpha = (a,b) => a.title.localeCompare(b.title);
  if(!hasSkillData() || questSort === 'alpha') return arr.sort(alpha);

  if(questSort === 'canFirst'){
    const rank = { can:0, quests:1, skills:2, both:3, unknown:4, done:5 };
    return arr.sort((a,b) => (rank[eligFor(a.title,false).status] - rank[eligFor(b.title,false).status]) || alpha(a,b));
  }
  if(questSort === 'gapAsc'){
    // "Closest to doable": can-do first, then fewest missing skills, then
    // smallest single skill gap, with prerequisite quests as a mild penalty.
    const gap = q => {
      const e = eligFor(q.title, false);
      if(e.status === 'can') return -1;
      const maxGap = e.missingSkills.reduce((m,s) => Math.max(m, s.req - s.have), 0);
      return e.missingSkills.length*1000 + maxGap + e.missingQuests.length*100;
    };
    return arr.sort((a,b) => (gap(a) - gap(b)) || alpha(a,b));
  }
  if(questSort === 'reqAsc'){
    return arr.sort((a,b) => (eligFor(a.title,false).totalReqLevels - eligFor(b.title,false).totalReqLevels) || alpha(a,b));
  }
  if(questSort === 'unblocksDesc'){
    // Can-do-now still wins outright (no point leading with something you're
    // not eligible for yet) — the unblock count only breaks ties *within*
    // each eligibility bucket, e.g. deciding which of several "can do now"
    // quests is worth doing first.
    const rank = { can:0, quests:1, skills:2, both:3, unknown:4, done:5 };
    return arr.sort((a,b) =>
      (rank[eligFor(a.title,false).status] - rank[eligFor(b.title,false).status]) ||
      (getUnblockCount(b.title, _eligCompletedSet) - getUnblockCount(a.title, _eligCompletedSet)) ||
      alpha(a,b)
    );
  }
  return arr.sort(alpha);
}

function questTypeSectionHTML(type, heading, synced, matchesTerm, counts){
  const quests = synced.list
    .filter(q => q.type === type && matchesTerm(q.title))
    .sort((a,b) => a.title.localeCompare(b.title));
  const series = synced.series
    .filter(s => s.type === type && (matchesTerm(s.title) || s.chapters.some(c => matchesTerm(c.title))))
    .sort((a,b) => a.title.localeCompare(b.title));

  const completedQuests = quests.filter(q => q.completed);
  const completedSeries = series.filter(s => s.completed);
  const totalCount = quests.length + series.length;
  const completedCount = completedQuests.length + completedSeries.length;

  // Eligibility filter (Quest Cape, once skills are synced) narrows the
  // *remaining* standalone quests. Series are shown only under 'All', since
  // they don't carry a single-quest requirement to judge. Counts and the
  // completed accordion below are unaffected — they always reflect real totals.
  const eligActive = hasSkillData() && questEligFilter !== 'all';
  const eligTest = eligActive ? ELIG_FILTERS.find(x => x.key === questEligFilter).test : null;
  let remainingQuests = quests.filter(q => !q.completed);
  if(eligActive) remainingQuests = remainingQuests.filter(q => eligTest(eligFor(q.title, false)));
  remainingQuests = sortRemainingQuests(remainingQuests);
  const remainingSeries = eligActive ? [] : series.filter(s => !s.completed);

  if(totalCount === 0) return '';

  // Completed goes first (collapsed) — surfacing it up top, rather than
  // burying it below the remaining list, makes it obvious at a glance that
  // this app is tracking real synced progress, not just a blank checklist.
  let inner = '';
  if(completedCount > 0){
    const isOpen = !!questsAccordionOpen[type];
    const completedHTML = completedQuests.map(q => questCompactHTML(q.title, q.type)).join('') + completedSeries.map(s => questCompactHTML(s.title, s.type)).join('');
    inner += `
      <div class="skills-accordion" style="margin-bottom:14px;">
        <button class="skills-accordion-toggle${isOpen ? ' open' : ''}" data-quest-acc="${type}">
          <span>✓ Completed — ${completedCount}/${totalCount} in this view</span>
          <span class="chev">▸</span>
        </button>
        <div class="skills-accordion-body quest-compact-grid${isOpen ? ' open' : ''}" style="display:${isOpen ? 'grid' : 'none'};">
          ${completedHTML}
        </div>
      </div>
    `;
  }
  const remainingHTML = remainingQuests.map(q => questRowHTML(q)).join('') + remainingSeries.map(s => seriesRowHTML(s)).join('');
  inner += remainingHTML || (eligActive
    ? '<div class="empty">No quests match this filter in this section.</div>'
    : '<div class="empty">Nothing left here — everything above is done.</div>');

  return `
    <div class="quest-type-section">
      <h3 class="quest-type-heading">${heading} <span class="skill-tag">${counts[type].done}/${counts[type].total}</span></h3>
      <div class="ach-list">${inner}</div>
    </div>
  `;
}

/** Quest Cape has no static achievement list (see the comment above
 *  TIPS_QUESTS in data.js) — its one requirement, "complete every quest",
 *  is instead rendered live once a quest sync has run (main.js, via
 *  api.js's fetchPlayerQuests). Falls back to the usual stub banner until
 *  then. Always broken into three sections — Quests, Miniquests, Sagas —
 *  rather than one combined list behind a type filter. */
/** Populates the #filters row with eligibility chips (All / Can do now /
 *  Missing skills / Missing quests), each with a live count over the
 *  incomplete standalone quests. Only shown once skills are synced — without
 *  levels every quest looks blocked, so the filter would be noise. */
function renderQuestEligFilters(synced){
  const container = document.getElementById('filters');
  if(!hasSkillData()){ container.innerHTML = ''; return; }
  const incomplete = synced.list.filter(q => !q.completed);
  container.innerHTML = '';
  ELIG_FILTERS.forEach(f=>{
    const n = f.key === 'all' ? incomplete.length : incomplete.filter(q => f.test(eligFor(q.title, false))).length;
    const btn = document.createElement('button');
    btn.textContent = `${f.label} (${n})`;
    if(f.key === questEligFilter) btn.classList.add('active');
    btn.addEventListener('click', ()=>{ questEligFilter = f.key; renderAch(); });
    container.appendChild(btn);
  });
}

function renderQuestChecklist(cape){
  const synced = state.questSync;
  const counts = questTypeCounts(synced);
  setAchHeading(cape);
  document.getElementById('achNote').textContent = synced.rsn
    ? `Synced from RuneMetrics for ${synced.rsn}${synced.syncedAt ? ' · ' + new Date(synced.syncedAt).toLocaleString() : ''}`
    : 'Synced from RuneMetrics';

  // Eligibility context for every per-row/per-chip helper this render, rebuilt
  // fresh so it reflects the latest sync (levels + completed quests).
  _eligSkills = state.skills;
  _eligCompletedSet = buildCompletedQuestSet(synced);

  document.querySelector('.controls-row').style.display = '';

  // Quest sort only makes sense with synced levels (its modes are all
  // eligibility-based); swap the achievement sort options in/out accordingly.
  const sortSel = document.getElementById('sortSelect');
  if(hasSkillData()){
    if(sortSel.dataset.mode !== 'quest'){
      sortSel.dataset.mode = 'quest';
      sortSel.innerHTML =
        '<option value="alpha">Alphabetical</option>' +
        '<option value="canFirst">Can do first</option>' +
        '<option value="gapAsc">Closest to doable</option>' +
        '<option value="reqAsc">Fewest requirements</option>' +
        '<option value="unblocksDesc">Unblocks the most</option>';
    }
    sortSel.value = questSort;
    sortSel.style.display = '';
  }else{
    sortSel.style.display = 'none';
  }

  renderQuestEligFilters(synced);

  const term = searchTerm.trim().toLowerCase();
  const matchesTerm = title => !term || title.toLowerCase().includes(term);

  const list = document.getElementById('achList');
  list.style.display = 'block'; // override the .ach-list grid — sections stack vertically, each with its own grid inside

  const html = QUEST_TYPE_SECTIONS
    .map(({key, heading}) => questTypeSectionHTML(key, heading, synced, matchesTerm, counts))
    .filter(Boolean)
    .join('<div style="height:28px;"></div>');

  list.innerHTML = html || '<div class="empty">No quests match your search.</div>';

  list.querySelectorAll('[data-quest-acc]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const type = btn.dataset.questAcc;
      questsAccordionOpen[type] = !questsAccordionOpen[type];
      renderQuestChecklist(cape);
    });
  });
}

/** One tag pill — 'D&D' (shorthand for "Distractions & Diversions") gets
 *  the wiki's own D&D icon alongside the label, same hotlinking approach as
 *  the skill/members icons above. */
function pillHTML(t){
  const cls = t.replace(/\s/g,'');
  const icon = t === 'D&D' ? `<img class="pill-icon" src="${DND_ICON}" alt="" aria-hidden="true" />` : '';
  return `<span class="pill ${cls}">${icon}${t}</span>`;
}

/** Builds one achievement card, wired with its own check/click-to-toggle
 *  handlers. Shared by the main grid and the time-gated subsection below —
 *  the only difference between the two is which container they land in.
 *  `opts.capeId` defaults to activeCape (every existing call site is always
 *  on the currently-active cape tab); the Journey page's cross-cape lists
 *  pass an explicit capeId per row instead, plus showCapeBadge so each card
 *  is still clear about which tab it lives on, and its own onToggle (since
 *  "just re-render this cape's tab" doesn't apply when Journey is what's
 *  actually on screen). */
function achCardEl(a, st, opts = {}){
  const capeId = opts.capeId || activeCape;
  // A few achievements (e.g. Master Max's "Complete The Knight's Sword") are
  // the exact same task already tracked as a real quest on the Quest Cape
  // tab — tie those to that quest's own RuneMetrics-synced completion so the
  // two can't disagree, instead of leaving a second manual checkbox for the
  // same thing. Only takes over once a quest sync has actually happened;
  // unsynced players can still check it off by hand like any other task.
  const linkedQuestDone = !!(a.linkedQuest && isQuestCompleted(a.linkedQuest));
  const locked = linkedQuestDone;
  const done = locked || !!st.checked[a.id];
  // A handful of Comp/MQC achievements are the literal same in-game task
  // (see data.js's SHARED_ACHIEVEMENTS) — flag those with a small badge so
  // it's clear before clicking that checking this one also checks its twin.
  const shared = getSharedAchievement(capeId, a.id);
  const capeBadge = opts.showCapeBadge ? ` <span class="pill journey-cape-pill">${getCape(capeId).short}</span>` : '';
  // Journey's "current focus" pin is meant for something you can realistically
  // knock out as a single focus, not a 15+ hour grind (those already live in
  // the full list / weekly picks) — so only quick cards under 3 hours get a
  // pin control at all. Pinning right from the card (instead of hunting for
  // it again in a dropdown on the Journey page) also means you always see
  // the title/req/tip you're pinning, not just a bare achievement name.
  // Timegated items are excluded outright regardless of their time string —
  // estimateHours() deliberately returns 0 for anything week/day/month-based
  // (see storage.js) since they're background tasks, not "sit down and do
  // it" ones, so a plain `< 3` check alone would wrongly let them through.
  const pinnable = !locked && !a.tags.includes('Timegated') && estimateHours(a.time) < 3;
  const pin = state.journey.pin;
  const isPinned = pinnable && !!pin && pin.kind === 'achievement' && pin.capeId === capeId && pin.achId === a.id;
  const pinBtn = pinnable
    ? `<button class="ach-pin-btn${isPinned ? ' pinned' : ''}" title="${isPinned ? 'Unpin from Journey focus' : 'Pin as your Journey focus'}" type="button">📌</button>`
    : '';
  const linkedPill = a.linkedQuest
    ? (linkedQuestDone
        ? `<span class="pill shared-pill" title="Auto-completed — synced from The Knight's Sword on your Quest Cape tab">⇄ Synced with Quest Cape</span>`
        : `<span class="pill shared-pill" title="Will auto-complete once ${a.linkedQuest} shows done on your Quest Cape tab">⇄ Tracks Quest Cape</span>`)
    : '';
  const card = document.createElement('div');
  card.className = 'ach-card' + (done ? ' done' : '') + (locked ? ' locked' : '');
  card.innerHTML = `
    <button class="ach-check"${locked ? ' disabled' : ''} data-id="${a.id}">${done ? '✓' : ''}</button>
    <div class="ach-body">
      <div class="ach-top-row">
        <div class="ach-title${locked ? '' : ' ach-title-clickable'}">${a.title}${capeBadge}</div>
        <div class="ach-time">${a.time}</div>
      </div>
      <div class="ach-req">${a.req}</div>
      ${a.tip ? `<div class="ach-tip">${a.tip}</div>` : ''}
      <div class="ach-bottom-row">
        <div class="ach-tags">${a.tags.map(pillHTML).join('')}${shared ? `<span class="pill shared-pill" title="Checking this also checks the same requirement on ${getCape(shared.cape).short}">⇄ Synced with ${getCape(shared.cape).short}</span>` : ''}${linkedPill}</div>
        <div class="ach-actions">${pinBtn}<a class="wiki-link" href="${wikiSearch(a.title)}" target="_blank" rel="noopener">Wiki →</a></div>
      </div>
    </div>
  `;
  const toggle = ()=>{
    if(locked) return; // driven entirely by the linked quest's own sync state
    st.checked[a.id] = !st.checked[a.id];
    // Mirror onto the paired achievement's own cape, if this one is part of
    // a shared pair — same real task, so both sides should always agree.
    if(shared) state[shared.cape].checked[shared.id] = st.checked[a.id];
    saveState();
    if(opts.onToggle) opts.onToggle();
    else { renderAch(); renderHero(); }
    renderCapeTabs();
  };
  const pinBtnEl = card.querySelector('.ach-pin-btn');
  if(pinBtnEl){
    pinBtnEl.addEventListener('click', ()=>{
      state.journey.pin = isPinned ? null : { kind: 'achievement', capeId, achId: a.id };
      saveState();
      if(opts.onToggle) opts.onToggle();
      else { renderAch(); renderHero(); }
    });
  }
  if(!locked){
    card.querySelector('.ach-check').addEventListener('click', toggle);
    card.querySelector('.ach-title-clickable').addEventListener('click', toggle);
  }
  return card;
}

function renderAch(){
  const cape = getCape(activeCape);
  const timegatedSection = document.getElementById('timegatedSection');
  const achSection = document.getElementById('achSection');

  if(activeCape === 'quests' && state.questSync.totalCount > 0){
    achSection.style.display = '';
    timegatedSection.style.display = 'none'; // quests have no Timegated tag concept — always hide
    renderQuestChecklist(cape);
    return;
  }

  // A cape with zero static achievements is a genuine 0/0 — Master Completionist
  // and Master Trimmed Completionist have no independent requirements of their
  // own (just their prerequisite capes), and Max Cape's only requirement is the
  // skills above. Quest Cape is the one exception: it also has an empty static
  // list, but that's because its real requirement list only exists once synced
  // from RuneMetrics, so it keeps its own guidance message instead of vanishing.
  if(cape.achievements.length === 0 && activeCape !== 'quests'){
    achSection.style.display = 'none';
    return;
  }
  achSection.style.display = '';

  setAchHeading(cape);
  document.getElementById('achNote').textContent = cape.achNote;

  const list = document.getElementById('achList');
  list.style.display = ''; // undo the Quest Cape section-stack override, restore the normal .ach-list grid
  const controlsRow = document.querySelector('.controls-row');
  const sortSel = document.getElementById('sortSelect');
  // Restore the achievement (time-based) sort options if we're coming back
  // from the Quest Cape's eligibility-based sort set.
  if(sortSel.dataset.mode === 'quest'){
    sortSel.dataset.mode = 'ach';
    sortSel.innerHTML =
      '<option value="alpha">Alphabetical</option>' +
      '<option value="timeAsc">Quickest</option>' +
      '<option value="timeDesc">Longest</option>';
    sortSel.value = sortMode;
  }
  sortSel.style.display = '';

  if(cape.achievements.length === 0){
    controlsRow.style.display = 'none';
    document.getElementById('filters').innerHTML = '';
    timegatedSection.style.display = 'none';
    const msg = cape.achEmptyMessage || `<b>${cape.name} requirements aren't broken down here yet.</b><br>This tracker's infrastructure fully supports it — the data just hasn't been built out. Use "Your own additions" below to start tracking it now, or check back as this section grows.`;
    list.innerHTML = `<div class="stub-banner">${msg}</div>`;
    return;
  }
  controlsRow.style.display = '';

  const st = state[activeCape];
  const term = searchTerm.trim().toLowerCase();
  let filtered = cape.achievements.filter(a=>{
    const matchesTag = activeFilter === 'all' || a.tags.includes(activeFilter);
    const matchesSearch = !term || a.title.toLowerCase().includes(term) || a.req.toLowerCase().includes(term);
    return matchesTag && matchesSearch;
  });
  if(sortMode === 'alpha') filtered = filtered.slice().sort((a,b) => a.title.localeCompare(b.title));
  else if(sortMode === 'timeAsc') filtered = filtered.slice().sort((a,b) => estimateHours(a.time) - estimateHours(b.time));
  else if(sortMode === 'timeDesc') filtered = filtered.slice().sort((a,b) => estimateHours(b.time) - estimateHours(a.time));

  // Time-gated tasks (background timers — Fort Forinthry upgrades, Manor
  // Farm reward shops, etc.) always split out into their own full-width
  // subsection below, regardless of the active tag filter, rather than
  // competing for space in the main 2-up grid.
  const normal = filtered.filter(a => !a.tags.includes('Timegated'));
  const timegated = filtered.filter(a => a.tags.includes('Timegated'));

  list.innerHTML = '';
  if(normal.length === 0){
    list.innerHTML = '<div class="empty">No requirements match your filters.</div>';
  }
  normal.forEach(a => list.appendChild(achCardEl(a, st)));

  const timegatedList = document.getElementById('timegatedList');
  const timegatedNote = document.getElementById('timegatedNote');
  timegatedList.innerHTML = '';
  if(timegated.length === 0){
    timegatedSection.style.display = 'none';
  }else{
    timegatedSection.style.display = '';
    const done = timegated.filter(a => st.checked[a.id]).length;
    timegatedNote.textContent = `${done}/${timegated.length} done`;
    timegated.forEach(a => timegatedList.appendChild(achCardEl(a, st)));
  }
}

/* ---------------- RENDER: CUSTOM ---------------- */
function renderCustom(){
  const cape = getCape(activeCape);
  const st = state[activeCape];
  const listEl = document.getElementById('customList');
  const emptyEl = document.getElementById('customEmpty');
  const noteEl = document.getElementById('customNote');

  noteEl.textContent = cape.achievements.length === 0
    ? `Nothing built in yet for ${cape.name} — start your own checklist here`
    : `Track anything beyond the built-in ${cape.name} list above`;

  listEl.innerHTML = '';
  if(st.custom.length === 0){
    emptyEl.style.display = 'block';
    emptyEl.innerHTML = `Nothing added yet — pull items from the <a href="${cape.wikiUrl}" target="_blank" rel="noopener">wiki page</a> as you plan your route.`;
    return;
  }
  emptyEl.style.display = 'none';
  st.custom.forEach((item, idx)=>{
    const row = document.createElement('div');
    row.className = 'custom-item' + (item.done ? ' done' : '');
    row.innerHTML = `
      <button class="ach-check" style="width:18px;height:18px;">${item.done ? '✓' : ''}</button>
      <span><b>${item.title}</b>${item.note ? ' — ' + item.note : ''}</span>
      <button class="del">Remove</button>
    `;
    row.querySelector('.ach-check').addEventListener('click', ()=>{
      st.custom[idx].done = !st.custom[idx].done;
      saveState(); renderCustom(); renderHero(); renderCapeTabs();
    });
    row.querySelector('.del').addEventListener('click', ()=>{
      st.custom.splice(idx,1);
      saveState(); renderCustom(); renderHero(); renderCapeTabs();
    });
    listEl.appendChild(row);
  });
}

/* ---------------- RENDER: PLAYER DASHBOARD ---------------- */
function playerStatTileHTML(num, lbl){
  return `<div class="player-stat"><div class="num">${num}</div><div class="lbl">${lbl}</div></div>`;
}

/** Plain level tile — no requirement/target, since the Player page shows
 *  "your skills" on their own rather than progress toward any one cape. */
function playerSkillTileHTML(s){
  const cur = state.skills[s.id] ?? 1;
  return `
    <div class="skill-tile" title="${s.name}: level ${cur}">
      <div class="skill-tile-icon">${skillIcon(s.id, 32)}</div>
      <div class="skill-tile-level">${cur}</div>
      <div class="skill-tile-name">${s.name}</div>
    </div>
  `;
}

/** Renders the Player page's dashboard (stat tiles + full skills grid) from
 *  last-synced state.meta / state.skills / state.questSync — no fetch
 *  happens here, that's main.js's job on a sync click. Shows a plain
 *  "search a name" placeholder until at least one sync has completed. */
export function renderPlayerDashboard(){
  const dash = document.getElementById('playerDashboard');
  const empty = document.getElementById('playerDashEmpty');

  if(!state.meta.rsn || !state.meta.syncedAt){
    dash.style.display = 'none';
    empty.style.display = 'block';
    return;
  }
  dash.style.display = '';
  empty.style.display = 'none';

  document.getElementById('playerDashNote').textContent =
    `${state.meta.rsn} · synced ${new Date(state.meta.syncedAt).toLocaleString()}`;

  const fmt = n => (typeof n === 'number' ? n.toLocaleString() : '—');
  const qp = totalQuestPoints(state.questSync);

  document.getElementById('playerStats').innerHTML = [
    playerStatTileHTML(fmt(state.meta.runescore), 'RuneScore'),
    playerStatTileHTML(fmt(qp), 'Quest Points'),
    playerStatTileHTML(fmt(state.meta.combatLevel), 'Combat Level'),
    playerStatTileHTML(fmt(state.meta.totalLevel), 'Total Level'),
    playerStatTileHTML(fmt(state.meta.totalXp), 'Total XP'),
  ].join('');

  document.getElementById('playerSkillsGrid').innerHTML = ALL_SKILLS.map(playerSkillTileHTML).join('');
}

/* ---------------- RENDER: JOURNEY (cross-cape planning page) ---------------- */
/* Three independent modules, each reading straight from storage.js's
   cross-cape helpers rather than any one cape's own state — see that
   file's "JOURNEY" section for what each one aggregates and why. */

/** The "nothing pinned yet" mini-form — just the skill side now. Pinning a
 *  specific *requirement* happens straight from its 📌 button on the
 *  achievement card itself (any cape tab, any quick — under 3 hours — task,
 *  see achCardEl) rather than a second dropdown here that only shows a bare
 *  title with none of the card's own req/tip/time context. Skills have no
 *  card to click, so they keep their own small form: any skill, any target
 *  level, decoupled from any one cape's own requirement number so it works
 *  for a personal goal like "120 Mining" regardless of which cape asks for it. */
function journeyPinFormsHTML(){
  const skillOptions = ALL_SKILLS.map(s => `<option value="${s.id}">${s.name}</option>`).join('');
  return `
    <div class="journey-pin-forms">
      <div class="journey-pin-form">
        <div class="journey-pin-form-title">Pin a skill</div>
        <div class="journey-pin-form-row">
          <select id="journeyPinSkill">${skillOptions}</select>
          <span>to</span>
          <input id="journeyPinTarget" type="number" min="1" max="120" value="120" />
          <button id="journeyPinSkillBtn" class="sync-btn" type="button">Pin</button>
        </div>
      </div>
    </div>
    <div class="journey-pin-hint">Or pin a specific requirement straight from its 📌 button on any cape tab — quick ones (under 3 hours) only.</div>
  `;
}

/** The resolved pin, once something is actually pinned — a skill's level
 *  progress bar, or a specific achievement with its own mark-done control
 *  (which is exactly achCardEl's job, so this reuses it rather than
 *  building a second checkbox implementation). */
function journeyPinCardEl(pin){
  const wrap = document.createElement('div');
  if(pin.kind === 'skill'){
    const pct = Math.max(0, Math.min(100, Math.round((pin.cur / pin.target) * 100)));
    wrap.className = 'journey-pin-card' + (pin.met ? ' done' : '');
    wrap.innerHTML = `
      <div class="journey-pin-top">
        <div class="journey-pin-title">${pin.name}</div>
        <button class="journey-unpin" id="journeyUnpinBtn" type="button">Unpin</button>
      </div>
      <div class="journey-pin-progress"><div class="journey-pin-bar" style="width:${pct}%"></div></div>
      <div class="journey-pin-nums">${pin.cur} / ${pin.target}${pin.met ? ' — target reached!' : ''}</div>
    `;
  }else{
    const card = achCardEl(pin.achievement, state[pin.capeId], { capeId: pin.capeId, showCapeBadge: true, onToggle: renderJourney });
    wrap.className = 'journey-pin-card' + (pin.done ? ' done' : '');
    wrap.innerHTML = `<div class="journey-pin-top"><div class="journey-pin-title">Pinned requirement</div><button class="journey-unpin" id="journeyUnpinBtn" type="button">Unpin</button></div>`;
    wrap.appendChild(card);
  }
  wrap.querySelector('#journeyUnpinBtn').addEventListener('click', ()=>{
    state.journey.pin = null;
    saveState();
    renderJourney();
  });
  return wrap;
}

function renderJourneyFocus(){
  const box = document.getElementById('journeyFocusBox');
  const pin = resolvePin();
  box.innerHTML = '';
  if(!pin){
    box.innerHTML = journeyPinFormsHTML();
    document.getElementById('journeyPinSkillBtn').addEventListener('click', ()=>{
      const skillId = document.getElementById('journeyPinSkill').value;
      const target = Math.max(1, Math.min(120, parseInt(document.getElementById('journeyPinTarget').value, 10) || 120));
      state.journey.pin = { kind: 'skill', skillId, target };
      saveState();
      renderJourney();
    });
    return;
  }
  box.appendChild(journeyPinCardEl(pin));
}

function renderJourneyWeekly(){
  const theme = state.journey.weeklyTheme;
  const themeSel = document.getElementById('journeyThemeSelect');
  if(themeSel.value !== (theme || '')) themeSel.value = theme || '';

  const pickBox = document.getElementById('journeyWeeklyPick');
  pickBox.innerHTML = '';
  if(!theme){
    pickBox.innerHTML = '<div class="empty">Choose a theme above to get a suggestion.</div>';
    return;
  }
  const picked = state.journey.weeklyPick;
  const cape = picked && getCape(picked.capeId);
  const achievement = cape && cape.achievements.find(a => a.id === picked.achId);
  if(!achievement){
    // Theme fully cleared (or a stale pick from before a data edit) — same
    // "nothing left" messaging renderAch uses elsewhere, not an error state.
    pickBox.innerHTML = `<div class="empty">Nothing left tagged "${theme}" — nice work. Pick another theme, or hit Reroll once you've checked something else off.</div>`;
    return;
  }
  pickBox.appendChild(achCardEl(achievement, state[picked.capeId], { capeId: picked.capeId, showCapeBadge: true, onToggle: renderJourney }));
}

function renderJourneyTimegated(){
  const rows = getCrossCapeTimegated();
  const list = document.getElementById('journeyTimegatedList');
  const empty = document.getElementById('journeyTimegatedEmpty');
  document.getElementById('journeyTimegatedNote').textContent = rows.length ? `${rows.length} not started` : '';
  list.innerHTML = '';
  if(rows.length === 0){
    empty.style.display = '';
    return;
  }
  empty.style.display = 'none';
  rows.forEach(row=>{
    list.appendChild(achCardEl(row.achievement, state[row.capeId], { capeId: row.capeId, showCapeBadge: true, onToggle: renderJourney }));
  });
}

export function renderJourney(){
  renderJourneyFocus();
  renderJourneyWeekly();
  renderJourneyTimegated();
}

/* ---------------- SYNC PANEL (DOM bits only — the actual fetch lives in api.js / main.js) ---------------- */
export function setSyncStatus(text, ok){
  document.getElementById('syncStatusText').textContent = text;
  document.getElementById('syncStatus').classList.toggle('ok', !!ok);
}

/** Reflects the loaded state onto the sync form — called once after
 *  loadState() resolves, before the first render(). */
export function applyStateToSyncForm(){
  document.getElementById('rsnInput').value = state.meta.rsn || '';
  if(state.meta.rsn){
    setSyncStatus(`Welcome back — showing your saved progress for ${state.meta.rsn}.`, true);
  }
}

/** Toggles one whole section (Skill requirements / achievements) collapsed
 *  or open — separate from the finer-grained accordions inside each section
 *  (skills-accordion, quests-accordion), which keep their own state. */
function toggleSection(key, bodyId, chevId){
  sectionsCollapsed[key] = !sectionsCollapsed[key];
  document.getElementById(bodyId).classList.toggle('collapsed', sectionsCollapsed[key]);
  document.getElementById(chevId).classList.toggle('collapsed', sectionsCollapsed[key]);
}

/* ---------------- STATIC EVENT WIRING ---------------- */
/** Binds the event listeners that only need to be attached once (as
 *  opposed to per-render listeners on dynamically created elements, which
 *  are bound inside their respective render functions). Call once on
 *  startup, before the first render(). */
export function initUI(){
  document.getElementById('playerNavBtn').addEventListener('click', ()=>{
    activeView = 'player';
    render();
  });

  document.getElementById('journeyNavBtn').addEventListener('click', ()=>{
    activeView = 'journey';
    render();
  });

  // Theme options are static for the session (they're every tag in use
  // across data.js, not anything state-dependent) — built once here rather
  // than rebuilt on every renderJourney() call. renderJourney() only ever
  // syncs the select's *value* afterwards.
  const themeSel = document.getElementById('journeyThemeSelect');
  getJourneyThemeTags().forEach(t=>{
    const opt = document.createElement('option');
    opt.value = t; opt.textContent = t;
    themeSel.appendChild(opt);
  });
  themeSel.addEventListener('change', e=>{
    const theme = e.target.value || null;
    state.journey.weeklyTheme = theme;
    state.journey.weeklyPick = theme ? pickWeeklyItem(theme, null) : null;
    saveState();
    renderJourney();
  });
  document.getElementById('journeyRerollBtn').addEventListener('click', ()=>{
    const theme = state.journey.weeklyTheme;
    if(!theme) return;
    state.journey.weeklyPick = pickWeeklyItem(theme, state.journey.weeklyPick);
    saveState();
    renderJourney();
  });

  document.getElementById('capeNavToggle').addEventListener('click', ()=>{
    capeNavCollapsed = !capeNavCollapsed;
    document.getElementById('capeTabs').classList.toggle('collapsed', capeNavCollapsed);
    document.getElementById('capeNavChev').classList.toggle('collapsed', capeNavCollapsed);
  });

  document.getElementById('skillsSecHead').addEventListener('click', ()=>{
    toggleSection('skills', 'skillsBody', 'skillsChev');
  });
  document.getElementById('achSecHead').addEventListener('click', ()=>{
    toggleSection('achievements', 'achBody', 'achChev');
  });
  document.getElementById('timegatedSecHead').addEventListener('click', ()=>{
    toggleSection('timegated', 'timegatedBody', 'timegatedChev');
  });

  document.getElementById('searchBox').addEventListener('input', e=>{
    searchTerm = e.target.value;
    renderAch();
  });

  document.getElementById('sortSelect').addEventListener('change', e=>{
    // The Quest Cape view drives its own eligibility-based sort; every other
    // cape uses the shared time-based achievement sort.
    if(activeView === 'capes' && activeCape === 'quests') questSort = e.target.value;
    else sortMode = e.target.value;
    renderAch();
  });

  document.getElementById('customAdd').addEventListener('click', ()=>{
    const t = document.getElementById('customTitle');
    const n = document.getElementById('customNoteInput');
    if(!t.value.trim()) return;
    state[activeCape].custom.push({title:t.value.trim(), note:n.value.trim(), done:false});
    t.value=''; n.value='';
    saveState(); renderCustom(); renderHero(); renderCapeTabs();
  });
}

/* ---------------- MASTER RENDER ---------------- */
export function render(){
  renderCapeTabs(); // sidebar nav — always current regardless of which view is showing

  const isPlayer = activeView === 'player';
  const isJourney = activeView === 'journey';
  document.getElementById('playerView').style.display = isPlayer ? '' : 'none';
  document.getElementById('journeyView').style.display = isJourney ? '' : 'none';
  document.getElementById('capeView').style.display = (isPlayer || isJourney) ? 'none' : '';

  if(isPlayer){
    renderPlayerDashboard();
    return;
  }
  if(isJourney){
    renderJourney();
    return;
  }

  renderHero();
  renderSkills();
  renderFilters();
  renderAch();
  renderCustom();
}
