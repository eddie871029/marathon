// Script to exchange authorization code for full activity:read_all access token
const clientId = process.argv[2];
const clientSecret = process.argv[3];
const code = process.argv[4];

if (!clientId || !clientSecret || !code) {
  console.log("Usage: node exchange_token.js <CLIENT_ID> <CLIENT_SECRET> <AUTH_CODE>");
  process.exit(1);
}

async function exchange() {
  try {
    const res = await fetch("https://www.strava.com/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
        grant_type: "authorization_code"
      })
    });

    const data = await res.json();
    console.log("Exchange Result:", data);
  } catch (e) {
    console.error("Exchange Error:", e);
  }
}

exchange();
