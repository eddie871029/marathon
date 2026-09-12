// Test script to fetch real Strava athlete and activities using Access Token
const accessToken = process.argv[2];

if (!accessToken) {
  console.log("用法: node test_strava.js <YOUR_STRAVA_ACCESS_TOKEN>");
  process.exit(1);
}

async function testStrava() {
  console.log("正在使用 Token 測試 Strava API 連線...\n");

  try {
    // 1. Fetch Athlete Profile
    const athleteRes = await fetch("https://www.strava.com/api/v3/athlete", {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    if (!athleteRes.ok) {
      const err = await athleteRes.json();
      console.error("❌ 獲取 Athlete 失敗 (Status " + athleteRes.status + "):", err.message || JSON.stringify(err));
      return;
    }

    const athlete = await athleteRes.json();
    console.log("✅ 成功存取 Strava 個人檔案！");
    console.log(`名: ${athlete.firstname} | 姓: ${athlete.lastname}`);
    console.log(`城市: ${athlete.city || '未設定'}, ${athlete.country || ''}`);
    console.log(`大頭貼 URL: ${athlete.profile}\n`);

    // 2. Fetch Latest Activities
    const actRes = await fetch("https://www.strava.com/api/v3/athlete/activities?per_page=10", {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    if (!actRes.ok) {
      const err = await actRes.json();
      console.error("❌ 獲取 Activities 失敗 (Status " + actRes.status + "):", err.message || JSON.stringify(err));
      return;
    }

    const activities = await actRes.json();
    console.log(`✅ 成功獲取近期 ${activities.length} 筆 Strava 活動記錄！\n`);

    const runs = activities.filter(a => a.type === 'Run' || a.sport_type === 'Run');
    if (runs.length === 0) {
      console.log("⚠️ 近期 10 筆活動中未找到跑步紀錄 (Type: Run)。列表總筆數:", activities.map(a => `${a.name} (${a.type})`).join(', '));
      return;
    }

    console.log("=== 最近一次跑步紀錄 (Latest Running Activity) ===");
    const latest = runs[0];
    const distanceKm = Math.round((latest.distance / 1000) * 100) / 100;
    const durationMin = Math.round(latest.moving_time / 60);
    const paceSec = 1000 / latest.average_speed;
    const paceMin = Math.floor(paceSec / 60);
    const paceRemSec = Math.round(paceSec % 60);
    const formattedPace = `${paceMin}:${String(paceRemSec).padStart(2, '0')}/km`;

    console.log(`ID: ${latest.id}`);
    console.log(`活動名稱: ${latest.name}`);
    console.log(`日期: ${latest.start_date_local}`);
    console.log(`距離: ${distanceKm} km`);
    console.log(`移動時間: ${durationMin} 分鐘`);
    console.log(`平均配速: ${formattedPace}`);
    console.log(`平均心率: ${latest.average_heartrate ? Math.round(latest.average_heartrate) + ' bpm' : '無心率數據'}`);
    console.log(`爬升: ${latest.total_elevation_gain} m`);

  } catch (err) {
    console.error("❌ 發生網路或解析錯誤:", err);
  }
}

testStrava();
