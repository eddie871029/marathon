import React from 'react';
import { Activity, Flame, TrendingUp, Clock, AlertTriangle, ArrowRight, ShieldCheck, Heart, Sparkles, CheckCircle2, MessageSquare } from 'lucide-react';
import { formatPace, getTrainingPaceZones, predictRaceTime, secondsToTimeString } from '../utils/vdotCalculator';

export default function Dashboard({ athlete, recentActivities, trainingLoad, currentWeekPlan, onNavigate, isRealData }) {
  const vdot = athlete?.vdot || 43.5;
  const paceZones = getTrainingPaceZones(vdot);
  const predictedHMSeconds = predictRaceTime(vdot, 21097.5);
  const predictedHMTime = secondsToTimeString(predictedHMSeconds, true);

  const latestActivity = recentActivities[0] || null;
  const nextWorkout = currentWeekPlan?.days?.find(d => d.type !== 'rest') || {
    title: 'E 有氧慢跑 8km',
    targetPace: paceZones.E.formatted,
    targetHRZone: 'Z2 (125-142 bpm)',
    description: '保持輕鬆吐納節奏，控制心率在低有氧區間。'
  };

  // Calculate exact current week mileage (Mon ~ Sun)
  const getCurrentWeekKm = (acts = []) => {
    const now = new Date();
    const day = now.getDay();
    const diffToMon = day === 0 ? -6 : 1 - day;
    const mon = new Date(now);
    mon.setDate(now.getDate() + diffToMon);
    mon.setHours(0, 0, 0, 0);

    const sun = new Date(mon);
    sun.setDate(mon.getDate() + 6);
    sun.setHours(23, 59, 59, 999);

    const kmSum = acts.reduce((sum, act) => {
      if (!act.date) return sum;
      const d = new Date(act.date + 'T00:00:00');
      if (d >= mon && d <= sun) {
        return sum + (act.distanceKm || 0);
      }
      return sum;
    }, 0);

    return Math.round(kmSum * 10) / 10;
  };

  const totalWeeklyKm = getCurrentWeekKm(recentActivities);
  const weeklyGoalKm = athlete?.weeklyGoalKm || 45;
  const weeklyProgressPct = Math.min(Math.round((totalWeeklyKm / weeklyGoalKm) * 100), 100);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Demo Mode Alert Banner */}
      {!isRealData && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(252, 76, 2, 0.1) 100%)',
          border: '1px solid rgba(245, 158, 11, 0.4)',
          borderRadius: '12px',
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <AlertTriangle size={20} color="var(--amber-warning)" />
            <span style={{ fontSize: '0.88rem', color: '#ffffff', fontWeight: 600 }}>
              目前顯示預設範例數據 (Demo Mode)。尚未連線至您的個人 Strava 帳號。
            </span>
          </div>
          <button
            className="btn-strava"
            style={{ fontSize: '0.8rem', padding: '6px 14px' }}
            onClick={() => onNavigate('chat')}
          >
            連線真實 Strava 數據
          </button>
        </div>
      )}
      
      {/* Hero Quick Metrics Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '16px'
      }}>
        {/* VDOT & Predicted HM */}
        <div className="glass-card glass-card-orange" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>跑力指標 VDOT</span>
            <span className="badge badge-orange">Daniels Model</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
            <span style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }} className="gradient-text-orange">
              {vdot}
            </span>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>分整</span>
          </div>
          <div style={{ marginTop: '10px', fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <TrendingUp size={16} color="var(--strava-orange)" />
            預估半馬完賽時間：<strong style={{ color: '#ffffff' }}>{predictedHMTime}</strong>
          </div>
        </div>

        {/* Weekly Mileage Progress */}
        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>本週累積里程</span>
            <span className="badge badge-cyan">{weeklyProgressPct}% 達標</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: '#ffffff' }}>
              {totalWeeklyKm}
            </span>
            <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/ {weeklyGoalKm} km</span>
          </div>
          {/* Progress bar */}
          <div style={{ marginTop: '12px', background: 'rgba(255, 255, 255, 0.08)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{
              width: `${weeklyProgressPct}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #06b6d4 0%, #38bdf8 100%)',
              borderRadius: '4px',
              transition: 'width 0.5s ease'
            }} />
          </div>
        </div>

        {/* CTL / ATL Readiness Status */}
        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>競技狀態 TSB Form</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="pulse-dot" style={{ backgroundColor: trainingLoad?.statusColor || 'var(--emerald-success)' }} />
              <span style={{ fontSize: '0.75rem', color: trainingLoad?.statusColor || 'var(--emerald-success)', fontWeight: 700 }}>
                {trainingLoad?.statusText || '狀態良好'}
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
            <span style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: trainingLoad?.currentTSB >= 0 ? '#34d399' : '#fbbf24' }}>
              {trainingLoad?.currentTSB > 0 ? `+${trainingLoad.currentTSB}` : trainingLoad?.currentTSB}
            </span>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              體能 CTL: {trainingLoad?.currentCTL} | 疲勞 ATL: {trainingLoad?.currentATL}
            </div>
          </div>
          <p style={{ marginTop: '10px', fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
            {trainingLoad?.recommendation}
          </p>
        </div>
      </div>

      {/* Main Content Grid: AI Coach Highlights & Next Workout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
        
        {/* Next Scheduled Workout */}
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={20} color="var(--strava-orange)" />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', fontFamily: 'var(--font-heading)' }}>
                  下一次預定課表
                </h3>
              </div>
              <span className="badge badge-purple">週二 門檻強度</span>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              padding: '16px',
              marginBottom: '16px'
            }}>
              <h4 style={{ fontSize: '1.1rem', color: 'var(--strava-orange)', fontWeight: 700, marginBottom: '8px' }}>
                {nextWorkout.title}
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '12px' }}>
                {nextWorkout.description}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.85rem' }}>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: '8px' }}>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>目標配速</span>
                  <strong style={{ color: '#ffffff', fontSize: '0.95rem' }}>{nextWorkout.targetPace}</strong>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: '8px' }}>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>目標心率區間</span>
                  <strong style={{ color: 'var(--cyan-bright)', fontSize: '0.95rem' }}>{nextWorkout.targetHRZone}</strong>
                </div>
              </div>
            </div>
          </div>

          <button
            className="btn-secondary"
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={() => onNavigate('calendar')}
          >
            檢視 12 週完整課表日曆 <ArrowRight size={16} />
          </button>
        </div>

        {/* Latest Activity AI Coach Verdict */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={20} color="var(--cyan-bright)" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', fontFamily: 'var(--font-heading)' }}>
                最近訓練 AI 教練講評
              </h3>
            </div>
            {latestActivity?.coachFeedback && (
              <span className="badge badge-emerald">
                執行品質 {latestActivity.coachFeedback.score} 分
              </span>
            )}
          </div>

          {latestActivity ? (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '10px' }}>
                <h4 style={{ color: '#ffffff', fontWeight: 700, fontSize: '1rem' }}>
                  {latestActivity.name}
                </h4>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{latestActivity.date}</span>
              </div>

              <div style={{ display: 'flex', gap: '16px', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                <span>距離：<strong style={{ color: '#ffffff' }}>{latestActivity.distanceKm} km</strong></span>
                <span>平均配速：<strong style={{ color: '#ffffff' }}>{latestActivity.avgPace}</strong></span>
                <span>均心率：<strong style={{ color: 'var(--cyan-bright)' }}>{latestActivity.avgHR || '--'} bpm</strong></span>
              </div>

              {latestActivity.coachFeedback && (
                <div style={{
                  background: 'rgba(6, 182, 212, 0.05)',
                  border: '1px solid rgba(6, 182, 212, 0.2)',
                  borderRadius: '12px',
                  padding: '14px'
                }}>
                  <p style={{ fontSize: '0.9rem', color: '#ffffff', fontWeight: 600, marginBottom: '8px' }}>
                    💡 教練評語：{latestActivity.coachFeedback.verdict}
                  </p>
                  <ul style={{ paddingLeft: '18px', fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    {latestActivity.coachFeedback.highlights.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                className="btn-secondary"
                style={{ width: '100%', justifyContent: 'center', marginTop: '16px' }}
                onClick={() => onNavigate('chat')}
              >
                進入 AI 教練診斷室對話 <MessageSquare size={16} />
              </button>
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)' }}>尚未匯入最近跑步資料。</p>
          )}
        </div>
      </div>

      {/* Home Runner Workout Studio Quick Launch Banner */}
      <div className="glass-card glass-card-orange" style={{
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        background: 'linear-gradient(135deg, rgba(252, 76, 2, 0.12) 0%, rgba(6, 182, 212, 0.08) 100%)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #fc4c02 0%, #e04300 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(252, 76, 2, 0.4)'
          }}>
            <Flame size={26} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge badge-orange" style={{ fontSize: '0.75rem' }}>全新上線</span>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff' }}>
                跑者居家無器材「肌力與敏捷」動態影音跟練室
              </h3>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              包含 12 套專屬動作 · 生物力學即時動畫 · 語音智慧教練 · 3-2-1 計時音效 · 強化臀中肌與跟腱剛性
            </p>
          </div>
        </div>

        <button
          className="btn-strava"
          onClick={() => onNavigate('workout')}
          style={{ padding: '10px 20px', fontSize: '0.9rem' }}
        >
          <span>立即進入跟練室</span>
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Daniels 5 Training Pace Zones Cheat Sheet */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '16px', fontFamily: 'var(--font-heading)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Flame size={20} color="var(--strava-orange)" />
          Jack Daniels 5 大個人化跑步配速區間 (基於 VDOT {vdot})
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '12px'
        }}>
          <div style={{ background: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.2)', padding: '14px', borderRadius: '12px' }}>
            <span style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 700, display: 'block' }}>E 輕鬆跑 (Easy)</span>
            <strong style={{ fontSize: '1.1rem', color: '#ffffff', display: 'block', margin: '4px 0' }}>{paceZones.E.formatted}</strong>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>建構有氧底子、肌腱適應與主動恢復</span>
          </div>

          <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '14px', borderRadius: '12px' }}>
            <span style={{ fontSize: '0.8rem', color: '#34d399', fontWeight: 700, display: 'block' }}>M 馬拉松/半馬 (Marathon)</span>
            <strong style={{ fontSize: '1.1rem', color: '#ffffff', display: 'block', margin: '4px 0' }}>{paceZones.M.formatted}</strong>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>賽事目標定速巡航、體能節奏感覺</span>
          </div>

          <div style={{ background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.2)', padding: '14px', borderRadius: '12px' }}>
            <span style={{ fontSize: '0.8rem', color: '#fbbf24', fontWeight: 700, display: 'block' }}>T 乳酸閾值跑 (Threshold)</span>
            <strong style={{ fontSize: '1.1rem', color: '#ffffff', display: 'block', margin: '4px 0' }}>{paceZones.T.formatted}</strong>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>延緩乳酸堆積、提高耐疲勞邊界</span>
          </div>

          <div style={{ background: 'rgba(252, 76, 2, 0.08)', border: '1px solid rgba(252, 76, 2, 0.2)', padding: '14px', borderRadius: '12px' }}>
            <span style={{ fontSize: '0.8rem', color: '#ff7033', fontWeight: 700, display: 'block' }}>I 最大攝氧間歇 (Interval)</span>
            <strong style={{ fontSize: '1.1rem', color: '#ffffff', display: 'block', margin: '4px 0' }}>{paceZones.I.formatted}</strong>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>提升心肺極限 VO2max 與神經徵召</span>
          </div>

          <div style={{ background: 'rgba(244, 63, 94, 0.08)', border: '1px solid rgba(244, 63, 94, 0.2)', padding: '14px', borderRadius: '12px' }}>
            <span style={{ fontSize: '0.8rem', color: '#f43f5e', fontWeight: 700, display: 'block' }}>R 速度反覆跑 (Repetition)</span>
            <strong style={{ fontSize: '1.1rem', color: '#ffffff', display: 'block', margin: '4px 0' }}>{paceZones.R.formatted}</strong>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>強化跑步經濟性與快速步頻輸出</span>
          </div>
        </div>
      </div>

    </div>
  );
}
