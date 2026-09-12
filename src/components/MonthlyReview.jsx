import React, { useState } from 'react';
import { Calendar, TrendingUp, Clock, Heart, Award, ChevronRight, Activity, Flame, FileText, CheckCircle2, Filter } from 'lucide-react';
import { formatPace } from '../utils/vdotCalculator';

export default function MonthlyReview({ activities = [] }) {
  const [selectedMonth, setSelectedMonth] = useState('2026-08');
  const [activeRunDetail, setActiveRunDetail] = useState(null);

  // Group activities by month 'YYYY-MM', starting from 2026-07
  const activitiesByMonth = {};
  
  activities.forEach(act => {
    if (!act.date) return;
    const monthKey = act.date.substring(0, 7); // 'YYYY-MM'
    // Filter starting from 2026-07
    if (monthKey >= '2026-07') {
      if (!activitiesByMonth[monthKey]) {
        activitiesByMonth[monthKey] = [];
      }
      activitiesByMonth[monthKey].push(act);
    }
  });

  // Ensure 2026-08 and 2026-07 exist in keys list
  const monthKeys = Array.from(new Set(['2026-08', '2026-07', ...Object.keys(activitiesByMonth)])).sort().reverse();

  const currentMonthActivities = activitiesByMonth[selectedMonth] || [];

  // Monthly summary calculations
  const totalKm = Math.round(currentMonthActivities.reduce((sum, a) => sum + (a.distanceKm || 0), 0) * 10) / 10;
  const runCount = currentMonthActivities.length;
  
  const totalDurationMin = currentMonthActivities.reduce((sum, a) => sum + (a.durationMinutes || 0), 0);
  const avgPaceSec = totalKm > 0 ? (totalDurationMin * 60) / totalKm : 0;
  const formattedMonthlyPace = formatPace(avgPaceSec);

  const totalElevation = currentMonthActivities.reduce((sum, a) => sum + (a.elevationGainM || 0), 0);
  const hrActivities = currentMonthActivities.filter(a => a.avgHR);
  const avgHR = hrActivities.length > 0
    ? Math.round(hrActivities.reduce((sum, a) => sum + a.avgHR, 0) / hrActivities.length)
    : '--';

  const formatMonthLabel = (mKey) => {
    const [year, month] = mKey.split('-');
    return `${year} 年 ${parseInt(month, 10)} 月`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Monthly Filter Header */}
      <div className="glass-card glass-card-orange" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <Calendar size={24} color="var(--strava-orange)" />
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)' }}>
                按月跑步歷史統計與詳細回顧
              </h2>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              回顧每月跑步總里程、平均配速、爬升與每趟跑步心率分段明細 (自 2026 年 7 月起)
            </p>
          </div>

          {/* Month Selector Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Filter size={16} color="var(--cyan-bright)" />
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>選擇月份:</span>
            {monthKeys.map(mKey => (
              <button
                key={mKey}
                onClick={() => setSelectedMonth(mKey)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '10px',
                  border: selectedMonth === mKey ? '1px solid var(--strava-orange)' : '1px solid rgba(255, 255, 255, 0.1)',
                  background: selectedMonth === mKey ? 'linear-gradient(135deg, rgba(252, 76, 2, 0.25) 0%, rgba(252, 76, 2, 0.05) 100%)' : 'rgba(0, 0, 0, 0.3)',
                  color: selectedMonth === mKey ? '#ffffff' : 'var(--text-secondary)',
                  fontWeight: selectedMonth === mKey ? 700 : 500,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {formatMonthLabel(mKey)}
              </button>
            ))}
          </div>
        </div>

        {/* Monthly Summary Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
          gap: '16px'
        }}>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>月度累積總里程</span>
            <strong style={{ fontSize: '1.6rem', color: '#ffffff', display: 'block', margin: '4px 0', fontFamily: 'var(--font-heading)' }}>
              {totalKm} <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>KM</span>
            </strong>
            <span style={{ fontSize: '0.75rem', color: 'var(--cyan-bright)' }}>共 {runCount} 趟跑步記錄</span>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>月平均配速</span>
            <strong style={{ fontSize: '1.6rem', color: 'var(--strava-orange)', display: 'block', margin: '4px 0', fontFamily: 'var(--font-heading)' }}>
              {formattedMonthlyPace}
            </strong>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>總跑程 {Math.round(totalDurationMin / 60 * 10) / 10} 小時</span>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>月平均心率</span>
            <strong style={{ fontSize: '1.6rem', color: '#38bdf8', display: 'block', margin: '4px 0', fontFamily: 'var(--font-heading)' }}>
              {avgHR} <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>BPM</span>
            </strong>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>有氧與門檻區間分佈</span>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>月度累積總爬升</span>
            <strong style={{ fontSize: '1.6rem', color: '#34d399', display: 'block', margin: '4px 0', fontFamily: 'var(--font-heading)' }}>
              {totalElevation} <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>M</span>
            </strong>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>肌力坡度適應</span>
          </div>
        </div>
      </div>

      {/* Monthly Activity List Cards */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '16px', fontFamily: 'var(--font-heading)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Activity size={20} color="var(--strava-orange)" />
          {formatMonthLabel(selectedMonth)} 跑步紀錄明細 ({runCount} 筆)
        </h3>

        {currentMonthActivities.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '30px 0' }}>
            {selectedMonth} 月尚無跑步數據。
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {currentMonthActivities.map((act) => (
              <div
                key={act.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onClick={() => setActiveRunDetail(act)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: act.workoutType === 'long' ? 'rgba(252, 76, 2, 0.2)' : (act.workoutType === 'tempo' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(6, 182, 212, 0.2)'),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    <Flame size={20} color={act.workoutType === 'long' ? '#fc4c02' : (act.workoutType === 'tempo' ? '#f59e0b' : '#06b6d4')} />
                  </div>

                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: '2px' }}>
                      {act.name}
                    </h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      📅 {act.date}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                  <div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>距離</span>
                    <strong style={{ fontSize: '1.05rem', color: '#ffffff' }}>{act.distanceKm} km</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>均配速</span>
                    <strong style={{ fontSize: '1.05rem', color: 'var(--strava-orange)' }}>{act.avgPace}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>均心率</span>
                    <strong style={{ fontSize: '1.05rem', color: '#38bdf8' }}>{act.avgHR || '--'} bpm</strong>
                  </div>
                  <ChevronRight size={18} color="var(--text-muted)" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Single Activity Detail Modal */}
      {activeRunDetail && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(8px)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div className="glass-card" style={{ width: '100%', maxWidth: '540px', padding: '24px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span className="badge badge-orange">跑步詳細數據記錄</span>
              <button
                onClick={() => setActiveRunDetail(null)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                關閉
              </button>
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '4px' }}>
              {activeRunDetail.name}
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '16px' }}>
              📅 日期: {activeRunDetail.date}
            </span>

            {/* Metrics Grid */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '12px',
              padding: '16px',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '12px',
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>跑步距離</span>
                <p style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>{activeRunDetail.distanceKm} km</p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>平均配速</span>
                <p style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--strava-orange)' }}>{activeRunDetail.avgPace}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>移動時間</span>
                <p style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>{activeRunDetail.durationMinutes} 分</p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>平均心率</span>
                <p style={{ fontSize: '1.1rem', fontWeight: 800, color: '#38bdf8' }}>{activeRunDetail.avgHR || '--'} bpm</p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>平均步頻</span>
                <p style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>{activeRunDetail.avgCadence || 178} spm</p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>累積爬升</span>
                <p style={{ fontSize: '1.1rem', fontWeight: 800, color: '#34d399' }}>{activeRunDetail.elevationGainM || 0} m</p>
              </div>
            </div>

            {/* Kilometer Splits if available */}
            {activeRunDetail.splits && activeRunDetail.splits.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff', marginBottom: '10px' }}>
                  公里分段配速表 (KM Splits)
                </h4>
                <div style={{ maxHeight: '160px', overflowY: 'auto', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', padding: '8px' }}>
                  <table style={{ width: '100%', fontSize: '0.8rem', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ color: 'var(--text-muted)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                        <th style={{ textAlign: 'left', padding: '6px' }}>公里</th>
                        <th style={{ textAlign: 'left', padding: '6px' }}>配速</th>
                        <th style={{ textAlign: 'left', padding: '6px' }}>心率</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeRunDetail.splits.map(s => (
                        <tr key={s.km} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                          <td style={{ padding: '6px', color: '#ffffff', fontWeight: 600 }}>KM {s.km}</td>
                          <td style={{ padding: '6px', color: 'var(--strava-orange)' }}>{s.pace}/km</td>
                          <td style={{ padding: '6px', color: '#38bdf8' }}>{s.hr} bpm</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <button
              className="btn-secondary"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => setActiveRunDetail(null)}
            >
              關閉視窗
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
