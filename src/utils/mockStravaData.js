/**
 * Mock Strava Activity Database
 * Provides realistic Strava runner profile, running activities, splits, HR, and cadence.
 */

export const mockAthleteProfile = {
  id: 8847291,
  firstname: "TJ",
  lastname: "Wu",
  profile: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
  city: "Taipei",
  country: "Taiwan",
  sex: "M",
  vdot: 43.5,
  recentBest5k: "00:23:45",
  recentBest10k: "00:49:30",
  targetHalfMarathonTime: "01:52:00",
  maxHR: 188,
  restHR: 54,
  weeklyGoalKm: 45
};

export const mockStravaActivities = [
  {
    id: "act-101",
    name: "週六 LSD 長距離耐力續航跑 16K",
    type: "Run",
    date: "2026-08-08",
    distanceKm: 16.2,
    durationMinutes: 92.5,
    avgPace: "5:42/km",
    avgPaceSec: 342,
    avgHR: 146,
    maxHR: 162,
    avgCadence: 178,
    elevationGainM: 112,
    tss: 115,
    workoutType: "long",
    calories: 1080,
    splits: [
      { km: 1, pace: "5:50", hr: 135 },
      { km: 2, pace: "5:45", hr: 140 },
      { km: 3, pace: "5:42", hr: 142 },
      { km: 4, pace: "5:40", hr: 144 },
      { km: 5, pace: "5:41", hr: 145 },
      { km: 6, pace: "5:39", hr: 146 },
      { km: 7, pace: "5:43", hr: 147 },
      { km: 8, pace: "5:40", hr: 146 },
      { km: 9, pace: "5:38", hr: 148 },
      { km: 10, pace: "5:42", hr: 147 },
      { km: 11, pace: "5:40", hr: 149 },
      { km: 12, pace: "5:39", hr: 150 },
      { km: 13, pace: "5:36", hr: 152 },
      { km: 14, pace: "5:34", hr: 155 },
      { km: 15, pace: "5:30", hr: 158 },
      { km: 16, pace: "5:25", hr: 161 }
    ],
    coachFeedback: {
      score: 95,
      verdict: "完美執行！長跑後半段成功漸進加速至賽事目標配速。",
      highlights: [
        "心率全程穩定控制在 Z2 有氧區間 (平均 146 bpm)。",
        "最後 3 公里加速展現極佳的後段耐力續航。",
        "步頻維持 178 spm 相當理想，有助於減少膝關節衝擊。"
      ],
      warnings: ["明日請安排完全休息或純泡滾筒放鬆。"]
    }
  },
  {
    id: "act-102",
    name: "T 區間乳酸閾值門檻跑 8K",
    type: "Run",
    date: "2026-08-06",
    distanceKm: 8.5,
    durationMinutes: 42.0,
    avgPace: "4:56/km",
    avgPaceSec: 296,
    avgHR: 168,
    maxHR: 179,
    avgCadence: 182,
    elevationGainM: 35,
    tss: 82,
    workoutType: "tempo",
    calories: 590,
    splits: [
      { km: 1, pace: "5:30", hr: 142 },
      { km: 2, pace: "4:55", hr: 162 },
      { km: 3, pace: "4:52", hr: 166 },
      { km: 4, pace: "4:50", hr: 169 },
      { km: 5, pace: "4:53", hr: 171 },
      { km: 6, pace: "4:51", hr: 174 },
      { km: 7, pace: "4:54", hr: 176 },
      { km: 8, pace: "5:35", hr: 148 }
    ],
    coachFeedback: {
      score: 88,
      verdict: "強度達標，門檻跑配速精準落在 4:50 - 4:55/km 區間。",
      highlights: [
        "第 2 ~ 7 公里 T 配速鎖定良好，顯著提升乳酸耐受力。",
        "步頻 182 spm 高效流暢。"
      ],
      warnings: ["第 6-7 公里心率漂移至 Z4 頂端 (176 bpm)，代表體能稍受考驗，請注意補水。"]
    }
  },
  {
    id: "act-103",
    name: "E 區間超輕鬆恢復慢跑 6K",
    type: "Run",
    date: "2026-08-04",
    distanceKm: 6.0,
    durationMinutes: 37.2,
    avgPace: "6:12/km",
    avgPaceSec: 372,
    avgHR: 132,
    maxHR: 141,
    avgCadence: 174,
    elevationGainM: 20,
    tss: 38,
    workoutType: "easy",
    calories: 390,
    splits: [
      { km: 1, pace: "6:20", hr: 125 },
      { km: 2, pace: "6:15", hr: 130 },
      { km: 3, pace: "6:10", hr: 132 },
      { km: 4, pace: "6:12", hr: 133 },
      { km: 5, pace: "6:08", hr: 134 },
      { km: 6, pace: "6:07", hr: 136 }
    ],
    coachFeedback: {
      score: 98,
      verdict: "標準的教科書級別低心率恢復跑！",
      highlights: [
        "平均心率僅 132 bpm，精準落於 Z1/Z2 綠色恢復區。",
        "有效促進雙腿血液循環，加速昨日訓練的恢復。"
      ],
      warnings: []
    }
  },
  {
    id: "act-104",
    name: "VO2max 間歇衝刺 5x1000m",
    type: "Run",
    date: "2026-08-01",
    distanceKm: 9.2,
    durationMinutes: 47.5,
    avgPace: "5:10/km",
    avgPaceSec: 310,
    avgHR: 165,
    maxHR: 184,
    avgCadence: 186,
    elevationGainM: 42,
    tss: 94,
    workoutType: "interval",
    calories: 680,
    splits: [
      { km: 1, pace: "5:40", hr: 138 },
      { km: 2, pace: "4:22", hr: 175 },
      { km: 3, pace: "4:20", hr: 178 },
      { km: 4, pace: "4:18", hr: 181 },
      { km: 5, pace: "4:21", hr: 182 },
      { km: 6, pace: "4:19", hr: 184 },
      { km: 7, pace: "5:50", hr: 145 }
    ],
    coachFeedback: {
      score: 92,
      verdict: "間歇趟數高質量完走！平均間歇配速 4:20/km 表現亮眼。",
      highlights: [
        "5 趟 1000m 配速極度平均（4:22 至 4:19），配速掌控力傑出！",
        "最高心率達 184 bpm，成功刺激 VO2max 最大攝氧量能力。"
      ],
      warnings: ["間歇後肌肉緊繃度較高，請於今晚補充電解質與伸展。"]
    }
  },
  {
    id: "act-0701",
    name: "七月週六 LSD 14K 有氧長跑",
    type: "Run",
    date: "2026-07-25",
    distanceKm: 14.0,
    durationMinutes: 81.2,
    avgPace: "5:48/km",
    avgPaceSec: 348,
    avgHR: 142,
    maxHR: 158,
    avgCadence: 176,
    elevationGainM: 85,
    tss: 95,
    workoutType: "long",
    calories: 920,
    splits: [
      { km: 1, pace: "5:55", hr: 132 },
      { km: 2, pace: "5:50", hr: 138 },
      { km: 3, pace: "5:47", hr: 141 },
      { km: 4, pace: "5:45", hr: 143 },
      { km: 5, pace: "5:48", hr: 144 }
    ]
  },
  {
    id: "act-0702",
    name: "七月 T 區間 7K 門檻強度跑",
    type: "Run",
    date: "2026-07-21",
    distanceKm: 7.5,
    durationMinutes: 37.0,
    avgPace: "4:56/km",
    avgPaceSec: 296,
    avgHR: 166,
    maxHR: 177,
    avgCadence: 180,
    elevationGainM: 30,
    tss: 75,
    workoutType: "tempo",
    calories: 520
  },
  {
    id: "act-0703",
    name: "七月 10K 測速跑力檢測",
    type: "Run",
    date: "2026-07-15",
    distanceKm: 10.0,
    durationMinutes: 49.5,
    avgPace: "4:57/km",
    avgPaceSec: 297,
    avgHR: 171,
    maxHR: 182,
    avgCadence: 182,
    elevationGainM: 40,
    tss: 98,
    workoutType: "tempo",
    calories: 690
  },
  {
    id: "act-0704",
    name: "七月 E 區間 6K 有氧恢復慢跑",
    type: "Run",
    date: "2026-07-08",
    distanceKm: 6.2,
    durationMinutes: 38.0,
    avgPace: "6:08/km",
    avgPaceSec: 368,
    avgHR: 134,
    maxHR: 142,
    avgCadence: 174,
    elevationGainM: 15,
    tss: 40,
    workoutType: "easy",
    calories: 410
  }
];
