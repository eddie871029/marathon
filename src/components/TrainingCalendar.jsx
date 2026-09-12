import React, { useState } from 'react';
import { Calendar, CheckCircle2, Circle, Flame, Target, Info, ChevronLeft, ChevronRight, Award, Check } from 'lucide-react';
import { getTrainingPaceZones } from '../utils/vdotCalculator';

export default function TrainingCalendar({ planWeeks, athlete, onUpdateGoalTime, onMarkWorkoutComplete }) {
  const [selectedWeekNum, setSelectedWeekNum] = useState(1);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [targetGoal, setTargetGoal] = useState('01:52:00');

  const currentWeek = planWeeks.find(w => w.weekNumber === selectedWeekNum) || planWeeks[0];

  const handleGoalChange = (newGoal) => {
    setTargetGoal(newGoal);
    if (onUpdateGoalTime) {
      onUpdateGoalTime(newGoal);
    }
  };

  const getWorkoutBadgeClass = (type) => {
    switch (type) {
      case 'long': return 'badge-orange';
      case 'tempo': return 'badge-amber';
      case 'interval': return 'badge-purple';
      case 'easy': return 'badge-cyan';
      default: return 'badge';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Top Target Goal & Strategy Banner */}
      <div className="glass-card glass-card-orange" style={{ padding: '24px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <Target size={22} color="var(--strava-orange)" />
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)' }}>
                12 週半馬專項訓練計畫
              </h2>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              基於目前跑力 VDOT <strong style={{ color: 'var(--cyan-bright)' }}>{athlete?.vdot || 43.5}</strong> 的 Jack Daniels 週期化課表
            </p>
          </div>

          {/* Goal Selector Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>目標半馬成績:</span>
            <select
              value={targetGoal}
              onChange={(e) => handleGoalChange(e.target.value)}
              style={{
                background: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid var(--strava-orange)',
                borderRadius: '10px',
                padding: '8px 14px',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer'
              }}
            >
              <option value="02:00:00">Sub 2:00 (配速 5:41/km)</option>
              <option value="01:52:00">Sub 1:52 (配速 5:18/km)</option>
              <option value="01:45:00">Sub 1:45 (配速 4:58/km)</option>
              <option value="01:35:00">Sub 1:35 (配速 4:30/km)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Week Selector Nav */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        overflowX: 'auto',
        paddingBottom: '8px'
      }}>
        {planWeeks.map((week) => (
          <button
            key={week.weekNumber}
            onClick={() => setSelectedWeekNum(week.weekNumber)}
            style={{
              padding: '8px 16px',
              borderRadius: '10px',
              border: selectedWeekNum === week.weekNumber ? '1px solid var(--strava-orange)' : '1px solid rgba(255, 255, 255, 0.08)',
              background: selectedWeekNum === week.weekNumber ? 'rgba(252, 76, 2, 0.2)' : 'rgba(18, 26, 43, 0.6)',
              color: selectedWeekNum === week.weekNumber ? '#ffffff' : 'var(--text-secondary)',
              fontWeight: selectedWeekNum === week.weekNumber ? 700 : 500,
              fontSize: '0.85rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease'
            }}
          >
            第 {week.weekNumber} 週 ({week.totalWeeklyKm}km)
          </button>
        ))}
      </div>

      {/* Current Week Header */}
      <div className="glass-card" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--cyan-bright)', fontWeight: 700, textTransform: 'uppercase' }}>
              WEEK {currentWeek.weekNumber} / 12
            </span>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)', margin: '2px 0' }}>
              {currentWeek.phaseName}
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              {currentWeek.phaseDescription}
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>本週預定里程</span>
            <strong style={{ fontSize: '1.5rem', color: '#ffffff', fontFamily: 'var(--font-heading)' }}>
              {currentWeek.totalWeeklyKm} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>KM</span>
            </strong>
          </div>
        </div>
      </div>

      {/* 7 Days Workout Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '16px'
      }}>
        {currentWeek.days.map((dayItem, idx) => (
          <div
            key={idx}
            className="glass-card"
            style={{
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              justify: 'space-between',
              borderLeft: dayItem.type === 'long' ? '4px solid #fc4c02' : (dayItem.type === 'tempo' ? '4px solid #f59e0b' : '1px solid var(--border-color)'),
              cursor: dayItem.type !== 'rest' ? 'pointer' : 'default'
            }}
            onClick={() => dayItem.type !== 'rest' && setSelectedWorkout(dayItem)}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                  {dayItem.dayName}
                </span>
                <span className={`badge ${getWorkoutBadgeClass(dayItem.type)}`}>
                  {dayItem.type === 'long' ? 'LSD 長跑' : (dayItem.type === 'tempo' ? 'T 門檻' : (dayItem.type === 'interval' ? 'I 間歇' : (dayItem.type === 'easy' ? 'E 慢跑' : '休息日')))}
                </span>
              </div>

              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
                {dayItem.title}
              </h4>

              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4', marginBottom: '12px' }}>
                {dayItem.description}
              </p>
            </div>

            {dayItem.type !== 'rest' && (
              <div style={{
                background: 'rgba(0, 0, 0, 0.25)',
                padding: '10px 12px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.8rem'
              }}>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.7rem' }}>目標配速</span>
                  <strong style={{ color: '#ffffff' }}>{dayItem.targetPace}</strong>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.7rem' }}>距離</span>
                  <strong style={{ color: 'var(--cyan-bright)' }}>{dayItem.distanceKm} km</strong>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Detailed Workout Modal */}
      {selectedWorkout && (
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
          <div className="glass-card" style={{ width: '100%', maxWidth: '500px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span className={`badge ${getWorkoutBadgeClass(selectedWorkout.type)}`}>
                {selectedWorkout.dayName} 課表細節
              </span>
              <button
                onClick={() => setSelectedWorkout(null)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                關閉
              </button>
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '12px' }}>
              {selectedWorkout.title}
            </h3>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '16px' }}>
              {selectedWorkout.description}
            </p>

            <div style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '12px',
              padding: '16px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              marginBottom: '20px'
            }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>目標配速區間</span>
                <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--strava-orange)' }}>{selectedWorkout.targetPace}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>目標心率控制</span>
                <p style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--cyan-bright)' }}>{selectedWorkout.targetHRZone}</p>
              </div>
            </div>

            <div style={{ background: 'rgba(6, 182, 212, 0.08)', border: '1px solid rgba(6, 182, 212, 0.2)', padding: '12px 14px', borderRadius: '10px', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
              💡 <strong>教練補給叮嚀：</strong> 跑步前 30 分鐘補充 200ml 水分，長跑超過 70 分鐘建議攜帶 1 包能量膠於 45 分鐘時服用。
            </div>

            <button
              className="btn-strava"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => {
                if (onMarkWorkoutComplete) onMarkWorkoutComplete(selectedWorkout);
                setSelectedWorkout(null);
              }}
            >
              <CheckCircle2 size={18} /> 標示此課表已順利完成！
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
