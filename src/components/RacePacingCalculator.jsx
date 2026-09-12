import React, { useState } from 'react';
import { Zap, Clock, ShieldCheck, Droplet, Coffee, Award, ChevronDown } from 'lucide-react';
import { secondsToTimeString, timeStringToSeconds, formatPace } from '../utils/vdotCalculator';

export default function RacePacingCalculator({ athlete }) {
  const [targetTimeStr, setTargetTimeStr] = useState(athlete?.targetHalfMarathonTime || '01:52:00');
  const [strategy, setStrategy] = useState('negative'); // 'negative' or 'even'

  const totalSec = timeStringToSeconds(targetTimeStr);
  const avgPaceSec = totalSec > 0 ? totalSec / 21.0975 : 318;
  const formattedAvgPace = formatPace(avgPaceSec);

  // Generate 21 splits
  const splits = [];
  let accumSec = 0;

  for (let km = 1; km <= 21; km++) {
    let kmPaceSec = avgPaceSec;
    if (strategy === 'negative') {
      if (km <= 5) kmPaceSec = avgPaceSec + 6;      // Warmup 5k
      else if (km <= 15) kmPaceSec = avgPaceSec;     // Cruise 10k
      else kmPaceSec = avgPaceSec - 8;               // Finish 6k fast!
    }
    accumSec += kmPaceSec;
    splits.push({
      km,
      pace: formatPace(kmPaceSec),
      accumTime: secondsToTimeString(accumSec, true),
      gel: km === 7 ? '包 1 (電解質)' : (km === 14 ? '包 2 (咖啡因)' : null),
      water: km % 5 === 0 ? '補充 150ml 水/電解質' : null
    });
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Target Time & Strategy Header */}
      <div className="glass-card glass-card-orange" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <Zap size={24} color="var(--strava-orange)" />
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)' }}>
                半馬賽事配速配比與補給策略計算器
              </h2>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              依據 21.0975km 目標成績自動演算各公里分段配速與補給時機點
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>目標完賽成績 (HH:MM:SS)</span>
              <input
                type="text"
                value={targetTimeStr}
                onChange={(e) => setTargetTimeStr(e.target.value)}
                style={{
                  background: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid var(--strava-orange)',
                  borderRadius: '10px',
                  padding: '8px 14px',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  width: '140px',
                  textAlign: 'center'
                }}
              />
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>配速策略</span>
              <select
                value={strategy}
                onChange={(e) => setStrategy(e.target.value)}
                style={{
                  background: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: '0.85rem'
                }}
              >
                <option value="negative">負分段 (前慢後快 - 推薦)</option>
                <option value="even">均速勻速 (Even Pace)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '14px', borderRadius: '10px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>平均全程目標配速</span>
            <strong style={{ fontSize: '1.3rem', color: 'var(--strava-orange)', display: 'block' }}>{formattedAvgPace}</strong>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '14px', borderRadius: '10px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>前 10K 預計耗時</span>
            <strong style={{ fontSize: '1.3rem', color: '#ffffff', display: 'block' }}>{splits[9]?.accumTime || '--'}</strong>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '14px', borderRadius: '10px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>能量膠需求數量</span>
            <strong style={{ fontSize: '1.3rem', color: 'var(--cyan-bright)', display: 'block' }}>2 包 (7K & 14K)</strong>
          </div>
        </div>
      </div>

      {/* 21 KM Split Table */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '16px', fontFamily: 'var(--font-heading)' }}>
          21.0975 KM 各分段配速與補給時間表
        </h3>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', textAlign: 'left' }}>
                <th style={{ padding: '10px' }}>KM 分段</th>
                <th style={{ padding: '10px' }}>單公里目標配速</th>
                <th style={{ padding: '10px' }}>預計累計時間</th>
                <th style={{ padding: '10px' }}>能量膠補給提醒</th>
                <th style={{ padding: '10px' }}>水站水分補充</th>
              </tr>
            </thead>
            <tbody>
              {splits.map((s) => (
                <tr
                  key={s.km}
                  style={{
                    borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                    background: s.gel ? 'rgba(252, 76, 2, 0.08)' : (s.km % 5 === 0 ? 'rgba(6, 182, 212, 0.05)' : 'transparent')
                  }}
                >
                  <td style={{ padding: '10px', fontWeight: 700, color: '#ffffff' }}>KM {s.km}</td>
                  <td style={{ padding: '10px', color: 'var(--strava-orange)', fontWeight: 600 }}>{s.pace}</td>
                  <td style={{ padding: '10px', color: '#ffffff' }}>{s.accumTime}</td>
                  <td style={{ padding: '10px' }}>
                    {s.gel ? (
                      <span className="badge badge-orange">⚡ {s.gel}</span>
                    ) : '-'}
                  </td>
                  <td style={{ padding: '10px' }}>
                    {s.water ? (
                      <span className="badge badge-cyan">💧 {s.water}</span>
                    ) : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
