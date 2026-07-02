/* Netlify Function — server-side proxy for the RuneMetrics quests endpoint.
 * Same rationale as runemetrics.js: the browser can't call
 * apps.runescape.com directly (CORS), so this same-origin function does the
 * fetch server-side and forwards the response straight back.
 *
 * Endpoint: /.netlify/functions/runequests?user=<display name>
 * Upstream: https://apps.runescape.com/runemetrics/quests?user=<display name>
 * Response (on success) is a bare JSON array of
 * {title, status, difficulty, members, questPoints, userEligible}.
 */
exports.handler = async (event) => {
  const rsn = event.queryStringParameters && event.queryStringParameters.user;

  if (!rsn || !rsn.trim()) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Missing required "user" query parameter.' }),
    };
  }

  const url = `https://apps.runescape.com/runemetrics/quests?user=${encodeURIComponent(rsn.trim())}`;

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

  const text = await upstream.text();

  return {
    statusCode: upstream.status,
    headers: {
      'Content-Type': upstream.headers.get('content-type') || 'application/json',
      'Cache-Control': 'no-store',
    },
    body: text,
  };
};
