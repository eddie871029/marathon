// ==========================================================================
// 2026-2027 Half-Marathon Training Plan Engine
// Modeled after oki design system - Mobile-First Vanilla JS
// ==========================================================================

const RACE_DATES = {
  race1: new Date("2026-10-31T06:00:00+08:00"), // 華航馬拉松
  race2: new Date("2026-12-20T06:30:00+08:00"), // 台北馬拉松
  race3: new Date("2027-02-21T06:30:00+08:00")  // ASICS 馬拉松
};

// Complete 23-Week Training Plan Data
const TRAINING_DATA = {
  stage1: {
    title: "🛫 第一階段：華航馬拉松備戰期",
    targetTime: "2:15 ~ 2:20",
    targetPace: "6'24\" ~ 6'38\" /km",
    description: "以 6'30\" 穩健巡航為核心，打牢有氧底層，驗收半馬完賽體力分配與補給節奏。",
    weeks: [
      {
        id: "w1",
        num: "W1",
        date: "09/12 - 09/20",
        focus: "重啟跑感與步頻校正",
        note: "第一週著重適應每週 3 跑節奏，注意保持 175~180 spm 穩定步頻，不要貪快。",
        days: [
          { id: "s1-w1-d1", dayName: "Day 1 (週二/三)", type: "quality", tag: "素質節奏", title: "暖身 1K + 5 km 節奏跑 (6'30\") + 緩和 1K", dist: "7 km", pace: "6'30\" /km", hr: "Z3 (142-155 bpm)", desc: "找回 6 分半配速巡航體感，前半段專注深長呼吸，不暴衝。" },
          { id: "s1-w1-d2", dayName: "Day 2 (週四/五)", type: "easy", tag: "輕鬆有氧", title: "E 區間有氧慢跑 6 km", dist: "6 km", pace: "7'15\" /km", hr: "Z2 (125-142 bpm)", desc: "徹底以能輕鬆聊天的體感跑步，加速下肢微血管充血修復。" },
          { id: "s1-w1-d3", dayName: "Day 3 (週末六/日)", type: "long", tag: "週末長跑", title: "LSD 週末耐力長跑 12 km", dist: "12 km", pace: "7'00\" ~ 7'15\" /km", hr: "Z2 (130-145 bpm)", desc: "本階段首趟雙位數長跑，起跑前補水 300ml，跑完後加強股四頭與小腿滾筒按摩。" }
        ]
      },
      {
        id: "w2",
        num: "W2",
        date: "09/21 - 09/27",
        focus: "巡航配速定型",
        note: "長跑小幅推進至 13K，強化肌肉耐受度。",
        days: [
          { id: "s1-w2-d1", dayName: "Day 1 (週二/三)", type: "quality", tag: "素質節奏", title: "暖身 1K + 6 km 節奏跑 (6'30\") + 緩和 1K", dist: "8 km", pace: "6'30\" /km", hr: "Z3 (145-158 bpm)", desc: "定速巡航，練習每公里配速誤差不超過 5 秒的穩定度。" },
          { id: "s1-w2-d2", dayName: "Day 2 (週四/五)", type: "easy", tag: "輕鬆有氧", title: "E 區間有氧恢復跑 6 km", dist: "6 km", pace: "7'15\" /km", hr: "Z2 (125-140 bpm)", desc: "維持雙腿輕快感，結束後可做 3~4 趟 80 公尺輕快開腿衝刺 (Strides)。" },
          { id: "s1-w2-d3", dayName: "Day 3 (週末六/日)", type: "long", tag: "週末長跑", title: "LSD 週末耐力長跑 13 km", dist: "13 km", pace: "7'00\" ~ 7'15\" /km", hr: "Z2 (130-145 bpm)", desc: "長跑時間約 90-95 分鐘，建議在第 45 分鐘嘗試吞食半包能量膠或含糖補給品。" }
        ]
      },
      {
        id: "w3",
        num: "W3",
        date: "09/28 - 10/04",
        focus: "乳酸閾值 (T) 啟動",
        note: "本週開始引進 T 配速 (6'10\")，提升心肺乳酸清除效率。",
        days: [
          { id: "s1-w3-d1", dayName: "Day 1 (週二/三)", type: "quality", tag: "門檻跑", title: "暖身 1.5K + 4 km T 門檻跑 (6'10\") + 緩和 1.5K", dist: "7 km", pace: "6'10\" /km", hr: "Z4 (158-168 bpm)", desc: "以略感吃力但仍可維持的門檻強度刺激乳酸拐點，鍛鍊速耐力。" },
          { id: "s1-w3-d2", dayName: "Day 2 (週四/五)", type: "easy", tag: "輕鬆有氧", title: "E 區間有氧慢跑 7 km", dist: "7 km", pace: "7'10\" /km", hr: "Z2 (125-142 bpm)", desc: "平穩有氧呼吸，保持腿部放鬆，代謝昨日門檻跑的疲勞。" },
          { id: "s1-w3-d3", dayName: "Day 3 (週末六/日)", type: "long", tag: "週末長跑", title: "LSD 耐力長跑 15 km", dist: "15 km", pace: "7'00\" /km", hr: "Z2 (130-148 bpm)", desc: "正式突破 15K！測試賽事裝備（跑鞋、防磨膏、吸汗襪），第 8K 補水補電解質。" }
        ]
      },
      {
        id: "w4",
        num: "W4",
        date: "10/05 - 10/11",
        focus: "第一階段高峰週 (Peak Week)",
        note: "華航馬前最長的一趟 LSD (16km)！完成這趟，完賽信心將達到 100%。",
        days: [
          { id: "s1-w4-d1", dayName: "Day 1 (週二/三)", type: "quality", tag: "門檻跑", title: "暖身 1.5K + 5 km T 門檻跑 (6'10\") + 緩和 1.5K", dist: "8 km", pace: "6'10\" /km", hr: "Z4 (158-168 bpm)", desc: "持續 5 公里維持 6'10\"，感受心率平穩上升但呼吸不慌亂。" },
          { id: "s1-w4-d2", dayName: "Day 2 (週四/五)", type: "easy", tag: "輕鬆有氧", title: "E 區間有氧慢跑 6 km", dist: "6 km", pace: "7'15\" /km", hr: "Z2 (125-140 bpm)", desc: "低心率放鬆跑，為週末最重要的長跑積蓄體能。" },
          { id: "s1-w4-d3", dayName: "Day 3 (週末六/日)", type: "long", tag: "高峰長跑", title: "LSD 高峰耐力跑 16 km (實戰補給測試)", dist: "16 km", pace: "6'55\" ~ 7'10\" /km", hr: "Z2-Z3 (132-150 bpm)", desc: "關鍵實戰演練！分別在第 45 分鐘、第 80 分鐘吃能量膠，模擬華航半馬賽道體感。" }
        ]
      },
      {
        id: "w5",
        num: "W5",
        date: "10/12 - 10/18",
        focus: "目標配速定型跑",
        note: "距離賽事倒數 2 週，將總長跑縮短，但提升專項配速比重。",
        days: [
          { id: "s1-w5-d1", dayName: "Day 1 (週二/三)", type: "quality", tag: "比賽配速", title: "暖身 1K + 7 km 目標配速跑 (6'25\") + 緩和 1K", dist: "9 km", pace: "6'25\" /km", hr: "Z3-Z4 (150-162 bpm)", desc: "目標 2:15 巡航配速定型，7 公里體感應感到從容且節奏明快。" },
          { id: "s1-w5-d2", dayName: "Day 2 (週四/五)", type: "easy", tag: "輕鬆有氧", title: "E 區間有氧慢跑 6 km", dist: "6 km", pace: "7'15\" /km", hr: "Z2 (125-140 bpm)", desc: "以極放鬆步伐進行，排空大腿乳酸。" },
          { id: "s1-w5-d3", dayName: "Day 3 (週末六/日)", type: "long", tag: "週末長跑", title: "穩態中長跑 14 km", dist: "14 km", pace: "6'50\" /km", hr: "Z2-Z3 (132-148 bpm)", desc: "長距離開始受控下調，保護膝蓋與阿基里斯腱，不拼極限。" }
        ]
      },
      {
        id: "w6",
        num: "W6",
        date: "10/19 - 10/25",
        focus: "賽前兩週減量 (Tapering)",
        note: "跑量開始縮減 30%，但保留肌肉神經刺激，多睡覺、多喝水。",
        days: [
          { id: "s1-w6-d1", dayName: "Day 1 (週二/三)", type: "quality", tag: "輕快跑", title: "暖身 1K + 4 km 輕快跑 (6'15\") + 緩和 1K", dist: "6 km", pace: "6'15\" /km", hr: "Z3 (148-160 bpm)", desc: "距離減短，維持步頻與神經靈活度。" },
          { id: "s1-w6-d2", dayName: "Day 2 (週四/五)", type: "easy", tag: "輕鬆有氧", title: "E 區間有氧慢跑 5 km", dist: "5 km", pace: "7'20\" /km", hr: "Z1-Z2 (120-135 bpm)", desc: "非常輕鬆的慢跑，排毒與深呼吸。" },
          { id: "s1-w6-d3", dayName: "Day 3 (週末六/日)", type: "long", tag: "賽前減量", title: "減量長跑 10 km (輕鬆收工)", dist: "10 km", pace: "7'00\" /km", hr: "Z2 (128-142 bpm)", desc: "賽前最後一個週末，不超過 10K，跑完大腿應該感到非常輕鬆無負擔。" }
        ]
      },
      {
        id: "w7",
        num: "W7",
        date: "10/26 - 10/31",
        focus: "華航馬賽週・迎戰首勝！",
        note: "賽前 3 天開始進行肝醣超補（每餐增加優質碳水化合物比例），10/31 出擊！",
        days: [
          { id: "s1-w7-d1", dayName: "Day 1 (週二 10/27)", type: "quality", tag: "配速喚醒", title: "暖身 1K + 3 km 比賽配速跑 (6'30\") + 緩和 1K", dist: "5 km", pace: "6'30\" /km", hr: "Z3 (140-152 bpm)", desc: "喚醒大腦與雙腿對 6'30\" 配速的記憶，出汗即可收工。" },
          { id: "s1-w7-d2", dayName: "Day 2 (週四 10/29)", type: "easy", tag: "賽前慢跑", title: "極慢跑 3 km + 4 趟 50m 開步衝刺", dist: "3.5 km", pace: "7'30\" /km", hr: "Z1 (<130 bpm)", desc: "賽前 48 小時動態喚醒神經，結束後充分伸展與泡熱水澡。" },
          { id: "s1-w7-d3", dayName: "Day 3 (週六 10/31)", type: "race", tag: "🎉 賽事日", title: "✈️ 華航馬拉松 21.0975 km 半馬正式賽", dist: "21.1 km", pace: "6'24\" ~ 6'38\"", hr: "Z3-Z4", desc: "目標 2:15~2:20 完賽！前 5K 壓在 6'35\" 暖身，15K 穩固巡航，最後 3K 全力開出微笑過線！" }
        ]
      }
    ]
  },

  stage2: {
    title: "🧑‍🤝‍🧑 第二階段：台北馬拉松陪伴與銜接期",
    targetTime: "夫妻攜手・完賽為主",
    targetPace: "依夫人舒適體感 (約 7'00\" ~ 8'00\" /km)",
    description: "轉化為全職稱職配速員 (Pacer)，賽事化身為頂級 21K 低心率有氧打底，為二月衝刺累積強健膝踝與心肺！",
    weeks: [
      {
        id: "w8",
        num: "W8",
        date: "11/02 - 11/08",
        focus: "華航賽後排酸與大修整",
        note: "第一週嚴禁任何速度訓練！以排乳酸慢跑、散步與拉筋為主，補充大量蛋白質。",
        days: [
          { id: "s2-w8-d1", dayName: "Day 1 (週三)", type: "easy", tag: "主動修復", title: "4 km 極慢排酸跑 / 快走", dist: "4 km", pace: "7'40\" /km", hr: "Z1 (<125 bpm)", desc: "感受雙腿肌群回血，促進代謝廢物排除。" },
          { id: "s2-w8-d2", dayName: "Day 2 (週五)", type: "easy", tag: "輕鬆有氧", title: "5 km 輕鬆慢跑", dist: "5 km", pace: "7'15\" /km", hr: "Z2 (125-138 bpm)", desc: "慢跑測試雙腿受損情況，若無痛點即可逐步回歸。" },
          { id: "s2-w8-d3", dayName: "Day 3 (週末)", type: "easy", tag: "夫妻同跑", title: "6 km 夫妻公園輕鬆散步跑", dist: "6 km", pace: "輕鬆舒適", hr: "Z1-Z2", desc: "陪伴老婆慢跑，討論台北馬完賽策略與心理預備。" }
        ]
      },
      {
        id: "w9",
        num: "W9",
        date: "11/09 - 11/15",
        focus: "節奏對齊與基礎重建",
        note: "週間維持自己一次 5K 節奏跑，週末陪伴夫人長跑。",
        days: [
          { id: "s2-w9-d1", dayName: "Day 1 (週二/三)", type: "quality", tag: "個人維持", title: "暖身 + 5 km 輕快節奏跑 (6'20\") + 緩和", dist: "7 km", pace: "6'20\" /km", hr: "Z3", desc: "保持自己的心肺刺激與腿部彈性。" },
          { id: "s2-w9-d2", dayName: "Day 2 (週四/五)", type: "easy", tag: "輕鬆陪跑", title: "5 km 陪伴輕鬆跑", dist: "5 km", pace: "老婆配速", hr: "Z2", desc: "練習兩人並排跑步默契與穩定步頻。" },
          { id: "s2-w9-d3", dayName: "Day 3 (週末)", type: "long", tag: "夫妻長跑", title: "10 km 夫妻週末耐力巡航", dist: "10 km", pace: "7'15\" ~ 7'45\" /km", hr: "Z2 (低心率)", desc: "給老婆信心！每 3 公里停下喝一口水，練習穩速巡航。" }
        ]
      },
      {
        id: "w10",
        num: "W10",
        date: "11/16 - 11/22",
        focus: "心肺門檻維持 + 週末 12K",
        note: "你的心率在此階段會非常低（幾乎全是 Z1-Z2），能極佳地建構粒線體密度。",
        days: [
          { id: "s2-w10-d1", dayName: "Day 1 (週二/三)", type: "quality", tag: "個人門檻", title: "暖身 + 5 km T 門檻跑 (6'10\") + 緩和", dist: "7 km", pace: "6'10\" /km", hr: "Z4", desc: "維持高門檻刺激，避免二月時速耐力生疏。" },
          { id: "s2-w10-d2", dayName: "Day 2 (週四/五)", type: "easy", tag: "輕鬆跑", title: "6 km 輕鬆跑", dist: "6 km", pace: "7'00\" /km", hr: "Z2", desc: "流暢排汗，保持活力。" },
          { id: "s2-w10-d3", dayName: "Day 3 (週末)", type: "long", tag: "夫妻長跑", title: "12 km 夫妻耐力長跑", dist: "12 km", pace: "7'20\" ~ 7'50\" /km", hr: "Z2", desc: "完成 12 公里，讓老婆習慣 90 分鐘以上的雙腿負重感。" }
        ]
      },
      {
        id: "w11",
        num: "W11",
        date: "11/23 - 11/29",
        focus: "台北馬前關鍵長跑 (14K)",
        note: "台北馬賽前最長距離長跑！進行全面賽事補給流程模擬。",
        days: [
          { id: "s2-w11-d1", dayName: "Day 1 (週二/三)", type: "quality", tag: "個人節奏", title: "暖身 + 6 km 節奏跑 (6'15\") + 緩和", dist: "8 km", pace: "6'15\" /km", hr: "Z3-Z4", desc: "維持自己良好節奏感受。" },
          { id: "s2-w11-d2", dayName: "Day 2 (週四/五)", type: "easy", tag: "陪跑", title: "5 km 陪伴輕鬆跑", dist: "5 km", pace: "老婆配速", hr: "Z2", desc: "調整跑姿，提醒夫人肩膀放鬆、手臂自然擺動。" },
          { id: "s2-w11-d3", dayName: "Day 3 (週末)", type: "long", tag: "關鍵長跑", title: "14 km 夫妻台北馬模擬長跑", dist: "14 km", pace: "7'20\" ~ 7'50\" /km", hr: "Z2", desc: "實戰模擬！隨身攜帶能量膠，第 5K、10K 模擬水站進站與補膠節奏。" }
        ]
      },
      {
        id: "w12",
        num: "W12",
        date: "11/30 - 12/06",
        focus: "台北馬倒數兩週減量",
        note: "長距離開始縮短，重點在消除累積疲勞與建立心理信心。",
        days: [
          { id: "s2-w12-d1", dayName: "Day 1 (週二/三)", type: "quality", tag: "輕快跑", title: "5 km 輕鬆輕快跑 (6'30\")", dist: "5 km", pace: "6'30\" /km", hr: "Z3", desc: "適度流汗即可。" },
          { id: "s2-w12-d2", dayName: "Day 2 (週四/五)", type: "easy", tag: "陪跑", title: "5 km 陪伴慢跑", dist: "5 km", pace: "老婆配速", hr: "Z1-Z2", desc: "放鬆雙腿。" },
          { id: "s2-w12-d3", dayName: "Day 3 (週末)", type: "long", tag: "減量長跑", title: "10 km 夫妻輕鬆減量長跑", dist: "10 km", pace: "7'30\" /km", hr: "Z2", desc: "順暢跑完 10K，賽前兩週減量到位。" }
        ]
      },
      {
        id: "w13",
        num: "W13",
        date: "12/07 - 12/13",
        focus: "賽前一週調整與防寒",
        note: "12 月中旬台北天氣偏冷，注意保暖防感冒，準備雨備裝備（拋棄式輕便雨衣）。",
        days: [
          { id: "s2-w13-d1", dayName: "Day 1 (週二/三)", type: "quality", tag: "動態跑", title: "4 km 暖身慢跑", dist: "4 km", pace: "6'30\" /km", hr: "Z2", desc: "維持神經靈敏度。" },
          { id: "s2-w13-d2", dayName: "Day 2 (週四/五)", type: "easy", tag: "陪跑", title: "4 km 夫妻舒壓慢跑", dist: "4 km", pace: "輕鬆舒適", hr: "Z1", desc: "互相給予正向肯定與鼓勵。" },
          { id: "s2-w13-d3", dayName: "Day 3 (週末)", type: "long", tag: "賽前慢動", title: "6 km 輕鬆慢跑熱身", dist: "6 km", pace: "7'30\" /km", hr: "Z1-Z2", desc: "賽前一週收心跑，檢查參賽號碼布與晶片綁定。" }
        ]
      },
      {
        id: "w14",
        num: "W14",
        date: "12/14 - 12/20",
        focus: "台北馬拉松嘉年華週",
        note: "全職 Pacer 上陣！擋風、拿水、倒數公里數，幸福完賽！",
        days: [
          { id: "s2-w14-d1", dayName: "Day 1 (週二 12/15)", type: "easy", tag: "賽前活動", title: "3 km 輕鬆慢跑 + 3趟開步跑", dist: "3.5 km", pace: "7'00\" /km", hr: "Z1", desc: "開動關節，避免身體過度生鏽。" },
          { id: "s2-w14-d2", dayName: "Day 2 (週五 12/18)", type: "easy", tag: "牽手散步", title: "夫妻 20 分鐘公園輕鬆散步與伸展", dist: "2 km", pace: "散步", hr: "Rest", desc: "充分睡眠，晚間整理路跑衣物、號碼布、能量膠。" },
          { id: "s2-w14-d3", dayName: "Day 3 (週日 12/20)", type: "race", tag: "🏅 賽事日", title: "🏅 台北馬拉松 21.0975 km (夫妻攜手完賽)", dist: "21.1 km", pace: "依老婆配速", hr: "Z2 歡樂巡航", desc: "稱職配速員出擊！擋風、遞水、給予情緒價值，牽手衝過台北市政府終點線！" }
        ]
      }
    ]
  },

  stage3: {
    title: "🚀 第三階段：ASICS 馬拉松巔峰衝刺期",
    targetTime: "2:10:00 (個人 PB)",
    targetPace: "6'09\" ~ 6'10\" /km",
    description: "經過華航與台北馬兩場 21K 扎實洗禮，下肢韌帶已無堅不摧！這 9 週專注於「速耐力升級」，直攻 2:10 大關！",
    weeks: [
      {
        id: "w15",
        num: "W15",
        date: "12/21 - 12/27",
        focus: "台北馬後快速轉軌",
        note: "由於台北馬心率控制良好無肌肉微撕裂，本週迅速恢復，重整旗鼓迎接 2:10 備戰！",
        days: [
          { id: "s3-w15-d1", dayName: "Day 1 (週三)", type: "easy", tag: "恢復慢跑", title: "5 km 輕鬆排酸跑 (7'00\")", dist: "5 km", pace: "7'00\" /km", hr: "Z1-Z2", desc: "確認膝蓋與腳踝無任何不適。" },
          { id: "s3-w15-d2", dayName: "Day 2 (週五)", type: "easy", tag: "基礎有氧", title: "6 km 輕鬆有氧跑 (6'50\")", dist: "6 km", pace: "6'50\" /km", hr: "Z2", desc: "體能恢復極佳，步頻回升。" },
          { id: "s3-w15-d3", dayName: "Day 3 (週末)", type: "long", tag: "耐力維持", title: "8 km 輕鬆長跑 (6'45\")", dist: "8 km", pace: "6'45\" /km", hr: "Z2", desc: "銜接期長跑，身心保持高度飢餓感。" }
        ]
      },
      {
        id: "w16",
        num: "W16",
        date: "12/28 - 01/03",
        focus: "2:10 目標配速啟動",
        note: "跨年週！正式將目標配速校準至 6'10\"/km，進入強化期。",
        days: [
          { id: "s3-w16-d1", dayName: "Day 1 (週二/三)", type: "quality", tag: "目標節奏", title: "暖身 1.5K + 5 km 目標配速跑 (6'10\") + 緩和 1.5K", dist: "8 km", pace: "6'10\" /km", hr: "Z3-Z4", desc: "跨入 6'10\" 領域，專注核心收緊與下背推進感受。" },
          { id: "s3-w16-d2", dayName: "Day 2 (週四/五)", type: "easy", tag: "輕鬆有氧", title: "E 區間有氧慢跑 6 km", dist: "6 km", pace: "7'00\" /km", hr: "Z2", desc: "深層放鬆，補充水分。" },
          { id: "s3-w16-d3", dayName: "Day 3 (週末)", type: "long", tag: "週末長跑", title: "LSD 週末耐力長跑 13 km (6'50\")", dist: "13 km", pace: "6'50\" /km", hr: "Z2-Z3", desc: "新年第一跑！配速比上一階段長跑提速 15 秒，建立耐力信心。" }
        ]
      },
      {
        id: "w17",
        num: "W17",
        date: "01/04 - 01/10",
        focus: "T 門檻拉抬 (5'50\")",
        note: "以 5'50\" 的 T 配速衝擊乳酸門檻，讓未來的 6'10\" 變得無比輕鬆！",
        days: [
          { id: "s3-w17-d1", dayName: "Day 1 (週二/三)", type: "quality", tag: "關鍵門檻", title: "暖身 2K + 4 km T 門檻跑 (5'50\") + 緩和 1.5K", dist: "7.5 km", pace: "5'50\" /km", hr: "Z4 (162-172 bpm)", desc: "提升乳酸拐點！這 4 公里很吃力但能讓你產生質的飛躍。" },
          { id: "s3-w17-d2", dayName: "Day 2 (週四/五)", type: "easy", tag: "輕鬆有氧", title: "E 區間有氧慢跑 7 km", dist: "7 km", pace: "6'50\" /km", hr: "Z2", desc: "徹底修復，多做腿後肌群伸展。" },
          { id: "s3-w17-d3", dayName: "Day 3 (週末)", type: "long", tag: "漸進長跑", title: "漸進長跑 15 km (後 3K 推進至 6'15\")", dist: "15 km", pace: "6'45\" ➔ 6'15\"", hr: "Z2 ➔ Z3", desc: "後段加溫跑，模擬賽事後半程超越他人的心理優勢。" }
        ]
      },
      {
        id: "w18",
        num: "W18",
        date: "01/11 - 01/17",
        focus: "速耐力抗衰力建構",
        note: "T 門檻延長至 5 公里，長跑推進至 17 公里。",
        days: [
          { id: "s3-w18-d1", dayName: "Day 1 (週二/三)", type: "quality", tag: "關鍵門檻", title: "暖身 2K + 5 km T 門檻跑 (5'50\") + 緩和 1.5K", dist: "8.5 km", pace: "5'50\" /km", hr: "Z4 (162-172 bpm)", desc: "強化 5'50\" 耐受時間，步頻維持 180 spm。" },
          { id: "s3-w18-d2", dayName: "Day 2 (週四/五)", type: "easy", tag: "輕鬆有氧", title: "E 區間有氧慢跑 7 km", dist: "7 km", pace: "6'50\" /km", hr: "Z2", desc: "調整呼吸，充足睡眠。" },
          { id: "s3-w18-d3", dayName: "Day 3 (週末)", type: "long", tag: "硬核長跑", title: "LSD 硬核長跑 17 km (6'45\")", dist: "17 km", pace: "6'45\" /km", hr: "Z2-Z3", desc: "距離賽事倒數 5 週，全馬力抗衰竭訓練，實測能量膠補給。" }
        ]
      },
      {
        id: "w19",
        num: "W19",
        date: "01/18 - 01/24",
        focus: "全季最高峰週 (The Ultimate Peak)",
        note: "本賽季最關鍵的強度檢驗週！完成此週，2:10 囊中之物！",
        days: [
          { id: "s3-w19-d1", dayName: "Day 1 (週二/三)", type: "quality", tag: "專項實測", title: "暖身 1.5K + 8 km 目標配速跑 (6'10\") + 緩和 1.5K", dist: "11 km", pace: "6'10\" /km", hr: "Z3-Z4", desc: "整整 8 公里完美定速 6'10\"！體驗比賽中段巡航的肌肉自律。" },
          { id: "s3-w19-d2", dayName: "Day 2 (週四/五)", type: "easy", tag: "輕鬆有氧", title: "E 區間有氧慢跑 6 km", dist: "6 km", pace: "7'00\" /km", hr: "Z2", desc: "低強度排酸。" },
          { id: "s3-w19-d3", dayName: "Day 3 (週末)", type: "long", tag: "頂峰長跑", title: "18 km 頂峰長跑 (含最後 5K 6'10\" 模擬衝刺)", dist: "18 km", pace: "6'45\" + 末5K 6'10\"", hr: "Z2-Z4", desc: "本賽季最長里程！最後 5 公里在疲勞狀態下切入賽事配速，淬鍊鋼鐵心智！" }
        ]
      },
      {
        id: "w20",
        num: "W20",
        date: "01/25 - 01/31",
        focus: "農曆春節・防怠惰維持專案",
        note: "過年期間聚餐多，維持每週 3 次跑步，防腹脹、維持心肺活絡即可，不堆過量疲勞。",
        days: [
          { id: "s3-w20-d1", dayName: "Day 1 (小年夜/除夕)", type: "quality", tag: "新春快跑", title: "暖身 1.5K + 4 km T 跑 (5'50\") + 緩和", dist: "7 km", pace: "5'50\" /km", hr: "Z4", desc: "春節前夕保持高心肺爆發力。" },
          { id: "s3-w20-d2", dayName: "Day 2 (初二/初三)", type: "easy", tag: "消脂慢跑", title: "6 km 賀歲輕鬆跑", dist: "6 km", pace: "6'55\" /km", hr: "Z2", desc: "消化過年大餐熱量，呼吸新鮮空氣。" },
          { id: "s3-w20-d3", dayName: "Day 3 (初五/初六)", type: "long", tag: "春節長跑", title: "12 km 穩健中長跑 (6'35\")", dist: "12 km", pace: "6'35\" /km", hr: "Z2-Z3", desc: "過年收假前長跑，確保下肢肌力不因放假休眠。" }
        ]
      },
      {
        id: "w21",
        num: "W21",
        date: "02/01 - 02/07",
        focus: "收假定型跑",
        note: "春節收假，賽事倒數 2 週前最後一次 14K 中長距離，找回戰鬥狀態。",
        days: [
          { id: "s3-w21-d1", dayName: "Day 1 (週二/三)", type: "quality", tag: "目標節奏", title: "暖身 1.5K + 6 km 目標配速跑 (6'10\") + 緩和", dist: "9 km", pace: "6'10\" /km", hr: "Z3-Z4", desc: "校準 6'10\" 步頻與腳步落地輕盈度。" },
          { id: "s3-w21-d2", dayName: "Day 2 (週四/五)", type: "easy", tag: "輕鬆慢跑", title: "5 km 輕鬆跑", dist: "5 km", pace: "7'00\" /km", hr: "Z2", desc: "平順節奏。" },
          { id: "s3-w21-d3", dayName: "Day 3 (週末)", type: "long", tag: "最後長跑", title: "14 km 賽事節奏模擬長跑 (6'30\")", dist: "14 km", pace: "6'30\" /km", hr: "Z3", desc: "最後一趟中長跑，隨後正式進入賽前兩週減量期。" }
        ]
      },
      {
        id: "w22",
        num: "W22",
        date: "02/08 - 02/14",
        focus: "賽前 2 週黃金減量 (Tapering)",
        note: "總跑量縮減 35%，維持速度刺激，讓肌肉微損傷完全修復超量補償。",
        days: [
          { id: "s3-w22-d1", dayName: "Day 1 (週二/三)", type: "quality", tag: "速度維持", title: "暖身 1.5K + 4 km 輕快跑 (6'00\") + 緩和", dist: "6.5 km", pace: "6'00\" /km", hr: "Z3-Z4", desc: "距離短、節奏快，維持神經敏感度。" },
          { id: "s3-w22-d2", dayName: "Day 2 (週四/五)", type: "easy", tag: "輕鬆跑", title: "5 km 輕鬆慢跑", dist: "5 km", pace: "7'10\" /km", hr: "Z1-Z2", desc: "放鬆小腿與比目魚肌。" },
          { id: "s3-w22-d3", dayName: "Day 3 (週末)", type: "long", tag: "減量長跑", title: "10 km 輕鬆收工跑 (6'40\")", dist: "10 km", pace: "6'40\" /km", hr: "Z2", desc: "嚴格控制在 10K，跑完大腿應當輕盈如燕！" }
        ]
      },
      {
        id: "w23",
        num: "W23",
        date: "02/15 - 02/21",
        focus: "ASICS 賽事週・衝刺 2:10 PB！",
        note: "年度終極大考！前兩天肝醣超補、充足睡眠、做好保暖與心態準備，直攻 2:10！",
        days: [
          { id: "s3-w23-d1", dayName: "Day 1 (週二 02/16)", type: "quality", tag: "配速喚醒", title: "暖身 1K + 3 km 比賽配速跑 (6'10\") + 緩和 1K", dist: "5 km", pace: "6'10\" /km", hr: "Z3", desc: "大腦再次複習 6'10\" 節奏，出汗即止。" },
          { id: "s3-w23-d2", dayName: "Day 2 (週四 02/18)", type: "easy", tag: "賽前開腿", title: "3 km 極慢跑 + 3 趟 60m 輕快衝刺 (Strides)", dist: "3.5 km", pace: "7'20\" /km", hr: "Z1", desc: "開動神經傳導，賽前 48 小時徹底儲備能量。" },
          { id: "s3-w23-d3", dayName: "Day 3 (週日 02/21)", type: "race", tag: "🔥 巔峰決戰", title: "👟 ASICS 馬拉松 21.0975 km (挑戰 2:10:00 PB！)", dist: "21.1 km", pace: "6'09\" ~ 6'10\"", hr: "Z3-Z4 巔峰輸出", desc: "歷史巔峰時刻！均速鎖定 6'10\"/km，18K 咬住不放，終點打卡 2:10:00 新個人紀錄！" }
        ]
      }
    ]
  }
};

// LocalStorage key for progress checkboxes
const STORAGE_KEY = "marathon_training_checked_v1";

function getCheckedWorkouts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function setWorkoutChecked(id, isChecked) {
  const current = getCheckedWorkouts();
  if (isChecked) {
    current[id] = true;
  } else {
    delete current[id];
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch (e) {}
}

// ==========================================================================
// Live Countdown Clocks
// ==========================================================================
function updateCountdowns() {
  const now = new Date();

  function formatDiff(targetDate) {
    const diffMs = targetDate - now;
    if (diffMs <= 0) return { days: 0, text: "今日比賽日！" };
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return { days, text: `${days} <small>天</small> ${hours} <small>小時</small>` };
  }

  const el1 = document.getElementById("countdown-race1");
  const el2 = document.getElementById("countdown-race2");
  const el3 = document.getElementById("countdown-race3");

  if (el1) el1.innerHTML = formatDiff(RACE_DATES.race1).text;
  if (el2) el2.innerHTML = formatDiff(RACE_DATES.race2).text;
  if (el3) el3.innerHTML = formatDiff(RACE_DATES.race3).text;
}

// ==========================================================================
// Render Training Weeks & Workouts
// ==========================================================================
function renderStage(stageKey, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const stage = TRAINING_DATA[stageKey];
  if (!stage) return;

  const checkedMap = getCheckedWorkouts();

  // Calculate total workouts and completed count for this stage
  let totalWorkouts = 0;
  let completedWorkouts = 0;

  stage.weeks.forEach(w => {
    w.days.forEach(d => {
      totalWorkouts++;
      if (checkedMap[d.id]) completedWorkouts++;
    });
  });

  const progressPct = totalWorkouts > 0 ? Math.round((completedWorkouts / totalWorkouts) * 100) : 0;

  let html = `
    <!-- Progress Bar Card -->
    <div class="stage-progress-card">
      <div class="progress-header">
        <div class="progress-title">
          <span>🏆 階段完成進度</span>
          <span class="badge-tag" style="background: rgba(255,255,255,0.08);">${stage.weeks.length} 週課表</span>
        </div>
        <div class="progress-pct" id="pct-${stageKey}">${progressPct}%</div>
      </div>
      <div class="progress-bar-bg">
        <div class="progress-bar-fill" id="bar-${stageKey}" style="width: ${progressPct}%"></div>
      </div>
      <div class="progress-summary">
        <span id="stat-${stageKey}">已完成 ${completedWorkouts} / ${totalWorkouts} 堂訓練課表</span>
        <span>目標：${stage.targetTime} (${stage.targetPace})</span>
      </div>
    </div>
  `;

  // Render each week
  stage.weeks.forEach((week, wIndex) => {
    const isFirstWeek = (stageKey === 'stage1' && wIndex === 0);
    const expandedClass = isFirstWeek ? "expanded current-week" : "";

    html += `
      <div class="week-card ${expandedClass}" id="card-${week.id}">
        <div class="week-header" onclick="toggleWeek('${week.id}')">
          <div class="week-title-wrap">
            <span class="week-number">${week.num}</span>
            <span class="week-date">${week.date}</span>
            <span class="week-focus-badge">${week.focus}</span>
          </div>
          <span class="week-arrow">▼</span>
        </div>
        <div class="week-body">
          <div class="week-summary-note">
            💡 <strong>本週重點：</strong>${week.note}
          </div>
          <div class="days-list">
    `;

    week.days.forEach(day => {
      const isChecked = !!checkedMap[day.id];
      const completedClass = isChecked ? "completed" : "";

      html += `
        <div class="day-item ${completedClass}" id="item-${day.id}">
          <div class="day-item-top">
            <label class="day-checkbox-label">
              <input type="checkbox" class="day-checkbox" 
                     data-id="${day.id}" 
                     data-stage="${stageKey}"
                     ${isChecked ? 'checked' : ''} 
                     onchange="handleCheckChange(this)" />
              <div class="day-info">
                <div class="day-header-line">
                  <span class="day-name">${day.dayName}</span>
                  <span class="day-tag ${day.type}">${day.tag}</span>
                </div>
                <div class="day-title">${day.title}</div>
                <div class="day-metrics">
                  <span class="metric-pill">距離: <strong>${day.dist}</strong></span>
                  <span class="metric-pill">配速: <strong>${day.pace}</strong></span>
                  <span class="metric-pill">心率: <strong>${day.hr}</strong></span>
                </div>
                <div class="day-desc">${day.desc}</div>
              </div>
            </label>
          </div>
        </div>
      `;
    });

    html += `
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// Toggle accordion
window.toggleWeek = function(weekId) {
  const card = document.getElementById(`card-${weekId}`);
  if (!card) return;
  card.classList.toggle("expanded");
};

// Checkbox change handler
window.handleCheckChange = function(checkbox) {
  const id = checkbox.getAttribute("data-id");
  const stageKey = checkbox.getAttribute("data-stage");
  const isChecked = checkbox.checked;

  setWorkoutChecked(id, isChecked);

  const item = document.getElementById(`item-${id}`);
  if (item) {
    if (isChecked) {
      item.classList.add("completed");
    } else {
      item.classList.remove("completed");
    }
  }

  // Update progress bar
  updateStageProgress(stageKey);
};

function updateStageProgress(stageKey) {
  const stage = TRAINING_DATA[stageKey];
  if (!stage) return;

  const checkedMap = getCheckedWorkouts();
  let total = 0;
  let completed = 0;

  stage.weeks.forEach(w => {
    w.days.forEach(d => {
      total++;
      if (checkedMap[d.id]) completed++;
    });
  });

  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  const pctEl = document.getElementById(`pct-${stageKey}`);
  const barEl = document.getElementById(`bar-${stageKey}`);
  const statEl = document.getElementById(`stat-${stageKey}`);

  if (pctEl) pctEl.innerText = `${pct}%`;
  if (barEl) barEl.style.width = `${pct}%`;
  if (statEl) statEl.innerText = `已完成 ${completed} / ${total} 堂訓練課表`;
}

// ==========================================================================
// Tabs Navigation
// ==========================================================================
function setupNavigation() {
  const navBtns = document.querySelectorAll(".nav-btn");
  const tabPanes = document.querySelectorAll(".tab-pane");

  navBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetTab = btn.getAttribute("data-tab");

      navBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      tabPanes.forEach(pane => {
        pane.classList.remove("active");
        if (pane.id === `tab-${targetTab}`) {
          pane.classList.add("active");
        }
      });

      // Scroll sticky nav to make active button visible
      btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });

      // Scroll page to top of main content on mobile
      const mainContent = document.querySelector(".main-content");
      if (mainContent && window.scrollY > 300) {
        window.scrollTo({ top: 260, behavior: 'smooth' });
      }
    });
  });
}

// Quick jump to today/current week
window.jumpToCurrentWeek = function() {
  // Switch to stage 1 tab
  const stage1Btn = document.querySelector('[data-tab="stage1"]');
  if (stage1Btn) stage1Btn.click();

  setTimeout(() => {
    const card = document.getElementById("card-w1");
    if (card) {
      if (!card.classList.contains("expanded")) {
        card.classList.add("expanded");
      }
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, 100);
};

// ==========================================================================
// Initialization
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  // Update live countdowns
  updateCountdowns();
  setInterval(updateCountdowns, 60000); // update every minute

  // Render all 3 stages
  renderStage("stage1", "stage1-container");
  renderStage("stage2", "stage2-container");
  renderStage("stage3", "stage3-container");

  // Setup tabs
  setupNavigation();
});
