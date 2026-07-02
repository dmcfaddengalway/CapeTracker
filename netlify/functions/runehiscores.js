/* Netlify Function — server-side proxy + parser for the RS3 HiScores "lite"
 * feed (https://runescape.wiki/w/Application_programming_interface#index_lite).
 *
 * Unlike runemetrics.js/runequests.js this upstream isn't JSON — it's a
 * plain-text CSV (one "rank,level,xp" line per skill, then a block of
 * "rank,score" lines, one per hiscores "activity" — minigames, bosses, clue
 * tiers, and RuneScore among them). We parse it here so the front end only
 * ever deals with JSON, same as the other two proxies.
 *
 * RuneScore's position in that activity block is NOT documented by Jagex —
 * there's no official field name, just a fixed ordering that's evidently
 * stable across profiles. RUNESCORE_ACTIVITY_INDEX below was determined by
 * cross-referencing the wiki's listed RS3 hiscores activity order (RuneScore
 * is the 25th activity type, i.e. index 24) against a live profile fetch,
 * where that exact line matched a plausible RuneScore value. If Jagex ever
 * reorders/inserts an activity ahead of it, this will silently start
 * returning the wrong number — if RuneScore on the Player page ever looks
 * off, this is the first place to check.
 *
 * Endpoint: /.netlify/functions/runehiscores?player=<display name>
 */
const SKILL_COUNT = 29; // keep in sync with RUNEMETRICS_SKILL_IDS.length in src/js/data.js
const RUNESCORE_ACTIVITY_INDEX = 24;

exports.handler = async (event) => {
  const rsn = event.queryStringParameters && event.queryStringParameters.player;

  if (!rsn || !rsn.trim()) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Missing required "player" query parameter.' }),
    };
  }

  const url = `https://secure.runescape.com/m=hiscore/index_lite.ws?player=${encodeURIComponent(rsn.trim())}`;

  let upstream;
  try {
    upstream = await fetch(url);
  } catch (networkErr) {
    return {
      statusCode: 502,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'UPSTREAM_UNREACHABLE', detail: String(networkErr) }),
    };
  }

  if (!upstream.ok) {
    return {
      statusCode: upstream.status,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: `HTTP_${upstream.status}` }),
    };
  }

  const text = (await upstream.text()).trim();
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);

  // Hiscores returns an empty body (with a 200, in practice) for an unknown
  // or never-logged-in name — closest thing to a clean "not found" signal
  // this feed gives us.
  if (lines.length === 0) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
      body: JSON.stringify({ error: 'PROFILE_NOT_FOUND' }),
    };
  }

  if (lines.length < 1 + SKILL_COUNT + RUNESCORE_ACTIVITY_INDEX + 1) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
      body: JSON.stringify({ error: 'UNEXPECTED_SHAPE' }),
    };
  }

  const activityLines = lines.slice(1 + SKILL_COUNT);
  const runescoreLine = activityLines[RUNESCORE_ACTIVITY_INDEX] || '';
  const [, rsScoreRaw] = runescoreLine.split(',');
  const rsScore = parseInt(rsScoreRaw, 10);
  // -1 is the feed's own sentinel for "unranked/no score" — treat as null
  // (not zero) so the front end can show "—" rather than a misleading 0.
  const runescore = Number.isFinite(rsScore) && rsScore >= 0 ? rsScore : null;

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    body: JSON.stringify({ runescore }),
  };
};
