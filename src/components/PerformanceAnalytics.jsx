import React from 'react';
import { Award, TrendingUp, Heart, Zap, Activity, Info, BarChart2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { getTrainingPaceZones, getHRZones, predictRaceTime, secondsToTimeString } from '../utils/vdotCalculator';

export default function PerformanceAnalytics({ athlete, trainingLoad }) {
  const vdot = athlete?.vdot || 43.5;
  const paceZones = getTrainingPaceZones(vdot);
  const hrZones = getHRZones(athlete?.maxHR || 185, athlete?.restHR || 54);

  // Predictions
  const pred5k = secondsToTimeString(predictRaceTime(vdot, 5000));
  const pred10k = secondsToTimeString(predictRaceTime(vdot, 10000));
  const predHM = secondsToTimeString(predictRaceTime(vdot, 21097.5), true);
  const predFM = secondsToTimeString(predictRaceTime(vdot, 42195), true);

  const timelineData = trainingLoad?.timeline || [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* VDOT & Predicted Performance Summary */}
      <div className="glass-card glass-card-orange" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Award size={24} color="var(--strava-orange)" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)' }}>
              VDOT 跑力與競賽能力預測
            </h2>
          </div>
          <span className="badge badge-orange">Daniels Running Formula</span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px'
        }}>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>5K 最佳成績預估</span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)' }}>{pred5k}</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>目標配速 4:45/km</span>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>10K 最佳成績預估</span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)' }}>{pred10k}</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>目標配速 4:57/km</span>
          </div>

          <div style={{ background: 'rgba(252, 76, 2, 0.1)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(252, 76, 2, 0.3)' }}>
            <span style={{ fontSize: '0.8rem', color: '#ff7033', fontWeight: 700 }}>半馬 21.0975K 完賽預估</span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)' }}>{predHM}</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>目標配速 5:18/km</span>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>全馬 42.195K 完賽預估</span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)' }}>{predFM}</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>目標配速 5:36/km</span>
          </div>
        </div>
      </div>

      {/* CTL (Fitness) vs ATL (Fatigue) Training Load Curve */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', fontFamily: 'var(--font-heading)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={20} color="var(--cyan-bright)" />
              體能 (CTL) / 疲勞 (ATL) / 競技狀態 (TSB) 趨勢圖
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              藍線: 體能累積 (CTL 42天均值) | 紅線: 短期疲勞 (ATL 7天均值) | 綠色底圖: 競技狀態 Form
            </p>
          </div>
        </div>

        <div style={{ width: '100%', height: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={timelineData}>
              <defs>
                <linearGradient id="ctlGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0}/>
                </linearGradient>
                <linearGradient id="atlGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="displayDate" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip
                contentStyle={{ background: '#121a2b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                labelStyle={{ color: '#ffffff', fontWeight: 700 }}
              />
              <Area type="monotone" dataKey="ctl" name="體能 CTL" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#ctlGradient)" />
              <Area type="monotone" dataKey="atl" name="疲勞 ATL" stroke="#f43f5e" strokeWidth={2} fillOpacity={1} fill="url(#atlGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Heart Rate Zones Z1-Z5 Grid */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '16px', fontFamily: 'var(--font-heading)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Heart size={20} color="#f43f5e" />
          個人化心率 5 大區間 (最大心率 {hrZones.maxHR} bpm / 安靜心率 {hrZones.restHR} bpm)
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
          {Object.entries(hrZones).filter(([k]) => k.startsWith('Z')).map(([zoneKey, zoneObj]) => (
            <div
              key={zoneKey}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                borderLeft: `4px solid ${zoneObj.color}`,
                padding: '14px',
                borderRadius: '8px'
              }}
            >
              <span style={{ fontSize: '0.8rem', color: zoneObj.color, fontWeight: 700, display: 'block' }}>
                {zoneObj.name}
              </span>
              <strong style={{ fontSize: '1.2rem', color: '#ffffff', display: 'block', margin: '4px 0' }}>
                {zoneObj.min} ~ {zoneObj.max} <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>BPM</span>
              </strong>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
