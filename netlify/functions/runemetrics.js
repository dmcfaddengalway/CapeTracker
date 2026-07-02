/* Netlify Function — server-side proxy for the RuneMetrics profile endpoint.
 *
 * The browser can't call https://apps.runescape.com directly (it doesn't
 * send permissive CORS headers for third-party origins), so the front end
 * calls this same-origin function instead, which does the fetch server-side
 * — no CORS restrictions apply to server-to-server requests — and forwards
 * the response straight back.
 *
 * Endpoint: /.netlify/functions/runemetrics?user=<display name>
 * Zero dependencies: relies on Node 18+'s built-in global fetch, which the
 * Netlify Functions runtime provides.
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

  const url = `https://apps.runescape.com/runemetrics/profile/profile?user=${encodeURIComponent(rsn.trim())}&activities=0`;

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

  // Forward RuneMetrics' status code and body as-is — the front end already
  // knows how to interpret both a successful payload and RuneMetrics' own
  // {"error": "..."} shape (e.g. NO_PROFILE, PROFILE_PRIVATE).
  return {
    statusCode: upstream.status,
    headers: {
      'Content-Type': upstream.headers.get('content-type') || 'application/json',
      'Cache-Control': 'no-store',
    },
    body: text,
  };
};
