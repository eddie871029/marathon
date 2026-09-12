/**
 * 12-Week Half-Marathon Periodized Training Plan Generator
 * Customizes workout targets according to VDOT and target goal time.
 */

import { getTrainingPaceZones, formatPace } from './vdotCalculator';

export function generateHalfMarathonPlan(vdot = 42, goalTimeStr = '01:55:00', daysPerWeek = 4) {
  const paceZones = getTrainingPaceZones(vdot);

  const ePace = paceZones.E.formatted;
  const mPace = paceZones.M.formatted;
  const tPace = paceZones.T.formatted;
  const iPace = paceZones.I.formatted;
  const rPace = paceZones.R.formatted;

  const weeks = [];

  // Structure of 12 weeks
  for (let w = 1; w <= 12; w++) {
    let phaseName = 'Phase 1: 有氧基礎建立';
    let phaseDescription = '著重有氧耐力與肌腱適應，保持心率在 Z2 低心率區間。';
    let longRunKm = 10 + Math.min(w, 8); // 11k -> 18k

    if (w >= 4 && w <= 7) {
      phaseName = 'Phase 2: 乳酸閾值與門檻跑';
      phaseDescription = '提升乳酸清除能力與跑步經濟性，在 T 配速下建立耐受力。';
    } else if (w >= 8 && w <= 10) {
      phaseName = 'Phase 3: 半馬專項耐力與長跑';
      phaseDescription = '長距離跑中加入 M/HM 專項賽事配速，模擬賽事後段體感。';
      if (w === 10) longRunKm = 18; // peak long run
    } else if (w >= 11) {
      phaseName = 'Phase 4: 賽前減量 (Taper) 與巔峰';
      phaseDescription = '降低 40% 訓練總量，維持神經肌肉刺激，準備賽日發揮巔峰。';
      longRunKm = w === 11 ? 12 : 6;
    }

    const days = [
      {
        day: 'Mon',
        dayName: '週一',
        type: 'rest',
        title: '完全休息 / 滾筒按摩',
        distanceKm: 0,
        targetPace: 'N/A',
        targetHRZone: 'Rest',
        description: '充分睡眠，使用滾筒或筋膜槍放鬆雙腿肌群，補充高蛋白與水分。'
      },
      {
        day: 'Tue',
        dayName: '週二',
        type: w <= 3 ? 'easy' : (w % 2 === 0 ? 'tempo' : 'interval'),
        title: w <= 3 
          ? `E 區間有氧慢跑 ${6 + w}km`
          : (w % 2 === 0 ? `T 門檻跑 6km (${tPace})` : `I VO2max 間歇 (5x1km)`),
        distanceKm: w <= 3 ? 6 + w : (w % 2 === 0 ? 8 : 9),
        targetPace: w <= 3 ? ePace : (w % 2 === 0 ? tPace : iPace),
        targetHRZone: w <= 3 ? 'Z2 (125-142 bpm)' : (w % 2 === 0 ? 'Z4 (158-170 bpm)' : 'Z5 (170+ bpm)'),
        description: w <= 3 
          ? `以輕鬆談話配速 (${ePace}) 跑完，專注於呼吸節奏與步頻 (175-180spm)。`
          : (w % 2 === 0 
              ? `暖身 2km + T 配速門檻跑 6km (${tPace}) + 緩和 1km。心率維持在 Z4，訓練乳酸代謝。` 
              : `暖身 2km + 1000m 間歇 5 趟 (${iPace}，每趟休 2 分鐘) + 緩和 2km。`)
      },
      {
        day: 'Wed',
        dayName: '週三',
        type: 'easy',
        title: `E 有氧恢復跑 ${5 + (w % 3)}km`,
        distanceKm: 5 + (w % 3),
        targetPace: ePace,
        targetHRZone: 'Z1 - Z2 (115-138 bpm)',
        description: `主動式恢復慢跑，嚴格控制在有氧 Z2 區間，加速昨日訓練的代謝廢物排除。`
      },
      {
        day: 'Thu',
        dayName: '週四',
        type: daysPerWeek >= 4 ? 'tempo' : 'rest',
        title: daysPerWeek >= 4 ? `M 賽事配速節奏跑 8km` : '交叉訓練 / 核心鍛鍊',
        distanceKm: daysPerWeek >= 4 ? 8 : 0,
        targetPace: mPace,
        targetHRZone: 'Z3 (142-158 bpm)',
        description: daysPerWeek >= 4 
          ? `體感穩定，以目標半馬/馬拉松預期配速 (${mPace}) 執行，練習定速巡航感覺。`
          : '可安排 30 分鐘徒手核心、游泳或靜態單車訓練。'
      },
      {
        day: 'Fri',
        dayName: '週五',
        type: 'rest',
        title: '完全休息日',
        distanceKm: 0,
        targetPace: 'N/A',
        targetHRZone: 'Rest',
        description: '長跑前夕充分休息，早點入睡，適度補充優質碳水化合物。'
      },
      {
        day: 'Sat',
        dayName: '週六',
        type: 'long',
        title: `LSD 長距離有氧 ${longRunKm}km`,
        distanceKm: longRunKm,
        targetPace: w >= 8 && w <= 10 ? `${ePace} (後段 ${mPace})` : ePace,
        targetHRZone: 'Z2 - Z3',
        description: w >= 8 && w <= 10
          ? `前 ${longRunKm - 4}km 保持 E 配速 (${ePace})，最後 4km 加速至賽事目標配速 (${mPace})！`
          : `有氧長跑建立耐力底子，配速保持在 ${ePace}，每 5km 補水 150ml。`
      },
      {
        day: 'Sun',
        dayName: '週日',
        type: 'easy',
        title: '輕鬆恢復或靜養 4km',
        distanceKm: 4,
        targetPace: ePace,
        targetHRZone: 'Z1 (恢復區)',
        description: '超輕鬆跑或快走，放鬆長跑後的腿部肌肉。'
      }
    ];

    weeks.push({
      weekNumber: w,
      phaseName,
      phaseDescription,
      totalWeeklyKm: days.reduce((acc, d) => acc + d.distanceKm, 0),
      days
    });
  }

  return weeks;
}
