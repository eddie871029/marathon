// ==========================================================================
// 2026-2027 Half-Marathon Training Plan Engine
// Modeled after oki design system - Mobile-First Vanilla JS
// Dual Runner Support: TJ (3-Race Macrocycle) & Wife (Taipei HM 2:30)
// ==========================================================================

const RACE_DATES = {
  race1: new Date("2026-10-31T17:00:00+08:00"), // 華航馬拉松
  race2: new Date("2026-12-20T06:30:00+08:00"), // 台北馬拉松
  race3: new Date("2027-02-21T06:30:00+08:00")  // ASICS 馬拉松
};

// ==========================================================================
// 1. TJ's 23-Week Training Plan Data (3 Races)
// ==========================================================================
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
          { id: "s1-w7-d3", dayName: "Day 3 (週六 10/31)", type: "race", tag: "🎉 賽事日", title: "✈️ 華航馬拉松 21.0975 km 半馬正式賽", dist: "21.1 km", pace: "6'24\" ~ 6'38\"", hr: "Z3-Z4", desc: "✅ 實際成績：2:25:44（手錶，今年最佳，較 4/11 進步約 8 分鐘）。前 3K 配速有守住，但心率全程 160~165 接近門檻，14K 後肝醣耗盡掉速。教訓：比賽心率上限要絕對、長跑耐力是第一優先、補給增為 3 包。" }
        ]
      }
    ]
  },

  stage2: {
    title: "🧑‍🤝‍🧑 第二階段：台北馬拉松陪伴與銜接期",
    targetTime: "夫妻攜手・完賽為主",
    targetPace: "依夫人舒適體感 (約 7'00\" ~ 8'00\" /km)",
    description: "華航後先恢復一週，之後每週保留 1 次自己的品質課（不跟著減量），週末夫妻長跑對你剛好是 Z2 有氧長跑，正好補強華航暴露的有氧耐力缺口。",
    weeks: [
      {
        id: "w8",
        num: "W8",
        date: "11/02 - 11/08",
        focus: "華航賽後恢復週",
        note: "華航 (10/31) 實際 2:25:44（今年最佳；生涯最佳為 2015 年 2:22:53），14K 後肝醣耗盡掉速。本週只跑輕鬆跑，不做任何速度課，多補碳水與蛋白質。",
        days: [
          { id: "s2-w8-d1", dayName: "Day 1 (週三)", type: "easy", tag: "主動修復", title: "5 km 極輕鬆恢復跑", dist: "5 km", pace: "7'40\" ~ 8'00\" /km", hr: "Z1-Z2 (≤140 bpm)", desc: "只求讓血液流動，腿仍痠就改成快走。" },
          { id: "s2-w8-d2", dayName: "Day 2 (週五)", type: "easy", tag: "輕鬆有氧", title: "6 km 輕鬆跑 + 4 趟 80m 加速跑", dist: "6 km", pace: "7'20\" ~ 7'50\" /km", hr: "Z2 (≤145 bpm)", desc: "無痛點即可逐步回歸，加速跑以「快而放鬆」為主。" },
          { id: "s2-w8-d3", dayName: "Day 3 (週末)", type: "couple", tag: "💑 夫妻同跑", title: "10 km 夫妻重聚跑", dist: "10 km", pace: "約 7'25\" /km", hr: "Z1-Z2", desc: "配合老婆課表的 10K，對你是很好的 Z2 恢復長跑。" }
        ]
      },
      {
        id: "w9",
        num: "W9",
        date: "11/09 - 11/15",
        focus: "恢復品質課・目標配速",
        note: "重新開始每週 1 次品質課。比賽配速跑以心率為上限，不要追配速。",
        days: [
          { id: "s2-w9-d1", dayName: "Day 1 (週二/三)", type: "quality", tag: "比賽配速", title: "暖身 1.5K + 5 km 目標配速跑 (6'20\" ~ 6'25\") + 緩和 1K", dist: "7.5 km", pace: "6'20\" ~ 6'25\" /km", hr: "Z3 (≤158 bpm)", desc: "心率超過 158 就放慢，配速讓給心率決定。暖身一定要做足。" },
          { id: "s2-w9-d2", dayName: "Day 2 (週四/五)", type: "easy", tag: "輕鬆有氧", title: "6 km Z2 輕鬆跑", dist: "6 km", pace: "7'20\" ~ 8'00\" /km", hr: "Z2 (≤148 bpm)", desc: "選平坦路線，壓不住心率就走跑交替。" },
          { id: "s2-w9-d3", dayName: "Day 3 (週末)", type: "couple", tag: "💑 夫妻同跑", title: "13 km 夫妻長距離突破跑", dist: "13 km", pace: "約 7'25\" /km", hr: "Z2 (≤148 bpm)", desc: "配合老婆課表 13K，練習並排默契與水站節奏。" }
        ]
      },
      {
        id: "w10",
        num: "W10",
        date: "11/16 - 11/22",
        focus: "門檻跑啟動",
        note: "引入門檻 (T) 間歇。門檻配速暫定 6'00\"~6'10\"，W16 實測後再校正。",
        days: [
          { id: "s2-w10-d1", dayName: "Day 1 (週二/三)", type: "quality", tag: "門檻跑", title: "暖身 2K + 2 × 2.5 km T 門檻跑 (6'00\" ~ 6'10\")，間休 2 分鐘慢跑 + 緩和 1K", dist: "8.5 km", pace: "6'00\" ~ 6'10\" /km", hr: "Z3-Z4 (160-168 bpm)", desc: "「吃力但可控制」，只能講幾個字。第 1 公里不要衝。" },
          { id: "s2-w10-d2", dayName: "Day 2 (週四/五)", type: "easy", tag: "輕鬆有氧", title: "6 km Z2 輕鬆跑", dist: "6 km", pace: "7'20\" ~ 8'00\" /km", hr: "Z2 (≤148 bpm)", desc: "深層放鬆，代謝門檻跑的疲勞。" },
          { id: "s2-w10-d3", dayName: "Day 3 (週末)", type: "couple", tag: "💑 夫妻同跑", title: "14 km 夫妻台北馬全流程模擬", dist: "14 km", pace: "約 7'20\" /km", hr: "Z2 (≤148 bpm)", desc: "模擬水站進站與補膠節奏。" }
        ]
      },
      {
        id: "w11",
        num: "W11",
        date: "11/23 - 11/29",
        focus: "速耐力：1.2K 間歇",
        note: "長間歇練速耐力，為 2:10 目標鋪路。老婆本週迎來 15K 高峰長跑。",
        days: [
          { id: "s2-w11-d1", dayName: "Day 1 (週二/三)", type: "quality", tag: "長間歇", title: "暖身 2K + 4 × 1.2 km (5'35\" ~ 5'40\")，間休 2 分鐘慢跑 + 緩和 1K", dist: "8.5 km", pace: "5'35\" ~ 5'40\" /km", hr: "Z4 (164-175 bpm)", desc: "每趟約 6'45\"，四趟配速要平均，最後一趟不要衝刺。" },
          { id: "s2-w11-d2", dayName: "Day 2 (週四/五)", type: "easy", tag: "輕鬆有氧", title: "6 km Z2 輕鬆跑", dist: "6 km", pace: "7'20\" ~ 8'00\" /km", hr: "Z2 (≤148 bpm)", desc: "調整呼吸，充足睡眠。" },
          { id: "s2-w11-d3", dayName: "Day 3 (週末)", type: "couple", tag: "💑 夫妻同跑", title: "15 km 夫妻高峰長跑 (補給演練)", dist: "15 km", pace: "約 7'20\" /km", hr: "Z2 (≤148 bpm)", desc: "老婆的巔峰驗收。你順便練習吃 2 包能量膠的腸胃適應。" }
        ]
      },
      {
        id: "w12",
        num: "W12",
        date: "11/30 - 12/06",
        focus: "老婆減量・你不減量",
        note: "陪跑對你強度很低，不需要跟著減量。週末夫妻跑完自己續跑，維持長跑距離。",
        days: [
          { id: "s2-w12-d1", dayName: "Day 1 (週二/三)", type: "quality", tag: "門檻跑", title: "暖身 1.5K + 6 km 連續門檻跑 (6'05\" ~ 6'10\") + 緩和 1K", dist: "8.5 km", pace: "6'05\" ~ 6'10\" /km", hr: "Z3-Z4 (160-168 bpm)", desc: "連續 6K 定速，練習在門檻附近的配速自律。" },
          { id: "s2-w12-d2", dayName: "Day 2 (週四/五)", type: "easy", tag: "輕鬆有氧", title: "6 km Z2 輕鬆跑", dist: "6 km", pace: "7'20\" ~ 8'00\" /km", hr: "Z2 (≤148 bpm)", desc: "平穩有氧。" },
          { id: "s2-w12-d3", dayName: "Day 3 (週末)", type: "couple", tag: "💑 同跑 + 續跑", title: "10 km 夫妻減量跑 + 自己續跑 4 km Z2", dist: "14 km", pace: "7'20\" ~ 7'40\" /km", hr: "Z2 (≤148 bpm)", desc: "陪老婆完成 10K 後，自己再跑 4K，維持長跑量。" }
        ]
      },
      {
        id: "w13",
        num: "W13",
        date: "12/07 - 12/13",
        focus: "目標配速維持",
        note: "台北 12 月中旬偏冷，注意保暖防感冒，準備拋棄式雨衣。",
        days: [
          { id: "s2-w13-d1", dayName: "Day 1 (週二/三)", type: "quality", tag: "比賽配速", title: "暖身 1.5K + 6 km 目標配速跑 (6'15\" ~ 6'20\") + 緩和 1K", dist: "8.5 km", pace: "6'15\" ~ 6'20\" /km", hr: "Z3 (≤158 bpm)", desc: "天氣轉涼，觀察同配速心率是否比秋天低。" },
          { id: "s2-w13-d2", dayName: "Day 2 (週四/五)", type: "easy", tag: "輕鬆有氧", title: "5 km Z2 輕鬆跑 + 4 趟加速跑", dist: "5 km", pace: "7'20\" ~ 8'00\" /km", hr: "Z2 (≤148 bpm)", desc: "維持雙腿靈活。" },
          { id: "s2-w13-d3", dayName: "Day 3 (週末)", type: "couple", tag: "💑 同跑 + 續跑", title: "6 km 夫妻賽前熱身跑 + 自己續跑 6 km Z2", dist: "12 km", pace: "7'20\" ~ 7'40\" /km", hr: "Z2 (≤148 bpm)", desc: "老婆收心跑，你自己補足 12K。" }
        ]
      },
      {
        id: "w14",
        num: "W14",
        date: "12/14 - 12/20",
        focus: "台北馬拉松嘉年華週",
        note: "全職 Pacer 上陣！擋風、拿水、倒數公里數。對你而言是一次 21K 的 Z1-Z2 長跑。",
        days: [
          { id: "s2-w14-d1", dayName: "Day 1 (週二 12/15)", type: "easy", tag: "賽前活動", title: "5 km 輕鬆跑 + 4 趟加速跑", dist: "5 km", pace: "7'20\" /km", hr: "Z2", desc: "開動關節，避免身體生鏽。" },
          { id: "s2-w14-d2", dayName: "Day 2 (週五 12/18)", type: "easy", tag: "牽手散步", title: "夫妻 20 分鐘公園輕鬆散步與伸展", dist: "2 km", pace: "散步", hr: "Rest", desc: "充分睡眠，晚間整理路跑衣物、號碼布、能量膠。" },
          { id: "s2-w14-d3", dayName: "Day 3 (週日 12/20)", type: "race", tag: "🏅 賽事日", title: "🏅 台北馬拉松 21.0975 km (夫妻攜手完賽)", dist: "21.1 km", pace: "依老婆配速", hr: "Z1-Z2 歡樂巡航", desc: "稱職配速員出擊！擋風、遞水、給予情緒價值，牽手衝過終點線！" }
        ]
      }
    ]
  },

  stage3: {
    title: "🚀 第三階段：ASICS 馬拉松巔峰衝刺期",
    targetTime: "2:10:00 (個人 PB)",
    targetPace: "6'09\" ~ 6'10\" /km（比賽配速依 W16、W17 測驗結果最終決定）",
    description: "目標 2:10 需要再進步約 7%，重點是補強有氧耐力：每週一次確實的 Z2 長跑（逐步拉到 18K）、門檻跑把 T 配速往前推、長跑練習吃 3 包能量膠。W16 門檻測驗與 W17 自主半馬測驗後，再決定 ASICS 的比賽配速。",
    weeks: [
      {
        id: "w15",
        num: "W15",
        date: "12/21 - 12/27",
        focus: "台北馬後恢復",
        note: "陪跑強度低，恢復很快。本週只跑輕鬆跑，準備進入衝刺期。",
        days: [
          { id: "s3-w15-d1", dayName: "Day 1 (週三)", type: "easy", tag: "恢復慢跑", title: "5 km 輕鬆恢復跑", dist: "5 km", pace: "7'30\" ~ 8'00\" /km", hr: "Z1-Z2 (≤140 bpm)", desc: "確認膝蓋與腳踝無任何不適。" },
          { id: "s3-w15-d2", dayName: "Day 2 (週五)", type: "easy", tag: "基礎有氧", title: "6 km Z2 輕鬆跑 + 4 趟加速跑", dist: "6 km", pace: "7'20\" ~ 8'00\" /km", hr: "Z2 (≤148 bpm)", desc: "步頻回升，保持雙腿靈活。" },
          { id: "s3-w15-d3", dayName: "Day 3 (週末)", type: "long", tag: "耐力維持", title: "10 km Z2 長跑", dist: "10 km", pace: "7'20\" ~ 8'00\" /km", hr: "Z2 (≤148 bpm)", desc: "選新竹河濱等平坦路線。" }
        ]
      },
      {
        id: "w16",
        num: "W16",
        date: "12/28 - 01/03",
        focus: "30 分鐘門檻測驗",
        note: "用實測結果校正 T 配速與心率區間，後面的課表配速都以此為準。",
        days: [
          { id: "s3-w16-d1", dayName: "Day 1 (週二/三)", type: "quality", tag: "🧪 門檻測驗", title: "暖身 15 分鐘 + 加速跑 → 30 分鐘全力均速跑 → 緩和 10 分鐘", dist: "約 9 km", pace: "全力但均速", hr: "記錄後 20 分鐘平均心率", desc: "後 20 分鐘的平均心率 = 門檻心率，平均配速 ≈ 門檻配速。選平坦路線、避開悶熱夜晚，前 5 分鐘不要衝。" },
          { id: "s3-w16-d2", dayName: "Day 2 (週四/五)", type: "easy", tag: "輕鬆有氧", title: "6 km Z2 輕鬆跑", dist: "6 km", pace: "7'20\" ~ 8'00\" /km", hr: "Z2 (≤148 bpm)", desc: "跨年週，深層放鬆。" },
          { id: "s3-w16-d3", dayName: "Day 3 (週末)", type: "long", tag: "週末長跑", title: "14 km Z2 長跑 (吃 1 包能量膠)", dist: "14 km", pace: "7'20\" ~ 7'50\" /km", hr: "Z2 (≤148 bpm)", desc: "新年第一跑！長跑嚴守 Z2，最後 20 分鐘心率漂到 150 可接受。" }
        ]
      },
      {
        id: "w17",
        num: "W17",
        date: "01/04 - 01/10",
        focus: "自主半馬測驗",
        note: "高雄馬報名已截止，改在新竹河濱自主跑一次半馬計時，驗證耐力、補給與配速策略。",
        days: [
          { id: "s3-w17-d1", dayName: "Day 1 (週二)", type: "quality", tag: "配速喚醒", title: "暖身 1.5K + 4 km 目標配速跑 (6'15\") + 緩和 1K", dist: "6.5 km", pace: "6'15\" /km", hr: "Z3 (≤158 bpm)", desc: "測驗前的小減量，出汗即可。" },
          { id: "s3-w17-d2", dayName: "Day 2 (週四)", type: "easy", tag: "賽前開腿", title: "4 km 輕鬆跑 + 4 趟加速跑", dist: "4 km", pace: "7'30\" /km", hr: "Z1-Z2", desc: "保持神經靈活，前一晚睡飽。" },
          { id: "s3-w17-d3", dayName: "Day 3 (週六/日 1/9-10)", type: "race", tag: "🧪 半馬測驗", title: "自主半馬計時 21.1 km (新竹河濱)", dist: "21.1 km", pace: "前 3K 6'25\" → 依心率", hr: "3-16K ≤160，16K 後放開", desc: "照比賽方式執行：暖身做足、吃 3 包能量膠 (約 40 分、1 小時 20 分、1 小時 50 分)。成績決定 ASICS 比賽配速：≤2:15 → 挑戰 2:10；2:15~2:18 → 目標 2:12~2:13；>2:18 → 目標 2:15。" }
        ]
      },
      {
        id: "w18",
        num: "W18",
        date: "01/11 - 01/17",
        focus: "測驗後恢復 + 門檻跑",
        note: "測驗後先跑輕鬆跑，週中再做門檻跑。配速改用 W16 實測的 T 配速。",
        days: [
          { id: "s3-w18-d1", dayName: "Day 1 (週二/三)", type: "easy", tag: "恢復跑", title: "6 km Z2 輕鬆跑", dist: "6 km", pace: "7'20\" ~ 8'00\" /km", hr: "Z2 (≤148 bpm)", desc: "半馬測驗後的恢復。" },
          { id: "s3-w18-d2", dayName: "Day 2 (週四/五)", type: "quality", tag: "門檻跑", title: "暖身 2K + 2 × 3 km T 門檻跑，間休 2 分鐘慢跑 + 緩和 1K", dist: "9 km", pace: "W16 實測 T 配速", hr: "門檻心率 ±3", desc: "強化 T 配速的耐受時間，步頻維持 175~180 spm。" },
          { id: "s3-w18-d3", dayName: "Day 3 (週末)", type: "long", tag: "週末長跑", title: "14 km Z2 長跑 (練習 2 包能量膠)", dist: "14 km", pace: "7'15\" ~ 7'45\" /km", hr: "Z2 (≤148 bpm)", desc: "測驗後的長跑不拉距離，專注 Z2。" }
        ]
      },
      {
        id: "w19",
        num: "W19",
        date: "01/18 - 01/24",
        focus: "全季最高峰週 (The Ultimate Peak)",
        note: "本季最長、最關鍵的一週。長跑末段只跑 3K 比賽配速，避免疲勞過度累積。",
        days: [
          { id: "s3-w19-d1", dayName: "Day 1 (週二/三)", type: "quality", tag: "速度刺激", title: "暖身 2K + 8 × 400m (1'56\" ~ 2'00\")，間休 90 秒慢跑 + 緩和 1K", dist: "7 km", pace: "4'50\" ~ 5'00\" /km", hr: "Z4-Z5", desc: "暖身至少 10 分鐘。若前一週疲勞未消，減為 6 趟。" },
          { id: "s3-w19-d2", dayName: "Day 2 (週四/五)", type: "easy", tag: "輕鬆有氧", title: "6 km Z2 輕鬆跑", dist: "6 km", pace: "7'20\" ~ 8'00\" /km", hr: "Z2 (≤148 bpm)", desc: "低強度恢復。" },
          { id: "s3-w19-d3", dayName: "Day 3 (週末)", type: "long", tag: "頂峰長跑", title: "18 km 頂峰長跑 (前 15K Z2 + 末 3K 比賽配速)", dist: "18 km", pace: "7'15\" + 末3K 6'10\" ~ 6'15\"", hr: "Z2 → Z3", desc: "本季最長里程！吃 3 包能量膠完整演練，最後 3K 在疲勞狀態下切入比賽配速。" }
        ]
      },
      {
        id: "w20",
        num: "W20",
        date: "01/25 - 01/31",
        focus: "專項配速週",
        note: "原春節前的專項課提前到本週（2027 除夕為 2/5，春節連假 2/4~2/10 落在 W21~W22）。",
        days: [
          { id: "s3-w20-d1", dayName: "Day 1 (週二/三)", type: "quality", tag: "目標節奏", title: "暖身 1.5K + 8 km 比賽配速跑 (6'10\" ~ 6'15\") + 緩和 1K", dist: "10.5 km", pace: "6'10\" ~ 6'15\" /km", hr: "Z3 (≤160 bpm)", desc: "最關鍵的專項課：8K 定速，觀察心率是否穩定在 160 以下。" },
          { id: "s3-w20-d2", dayName: "Day 2 (週四/五)", type: "easy", tag: "輕鬆有氧", title: "6 km Z2 輕鬆跑", dist: "6 km", pace: "7'20\" ~ 8'00\" /km", hr: "Z2 (≤148 bpm)", desc: "深層放鬆，補充水分。" },
          { id: "s3-w20-d3", dayName: "Day 3 (週末)", type: "long", tag: "最後長跑", title: "16 km Z2 長跑 (3 包能量膠)", dist: "16 km", pace: "7'15\" ~ 7'45\" /km", hr: "Z2 (≤148 bpm)", desc: "賽前最後一趟長跑，隨後進入春節維持與減量期。" }
        ]
      },
      {
        id: "w21",
        num: "W21",
        date: "02/01 - 02/07",
        focus: "農曆春節・防怠惰維持",
        note: "春節連假 2/4 起。過年聚餐多，維持每週 3 跑即可，不堆疊疲勞。",
        days: [
          { id: "s3-w21-d1", dayName: "Day 1 (週二 2/2)", type: "quality", tag: "長間歇", title: "暖身 2K + 4 × 1.2 km (5'35\" ~ 5'40\")，間休 2 分鐘慢跑 + 緩和 1K", dist: "8.5 km", pace: "5'35\" ~ 5'40\" /km", hr: "Z4", desc: "連假前最後一次高強度，維持速耐力。" },
          { id: "s3-w21-d2", dayName: "Day 2 (除夕/初一前後)", type: "easy", tag: "賀歲慢跑", title: "6 km 輕鬆跑 + 4 趟加速跑", dist: "6 km", pace: "7'20\" ~ 8'00\" /km", hr: "Z2 (≤148 bpm)", desc: "消化過年大餐，呼吸新鮮空氣。" },
          { id: "s3-w21-d3", dayName: "Day 3 (初二/初三)", type: "long", tag: "春節長跑", title: "12 km Z2 中長跑", dist: "12 km", pace: "7'15\" ~ 7'45\" /km", hr: "Z2 (≤148 bpm)", desc: "確保下肢肌力不因放假休眠。" }
        ]
      },
      {
        id: "w22",
        num: "W22",
        date: "02/08 - 02/14",
        focus: "賽前 2 週減量 (Tapering)",
        note: "春節連假到 2/10。總跑量縮減約 35%，保留比賽配速刺激。",
        days: [
          { id: "s3-w22-d1", dayName: "Day 1 (週二/三)", type: "quality", tag: "配速維持", title: "暖身 1.5K + 4 km 比賽配速跑 + 緩和 1K", dist: "6.5 km", pace: "比賽配速 (依 W17 決定)", hr: "Z3", desc: "距離短、節奏明快，維持神經敏感度。" },
          { id: "s3-w22-d2", dayName: "Day 2 (週四/五)", type: "easy", tag: "輕鬆跑", title: "5 km Z2 輕鬆跑", dist: "5 km", pace: "7'20\" ~ 8'00\" /km", hr: "Z1-Z2", desc: "放鬆小腿與比目魚肌。" },
          { id: "s3-w22-d3", dayName: "Day 3 (週末)", type: "long", tag: "減量長跑", title: "10 km 輕鬆跑 (最後 2K 比賽配速)", dist: "10 km", pace: "7'20\" + 末2K 比賽配速", hr: "Z2 → Z3", desc: "嚴格控制在 10K，跑完應覺得意猶未盡。" }
        ]
      },
      {
        id: "w23",
        num: "W23",
        date: "02/15 - 02/21",
        focus: "ASICS 賽事週・衝刺 PB！",
        note: "賽前 2 天多吃碳水、睡飽、做好保暖。比賽心率上限依 W17 測驗的實際數據設定。",
        days: [
          { id: "s3-w23-d1", dayName: "Day 1 (週二 02/16)", type: "quality", tag: "配速喚醒", title: "暖身 1K + 3 km 比賽配速跑 + 緩和 1K", dist: "5 km", pace: "比賽配速", hr: "Z3", desc: "大腦再次複習比賽節奏，出汗即止。" },
          { id: "s3-w23-d2", dayName: "Day 2 (週四 02/18)", type: "easy", tag: "賽前開腿", title: "3 km 極慢跑 + 4 趟 60m 加速跑", dist: "3.5 km", pace: "7'30\" /km", hr: "Z1", desc: "賽前 48 小時徹底儲備能量。" },
          { id: "s3-w23-d3", dayName: "Day 3 (週日 02/21)", type: "race", tag: "🔥 巔峰決戰", title: "👟 ASICS 馬拉松 21.0975 km (挑戰 2:10:00 PB！)", dist: "21.1 km", pace: "前 3K 比目標慢 10 秒 → 比賽配速", hr: "16K 前守住上限 → 之後放開", desc: "暖身 10~15 分鐘、3 包能量膠。前 3K 覺得太慢才是對的；16K 前心率超過上限就放慢；16K 後放開衝刺 PB！" }
        ]
      }
    ]
  }
};

// ==========================================================================
// 2. Wife's 14-Week Taipei Half Marathon Plan (Target 2:30:00)
// ==========================================================================
const WIFE_TRAINING_DATA = {
  title: "🏃‍♀️ 老婆專屬：2026 台北馬拉松半馬完賽計劃",
  targetTime: "2:30:00 (穩健達標)",
  targetPace: "7'00\" ~ 7'10\" /km (均速 7'06\")",
  raceDate: "2026 年 12 月 20 日 (星期日)",
  description: "共 14 週溫柔且科學的進階課表。每週跑 3 次（1次目標配速跑 + 1次放鬆慢跑 + 週末夫妻甜蜜同跑）。由最強專屬 Pacer 老公護航破風，無痛笑著完賽！",
  weeks: [
    {
      id: "wife-w1",
      num: "W1",
      date: "09/12 - 09/20",
      focus: "跑感啟動與身體適應",
      note: "第一週以建立每週動起來的習慣為主，感受跑步時肩膀放鬆，呼吸輕快。",
      days: [
        { id: "wife-w1-d1", dayName: "Day 1 (週二/三)", type: "quality", tag: "配速體驗", title: "暖身 500m + 4 km 目標節奏跑 (7'10\") + 緩和", dist: "5 km", pace: "7'10\" /km", hr: "Z3", desc: "體驗 7'10\" 目標巡航體感，步伐輕盈，步頻保持小步快頻。" },
        { id: "wife-w1-d2", dayName: "Day 2 (週四/五)", type: "easy", tag: "舒壓慢跑", title: "E 區間放鬆慢跑 4 km", dist: "4 km", pace: "7'45\" /km", hr: "Z2", desc: "極度輕鬆的慢跑，排汗排毒，聽自己喜歡的音樂。" },
        { id: "wife-w1-d3", dayName: "Day 3 (週末六/日)", type: "couple", tag: "💑 夫妻同跑", title: "8 km 週末夫妻河濱慢跑 (老公護航)", dist: "8 km", pace: "7'30\" ~ 7'45\" /km", hr: "Z2", desc: "老公陪跑！每 2 公里提醒喝一口水，順暢完成 8 公里。" }
      ]
    },
    {
      id: "wife-w2",
      num: "W2",
      date: "09/21 - 09/27",
      focus: "步伐節奏定型",
      note: "練習跑步時手肘自然向後擺動，不要聳肩。",
      days: [
        { id: "wife-w2-d1", dayName: "Day 1 (週二/三)", type: "quality", tag: "節奏跑", title: "暖身 + 4.5 km 目標配速跑 (7'05\") + 緩和", dist: "5.5 km", pace: "7'05\" /km", hr: "Z3", desc: "保持均勻呼吸（吸兩步、吐兩步），心率平穩。" },
        { id: "wife-w2-d2", dayName: "Day 2 (週四/五)", type: "easy", tag: "輕鬆跑", title: "E 區間有氧跑 5 km", dist: "5 km", pace: "7'45\" /km", hr: "Z2", desc: "放鬆小腿，跑完洗熱水澡放鬆。" },
        { id: "wife-w2-d3", dayName: "Day 3 (週末六/日)", type: "couple", tag: "💑 夫妻同跑", title: "9 km 夫妻週末有氧長跑", dist: "9 km", pace: "7'30\" ~ 7'45\" /km", hr: "Z2", desc: "慢慢將距離推進到 9 公里，體會長跑後身體暢快的成就感！" }
      ]
    },
    {
      id: "wife-w3",
      num: "W3",
      date: "09/28 - 10/04",
      focus: "首度突破雙位數 10K",
      note: "本週末將完成 10 公里！這是半馬旅程的第一座重要里程碑。",
      days: [
        { id: "wife-w3-d1", dayName: "Day 1 (週二/三)", type: "quality", tag: "門檻試驗", title: "暖身 + 5 km 輕快跑 (7'00\") + 緩和", dist: "6 km", pace: "7'00\" /km", hr: "Z3-Z4", desc: "整整 5 公里鎖定 7 分整，感受自己心肺能力顯著進步！" },
        { id: "wife-w3-d2", dayName: "Day 2 (週四/五)", type: "easy", tag: "舒壓慢跑", title: "4 km 輕鬆恢復跑", dist: "4 km", pace: "7'50\" /km", hr: "Z2", desc: "輕快慢跑，放鬆肌肉。" },
        { id: "wife-w3-d3", dayName: "Day 3 (週末六/日)", type: "couple", tag: "💑 夫妻同跑", title: "🎉 10 km 夫妻同跑里程碑！", dist: "10 km", pace: "7'25\" ~ 7'40\" /km", hr: "Z2", desc: "雙位數達成！在第 5 公里停下喝運動飲料，老公幫忙記錄 10K 完跑照片！" }
      ]
    },
    {
      id: "wife-w4",
      num: "W4",
      date: "10/05 - 10/11",
      focus: "10K 後的小減量與吸收",
      note: "經過前三週的適應，本週稍微放慢，讓身體吸收訓練成效。",
      days: [
        { id: "wife-w4-d1", dayName: "Day 1 (週二/三)", type: "quality", tag: "輕快跑", title: "4 km 輕鬆輕快跑 (7'10\")", dist: "5 km", pace: "7'10\" /km", hr: "Z3", desc: "保持跑感即可，不過度疲憊。" },
        { id: "wife-w4-d2", dayName: "Day 2 (週四/五)", type: "easy", tag: "放鬆慢跑", title: "4 km 散步式慢跑", dist: "4 km", pace: "8'00\" /km", hr: "Z1-Z2", desc: "享受微風，讓大腿充分排酸。" },
        { id: "wife-w4-d3", dayName: "Day 3 (週末六/日)", type: "couple", tag: "💑 夫妻同跑", title: "8 km 輕鬆週末巡航跑", dist: "8 km", pace: "7'35\" /km", hr: "Z2", desc: "輕鬆跑完 8K，為下週進階長跑儲備能量。" }
      ]
    },
    {
      id: "wife-w5",
      num: "W5",
      date: "10/12 - 10/18",
      focus: "長跑推進至 11K",
      note: "開始練習在跑步中吃半包能量膠或含糖補給糖。",
      days: [
        { id: "wife-w5-d1", dayName: "Day 1 (週二/三)", type: "quality", tag: "目標節奏", title: "暖身 + 5 km 比賽配速跑 (7'05\") + 緩和", dist: "6 km", pace: "7'05\" /km", hr: "Z3", desc: "非常穩定的 7'05\"，想像自己在台北馬賽道上的自信身姿。" },
        { id: "wife-w5-d2", dayName: "Day 2 (週四/五)", type: "easy", tag: "基礎有氧", title: "5 km 舒適慢跑", dist: "5 km", pace: "7'45\" /km", hr: "Z2", desc: "平順節奏。" },
        { id: "wife-w5-d3", dayName: "Day 3 (週末六/日)", type: "couple", tag: "💑 夫妻同跑", title: "11 km 夫妻耐力長跑 (補給練習)", dist: "11 km", pace: "7'30\" /km", hr: "Z2", desc: "在第 6 公里嘗試吃能量膠配溫水，測試腸胃適應度。" }
      ]
    },
    {
      id: "wife-w6",
      num: "W6",
      date: "10/19 - 10/25",
      focus: "穩扎穩打 12K",
      note: "華航馬前一週，跟隨老公的減量節奏，週末完成紮實的 12K。",
      days: [
        { id: "wife-w6-d1", dayName: "Day 1 (週二/三)", type: "quality", tag: "節奏跑", title: "暖身 + 5 km 節奏跑 (7'00\") + 緩和", dist: "6 km", pace: "7'00\" /km", hr: "Z3", desc: "呼吸沉穩，步伐輕彈。" },
        { id: "wife-w6-d2", dayName: "Day 2 (週四/五)", type: "easy", tag: "舒壓慢跑", title: "4.5 km 輕鬆跑", dist: "4.5 km", pace: "7'50\" /km", hr: "Z2", desc: "保持身體輕盈。" },
        { id: "wife-w6-d3", dayName: "Day 3 (週末六/日)", type: "couple", tag: "💑 夫妻同跑", title: "12 km 夫妻長距離耐力跑", dist: "12 km", pace: "7'30\" ~ 7'45\" /km", hr: "Z2", desc: "突破 12 公里！半馬距離已經過半，完賽掌握度大幅提升！" }
      ]
    },
    {
      id: "wife-w7",
      num: "W7",
      date: "10/26 - 10/31",
      focus: "老公華航出戰週・活力維持",
      note: "本週週末陪老公出征華航馬（或在場邊熱情加油），週間維持自己輕量慢跑。",
      days: [
        { id: "wife-w7-d1", dayName: "Day 1 (週二/三)", type: "quality", tag: "輕快跑", title: "4 km 目標配速跑 (7'05\")", dist: "4.5 km", pace: "7'05\" /km", hr: "Z3", desc: "短距離維持跑感。" },
        { id: "wife-w7-d2", dayName: "Day 2 (週四/五)", type: "easy", tag: "舒壓慢跑", title: "4 km 輕鬆跑", dist: "4 km", pace: "7'50\" /km", hr: "Z2", desc: "保持關節靈活度。" },
        { id: "wife-w7-d3", dayName: "Day 3 (週末 10/31)", type: "couple", tag: "✈️ 華航助威", title: "6 km 輕鬆晨跑 / 現場最暖應援團！", dist: "6 km", pace: "輕鬆歡樂", hr: "Z1-Z2", desc: "為老公華航馬拉松大聲加油！感受大賽熱鬧氣氛，激勵自己 12 月台北馬！" }
      ]
    },
    {
      id: "wife-w8",
      num: "W8",
      date: "11/02 - 11/08",
      focus: "台北馬正式倒數 6 週・全新啟航",
      note: "老公賽後排酸，兩人重新在河濱合體慢跑。",
      days: [
        { id: "wife-w8-d1", dayName: "Day 1 (週三)", type: "easy", tag: "排酸漫步", title: "4 km 輕鬆排酸跑 (與老公同行)", dist: "4 km", pace: "7'40\" /km", hr: "Z1-Z2", desc: "放慢速度，以放鬆修復為主。" },
        { id: "wife-w8-d2", dayName: "Day 2 (週五)", type: "easy", tag: "基礎有氧", title: "5 km 舒適慢跑", dist: "5 km", pace: "7'35\" /km", hr: "Z2", desc: "順暢呼吸，神清氣爽。" },
        { id: "wife-w8-d3", dayName: "Day 3 (週末)", type: "couple", tag: "💑 夫妻同跑", title: "10 km 夫妻同跑重聚跑", dist: "10 km", pace: "7'25\" ~ 7'40\" /km", hr: "Z2", desc: "兩人重新對齊步頻，老公全職擔當護航 Pacer！" }
      ]
    },
    {
      id: "wife-w9",
      num: "W9",
      date: "11/09 - 11/15",
      focus: "推進 13K・耐力躍升",
      note: "長跑時間約 95~100 分鐘，練習長距離心理耐受力。",
      days: [
        { id: "wife-w9-d1", dayName: "Day 1 (週二/三)", type: "quality", tag: "目標節奏", title: "暖身 + 6 km 目標配速跑 (7'05\") + 緩和", dist: "7 km", pace: "7'05\" /km", hr: "Z3", desc: "持續 6 公里維持 7'05\"，體會如定速巡航機般的從容感。" },
        { id: "wife-w9-d2", dayName: "Day 2 (週四/五)", type: "easy", tag: "輕鬆跑", title: "5 km 舒壓慢跑", dist: "5 km", pace: "7'45\" /km", hr: "Z2", desc: "放鬆雙肩與腰部。" },
        { id: "wife-w9-d3", dayName: "Day 3 (週末)", type: "couple", tag: "💑 夫妻同跑", title: "13 km 夫妻長距離突破跑", dist: "13 km", pace: "7'25\" ~ 7'40\" /km", hr: "Z2", desc: "穩健跨過 13 公里！在第 7 公里吃下能量膠，大腿肌肉已具備半馬抗疲勞實力！" }
      ]
    },
    {
      id: "wife-w10",
      num: "W10",
      date: "11/16 - 11/22",
      focus: "關鍵 14K・實戰補水演練",
      note: "台北馬前第二長距離，進行模擬水站喝水動作。",
      days: [
        { id: "wife-w10-d1", dayName: "Day 1 (週二/三)", type: "quality", tag: "目標節奏", title: "暖身 + 6 km 穩態巡航跑 (7'00\") + 緩和", dist: "7 km", pace: "7'00\" /km", hr: "Z3", desc: "跑姿挺拔，重心微前傾。" },
        { id: "wife-w10-d2", dayName: "Day 2 (週四/五)", type: "easy", tag: "輕鬆跑", title: "5 km 輕鬆慢跑", dist: "5 km", pace: "7'45\" /km", hr: "Z2", desc: "保持下肢彈性。" },
        { id: "wife-w10-d3", dayName: "Day 3 (週末)", type: "couple", tag: "💑 夫妻同跑", title: "14 km 夫妻台北馬全流程模擬", dist: "14 km", pace: "7'20\" ~ 7'35\" /km", hr: "Z2", desc: "老公示範前 200m 預告水站與遞水，演練不慌不忙進站！" }
      ]
    },
    {
      id: "wife-w11",
      num: "W11",
      date: "11/23 - 11/29",
      focus: "全週期最高峰：15 km 大考驗！",
      note: "整個 14 週訓練中最長的一堂課！完成 15K，台北馬 2:30 完賽十拿九穩！",
      days: [
        { id: "wife-w11-d1", dayName: "Day 1 (週二/三)", type: "quality", tag: "目標配速", title: "暖身 + 5 km 目標配速跑 (7'00\") + 緩和", dist: "6 km", pace: "7'00\" /km", hr: "Z3", desc: "鎖定 7'00\"，自信滿分。" },
        { id: "wife-w11-d2", dayName: "Day 2 (週四/五)", type: "easy", tag: "修復跑", title: "4 km 輕鬆慢跑", dist: "4 km", pace: "7'50\" /km", hr: "Z2", desc: "好好休息，為週末 15K 儲存能量。" },
        { id: "wife-w11-d3", dayName: "Day 3 (週末)", type: "couple", tag: "👑 終極長跑", title: "👑 15 km 夫妻高峰長跑 (巔峰驗收)", dist: "15 km", pace: "7'20\" ~ 7'35\" /km", hr: "Z2-Z3", desc: "達成 15 公里！吃下 2 包能量膠，恭喜妳！妳已經具備 100% 台北馬完賽實力！" }
      ]
    },
    {
      id: "wife-w12",
      num: "W12",
      date: "11/30 - 12/06",
      focus: "賽前兩週減量 (Tapering)",
      note: "跑量開始縮減 30%，好好睡覺、多吃蔬菜與蛋白質，消除疲勞。",
      days: [
        { id: "wife-w12-d1", dayName: "Day 1 (週二/三)", type: "quality", tag: "輕快跑", title: "4 km 輕快跑 (7'05\")", dist: "4.5 km", pace: "7'05\" /km", hr: "Z3", desc: "輕盈順暢，不出大力。" },
        { id: "wife-w12-d2", dayName: "Day 2 (週四/五)", type: "easy", tag: "舒壓慢跑", title: "4 km 輕鬆慢跑", dist: "4 km", pace: "7'50\" /km", hr: "Z1-Z2", desc: "深呼吸，放鬆雙肩。" },
        { id: "wife-w12-d3", dayName: "Day 3 (週末)", type: "couple", tag: "💑 減量長跑", title: "10 km 夫妻輕鬆減量長跑", dist: "10 km", pace: "7'30\" /km", hr: "Z2", desc: "不再跑長，跑完後雙腿感到無比輕鬆有活力！" }
      ]
    },
    {
      id: "wife-w13",
      num: "W13",
      date: "12/07 - 12/13",
      focus: "賽前一週保暖與防感冒",
      note: "12 月中旬台北變冷，注意脖子與雙腳保暖，準備比賽當天輕便雨衣。",
      days: [
        { id: "wife-w13-d1", dayName: "Day 1 (週二/三)", type: "quality", tag: "配速記憶", title: "3 km 目標配速跑 (7'06\")", dist: "3.5 km", pace: "7'06\" /km", hr: "Z2-Z3", desc: "複習 2:30 的神聖節奏，出汗即可收工。" },
        { id: "wife-w13-d2", dayName: "Day 2 (週四/五)", type: "easy", tag: "放鬆慢跑", title: "3 km 散步式慢跑", dist: "3 km", pace: "8'00\" /km", hr: "Z1", desc: "促進血液循環，讓身體蓄滿電力。" },
        { id: "wife-w13-d3", dayName: "Day 3 (週末)", type: "couple", tag: "💑 賽前熱身", title: "6 km 夫妻賽前熱身慢跑", dist: "6 km", pace: "7'40\" /km", hr: "Z1-Z2", desc: "最後一次調整跑，檢查跑鞋鞋帶與防磨膏！" }
      ]
    },
    {
      id: "wife-w14",
      num: "W14",
      date: "12/14 - 12/20",
      focus: "台北馬拉松・甜蜜圓夢週！",
      note: "目標 2:30:00 完賽！老公全職護航破風，牽手微笑衝過台北市政府終點線！",
      days: [
        { id: "wife-w14-d1", dayName: "Day 1 (週二 12/15)", type: "easy", tag: "輕動關節", title: "2.5 km 輕鬆散步跑", dist: "2.5 km", pace: "7'30\" /km", hr: "Z1", desc: "活動腳踝，放鬆心情。" },
        { id: "wife-w14-d2", dayName: "Day 2 (週五 12/18)", type: "easy", tag: "牽手散步", title: "夫妻 20 分鐘公園牽手散步與伸展", dist: "2 km", pace: "散步", hr: "Rest", desc: "賽前兩晚睡飽 8 小時，每餐多吃一碗白飯（肝醣超補）！" },
        { id: "wife-w14-d3", dayName: "Day 3 (週日 12/20)", type: "race", tag: "🏅 台北馬大賽", title: "🏅 台北馬拉松 21.0975 km (挑戰 2:30 攜手完賽！)", dist: "21.1 km", pace: "7'00\" ~ 7'10\"", hr: "Z2-Z3 歡樂幸福", desc: "夢想實現日！均速維持 7'06\"，老公在側前方擋風遞水，兩人攜手歡呼衝過終點線！" }
      ]
    }
  ]
};

// LocalStorage keys
const STORAGE_KEY_TJ = "marathon_training_checked_v1";
const STORAGE_KEY_WIFE = "wife_training_checked_v1";
const STORAGE_KEY_RUNNER = "marathon_active_runner_v1";
const STORAGE_KEY_MATCHED = "strava_matched_activities_v1";

function getMatchedMap() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_MATCHED);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function setMatchedMap(map) {
  try {
    localStorage.setItem(STORAGE_KEY_MATCHED, JSON.stringify(map));
  } catch (e) {}
}

function getCheckedWorkouts(runner = "tj") {
  const key = runner === "wife" ? STORAGE_KEY_WIFE : STORAGE_KEY_TJ;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function setWorkoutChecked(id, isChecked, runner = "tj") {
  const key = runner === "wife" ? STORAGE_KEY_WIFE : STORAGE_KEY_TJ;
  const current = getCheckedWorkouts(runner);
  if (isChecked) {
    current[id] = true;
  } else {
    delete current[id];
  }
  try {
    localStorage.setItem(key, JSON.stringify(current));
  } catch (e) {}
}

// ==========================================================================
// Live Countdown Clocks
// ==========================================================================
function updateCountdowns() {
  const now = new Date();

  function formatDiff(targetDate) {
    const diffMs = targetDate - now;
    if (diffMs <= -12 * 60 * 60 * 1000) return { days: 0, text: "✅ 已完賽" };
    if (diffMs <= 0) return { days: 0, text: "今日比賽日！" };
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return { days, text: `${days} <small>天</small> ${hours} <small>小時</small>` };
  }

  const el1 = document.getElementById("countdown-race1");
  const el2 = document.getElementById("countdown-race2");
  const el3 = document.getElementById("countdown-race3");
  const elWife = document.getElementById("countdown-wife-race");

  if (el1) el1.innerHTML = formatDiff(RACE_DATES.race1).text;
  if (el2) el2.innerHTML = formatDiff(RACE_DATES.race2).text;
  if (el3) el3.innerHTML = formatDiff(RACE_DATES.race3).text;
  if (elWife) elWife.innerHTML = formatDiff(RACE_DATES.race2).text;
}

// ==========================================================================
// Workout Day Nutrition & Fueling Recommendations Helper
// ==========================================================================
function getWorkoutNutritionTip(type, runner = "tj") {
  if (runner === "wife") {
    if (type === "long" || type === "couple") {
      return "🥗 <strong>長跑補給：</strong>前晚吃足乾淨碳水・跑前1.5h吃半份饅頭或香蕉・跑中第45分吃水感能量膠・跑後老公買高蛋白大餐！";
    } else if (type === "quality") {
      return "🥗 <strong>配速日補給：</strong>跑前2小時吃易消化輕食・嚴禁油炸與生冷・跑後黃金30分補充無糖豆漿";
    } else {
      return "🥗 <strong>輕鬆跑補給：</strong>早起喝溫開水200ml・可空腹或一口蜂蜜・跑後享用豐盛營養早餐";
    }
  } else {
    if (type === "long" || type === "race") {
      return "🥗 <strong>長跑日補給：</strong>前晚肝醣超補(白飯/義大利麵)・跑前2h饅頭花生醬・每45分吞膠配水・跑後30分高蛋白碳水3:1";
    } else if (type === "quality") {
      return "🥗 <strong>素質日補給：</strong>跑前2h中低纖高碳水・跑前30分能量膠半包・跑中電解質潤喉・跑後30分乳清蛋白+香蕉";
    } else {
      return "🥗 <strong>輕鬆日補給：</strong>可空腹慢跑促進燃脂效率・跑中僅需純水・跑後抗發炎均衡餐(優質蛋白質+好油脂)";
    }
  }
}

// ==========================================================================
// Render TJ's Stages
// ==========================================================================
function renderStage(stageKey, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const stage = TRAINING_DATA[stageKey];
  if (!stage) return;

  const checkedMap = getCheckedWorkouts("tj");

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

  const currentWeekInfo = getCurrentWeekInfo("tj");

  stage.weeks.forEach((week, wIndex) => {
    const isCurrentWeek = (currentWeekInfo && currentWeekInfo.weekId === week.id && currentWeekInfo.stageKey === stageKey);
    const expandedClass = isCurrentWeek ? "expanded current-week" : "";

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

    const matchedMap = getMatchedMap();

    week.days.forEach(day => {
      const matchedAct = matchedMap[day.id];
      const isChecked = !!checkedMap[day.id] || !!matchedAct;
      const completedClass = isChecked ? "completed" : "";

      html += `
        <div class="day-item ${completedClass}" id="item-${day.id}">
          <div class="day-item-top">
            <label class="day-checkbox-label">
              <input type="checkbox" class="day-checkbox" 
                     data-id="${day.id}" 
                     data-stage="${stageKey}"
                     data-runner="tj"
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
                <div class="day-nutrition-tip">${getWorkoutNutritionTip(day.type, 'tj')}</div>
                ${matchedAct ? `
                  <div class="strava-matched-pill">
                    <div style="display: flex; align-items: center; justify-content: space-between; width: 100%; flex-wrap: wrap; gap: 6px;">
                      <span>⚡ <strong>Strava 活動連動：</strong>${matchedAct.name} (${matchedAct.distanceKm}km @ ${matchedAct.avgPace}${matchedAct.avgHR ? ', 心率 ' + matchedAct.avgHR + 'bpm' : ''})</span>
                      <div style="display: flex; align-items: center; gap: 8px;">
                        <button class="btn-coach-review" type="button" onclick="event.preventDefault(); event.stopPropagation(); openCoachReviewModal('${matchedAct.id}', '${day.id}')">
                          🧠 AI 教練評析
                        </button>
                        <a href="https://www.strava.com/activities/${matchedAct.id}" target="_blank" onclick="event.stopPropagation()">Strava ➔</a>
                      </div>
                    </div>
                  </div>
                ` : ''}
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

// ==========================================================================
// Render Wife's 14-Week Plan
// ==========================================================================
function renderWifePlan() {
  const container = document.getElementById("wife-plan-container");
  if (!container) return;

  const data = WIFE_TRAINING_DATA;
  const checkedMap = getCheckedWorkouts("wife");

  let totalWorkouts = 0;
  let completedWorkouts = 0;

  data.weeks.forEach(w => {
    w.days.forEach(d => {
      totalWorkouts++;
      if (checkedMap[d.id]) completedWorkouts++;
    });
  });

  const progressPct = totalWorkouts > 0 ? Math.round((completedWorkouts / totalWorkouts) * 100) : 0;

  let html = `
    <!-- Wife Progress Card -->
    <div class="stage-progress-card" style="border-left: 4px solid var(--wife-primary);">
      <div class="progress-header">
        <div class="progress-title">
          <span style="color: var(--wife-light);">🌸 老婆台北馬完賽進度</span>
          <span class="badge-tag" style="background: rgba(244,63,94,0.15); color: #fda4af;">共 14 週 (42 堂課)</span>
        </div>
        <div class="progress-pct" id="pct-wife" style="color: var(--wife-light);">${progressPct}%</div>
      </div>
      <div class="progress-bar-bg">
        <div class="progress-bar-fill" id="bar-wife" style="width: ${progressPct}%; background: linear-gradient(90deg, #f43f5e 0%, #ec4899 100%);"></div>
      </div>
      <div class="progress-summary">
        <span id="stat-wife">已完成 ${completedWorkouts} / ${totalWorkouts} 堂訓練課表</span>
        <span>目標時間：<strong>2:30:00</strong> (均速 7'06\"/km)</span>
      </div>
    </div>
  `;

  const currentWeekInfo = getCurrentWeekInfo("wife");

  data.weeks.forEach((week, wIndex) => {
    const isCurrentWeek = (currentWeekInfo && currentWeekInfo.weekId === week.id);
    const expandedClass = isCurrentWeek ? "expanded current-week" : "";

    html += `
      <div class="week-card ${expandedClass}" id="card-${week.id}">
        <div class="week-header" onclick="toggleWeek('${week.id}')">
          <div class="week-title-wrap">
            <span class="week-number" style="color: #fda4af;">${week.num}</span>
            <span class="week-date">${week.date}</span>
            <span class="week-focus-badge">${week.focus}</span>
          </div>
          <span class="week-arrow">▼</span>
        </div>
        <div class="week-body">
          <div class="week-summary-note" style="border-left-color: var(--wife-primary);">
            🌸 <strong>本週指南：</strong>${week.note}
          </div>
          <div class="days-list">
    `;

    const matchedMap = getMatchedMap();

    week.days.forEach(day => {
      const matchedAct = matchedMap[day.id];
      const isChecked = !!checkedMap[day.id] || !!matchedAct;
      const completedClass = isChecked ? "completed" : "";

      html += `
        <div class="day-item ${completedClass}" id="item-${day.id}">
          <div class="day-item-top">
            <label class="day-checkbox-label">
              <input type="checkbox" class="day-checkbox" 
                     data-id="${day.id}" 
                     data-runner="wife"
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
                <div class="day-nutrition-tip">${getWorkoutNutritionTip(day.type, 'wife')}</div>
                ${matchedAct ? `
                  <div class="strava-matched-pill">
                    <div style="display: flex; align-items: center; justify-content: space-between; width: 100%; flex-wrap: wrap; gap: 6px;">
                      <span>⚡ <strong>Strava 活動連動：</strong>${matchedAct.name} (${matchedAct.distanceKm}km @ ${matchedAct.avgPace}${matchedAct.avgHR ? ', 心率 ' + matchedAct.avgHR + 'bpm' : ''})</span>
                      <div style="display: flex; align-items: center; gap: 8px;">
                        <button class="btn-coach-review" type="button" onclick="event.preventDefault(); event.stopPropagation(); openCoachReviewModal('${matchedAct.id}', '${day.id}')">
                          🧠 AI 教練評析
                        </button>
                        <a href="https://www.strava.com/activities/${matchedAct.id}" target="_blank" onclick="event.stopPropagation()">Strava ➔</a>
                      </div>
                    </div>
                  </div>
                ` : ''}
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
  const runner = checkbox.getAttribute("data-runner") || "tj";
  const stageKey = checkbox.getAttribute("data-stage");
  const isChecked = checkbox.checked;

  setWorkoutChecked(id, isChecked, runner);

  const item = document.getElementById(`item-${id}`);
  if (item) {
    if (isChecked) {
      item.classList.add("completed");
    } else {
      item.classList.remove("completed");
    }
  }

  // Update progress bar
  if (runner === "wife") {
    updateWifeProgress();
  } else if (stageKey) {
    updateStageProgress(stageKey);
  }
};

function updateStageProgress(stageKey) {
  const stage = TRAINING_DATA[stageKey];
  if (!stage) return;

  const checkedMap = getCheckedWorkouts("tj");
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

function updateWifeProgress() {
  const data = WIFE_TRAINING_DATA;
  const checkedMap = getCheckedWorkouts("wife");
  let total = 0;
  let completed = 0;

  data.weeks.forEach(w => {
    w.days.forEach(d => {
      total++;
      if (checkedMap[d.id]) completed++;
    });
  });

  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  const pctEl = document.getElementById("pct-wife");
  const barEl = document.getElementById("bar-wife");
  const statEl = document.getElementById("stat-wife");

  if (pctEl) pctEl.innerText = `${pct}%`;
  if (barEl) barEl.style.width = `${pct}%`;
  if (statEl) statEl.innerText = `已完成 ${completed} / ${total} 堂訓練課表`;
}

// ==========================================================================
// Runner Switcher (TJ vs Wife)
// ==========================================================================
function switchRunner(runner) {
  const body = document.body;
  const tjBtn = document.getElementById("switch-btn-tj");
  const wifeBtn = document.getElementById("switch-btn-wife");

  const tjView = document.getElementById("view-tj");
  const wifeView = document.getElementById("view-wife");

  if (runner === "wife") {
    body.classList.add("theme-wife");
    tjBtn.classList.remove("active");
    wifeBtn.classList.add("active");

    tjView.style.display = "none";
    wifeView.style.display = "block";
    localStorage.setItem(STORAGE_KEY_RUNNER, "wife");
  } else {
    body.classList.remove("theme-wife");
    wifeBtn.classList.remove("active");
    tjBtn.classList.add("active");

    wifeView.style.display = "none";
    tjView.style.display = "block";
    localStorage.setItem(STORAGE_KEY_RUNNER, "tj");
  }

  // Scroll to top of runner view
  window.scrollTo({ top: 0, behavior: 'smooth' });
  updateCurrentWeekButton();
}
window.switchRunner = switchRunner;

// ==========================================================================
// Tabs Navigation
// ==========================================================================
function setupNavigation() {
  // Navigation for TJ view
  const navBtnsTJ = document.querySelectorAll("#view-tj .nav-btn");
  const tabPanesTJ = document.querySelectorAll("#view-tj .tab-pane");

  navBtnsTJ.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetTab = btn.getAttribute("data-tab");
      navBtnsTJ.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      tabPanesTJ.forEach(pane => {
        pane.classList.remove("active");
        if (pane.id === `tab-${targetTab}`) {
          pane.classList.add("active");
        }
      });
      btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    });
  });

  // Navigation for Wife view
  const navBtnsWife = document.querySelectorAll("#view-wife .nav-btn");
  const tabPanesWife = document.querySelectorAll("#view-wife .tab-pane");

  navBtnsWife.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetTab = btn.getAttribute("data-tab");
      navBtnsWife.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      tabPanesWife.forEach(pane => {
        pane.classList.remove("active");
        if (pane.id === `tab-wife-${targetTab}`) {
          pane.classList.add("active");
        }
      });
      btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    });
  });
}

// ==========================================================================
// Date Range & Calendar Helpers (Strict Non-Overlapping)
// ==========================================================================
function parseDateRange(dateStr, defaultYear = 2026) {
  if (!dateStr || !dateStr.includes("-")) return null;
  const parts = dateStr.split("-").map(p => p.trim());
  if (parts.length !== 2) return null;

  const [m1, d1] = parts[0].split("/").map(Number);
  const [m2, d2] = parts[1].split("/").map(Number);

  let y1 = defaultYear;
  let y2 = defaultYear;
  // Year rollover for Jan / Feb 2027
  if (m1 <= 2) y1 = 2027;
  if (m2 <= 2) y2 = 2027;

  // Strict boundaries: 00:00:00 of start date to 23:59:59 of end date
  const start = new Date(y1, m1 - 1, d1, 0, 0, 0);
  const end = new Date(y2, m2 - 1, d2, 23, 59, 59);
  return { start, end };
}

function findWeekForDate(dateObj, runner = "tj") {
  if (!dateObj) return null;
  const t = dateObj.getTime();

  if (runner === "wife") {
    for (const week of WIFE_TRAINING_DATA.weeks) {
      const range = parseDateRange(week.date);
      if (range && t >= range.start.getTime() && t <= range.end.getTime()) {
        return { week, runner: "wife" };
      }
    }
  } else {
    for (const stageKey of Object.keys(TRAINING_DATA)) {
      const stage = TRAINING_DATA[stageKey];
      for (const week of stage.weeks) {
        const range = parseDateRange(week.date);
        if (range && t >= range.start.getTime() && t <= range.end.getTime()) {
          return { week, stageKey, stage, runner: "tj" };
        }
      }
    }
  }
  return null;
}

function getCurrentWeekInfo(runner = "tj") {
  const now = new Date();
  const weekMatch = findWeekForDate(now, runner);

  if (weekMatch) {
    return {
      weekId: weekMatch.week.id,
      stageKey: weekMatch.stageKey || null,
      weekNum: weekMatch.week.num,
      weekDate: weekMatch.week.date,
      cardId: runner === "wife" ? `card-wife-${weekMatch.week.id}` : `card-${weekMatch.week.id}`
    };
  }

  // Fallback if before plan start or after plan end
  if (runner === "wife") {
    const firstWeek = WIFE_TRAINING_DATA.weeks[0];
    const lastWeek = WIFE_TRAINING_DATA.weeks[WIFE_TRAINING_DATA.weeks.length - 1];
    const firstRange = parseDateRange(firstWeek.date);
    if (firstRange && now < firstRange.start) {
      return { weekId: firstWeek.id, weekNum: firstWeek.num, weekDate: firstWeek.date, cardId: `card-wife-${firstWeek.id}` };
    }
    return { weekId: lastWeek.id, weekNum: lastWeek.num, weekDate: lastWeek.date, cardId: `card-wife-${lastWeek.id}` };
  } else {
    const stage1 = TRAINING_DATA.stage1;
    const firstWeek = stage1.weeks[0];
    const firstRange = parseDateRange(firstWeek.date);
    if (firstRange && now < firstRange.start) {
      return { weekId: firstWeek.id, stageKey: "stage1", weekNum: firstWeek.num, weekDate: firstWeek.date, cardId: `card-${firstWeek.id}` };
    }
    const stage3 = TRAINING_DATA.stage3;
    const lastWeek = stage3.weeks[stage3.weeks.length - 1];
    return { weekId: lastWeek.id, stageKey: "stage3", weekNum: lastWeek.num, weekDate: lastWeek.date, cardId: `card-${lastWeek.id}` };
  }
}

function updateCurrentWeekButton() {
  const currentRunner = localStorage.getItem(STORAGE_KEY_RUNNER) || "tj";
  const info = getCurrentWeekInfo(currentRunner);
  const btnText = document.getElementById("floating-week-text");
  if (btnText && info) {
    btnText.textContent = `跳至本週課表 (${info.weekNum})`;
  }
}
window.updateCurrentWeekButton = updateCurrentWeekButton;

// Quick jump to current week
window.jumpToCurrentWeek = function() {
  const currentRunner = localStorage.getItem(STORAGE_KEY_RUNNER) || "tj";
  const info = getCurrentWeekInfo(currentRunner);
  if (!info) return;

  if (currentRunner === "tj" && info.stageKey) {
    const navBtns = document.querySelectorAll("#view-tj .nav-btn");
    navBtns.forEach(btn => {
      if (btn.getAttribute("data-tab") === info.stageKey) {
        btn.click();
      }
    });
  } else if (currentRunner === "wife") {
    const planBtn = document.querySelector("#view-wife .nav-btn[data-tab='plan']");
    if (planBtn) planBtn.click();
  }

  setTimeout(() => {
    const card = document.getElementById(info.cardId);
    if (card) {
      if (!card.classList.contains("expanded")) {
        card.classList.add("expanded");
      }
      card.classList.add("current-week");
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      showToast(`已跳至本週課表 (${info.weekNum}：${info.weekDate})`);
    } else {
      showToast(`正在前往 ${info.weekNum} 課表...`);
    }
  }, 120);
};

// ==========================================================================
// Toast Notification Helper
// ==========================================================================
function showToast(msg) {
  const container = document.getElementById("toast-container");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = "toast-notification";
  toast.innerHTML = `✨ ${msg}`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.4s ease";
    setTimeout(() => toast.remove(), 400);
  }, 4500);
}
window.showToast = showToast;

// ==========================================================================
// Strava API & Apple Watch Integration Module
// ==========================================================================
const STRAVA_STORAGE = {
  CLIENT_ID: "strava_client_id",
  CLIENT_SECRET: "strava_client_secret",
  ACCESS_TOKEN: "strava_access_token",
  REFRESH_TOKEN: "strava_refresh_token",
  ATHLETE: "strava_athlete",
  ACTIVITIES: "strava_cached_activities",
  LAST_SYNC: "strava_last_sync_time"
};

// Modal Control
window.openStravaModal = function() {
  const modal = document.getElementById("strava-modal");
  if (modal) modal.style.display = "flex";

  const savedId = localStorage.getItem(STRAVA_STORAGE.CLIENT_ID) || "";
  const savedSecret = localStorage.getItem(STRAVA_STORAGE.CLIENT_SECRET) || "";
  const idInput = document.getElementById("strava-client-id-input");
  const secretInput = document.getElementById("strava-client-secret-input");

  if (idInput && savedId) idInput.value = savedId;
  if (secretInput && savedSecret) secretInput.value = savedSecret;
};

window.closeStravaModal = function() {
  const modal = document.getElementById("strava-modal");
  if (modal) modal.style.display = "none";
};

window.openAppleWatchGuide = function() {
  openStravaModal();
  switchModalTab("apple");
};

window.switchModalTab = function(tabName) {
  const tabs = ["oauth", "token", "apple"];
  tabs.forEach(t => {
    const btn = document.getElementById(`modal-tab-${t}`);
    const panel = document.getElementById(`modal-panel-${t}`);
    if (btn) btn.classList.toggle("active", t === tabName);
    if (panel) panel.style.display = t === tabName ? "block" : "none";
  });
};

// Start OAuth Authorization
window.startStravaOAuth = function() {
  const idInput = document.getElementById("strava-client-id-input");
  const secretInput = document.getElementById("strava-client-secret-input");

  const clientId = idInput ? idInput.value.trim() : "";
  const clientSecret = secretInput ? secretInput.value.trim() : "";

  if (!clientId) {
    alert("請輸入 Strava Client ID！");
    return;
  }

  localStorage.setItem(STRAVA_STORAGE.CLIENT_ID, clientId);
  if (clientSecret) {
    localStorage.setItem(STRAVA_STORAGE.CLIENT_SECRET, clientSecret);
  }

  const redirectUri = window.location.origin + window.location.pathname;
  const scope = "read,activity:read_all";
  const authUrl = `https://www.strava.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&approval_prompt=auto`;

  window.location.href = authUrl;
};

// Save Direct Token
window.saveDirectToken = async function() {
  const tokenInput = document.getElementById("strava-direct-token-input");
  const token = tokenInput ? tokenInput.value.trim() : "";

  if (!token) {
    alert("請輸入有效的 Strava Access Token 或 Refresh Token！");
    return;
  }

  localStorage.setItem(STRAVA_STORAGE.ACCESS_TOKEN, token);
  closeStravaModal();
  showToast("正在驗證 Strava Token 並抓取數據...");

  try {
    const athlete = await fetchStravaAthlete(token);
    localStorage.setItem(STRAVA_STORAGE.ATHLETE, JSON.stringify(athlete));
    await syncStravaActivities(true);
    updateStravaUIStatus();
  } catch (err) {
    showToast(`Token 驗證失敗: ${err.message || '請確認權限是否包含 activity:read_all'}`);
  }
};

// Handle OAuth Redirect Callback (?code=...)
async function handleOAuthCallback() {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");

  if (!code) return;

  const clientId = localStorage.getItem(STRAVA_STORAGE.CLIENT_ID);
  const clientSecret = localStorage.getItem(STRAVA_STORAGE.CLIENT_SECRET);

  if (!clientId || !clientSecret) {
    openStravaModal();
    showToast("已檢測到 Strava 授權碼！請確認 Client ID 與 Secret 完成對接。");
    return;
  }

  showToast("正在透過授權碼換取 Strava Access Token...");

  try {
    const res = await fetch("https://www.strava.com/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: clientId.trim(),
        client_secret: clientSecret.trim(),
        code: code.trim(),
        grant_type: "authorization_code"
      })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `HTTP ${res.status}`);
    }

    const data = await res.json();
    localStorage.setItem(STRAVA_STORAGE.ACCESS_TOKEN, data.access_token);
    if (data.refresh_token) {
      localStorage.setItem(STRAVA_STORAGE.REFRESH_TOKEN, data.refresh_token);
    }
    if (data.athlete) {
      localStorage.setItem(STRAVA_STORAGE.ATHLETE, JSON.stringify(data.athlete));
    }

    // Clean URL
    window.history.replaceState({}, document.title, window.location.pathname);

    showToast(`🎉 Strava 連線成功！歡迎 ${data.athlete?.firstname || '跑者'}！`);
    await syncStravaActivities(true);
    updateStravaUIStatus();
  } catch (err) {
    showToast(`Strava 授權換取 Token 失敗: ${err.message}`);
  }
}

// Refresh Token Helper
async function refreshStravaToken() {
  const clientId = localStorage.getItem(STRAVA_STORAGE.CLIENT_ID);
  const clientSecret = localStorage.getItem(STRAVA_STORAGE.CLIENT_SECRET);
  const refreshToken = localStorage.getItem(STRAVA_STORAGE.REFRESH_TOKEN);

  if (!clientId || !clientSecret || !refreshToken) return null;

  try {
    const res = await fetch("https://www.strava.com/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: clientId.trim(),
        client_secret: clientSecret.trim(),
        refresh_token: refreshToken.trim(),
        grant_type: "refresh_token"
      })
    });

    if (!res.ok) return null;

    const data = await res.json();
    if (data.access_token) {
      localStorage.setItem(STRAVA_STORAGE.ACCESS_TOKEN, data.access_token);
      if (data.refresh_token) {
        localStorage.setItem(STRAVA_STORAGE.REFRESH_TOKEN, data.refresh_token);
      }
      return data.access_token;
    }
    return null;
  } catch (e) {
    return null;
  }
}

// Fetch Athlete Profile
async function fetchStravaAthlete(token) {
  const res = await fetch("https://www.strava.com/api/v3/athlete", {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error(`獲取跑者資訊失敗 (${res.status})`);
  return await res.json();
}

// Format Pace from m/s
function formatPace(speedMps) {
  if (!speedMps || speedMps <= 0) return "--:--/km";
  const secPerKm = 1000 / speedMps;
  const min = Math.floor(secPerKm / 60);
  const sec = Math.round(secPerKm % 60);
  return `${min}'${String(sec).padStart(2, "0")}"/km`;
}

// Sync Activities & Smart Match
window.syncStravaActivities = async function(isManual = false) {
  let token = localStorage.getItem(STRAVA_STORAGE.ACCESS_TOKEN);
  if (!token) {
    if (isManual) openStravaModal();
    return;
  }

  if (isManual) showToast("正在向 Strava 同步最新跑步紀錄...");

  try {
    let res = await fetch("https://www.strava.com/api/v3/athlete/activities?per_page=30", {
      headers: { Authorization: `Bearer ${token}` }
    });

    // If token expired, try refreshing
    if (res.status === 401) {
      const refreshed = await refreshStravaToken();
      if (refreshed) {
        token = refreshed;
        res = await fetch("https://www.strava.com/api/v3/athlete/activities?per_page=30", {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        throw new Error("Token 已過期，請重新授權！");
      }
    }

    if (!res.ok) throw new Error(`Strava API 請求失敗 (${res.status})`);

    const rawActivities = await res.json();
    const runs = rawActivities
      .filter(act => act.type === "Run" || act.sport_type === "Run")
      .map(act => ({
        id: act.id,
        name: act.name,
        date: act.start_date_local ? act.start_date_local.split("T")[0] : "",
        distanceKm: Math.round((act.distance / 1000) * 10) / 10,
        movingTimeMin: Math.round(act.moving_time / 60),
        avgPace: formatPace(act.average_speed),
        avgHR: act.average_heartrate ? Math.round(act.average_heartrate) : null,
        maxHR: act.max_heartrate ? Math.round(act.max_heartrate) : null,
        totalElevationGain: Math.round(act.total_elevation_gain || 0),
        avgCadence: act.average_cadence ? Math.round(act.average_cadence * (act.average_cadence < 120 ? 2 : 1)) : null,
        elapsedTimeMin: Math.round((act.elapsed_time || act.moving_time) / 60)
      }));

    localStorage.setItem(STRAVA_STORAGE.ACTIVITIES, JSON.stringify(runs));
    localStorage.setItem(STRAVA_STORAGE.LAST_SYNC, new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

    // Run Smart Auto-Check Matcher
    const matchCount = matchStravaActivitiesToWorkouts(runs);

    // Refresh UI
    updateStravaUIStatus();
    renderStage("stage1", "stage1-container");
    renderStage("stage2", "stage2-container");
    renderStage("stage3", "stage3-container");
    renderWifePlan();

    if (isManual) {
      showToast(`🎉 成功同步 Strava！獲取 ${runs.length} 筆跑步，並自動配對打勾 ${matchCount} 堂課表！`);
    }
  } catch (err) {
    if (isManual) showToast(`同步失敗: ${err.message}`);
  }
};

// Smart Auto-Check Matcher (Strict Non-Overlapping & Dedicated Runner Binding)
function matchStravaActivitiesToWorkouts(runs) {
  if (!runs || runs.length === 0) return 0;

  // Determine target runner: default "tj" unless configured
  const targetRunner = localStorage.getItem("strava_sync_target_runner") || "tj";

  const matchedMap = getMatchedMap();
  let newMatchCount = 0;

  // Sort activities chronologically (oldest to newest)
  const sortedRuns = [...runs].sort((a, b) => (a.date || "").localeCompare(b.date || ""));

  sortedRuns.forEach(act => {
    if (!act.date) return;
    const [y, m, d] = act.date.split("-").map(Number);
    const actDate = new Date(y, m - 1, d, 12, 0, 0);

    // Strictly find the week this date belongs to!
    const weekMatch = findWeekForDate(actDate, targetRunner);
    if (!weekMatch) return; // Outside training calendar or not in this runner's plan

    const week = weekMatch.week;

    // Check if this activity is already matched
    const isActAlreadyMatched = Object.values(matchedMap).some(m => String(m.id) === String(act.id));
    if (isActAlreadyMatched) return;

    let targetDay = null;

    if (targetRunner === "tj") {
      if (act.distanceKm >= 9) {
        // Long run (Day 3)
        targetDay = week.days.find(d => (d.type === "long" || d.type === "race" || d.type === "couple") && !matchedMap[d.id]);
      } else if (act.distanceKm >= 3.5) {
        // Quality or Easy run (Day 1 or Day 2)
        targetDay = week.days.find(d => d.type === "quality" && !matchedMap[d.id]);
        if (!targetDay) {
          targetDay = week.days.find(d => d.type === "easy" && !matchedMap[d.id]);
        }
      }
    } else {
      // Wife's plan
      if (act.distanceKm >= 7) {
        targetDay = week.days.find(d => (d.type === "couple" || d.type === "race" || d.type === "long") && !matchedMap[d.id]);
      } else if (act.distanceKm >= 3) {
        targetDay = week.days.find(d => (d.type === "quality" || d.type === "easy") && !matchedMap[d.id]);
      }
    }

    if (targetDay && !matchedMap[targetDay.id]) {
      matchedMap[targetDay.id] = {
        id: act.id,
        name: act.name,
        distanceKm: act.distanceKm,
        avgPace: act.avgPace,
        avgHR: act.avgHR,
        date: act.date
      };
      setWorkoutChecked(targetDay.id, true, targetRunner);
      newMatchCount++;
    }
  });

  setMatchedMap(matchedMap);
  return newMatchCount;
}

// Recalibrate and clean erroneous legacy matches
function recalibrateStravaMatches() {
  const rawActivities = localStorage.getItem(STRAVA_STORAGE.ACTIVITIES);
  if (!rawActivities) return 0;

  let runs = [];
  try {
    runs = JSON.parse(rawActivities);
  } catch (e) {
    return 0;
  }

  // Clear previous auto-checked items from matchedMap
  const oldMatchedMap = getMatchedMap();
  const tjChecked = getCheckedWorkouts("tj");
  const wifeChecked = getCheckedWorkouts("wife");

  Object.keys(oldMatchedMap).forEach(dayId => {
    if (dayId.startsWith("wife-")) {
      delete wifeChecked[dayId];
    } else {
      delete tjChecked[dayId];
    }
  });

  try {
    localStorage.setItem(STORAGE_KEY_TJ, JSON.stringify(tjChecked));
    localStorage.setItem(STORAGE_KEY_WIFE, JSON.stringify(wifeChecked));
    localStorage.removeItem(STORAGE_KEY_MATCHED);
  } catch (e) {}

  // Re-run matching with clean strict logic
  const matchCount = matchStravaActivitiesToWorkouts(runs);

  // Refresh UI
  renderStage("stage1", "stage1-container");
  renderStage("stage2", "stage2-container");
  renderStage("stage3", "stage3-container");
  renderWifePlan();
  updateStravaUIStatus();
  updateCurrentWeekButton();
  return matchCount;
}
window.recalibrateStravaMatches = recalibrateStravaMatches;

window.toggleStravaTargetRunner = function() {
  const current = localStorage.getItem("strava_sync_target_runner") || "tj";
  const next = current === "wife" ? "tj" : "wife";
  localStorage.setItem("strava_sync_target_runner", next);
  recalibrateStravaMatches();
  updateStravaUIStatus();
  showToast(`已切換 Strava 連動目標為：${next === 'wife' ? '🏃‍♀️ 老婆的課表' : '🏃‍♂️ TJ 的課表'}，並已重新精準配對！`);
};

// Disconnect Strava
window.disconnectStrava = function() {
  if (!confirm("確定要中斷與 Strava 的連線嗎？（已打勾紀錄將完整保留）")) return;

  localStorage.removeItem(STRAVA_STORAGE.ACCESS_TOKEN);
  localStorage.removeItem(STRAVA_STORAGE.REFRESH_TOKEN);
  localStorage.removeItem(STRAVA_STORAGE.ATHLETE);
  localStorage.removeItem(STRAVA_STORAGE.ACTIVITIES);
  localStorage.removeItem(STRAVA_STORAGE.LAST_SYNC);

  updateStravaUIStatus();
  showToast("已成功中斷 Strava 連線。");
};

// Update UI Status Bar
function updateStravaUIStatus() {
  const pill = document.getElementById("strava-status-pill");
  const desc = document.getElementById("strava-status-desc");
  const actions = document.getElementById("strava-actions-container");

  if (!pill || !desc || !actions) return;

  const token = localStorage.getItem(STRAVA_STORAGE.ACCESS_TOKEN);
  const athleteRaw = localStorage.getItem(STRAVA_STORAGE.ATHLETE);
  const lastSync = localStorage.getItem(STRAVA_STORAGE.LAST_SYNC);
  const activitiesRaw = localStorage.getItem(STRAVA_STORAGE.ACTIVITIES);

  let athlete = null;
  let runsCount = 0;

  try {
    if (athleteRaw) athlete = JSON.parse(athleteRaw);
    if (activitiesRaw) runsCount = JSON.parse(activitiesRaw).length;
  } catch (e) {}

  const targetRunner = localStorage.getItem("strava_sync_target_runner") || "tj";
  const runnerLabel = targetRunner === "wife" ? "🏃‍♀️ 老婆專屬 (台北馬 2:30)" : "🏃‍♂️ TJ (跑季三部曲)";

  if (token) {
    pill.className = "strava-status-pill connected";
    pill.innerHTML = `● 已連結 Strava (${athlete ? athlete.firstname : "已就緒"})`;

    desc.innerHTML = `
      ✅ <strong>Strava 實時連線中</strong>（支援 Apple Watch / Garmin 跑完自動同步）。<br>
      ${lastSync ? `最近同步時間：<strong>${lastSync}</strong>（共載入 ${runsCount} 筆跑步紀錄）` : "點擊下方按鈕即可同步最新紀錄！"}
      <div style="margin-top: 6px; font-size: 0.8rem; color: #94a3b8; display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
        <span>🎯 連動目標：<strong style="color: #fff;">${runnerLabel}</strong></span>
        <button class="btn-secondary btn-sm" style="padding: 2px 8px; font-size: 0.72rem;" onclick="toggleStravaTargetRunner()">
          切換至 ${targetRunner === 'wife' ? 'TJ' : '老婆'}
        </button>
      </div>
    `;

    actions.innerHTML = `
      <button class="btn-strava btn-sm" onclick="syncStravaActivities(true)">
        🔄 立即同步最新活動
      </button>
      <button class="btn-secondary btn-sm" onclick="recalibrateStravaMatches(); showToast('已重新校正所有課表配對！');">
        🧹 重新校正配對
      </button>
      <button class="btn-secondary btn-sm" onclick="openActivitiesModal()">
        📋 查看近期跑步 (${runsCount})
      </button>
      <button class="btn-secondary btn-sm" onclick="openAppleWatchGuide()">
        ⌚ Apple Watch 設定
      </button>
      <button class="btn-secondary btn-sm" style="color: #fda4af;" onclick="disconnectStrava()">
        ❌ 斷開連線
      </button>
    `;
  } else {
    pill.className = "strava-status-pill disconnected";
    pill.innerHTML = `● 尚未連結 Strava`;

    desc.innerHTML = `
      支援 <strong>Apple Watch</strong> 與 Garmin 跑完自動同步！一鍵連線後自動抓取真實跑步數據，並為當週課表<strong>自動配對打勾</strong>。
      <div style="margin-top: 6px; font-size: 0.8rem; color: #94a3b8;">
        預設連動目標：<strong>${runnerLabel}</strong>
      </div>
    `;

    actions.innerHTML = `
      <button class="btn-strava btn-sm" onclick="openStravaModal()">
        🔗 連結 Strava 帳號
      </button>
      <button class="btn-secondary btn-sm" onclick="openAppleWatchGuide()">
        ⌚ Apple Watch 同步教學
      </button>
    `;
  }
}

// Activities Modal Control
window.openActivitiesModal = function() {
  const modal = document.getElementById("strava-activities-modal");
  const list = document.getElementById("strava-activities-list");
  if (!modal || !list) return;

  modal.style.display = "flex";

  const raw = localStorage.getItem(STRAVA_STORAGE.ACTIVITIES);
  let runs = [];
  try {
    if (raw) runs = JSON.parse(raw);
  } catch (e) {}

  if (runs.length === 0) {
    list.innerHTML = `
      <p style="text-align: center; color: var(--text-muted); padding: 24px;">
        目前尚無快取的跑步活動。請點擊下方「重新抓取」按鈕同步！
      </p>
    `;
    return;
  }

  const matchedMap = getMatchedMap();
  const matchedIds = new Set(Object.values(matchedMap).map(m => m.id));

  let html = `<div style="display: flex; flex-direction: column; gap: 8px;">`;
  runs.slice(0, 15).forEach(run => {
    const isMatched = matchedIds.has(run.id);

    html += `
      <div class="strava-activity-item">
        <div>
          <div style="font-weight: 700; color: #fff; font-size: 0.92rem; margin-bottom: 2px;">
            ${run.name}
          </div>
          <div style="font-size: 0.78rem; color: var(--text-muted);">
            📅 ${run.date} • 距離: <strong style="color: #ff8b57;">${run.distanceKm} km</strong> • 配速: <strong>${run.avgPace}</strong>
            ${run.avgHR ? ` • 心率: <strong>${run.avgHR} bpm</strong>` : ""}
          </div>
        </div>
        <div style="text-align: right; flex-shrink: 0; display: flex; flex-direction: column; align-items: flex-end; gap: 4px;">
          ${isMatched ? `
            <span class="badge-tag" style="background: rgba(16,185,129,0.2); color: #34d399; margin-bottom: 2px; display: inline-block;">
              ✓ 已配對打勾
            </span>
          ` : ""}
          <div style="display: flex; align-items: center; gap: 6px;">
            <button class="btn-coach-review" type="button" onclick="openCoachReviewModal('${run.id}')">
              🧠 AI 教練評析
            </button>
            <a href="https://www.strava.com/activities/${run.id}" target="_blank" style="font-size: 0.74rem; color: #38bdf8; text-decoration: underline;">
              Strava ➔
            </a>
          </div>
        </div>
      </div>
    `;
  });
  html += `</div>`;

  list.innerHTML = html;
};

window.closeActivitiesModal = function() {
  const modal = document.getElementById("strava-activities-modal");
  if (modal) modal.style.display = "none";
};

// ==========================================================================
// AI Running Coach Review & Analysis Engine
// ==========================================================================
let currentReviewReportMarkdown = "";

function parsePaceSeconds(paceStr) {
  if (!paceStr) return null;
  const match = paceStr.match(/(\d+)['’:](\d+)/);
  if (!match) return null;
  return parseInt(match[1], 10) * 60 + parseInt(match[2], 10);
}

function formatPaceFromSeconds(totalSecs) {
  if (!totalSecs || totalSecs <= 0) return "--'--\"";
  const m = Math.floor(totalSecs / 60);
  const s = Math.round(totalSecs % 60);
  return `${m}'${s.toString().padStart(2, "0")}"`;
}

function findWorkoutDayById(dayId) {
  if (!dayId) return null;
  for (const sKey of Object.keys(TRAINING_DATA)) {
    const stage = TRAINING_DATA[sKey];
    for (const w of stage.weeks) {
      for (const d of w.days) {
        if (d.id === dayId) return { day: d, week: w, stage: stage, runner: "tj" };
      }
    }
  }
  for (const w of WIFE_TRAINING_DATA.weeks) {
    for (const d of w.days) {
      if (d.id === dayId) return { day: d, week: w, runner: "wife" };
    }
  }
  return null;
}

function getMatchedDayForActivity(activityId) {
  const matchedMap = getMatchedMap();
  for (const [dayId, act] of Object.entries(matchedMap)) {
    if (act.id === activityId || String(act.id) === String(activityId)) {
      return findWorkoutDayById(dayId);
    }
  }
  return null;
}

function analyzeRunningActivity(act, matchedCtx, currentRunner) {
  const dist = parseFloat(act.distanceKm) || 0;
  const paceSec = parsePaceSeconds(act.avgPace);
  const hr = act.avgHR ? parseInt(act.avgHR, 10) : null;
  const maxHr = act.maxHR ? parseInt(act.maxHR, 10) : null;
  const elev = act.totalElevationGain || 0;
  const cadence = act.avgCadence || null;

  // Determine workout type
  let workoutType = "easy";
  let workoutName = "自主有氧練跑";
  let targetDistKm = dist;
  let targetPaceMinSec = null;
  let targetPaceMaxSec = null;
  let targetHRZone = "Z2 (128-145 bpm)";
  let isWife = currentRunner === "wife";

  if (matchedCtx && matchedCtx.day) {
    const d = matchedCtx.day;
    workoutType = d.type;
    workoutName = `${matchedCtx.week.num} ${d.dayName}：${d.title}`;
    if (matchedCtx.runner === "wife") isWife = true;

    // Parse target distance
    const distMatch = d.dist.match(/([\d\.]+)/);
    if (distMatch) targetDistKm = parseFloat(distMatch[1]);

    // Parse target pace
    const paces = d.pace.match(/(\d+)['’:](\d+)/g);
    if (paces && paces.length >= 2) {
      targetPaceMinSec = parsePaceSeconds(paces[0]);
      targetPaceMaxSec = parsePaceSeconds(paces[1]);
      if (targetPaceMinSec > targetPaceMaxSec) {
        const tmp = targetPaceMinSec; targetPaceMinSec = targetPaceMaxSec; targetPaceMaxSec = tmp;
      }
    } else if (paces && paces.length === 1) {
      const mid = parsePaceSeconds(paces[0]);
      targetPaceMinSec = mid - 10;
      targetPaceMaxSec = mid + 10;
    }
    targetHRZone = d.hr;
  } else {
    // Autodetect based on distance
    if (dist >= 11) {
      workoutType = "long";
      workoutName = "週末長距離耐力跑 (LSD)";
      targetDistKm = dist;
      targetPaceMinSec = isWife ? parsePaceSeconds("7'10\"") : parsePaceSeconds("6'30\"");
      targetPaceMaxSec = isWife ? parsePaceSeconds("7'30\"") : parsePaceSeconds("7'00\"");
      targetHRZone = "Z2 (128-145 bpm)";
    } else if (dist >= 5 && paceSec && paceSec < (isWife ? 430 : 380)) {
      workoutType = "quality";
      workoutName = "節奏/門檻質量跑";
      targetDistKm = dist;
      targetPaceMinSec = isWife ? parsePaceSeconds("6'55\"") : parsePaceSeconds("6'10\"");
      targetPaceMaxSec = isWife ? parsePaceSeconds("7'10\"") : parsePaceSeconds("6'30\"");
      targetHRZone = "Z3~Z4 (145-165 bpm)";
    } else {
      workoutType = "easy";
      workoutName = "基礎有氧/恢復慢跑";
      targetDistKm = dist;
      targetPaceMinSec = isWife ? parsePaceSeconds("7'20\"") : parsePaceSeconds("6'45\"");
      targetPaceMaxSec = isWife ? parsePaceSeconds("7'50\"") : parsePaceSeconds("7'20\"");
      targetHRZone = "Z1~Z2 (120-142 bpm)";
    }
  }

  // 1. Distance Adherence (Max 35 pts)
  let distScore = 35;
  let distComment = "";
  if (targetDistKm > 0) {
    const ratio = dist / targetDistKm;
    if (ratio >= 0.95 && ratio <= 1.25) {
      distScore = 35;
      distComment = `里程達成度 ${Math.round(ratio * 100)}%，完美達成課表目標！`;
    } else if (ratio > 1.25) {
      distScore = 32;
      distComment = `跑量超標完成 (${dist}km vs 目標 ${targetDistKm}km)，體能儲備充沛，注意跑後肌肉放鬆。`;
    } else if (ratio >= 0.8) {
      distScore = 28;
      distComment = `完成目標里程的 ${Math.round(ratio * 100)}%，有效刺激有氧耐力。`;
    } else {
      distScore = 20;
      distComment = `本次完成 ${dist}km (課表目標 ${targetDistKm}km)，若遇身體疲勞適時停跑減量是明智的選擇。`;
    }
  }

  // 2. Pace Execution (Max 35 pts)
  let paceScore = 32;
  let paceComment = "";
  if (paceSec && targetPaceMinSec && targetPaceMaxSec) {
    if (paceSec >= targetPaceMinSec && paceSec <= targetPaceMaxSec) {
      paceScore = 35;
      paceComment = `平均配速 ${act.avgPace} 精準切中目標區間 (${formatPaceFromSeconds(targetPaceMinSec)} ~ ${formatPaceFromSeconds(targetPaceMaxSec)})！體感掌控度極高。`;
    } else if (paceSec < targetPaceMinSec) {
      const diffSec = targetPaceMinSec - paceSec;
      if (workoutType === "easy" || workoutType === "long") {
        if (diffSec <= 15) {
          paceScore = 32;
          paceComment = `配速略微偏快 (${act.avgPace})，狀態極佳但長距離要留有餘力，壓抑起跑興奮感。`;
        } else {
          paceScore = 26;
          paceComment = `配速過衝！均速 ${act.avgPace} 比目標快了 ${diffSec} 秒/km。請留意「長距離跑太快」容易消耗過多肌醣原，延緩微血管增生效益。`;
        }
      } else {
        paceScore = 35;
        paceComment = `配速強勁 (${act.avgPace})！比預期節奏更快，速耐力爆發力相當優秀！`;
      }
    } else {
      const diffSec = paceSec - targetPaceMaxSec;
      if (diffSec <= 20) {
        paceScore = 30;
        paceComment = `配速沉穩 (${act.avgPace})，順應當天氣溫與體能調節節奏，符合耐力訓練原則。`;
      } else {
        paceScore = 25;
        paceComment = `配速略為保守 (${act.avgPace})，建議後續可嘗試後段微幅巡航加溫 (Negative Split)。`;
      }
    }
  } else {
    paceComment = `平均配速 ${act.avgPace}，節奏勻稱。`;
  }

  // 3. Heart Rate Quality (Max 30 pts)
  let hrScore = 28;
  let hrComment = "";
  let hrZoneDetail = "";
  if (hr) {
    if (hr < 128) {
      hrZoneDetail = "Z1 積極恢復區 (<128 bpm)";
      hrScore = (workoutType === "easy") ? 30 : 25;
      hrComment = "心率處於低強度有氧，促進乳酸代謝與微血管循環，恢復效益顯著。";
    } else if (hr <= 145) {
      hrZoneDetail = "Z2 基礎有氧耐力區 (128-145 bpm)";
      hrScore = 30;
      hrComment = "心率完美鎖定在 Z2 黃金耐力區間！這是強化脂肪燃燒引擎與提升心臟每搏輸出量的最佳心率。";
    } else if (hr <= 158) {
      hrZoneDetail = "Z3 節奏有氧 / 馬拉松配速區 (146-158 bpm)";
      if (workoutType === "quality" || workoutType === "race") {
        hrScore = 30;
        hrComment = "心率處於馬拉松配速高效率區，穩定提升長距離抗疲勞耐受力。";
      } else {
        hrScore = 25;
        hrComment = "心率略高進入 Z3 區間。週末長距離時若長期待在 Z3 容易累積深層疲勞，建議下次起跑前 3K 有意壓低心率。";
      }
    } else if (hr <= 170) {
      hrZoneDetail = "Z4 乳酸閾值門檻區 (159-170 bpm)";
      if (workoutType === "quality") {
        hrScore = 30;
        hrComment = "心肺強烈刺激！成功觸及乳酸清除極限，對半馬最後 5 公里的巡航速耐力大有裨益。";
      } else {
        hrScore = 20;
        hrComment = "心率偏高進入門檻區！對於長距離或輕鬆跑而言強度偏大，跑後需特別強化補水與深層肌肉伸展。";
      }
    } else {
      hrZoneDetail = "Z5 無氧極限區 (>170 bpm)";
      hrScore = 18;
      hrComment = "已進入無氧高負荷區間，無氧代謝佔比高，注意防範肌肉拉傷與熱衰竭。";
    }
  } else {
    hrZoneDetail = "未偵測到心率數據";
    hrScore = 25;
    hrComment = "本次未配戴心率設備或未傳入心率，建議搭配 Apple Watch 記錄心率以獲取更精準的有氧效率分析。";
  }

  const totalScore = Math.min(100, Math.max(50, distScore + paceScore + hrScore));
  let grade = "S";
  let gradeTitle = "卓越執行 (S級・神作)";
  let gradeColor = "emerald";

  if (totalScore >= 90) {
    grade = "S";
    gradeTitle = "卓越執行 (S級・神作)";
    gradeColor = "emerald";
  } else if (totalScore >= 80) {
    grade = "A";
    gradeTitle = "優異達標 (A級・穩健)";
    gradeColor = "blue";
  } else if (totalScore >= 70) {
    grade = "B";
    gradeTitle = "良好完成 (B級・漸入佳境)";
    gradeColor = "amber";
  } else {
    grade = "C";
    gradeTitle = "調整觀察 (C級・持續成長)";
    gradeColor = "amber";
  }

  // Highlights
  const highlights = [];
  highlights.push(`✅ <strong>里程累積：</strong>完成 ${dist} km 實際跑量，穩健堆疊跑季體能庫存。`);
  highlights.push(`⚡ <strong>配速點評：</strong>${paceComment}`);
  if (hr) {
    highlights.push(`❤️ <strong>心率指標：</strong>平均心率 ${hr} bpm (${hrZoneDetail})，${hrComment}`);
  }
  if (elev > 25) {
    highlights.push(`⛰️ <strong>起伏爬升：</strong>累積爬升 +${elev}m，同時強化了小腿比目魚肌與臀大肌推蹬力道。`);
  }
  if (cadence) {
    highlights.push(`👟 <strong>平均步頻：</strong>約 ${cadence} spm，${cadence >= 174 ? "步頻輕快高效，落地衝擊小！" : "步頻偏低，可嘗試縮小步幅、提高換腿頻率至 175-180。"}`);
  }

  // Suggestions & Areas to watch
  const suggestions = [];
  if (workoutType === "long" && paceSec && targetPaceMinSec && paceSec < targetPaceMinSec) {
    suggestions.push("⚠️ <strong>壓抑興奮感：</strong>長跑切忌前半程衝刺，建議練習「前慢後穩」的負分割 (Negative Split)，後半程體能才不會被掏空。");
  }
  if (hr && hr > 155 && (workoutType === "long" || workoutType === "easy")) {
    suggestions.push("⚠️ <strong>有氧心率漂移：</strong>後段心率升高可能源於脫水、氣溫或體溫上升。下次練跑每 20-25 分鐘定時抿一口水或電解質液。");
  }
  if (isWife) {
    suggestions.push("🌸 <strong>老婆專屬心法：</strong>只要持續踏上跑道就是滿分！保持呼吸均勻、笑著跑完比任何數字都更重要。老公隨時在一旁為妳護航！");
  } else {
    suggestions.push("🎯 <strong>半馬突破核心：</strong>把握每週唯一的長距離課表，將 6'15\"~6'30\" 的肌肉記憶雕刻進神經系統，比賽當天身體自然會接管配速！");
  }

  // Recovery & Nutrition Prescription
  const waterEst = Math.round(dist * 60);
  let specificNutritionAdvice = "";
  if (workoutType === "long" || dist >= 11) {
    specificNutritionAdvice = `🥪 <strong>長跑專屬飲食回補：</strong>跑後 30-45 分鐘內飲用 400ml 巧克力牛奶或高蛋白豆漿；2 小時內進食高碳水正餐（如大碗牛肉麵、鮭魚定食、雞肉義大利麵），重啟肌醣原合成酶。`;
  } else if (workoutType === "quality") {
    specificNutritionAdvice = `🥪 <strong>質量日高蛋白修復：</strong>跑後立即補充「碳水：蛋白質 ＝ 3:1」（如乳清蛋白 25g + 香蕉 1 根），阻止高強度訓練後的肌肉微撕裂分解。`;
  } else {
    specificNutritionAdvice = `🥪 <strong>輕鬆日抗發炎正餐：</strong>攝取均衡優質蛋白質與深色蔬菜（如烤鮭魚、番茄炒蛋、深綠蔬菜），補充微量元素並降低體內氧化發炎反應。`;
  }

  const recoveryTips = [
    `💧 <strong>補水處方：</strong>建議跑後 2 小時內分次補足約 <strong>${waterEst} ~ ${waterEst + 250} ml</strong> 水分與含鈉電解質飲品。`,
    specificNutritionAdvice,
    `🧘 <strong>放鬆重點：</strong>使用滾筒深度放鬆<strong>小腿腓腸肌、大腿外側髂脛束 (ITB)</strong> 與臀中肌，並踩壓網球舒緩足底筋膜各 2-3 分鐘。`
  ];

  return {
    dist,
    pace: act.avgPace,
    hr,
    maxHr,
    elev,
    cadence,
    movingTimeMin: act.movingTimeMin,
    workoutName,
    workoutType,
    totalScore,
    grade,
    gradeTitle,
    gradeColor,
    distComment,
    paceComment,
    hrComment,
    hrZoneDetail,
    highlights,
    suggestions,
    recoveryTips,
    isWife
  };
}

window.openCoachReviewModal = function(activityId, dayId) {
  const modal = document.getElementById("strava-coach-modal");
  const body = document.getElementById("strava-coach-modal-body");
  if (!modal || !body) return;

  // Retrieve activity
  let runs = [];
  try {
    const raw = localStorage.getItem(STRAVA_STORAGE.ACTIVITIES);
    if (raw) runs = JSON.parse(raw);
  } catch (e) {}

  let act = runs.find(r => String(r.id) === String(activityId));
  if (!act) {
    const matchedMap = getMatchedMap();
    for (const val of Object.values(matchedMap)) {
      if (String(val.id) === String(activityId)) {
        act = val;
        break;
      }
    }
  }

  if (!act) {
    showToast("找不到該筆跑步活動數據，請先重新同步 Strava！");
    return;
  }

  const currentRunner = localStorage.getItem(STORAGE_KEY_RUNNER) || "tj";
  const matchedCtx = dayId ? findWorkoutDayById(dayId) : getMatchedDayForActivity(activityId);
  const analysis = analyzeRunningActivity(act, matchedCtx, currentRunner);

  // Generate Markdown report for copying
  currentReviewReportMarkdown = `### 🏃‍♂️ AI 跑步教練評析與建議報告
- **活動名稱**：${act.name || "跑步訓練"}
- **日期**：${act.date || "近期"}
- **對標課表**：${analysis.workoutName}
- **核心數據**：距離 ${analysis.dist} km | 配速 ${analysis.pace} | 耗時 ${act.movingTimeMin || "--"} 分鐘 | 平均心率 ${analysis.hr ? analysis.hr + " bpm" : "未偵測"}
- **執行評分**：${analysis.totalScore} / 100 分 (${analysis.gradeTitle})

#### 🌟 本次訓練亮點
${analysis.highlights.map(h => "- " + h.replace(/<[^>]*>/g, "")).join("\n")}

#### ⚠️ 教練建議與注意事項
${analysis.suggestions.map(s => "- " + s.replace(/<[^>]*>/g, "")).join("\n")}

#### 🧘 跑後恢復指南
${analysis.recoveryTips.map(r => "- " + r.replace(/<[^>]*>/g, "")).join("\n")}
`;

  // Render HTML
  body.innerHTML = `
    <!-- Top Score Banner -->
    <div class="coach-header-card">
      <div class="coach-score-box">
        <div class="coach-score-circle ${analysis.gradeColor}">
          ${analysis.totalScore}
        </div>
        <div class="coach-score-meta">
          <div class="coach-score-grade">${analysis.gradeTitle}</div>
          <div class="coach-score-sub">🎯 對標課表：<strong>${analysis.workoutName}</strong></div>
        </div>
      </div>
      <div>
        <span class="badge-tag" style="background: rgba(255,255,255,0.1); color: #fff; font-size: 0.78rem;">
          📅 ${act.date || "近期活動"}
        </span>
      </div>
    </div>

    <!-- Core Metrics Grid -->
    <div class="coach-stats-grid">
      <div class="coach-stat-card">
        <div class="coach-stat-label">實際距離</div>
        <div class="coach-stat-value" style="color: #ff8b57;">${analysis.dist} <span style="font-size: 0.75rem;">km</span></div>
      </div>
      <div class="coach-stat-card">
        <div class="coach-stat-label">平均配速</div>
        <div class="coach-stat-value" style="color: #38bdf8;">${analysis.pace}</div>
      </div>
      <div class="coach-stat-card">
        <div class="coach-stat-label">平均心率</div>
        <div class="coach-stat-value" style="color: #f43f5e;">${analysis.hr ? analysis.hr + ' <span style="font-size:0.75rem;">bpm</span>' : '--'}</div>
      </div>
      <div class="coach-stat-card">
        <div class="coach-stat-label">耗時 / 爬升</div>
        <div class="coach-stat-value" style="font-size: 0.88rem; color: #a78bfa;">${act.movingTimeMin || "--"}m / +${analysis.elev}m</div>
      </div>
    </div>

    <!-- Section 1: Highlights -->
    <div class="coach-section">
      <div class="coach-section-title">
        <span>🌟</span>
        <span>運動生理學剖析與訓練亮點</span>
      </div>
      ${analysis.highlights.map(h => `<div class="coach-box emerald">${h}</div>`).join("")}
    </div>

    <!-- Section 2: Coach Suggestions -->
    <div class="coach-section">
      <div class="coach-section-title">
        <span>💡</span>
        <span>教練關鍵微調與下步建議</span>
      </div>
      ${analysis.suggestions.map(s => `<div class="coach-box amber">${s}</div>`).join("")}
    </div>

    <!-- Section 3: Recovery Prescription -->
    <div class="coach-section">
      <div class="coach-section-title">
        <span>🧘</span>
        <span>跑後黃金恢復處方箋</span>
      </div>
      ${analysis.recoveryTips.map(r => `<div class="coach-box purple">${r}</div>`).join("")}
    </div>

    <div style="text-align: right; margin-top: 6px;">
      <a href="https://www.strava.com/activities/${act.id}" target="_blank" style="font-size: 0.78rem; color: #ff8b57; text-decoration: underline;">
        在 Strava App / 網頁查看原始分段圖 ➔
      </a>
    </div>
  `;

  modal.style.display = "flex";
};

window.closeCoachReviewModal = function() {
  const modal = document.getElementById("strava-coach-modal");
  if (modal) modal.style.display = "none";
};

window.copyCoachReviewText = function() {
  if (!currentReviewReportMarkdown) {
    showToast("目前無評析報告可複製！");
    return;
  }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(currentReviewReportMarkdown)
      .then(() => {
        showToast("📋 已複製教練診斷報告！可直接貼在對話框與 AI 深入討論。");
      })
      .catch(() => {
        prompt("請手動選取並複製以下評析報告：", currentReviewReportMarkdown);
      });
  } else {
    prompt("請手動選取並複製以下評析報告：", currentReviewReportMarkdown);
  }
};

// ==========================================================================
// Initialization
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  // Update live countdowns
  updateCountdowns();
  setInterval(updateCountdowns, 60000);

  // Render TJ stages
  renderStage("stage1", "stage1-container");
  renderStage("stage2", "stage2-container");
  renderStage("stage3", "stage3-container");

  // Render Wife 14-week plan
  renderWifePlan();

  // Setup tabs
  setupNavigation();

  // Restore saved runner state
  const savedRunner = localStorage.getItem(STORAGE_KEY_RUNNER) || "tj";
  switchRunner(savedRunner);

  // Recalibrate and clean legacy wrong matches on upgrade
  const MATCHER_VERSION = "strava_matcher_v3_fixed";
  if (localStorage.getItem(MATCHER_VERSION) !== "true") {
    recalibrateStravaMatches();
    localStorage.setItem(MATCHER_VERSION, "true");
  }

  // Update floating current-week button
  updateCurrentWeekButton();

  // Initialize Strava status and check for OAuth redirect code
  updateStravaUIStatus();
  handleOAuthCallback();
});

