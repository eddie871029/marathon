// Comprehensive Strava Activity Fetcher
const clientId = process.argv[2];
const clientSecret = process.argv[3];
const refreshTokenOrToken = process.argv[4];

if (!clientId || !refreshTokenOrToken) {
  console.log("用法 A: node test_strava_full.js <CLIENT_ID> <CLIENT_SECRET> <REFRESH_TOKEN>");
  console.log("用法 B: node test_strava_full.js direct <FULL_ACCESS_TOKEN>");
  process.exit(1);
}

async function run() {
  let accessToken = refreshTokenOrToken;

  if (clientId !== 'direct' && clientSecret) {
    console.log("🔑 正在透過 Client ID & Refresh Token 換取最新權限 Access Token...");
    try {
      const res = await fetch("https://www.strava.com/oauth/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_id: clientId.trim(),
          client_secret: clientSecret.trim(),
          refresh_token: refreshTokenOrToken.trim(),
          grant_type: "refresh_token"
        })
      });
      const data = await res.json();
      if (!res.ok || !data.access_token) {
        console.error("❌ Token 刷新失敗:", data);
        return;
      }
      accessToken = data.access_token;
      console.log("✅ Token 刷新成功！獲取到 Full Scope Access Token。\n");
    } catch (err) {
      console.error("❌ 網路請求失敗:", err);
      return;
    }
  }

  try {
    // 1. Fetch Athlete
    const athRes = await fetch("https://www.strava.com/api/v3/athlete", {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    const ath = await athRes.json();
    console.log(`👤 跑者姓名: ${ath.firstname} ${ath.lastname} (ID: ${ath.id})`);

    // 2. Fetch Activities
    const actRes = await fetch("https://www.strava.com/api/v3/athlete/activities?per_page=10", {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    if (!actRes.ok) {
      const err = await actRes.json();
      console.error("❌ 讀取跑步紀錄失敗:", err);
      return;
    }

    const activities = await actRes.json();
    console.log(`📊 成功獲取 ${activities.length} 筆 Strava 活動！\n`);

    const runs = activities.filter(a => a.type === 'Run' || a.sport_type === 'Run');
    if (runs.length === 0) {
      console.log("未找到跑步紀錄，近期活動類型為:", activities.map(a => a.name + ' (' + a.type + ')').join(', '));
      return;
    }

    const latest = runs[0];
    const distKm = Math.round((latest.distance / 1000) * 100) / 100;
    const durMin = Math.round(latest.moving_time / 60);
    const paceSec = 1000 / latest.average_speed;
    const paceMin = Math.floor(paceSec / 60);
    const paceRemSec = Math.round(paceSec % 60);
    const formattedPace = `${paceMin}:${String(paceRemSec).padStart(2, '0')}/km`;

    console.log("==========================================");
    console.log("🏃‍♂️ 您最近一次的 Strava 跑步紀錄 (Latest Run)");
    console.log("==========================================");
    console.log(`📌 活動名稱: ${latest.name}`);
    console.log(`📅 日期時間: ${latest.start_date_local}`);
    console.log(`📏 跑步距離: ${distKm} KM`);
    console.log(`⏱️ 移動時間: ${durMin} 分鐘`);
    console.log(`⚡ 平均配速: ${formattedPace}`);
    console.log(`❤️ 平均心率: ${latest.average_heartrate ? Math.round(latest.average_heartrate) + ' bpm' : '無紀錄'}`);
    console.log(`⛰️ 累積爬升: ${latest.total_elevation_gain} m`);
    console.log("==========================================");

  } catch (err) {
    console.error("❌ 發生錯誤:", err);
  }
}

run();
