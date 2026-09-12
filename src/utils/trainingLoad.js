/**
 * Training Load Analytics Utility (CTL, ATL, TSB Modeling)
 * Implements Banister Impulse / TSS model for running.
 */

// Calculate TSS (Training Stress Score) for a single run
// TSS = (duration_sec * HR_factor * Intensity_factor) / 3600 * 100
export function calculateWorkoutTSS(distanceKm, durationMinutes, avgHR, maxHR = 185) {
  if (!distanceKm || !durationMinutes) return 0;
  
  const paceSecPerKm = (durationMinutes * 60) / distanceKm;
  const hrRatio = avgHR ? avgHR / maxHR : 0.75;
  
  // Exponential HR weighting (Banister TRIMP)
  const trimpFactor = Math.exp(1.92 * hrRatio);
  
  // Approximate TSS
  const tss = (durationMinutes * trimpFactor * 0.8) / 10;
  return Math.round(tss);
}

/**
 * Calculate historical CTL, ATL, and TSB timeline over array of activities
 * @param {Array} activities Array of activities with { date, tss, distanceKm }
 * @param {Number} days Number of days back to generate (e.g. 60 days)
 */
export function calculateTrainingLoadTimeline(activities = [], days = 60) {
  // Map activities by date 'YYYY-MM-DD'
  const tssByDate = {};
  activities.forEach(act => {
    const d = act.date;
    tssByDate[d] = (tssByDate[d] || 0) + (act.tss || calculateWorkoutTSS(act.distanceKm, act.durationMinutes, act.avgHR));
  });

  const endDate = new Date();
  const timeline = [];

  let ctl = 35; // initial baseline CTL (Fitness)
  let atl = 30; // initial baseline ATL (Fatigue)

  const ctlTimeConstant = 42; // days
  const atlTimeConstant = 7;  // days

  for (let i = days; i >= 0; i--) {
    const currentDate = new Date(endDate);
    currentDate.setDate(endDate.getDate() - i);
    const dateStr = currentDate.toISOString().split('T')[0];

    const dailyTss = tssByDate[dateStr] || 0;

    // Exponentially weighted moving average
    ctl = ctl + (dailyTss - ctl) * (1 / ctlTimeConstant);
    atl = atl + (dailyTss - atl) * (1 / atlTimeConstant);
    const tsb = ctl - atl;

    timeline.push({
      date: dateStr,
      displayDate: `${currentDate.getMonth() + 1}/${currentDate.getDate()}`,
      tss: Math.round(dailyTss),
      ctl: Math.round(ctl * 10) / 10,
      atl: Math.round(atl * 10) / 10,
      tsb: Math.round(tsb * 10) / 10
    });
  }

  const latest = timeline[timeline.length - 1] || { ctl: 40, atl: 35, tsb: 5 };

  let statusText = '狀態良好 (Optimal)';
  let statusColor = '#10b981';
  let recommendation = '訓練負荷控制得當，請按計畫繼續維持！';

  if (latest.tsb > 15) {
    statusText = '減量巔峰 (Fresh / Race Ready)';
    statusColor = '#38bdf8';
    recommendation = '體能極佳且疲勞低，非常適合參賽發揮最佳表現！';
  } else if (latest.tsb < -25) {
    statusText = '過度疲勞警告 (Overreaching Risk)';
    statusColor = '#f43f5e';
    recommendation = '疲勞指數過高，建議安排額外休息日或將今日降為 E 區間輕鬆慢跑。';
  } else if (latest.tsb < -10) {
    statusText = '高強度訓練中 (Productive Load)';
    statusColor = '#f59e0b';
    recommendation = '正在累積體能儲備，注意睡眠與蛋白質補充。';
  }

  return {
    timeline,
    currentCTL: latest.ctl,
    currentATL: latest.atl,
    currentTSB: latest.tsb,
    statusText,
    statusColor,
    recommendation
  };
}
