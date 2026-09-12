/**
 * Jack Daniels VDOT Running Calculator Utility
 * Calculates VDOT score, race time predictions, training pace zones, and heart rate zones.
 */

// Convert time string "HH:MM:SS" or "MM:SS" to total seconds
export function timeStringToSeconds(timeStr) {
  if (!timeStr) return 0;
  const parts = timeStr.trim().split(':').map(Number);
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  } else if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  }
  return Number(timeStr) || 0;
}

// Convert seconds to "HH:MM:SS" or "MM:SS"
export function secondsToTimeString(totalSeconds, includeHours = false) {
  if (!totalSeconds || isNaN(totalSeconds)) return '--:--';
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  const pad = (num) => String(num).padStart(2, '0');

  if (hours > 0 || includeHours) {
    return `${hours}:${pad(minutes)}:${pad(seconds)}`;
  }
  return `${minutes}:${pad(seconds)}`;
}

// Convert pace in seconds per km to min:sec/km
export function formatPace(secondsPerKm) {
  if (!secondsPerKm || isNaN(secondsPerKm)) return '--:--/km';
  const minutes = Math.floor(secondsPerKm / 60);
  const seconds = Math.round(secondsPerKm % 60);
  const pad = (num) => String(num).padStart(2, '0');
  return `${minutes}:${pad(seconds)}/km`;
}

/**
 * Calculate VDOT score given distance (in meters) and time (in seconds)
 * Using Jack Daniels VDOT formula approximation
 */
export function calculateVDOT(distanceMeters, timeSeconds) {
  if (!distanceMeters || !timeSeconds || timeSeconds <= 0) return 42; // default reasonable VDOT

  const timeMinutes = timeSeconds / 60;
  const velocity = distanceMeters / timeMinutes; // meters per min

  // Oxygen cost formula: VO2 = -4.60 + 0.182258 * v + 0.000104 * v^2
  const vo2 = -4.60 + (0.182258 * velocity) + (0.000104 * Math.pow(velocity, 2));

  // Percent VO2max for race duration: %VO2max = 0.8 + 0.1894393 * e^(-0.012778 * t) + 0.2989558 * e^(-0.1932605 * t)
  const percentMax = 0.8 + 0.1894393 * Math.exp(-0.012778 * timeMinutes) + 0.2989558 * Math.exp(-0.1932605 * timeMinutes);

  const vdot = vo2 / percentMax;
  return Math.round(vdot * 10) / 10;
}

/**
 * Predict race time for a specific target distance given a VDOT score
 */
export function predictRaceTime(vdot, targetDistanceMeters) {
  // Binary search for exact velocity matching VDOT
  let lowV = 50;  // m/min
  let highV = 400; // m/min
  let bestTimeSeconds = 0;

  for (let i = 0; i < 25; i++) {
    const v = (lowV + highV) / 2;
    const timeMinutes = targetDistanceMeters / v;
    
    const vo2 = -4.60 + (0.182258 * v) + (0.000104 * Math.pow(v, 2));
    const percentMax = 0.8 + 0.1894393 * Math.exp(-0.012778 * timeMinutes) + 0.2989558 * Math.exp(-0.1932605 * timeMinutes);
    const calculatedVDOT = vo2 / percentMax;

    if (calculatedVDOT < vdot) {
      lowV = v;
    } else {
      highV = v;
    }
    bestTimeSeconds = timeMinutes * 60;
  }

  return Math.round(bestTimeSeconds);
}

/**
 * Get 5 Training Pace Zones based on VDOT
 * Returns object with min and max pace in seconds/km for each zone
 */
export function getTrainingPaceZones(vdot) {
  // Target velocity percentages relative to VDOT VO2max
  // E (Easy): 62% - 70% VO2max
  // M (Marathon): 75% - 80% VO2max
  // T (Threshold): 88% VO2max
  // I (Interval): 98% - 100% VO2max
  // R (Repetition): 105% - 110% VO2max

  // Helper to get pace (sec/km) for a specific % of VO2max
  const getPaceForIntensity = (intensityRatio) => {
    const vo2Target = vdot * intensityRatio;
    // Quadratic equation for velocity v: 0.000104 * v^2 + 0.182258 * v - (vo2Target + 4.60) = 0
    const a = 0.000104;
    const b = 0.182258;
    const c = -(vo2Target + 4.60);
    const velocity = (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a); // m/min
    if (velocity <= 0) return 360;
    return 1000 / (velocity / 60); // sec/km
  };

  const eMinPace = getPaceForIntensity(0.62);
  const eMaxPace = getPaceForIntensity(0.70);

  const mMinPace = getPaceForIntensity(0.75);
  const mMaxPace = getPaceForIntensity(0.80);

  const tPace = getPaceForIntensity(0.88);

  const iPace = getPaceForIntensity(0.98);

  const rPace = getPaceForIntensity(1.08);

  return {
    vdot,
    E: { name: 'E 有氧輕鬆跑 (Easy)', minSec: eMinPace, maxSec: eMaxPace, formatted: `${formatPace(eMinPace)} ~ ${formatPace(eMaxPace)}` },
    M: { name: 'M 全馬馬拉松配速 (Marathon)', minSec: mMinPace, maxSec: mMaxPace, formatted: `${formatPace(mMinPace)} ~ ${formatPace(mMaxPace)}` },
    T: { name: 'T 乳酸閾值門檻跑 (Threshold)', minSec: tPace - 3, maxSec: tPace + 3, formatted: formatPace(tPace) },
    I: { name: 'I 最大攝氧間歇跑 (Interval)', minSec: iPace - 3, maxSec: iPace + 3, formatted: formatPace(iPace) },
    R: { name: 'R 速度反覆跑 (Repetition)', minSec: rPace - 3, maxSec: rPace + 3, formatted: formatPace(rPace) }
  };
}

/**
 * Get Heart Rate Zones (Z1 ~ Z5) based on Max Heart Rate (default 185 if not specified)
 */
export function getHRZones(maxHR = 185, restHR = 55) {
  // Karvonen HR Reserve formula or standard % Max HR
  const hrr = maxHR - restHR;
  
  return {
    maxHR,
    restHR,
    Z1: { name: 'Z1 恢復區間 (Recovery)', min: Math.round(restHR + hrr * 0.50), max: Math.round(restHR + hrr * 0.60), color: '#38bdf8' },
    Z2: { name: 'Z2 有氧基礎區 (Aerobic Base)', min: Math.round(restHR + hrr * 0.60), max: Math.round(restHR + hrr * 0.70), color: '#10b981' },
    Z3: { name: 'Z3 馬拉松節奏區 (Tempo/M)', min: Math.round(restHR + hrr * 0.70), max: Math.round(restHR + hrr * 0.80), color: '#f59e0b' },
    Z4: { name: 'Z4 乳酸閾值區 (Threshold/T)', min: Math.round(restHR + hrr * 0.80), max: Math.round(restHR + hrr * 0.90), color: '#fc4c02' },
    Z5: { name: 'Z5 衝刺極限區 (VO2max/I)', min: Math.round(restHR + hrr * 0.90), max: maxHR, color: '#f43f5e' }
  };
}
