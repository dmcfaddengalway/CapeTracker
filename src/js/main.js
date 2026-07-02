/* =========================================================================
   MAIN — entry point. Loads saved state, wires up the RuneMetrics sync
   button (api.js + storage.js + ui.js all meet here), then renders.
   ========================================================================= */
import { state, loadState, saveState, questTypeCounts } from './storage.js';
import { render, initUI, setSyncStatus, applyStateToSyncForm } from './ui.js';
import { fetchPlayerStats, fetchPlayerQuests, fetchPlayerRuneScore } from './api.js';

/** Merges a {skills:{id:level}} result into the shared skills map (used by
 *  every cape at once, since it's one shared map now), and snapshots the
 *  RuneMetrics meta fields (total level/XP, combat level) onto state.meta
 *  for the Player dashboard to read without re-syncing. */
function applyPlayerStats(stats){
  if(stats && stats.skills){
    Object.entries(stats.skills).forEach(([id, lvl])=>{
      if(lvl != null) state.skills[id] = lvl;
    });
  }
  if(stats && stats.meta){
    if(stats.meta.totalSkill != null) state.meta.totalLevel = stats.meta.totalSkill;
    if(stats.meta.totalXp != null) state.meta.totalXp = stats.meta.totalXp;
    if(stats.meta.combatLevel != null) state.meta.combatLevel = stats.meta.combatLevel;
  }
}

/** Stores a synced quest list and auto-ticks the three Completionist Cape
 *  achievements that quest-sync data can actually verify — these are
 *  separate line items in ACHIEVEMENTS_COMP because they're separate
 *  in-game requirements, each gated on its own quest *type*, not on
 *  everything combined:
 *    - 'compquestcape'      ("Quest Cape")  — all real quests done.
 *      Quest Cape itself does NOT require miniquests or sagas; those are
 *      separate achievements (below), not part of this one.
 *    - 'littlelistminiquests' ("I've Got a Little List (of Miniquests)")
 *      — all miniquests done (sagas excluded, per the wiki).
 *    - 'bridgeoverfremmy'   ("Bridge over Fremmy Waters") — all Fremennik
 *      Sagas done.
 *  Re-syncing always overwrites these; untick manually afterward if you'd
 *  rather track any of them by hand. */
function applyPlayerQuests(rsn, result){
  state.questSync = {
    rsn,
    list: result.quests,
    series: result.series,
    completedCount: result.completedCount,
    totalCount: result.totalCount,
    syncedAt: Date.now(),
  };

  const counts = questTypeCounts(state.questSync);
  const fullyDone = bucket => bucket.total > 0 && bucket.done === bucket.total;
  if(fullyDone(counts.quest)) state.comp.checked.compquestcape = true;
  if(fullyDone(counts.miniquest)) state.comp.checked.littlelistminiquests = true;
  if(fullyDone(counts.saga)) state.comp.checked.bridgeoverfremmy = true;
}

/** Turns one of the small set of known error codes thrown by api.js
 *  (NETWORK_ERROR, HTTP_xxx, PROFILE_xxx, UNEXPECTED_SHAPE) into a human
 *  sentence, labelled with which sync it came from since stats and quests
 *  are fetched together but can fail independently. */
function describeSyncError(err, label){
  const msg = err && err.message;
  if(msg === 'NETWORK_ERROR' || msg === 'UPSTREAM_UNREACHABLE'){
    return `${label}: couldn't reach the sync function — this only works when the page is served from Netlify (or "netlify dev" locally).`;
  }
  if(msg && msg.startsWith('HTTP_')){
    return `${label}: lookup failed (${msg.replace('HTTP_','HTTP ')}).`;
  }
  if(msg === 'PROFILE_NOT_FOUND'){
    return `${label}: no HiScores entry found — double-check the spelling.`;
  }
  if(msg && msg.startsWith('PROFILE_')){
    return `${label}: RuneMetrics returned "${msg.replace('PROFILE_','')}" — double-check the spelling, and that the profile isn't private in-game.`;
  }
  if(msg === 'UNEXPECTED_SHAPE'){
    return `${label}: got a response that didn't look like the expected RuneMetrics shape — the endpoint may have changed.`;
  }
  return `${label}: ${msg || 'unknown error'}.`;
}

function initSyncPanel(){
  document.getElementById('rsnInput').addEventListener('input', e=>{
    state.meta.rsn = e.target.value;
    saveState();
  });

  document.getElementById('rsnInput').addEventListener('keydown', e=>{
    if(e.key === 'Enter'){
      e.preventDefault();
      document.getElementById('syncBtn').click();
    }
  });

  document.getElementById('syncBtn').addEventListener('click', async ()=>{
    const rsn = document.getElementById('rsnInput').value.trim();
    const btn = document.getElementById('syncBtn');
    if(!rsn){
      setSyncStatus('Enter a RuneScape display name first.', false);
      return;
    }
    btn.disabled = true; btn.classList.add('loading'); btn.textContent = 'Syncing…';
    setSyncStatus(`Looking up ${rsn}…`, false);

    const [statsResult, questsResult, runescoreResult] = await Promise.allSettled([
      fetchPlayerStats(rsn),
      fetchPlayerQuests(rsn),
      fetchPlayerRuneScore(rsn),
    ]);

    const messages = [];
    let anyOk = false;

    if(statsResult.status === 'fulfilled'){
      const stats = statsResult.value;
      const skillCount = Object.keys(stats.skills).length;
      applyPlayerStats(stats);
      anyOk = true;
      const totalLevel = stats.meta && stats.meta.totalSkill ? ` (total level ${stats.meta.totalSkill})` : '';
      messages.push(`Synced ${skillCount} skills${totalLevel}.`);
    }else{
      messages.push(describeSyncError(statsResult.reason, 'Skills'));
    }

    if(questsResult.status === 'fulfilled'){
      const result = questsResult.value;
      applyPlayerQuests(rsn, result);
      anyOk = true;
      const counts = questTypeCounts(state.questSync);
      messages.push(`${counts.quest.done}/${counts.quest.total} quests, ${counts.miniquest.done}/${counts.miniquest.total} miniquests, ${counts.saga.done}/${counts.saga.total} sagas synced.`);
    }else{
      messages.push(describeSyncError(questsResult.reason, 'Quests'));
    }

    if(runescoreResult.status === 'fulfilled'){
      state.meta.runescore = runescoreResult.value.runescore;
      anyOk = true;
      messages.push(runescoreResult.value.runescore != null ? `RuneScore ${runescoreResult.value.runescore.toLocaleString()}.` : 'RuneScore unranked.');
    }else{
      messages.push(describeSyncError(runescoreResult.reason, 'RuneScore'));
    }

    if(anyOk){
      state.meta.rsn = rsn;
      state.meta.syncedAt = Date.now();
    }

    saveState();
    render();
    setSyncStatus(`${rsn} — ${messages.join(' ')}`, anyOk);

    btn.disabled = false; btn.classList.remove('loading'); btn.textContent = 'Search player';
  });
}

async function init(){
  try{
    await loadState();
  }catch(e){
    console.error('Failed to load saved state, starting fresh', e);
  }
  applyStateToSyncForm();
  initUI();
  initSyncPanel();
  render();
}

init();
