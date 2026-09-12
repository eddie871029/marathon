import React, { useState, useEffect, useRef } from 'react';
import {
  Play, Pause, SkipForward, SkipBack, RotateCcw, Volume2, VolumeX,
  Flame, Award, Timer, Activity, Zap, CheckCircle2, AlertCircle,
  Info, ChevronRight, Maximize2, Minimize2, Dumbbell, Sparkles,
  ArrowRight, ShieldCheck, HeartPulse, RefreshCw, Video, Film,
  ExternalLink, CheckSquare
} from 'lucide-react';

import { RUNNER_WORKOUTS } from '../utils/runnerWorkouts';

// Web Audio API Sound Synthesizer for Timers
function playTone(freq = 440, duration = 0.15, type = 'sine') {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    // audio context might be blocked if no user interaction
  }
}

// Voice Coach via Web Speech API
function speakChinese(text) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-TW';
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  }
}

// Real Human Video Demonstration Screen with Biomechanical Fallback & YouTube Embed
function RealHumanDemonstrationPlayer({ exercise, displayMode, setDisplayMode, phase }) {
  const [isVideoLoading, setIsVideoLoading] = useState(true);

  useEffect(() => {
    setIsVideoLoading(true);
    const timer = setTimeout(() => setIsVideoLoading(false), 800);
    return () => clearTimeout(timer);
  }, [exercise.id]);

  const youtubeDirectLink = `https://www.youtube.com/results?search_query=${exercise.videoSearchQuery}`;

  return (
    <div style={{
      width: '100%',
      borderRadius: '16px',
      border: '1px solid rgba(255, 255, 255, 0.12)',
      background: 'radial-gradient(circle at center, rgba(18, 26, 43, 0.95) 0%, rgba(10, 14, 23, 1) 100%)',
      overflow: 'hidden',
      position: 'relative',
      boxShadow: '0 12px 36px rgba(0, 0, 0, 0.5)'
    }}>
      
      {/* Top Overlay Bar: Mode Switcher & Exercise Phase */}
      <div style={{
        padding: '12px 16px',
        background: 'rgba(11, 15, 25, 0.9)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '8px',
        zIndex: 5
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className={`badge ${phase === 'work' ? 'badge-orange' : 'badge-cyan'}`} style={{ fontSize: '0.8rem' }}>
            {phase === 'work' ? '🔥 動作執行中 (WORK)' : '☕ 休息準備 (REST)'}
          </span>
          <span style={{ fontSize: '0.85rem', color: '#ffffff', fontWeight: 600 }}>
            {exercise.name}
          </span>
        </div>

        {/* View Mode Toggle: Real Human Video vs Biomechanical Animation */}
        <div style={{ display: 'flex', gap: '6px', background: 'rgba(255, 255, 255, 0.06)', padding: '3px', borderRadius: '8px' }}>
          <button
            onClick={() => setDisplayMode('video')}
            style={{
              background: displayMode === 'video' ? 'var(--strava-orange)' : 'transparent',
              color: displayMode === 'video' ? '#ffffff' : 'var(--text-secondary)',
              border: 'none',
              borderRadius: '6px',
              padding: '4px 10px',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'all 0.2s'
            }}
          >
            <Video size={13} />
            <span>🎥 真人示範影片</span>
          </button>

          <button
            onClick={() => setDisplayMode('animation')}
            style={{
              background: displayMode === 'animation' ? 'var(--cyan-bright)' : 'transparent',
              color: displayMode === 'animation' ? '#0b0f19' : 'var(--text-secondary)',
              border: 'none',
              borderRadius: '6px',
              padding: '4px 10px',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'all 0.2s'
            }}
          >
            <Activity size={13} />
            <span>🦾 力線動畫</span>
          </button>
        </div>
      </div>

      {/* Main Screen Content: 16:9 Real Human Video Embed or Animation */}
      <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', background: '#000000' }}>
        
        {displayMode === 'video' ? (
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
            <iframe
              src={`${exercise.embedVideoUrl}&autoplay=1&mute=1&controls=1&rel=0`}
              title={`真人示範影片 - ${exercise.name}`}
              style={{
                width: '100%',
                height: '100%',
                border: 'none'
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'radial-gradient(circle at center, rgba(18, 26, 43, 0.95) 0%, rgba(10, 14, 23, 1) 100%)'
          }}>
            <BiomechanicalVisualizerCanvas exercise={exercise} />
          </div>
        )}

      </div>

      {/* Real Coach Focus Points Sub-bar */}
      <div style={{
        padding: '12px 16px',
        background: 'rgba(255, 255, 255, 0.03)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
          <Sparkles size={16} color="var(--strava-orange)" />
          <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
            <b style={{ color: '#ffffff' }}>示範重點：</b>{exercise.realCoachFocus}
          </span>
        </div>

        <a
          href={youtubeDirectLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: '0.78rem',
            color: 'var(--cyan-bright)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            textDecoration: 'none',
            fontWeight: 600,
            padding: '4px 8px',
            borderRadius: '6px',
            background: 'rgba(6, 182, 212, 0.1)',
            border: '1px solid rgba(6, 182, 212, 0.2)'
          }}
        >
          <span>在 YouTube 開啟高清真人教學</span>
          <ExternalLink size={12} />
        </a>
      </div>

    </div>
  );
}

// Biomechanical Animation Canvas Component
function BiomechanicalVisualizerCanvas({ exercise }) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    let animId;
    const update = () => {
      setFrame(prev => (prev + 1) % 120);
      animId = requestAnimationFrame(update);
    };
    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, []);

  const progress = (frame % 60) / 60;
  const sinVal = Math.sin(progress * Math.PI * 2);
  const cosVal = Math.cos(progress * Math.PI * 2);
  const orange = '#fc4c02';
  const cyan = '#06b6d4';
  const activeColor = exercise.category === '肌力與穩定性' ? orange : cyan;

  const renderFigure = () => {
    const type = exercise.animationType;
    if (type === 'rdl') {
      const t = (sinVal + 1) / 2;
      const headX = 140 - t * 45;
      const headY = 70 + t * 45;
      const hipX = 150;
      const hipY = 135;
      return (
        <g>
          <line x1="40" y1="225" x2="260" y2="225" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="4 4" />
          <circle cx={hipX} cy={hipY} r="14" fill={activeColor} opacity={0.3 + t * 0.4} />
          <circle cx={headX} cy={headY} r="12" fill="#ffffff" />
          <line x1={headX} y1={headY + 12} x2={hipX} y2={hipY} stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
          <line x1={hipX} y1={hipY} x2="150" y2="180" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
          <line x1="150" y1="180" x2="150" y2="220" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
          <line x1={hipX} y1={hipY} x2={150 - t * 50 + (1 - t) * 20} y2={140 - t * 10 + (1 - t) * (-25)} stroke={activeColor} strokeWidth="5" strokeLinecap="round" />
          <line x1={150 - t * 50 + (1 - t) * 20} y1={140 - t * 10 + (1 - t) * (-25)} x2={150 - t * 85 + (1 - t) * 20} y2={145 - t * 15 + (1 - t) * 5} stroke={activeColor} strokeWidth="5" strokeLinecap="round" />
          <text x="150" y="245" fill="var(--text-muted)" fontSize="11" textAnchor="middle">
            {t > 0.5 ? '後側鏈拉伸 (Hinge 離心控制)' : '提膝衝刺 (Glute Drive 頂峰)'}
          </text>
        </g>
      );
    } else if (type === 'pogo') {
      const t = Math.abs(cosVal);
      const hopY = 110 - t * 35;
      return (
        <g>
          <line x1="40" y1="225" x2="260" y2="225" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
          <circle cx="150" cy={hopY + 80} r="12" fill={cyan} opacity={0.3 + (1 - t) * 0.6} />
          <circle cx="150" cy={hopY} r="12" fill="#ffffff" />
          <line x1="150" y1={hopY + 12} x2="150" y2={hopY + 55} stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
          <line x1="150" y1={hopY + 55} x2="148" y2={hopY + 80} stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
          <line x1="148" y1={hopY + 80} x2="148" y2={hopY + 105} stroke={cyan} strokeWidth="5" strokeLinecap="round" />
          <text x="150" y="245" fill="var(--text-muted)" fontSize="11" textAnchor="middle">
            {t < 0.2 ? '極短觸地反彈 (小腿與跟腱剛性)' : '空中腳尖微上勾 (背屈蓄能)'}
          </text>
        </g>
      );
    } else {
      const t = (sinVal + 1) / 2;
      return (
        <g>
          <line x1="40" y1="225" x2="260" y2="225" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
          <circle cx="150" cy="80" r="12" fill="#ffffff" />
          <line x1="150" y1="92" x2="150" y2="145" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
          <circle cx="150" cy="145" r="12" fill={activeColor} opacity={0.4} />
          <line x1="150" y1="145" x2={130 + t * 40} y2="180" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
          <line x1={130 + t * 40} y1="180" x2={130 + t * 40} y2="225" stroke={activeColor} strokeWidth="5" strokeLinecap="round" />
          <text x="150" y="245" fill="var(--text-muted)" fontSize="11" textAnchor="middle">
            動作平穩執行 · 核心收緊
          </text>
        </g>
      );
    }
  };

  return (
    <svg width="300" height="260" viewBox="0 0 300 260">
      {renderFigure()}
    </svg>
  );
}

export default function WorkoutStudio({ onWorkoutComplete }) {
  const [selectedWorkoutKey, setSelectedWorkoutKey] = useState('strength');
  const [currentExerciseIdx, setCurrentExerciseIdx] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [totalRounds, setTotalRounds] = useState(3);
  const [phase, setPhase] = useState('idle'); // 'idle', 'countdown', 'work', 'rest', 'completed'
  const [timeLeft, setTimeLeft] = useState(40);
  const [isMuted, setIsMuted] = useState(false);
  const [displayMode, setDisplayMode] = useState('video'); // 'video' (default) or 'animation'
  const [workDuration, setWorkDuration] = useState(40);
  const [restDuration, setRestDuration] = useState(20);
  const [showDetailModal, setShowDetailModal] = useState(null);

  const activeWorkout = RUNNER_WORKOUTS[selectedWorkoutKey];
  const activeExercise = activeWorkout.exercises[currentExerciseIdx];

  const timerRef = useRef(null);

  // Sync settings on workout select
  useEffect(() => {
    setWorkDuration(activeWorkout.defaultWorkSec);
    setRestDuration(activeWorkout.defaultRestSec);
    setTotalRounds(activeWorkout.defaultRounds);
    setCurrentExerciseIdx(0);
    setCurrentRound(1);
    setPhase('idle');
    setTimeLeft(activeWorkout.defaultWorkSec);
  }, [selectedWorkoutKey]);

  // Main Workout Timer Loop
  useEffect(() => {
    if (phase === 'idle' || phase === 'completed') {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handlePhaseTransition();
          return 0;
        }

        // Sound & Voice alerts on 3, 2, 1 seconds
        if (prev <= 4 && prev > 1) {
          if (!isMuted) {
            playTone(600, 0.12);
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [phase, currentExerciseIdx, currentRound, totalRounds, workDuration, restDuration, isMuted]);

  const handlePhaseTransition = () => {
    if (phase === 'countdown') {
      if (!isMuted) {
        playTone(900, 0.35, 'triangle');
        speakChinese(`開始！${activeExercise.name}`);
      }
      setPhase('work');
      setTimeLeft(workDuration);
    } else if (phase === 'work') {
      if (currentExerciseIdx < activeWorkout.exercises.length - 1) {
        if (!isMuted) {
          playTone(480, 0.25);
          speakChinese(`完成！休息 ${restDuration} 秒。下一個動作：${activeWorkout.exercises[currentExerciseIdx + 1].name}`);
        }
        setPhase('rest');
        setTimeLeft(restDuration);
      } else {
        if (currentRound < totalRounds) {
          if (!isMuted) {
            playTone(520, 0.3);
            speakChinese(`第 ${currentRound} 輪完成！休息準備進入第 ${currentRound + 1} 輪。`);
          }
          setCurrentRound(r => r + 1);
          setCurrentExerciseIdx(0);
          setPhase('rest');
          setTimeLeft(restDuration + 15);
        } else {
          if (!isMuted) {
            playTone(880, 0.4);
            speakChinese('恭喜完成今天的跑者專屬訓練！請做好伸展收操。');
          }
          setPhase('completed');
          if (onWorkoutComplete) {
            onWorkoutComplete({
              type: activeWorkout.title,
              rounds: totalRounds,
              durationMin: Math.round((totalRounds * activeWorkout.exercises.length * (workDuration + restDuration)) / 60)
            });
          }
        }
      }
    } else if (phase === 'rest') {
      if (currentExerciseIdx < activeWorkout.exercises.length - 1) {
        setCurrentExerciseIdx(i => i + 1);
      }
      if (!isMuted) {
        playTone(900, 0.35, 'triangle');
        const nextEx = activeWorkout.exercises[currentExerciseIdx < activeWorkout.exercises.length - 1 ? currentExerciseIdx + 1 : 0];
        speakChinese(`開始！${nextEx.name}`);
      }
      setPhase('work');
      setTimeLeft(workDuration);
    }
  };

  const startWorkout = () => {
    setPhase('countdown');
    setTimeLeft(3);
    if (!isMuted) {
      playTone(500, 0.15);
      speakChinese(`準備開始：${activeExercise.name}。倒數三秒。`);
    }
  };

  const pauseWorkout = () => {
    setPhase('idle');
  };

  const restartWorkout = () => {
    setPhase('idle');
    setCurrentExerciseIdx(0);
    setCurrentRound(1);
    setTimeLeft(workDuration);
  };

  const skipNext = () => {
    if (currentExerciseIdx < activeWorkout.exercises.length - 1) {
      setCurrentExerciseIdx(i => i + 1);
      setPhase('work');
      setTimeLeft(workDuration);
      if (!isMuted) speakChinese(`切換至：${activeWorkout.exercises[currentExerciseIdx + 1].name}`);
    }
  };

  const skipPrev = () => {
    if (currentExerciseIdx > 0) {
      setCurrentExerciseIdx(i => i - 1);
      setPhase('work');
      setTimeLeft(workDuration);
    }
  };

  const totalExercises = activeWorkout.exercises.length;
  const currentTotalProgress = ((currentRound - 1) * totalExercises + currentExerciseIdx + (phase === 'work' ? 1 - timeLeft / workDuration : 0)) / (totalRounds * totalExercises);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Top Banner / Switcher Header */}
      <div className="glass-card" style={{ padding: '24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <span className={`badge ${activeWorkout.accentClass}`}>
                🎥 真人示範 · 居家跟練影音室
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                無器材 · 零門檻 · 跑者體能全面進化
              </span>
            </div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff' }}>
              跑者專屬 <span className="gradient-text-orange">真人示範動態跟練播放器</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '4px', maxWidth: '720px' }}>
              {activeWorkout.description}
            </p>
          </div>

          {/* Program Switch Buttons */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => setSelectedWorkoutKey('strength')}
              style={{
                padding: '12px 18px',
                borderRadius: '12px',
                border: selectedWorkoutKey === 'strength' ? '2px solid #fc4c02' : '1px solid var(--border-color)',
                background: selectedWorkoutKey === 'strength' ? 'rgba(252, 76, 2, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                color: selectedWorkoutKey === 'strength' ? '#ffffff' : 'var(--text-secondary)',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s'
              }}
            >
              <Dumbbell size={18} color="#fc4c02" />
              <span>1. 跑者肌力訓練組</span>
            </button>

            <button
              onClick={() => setSelectedWorkoutKey('agility')}
              style={{
                padding: '12px 18px',
                borderRadius: '12px',
                border: selectedWorkoutKey === 'agility' ? '2px solid #06b6d4' : '1px solid var(--border-color)',
                background: selectedWorkoutKey === 'agility' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                color: selectedWorkoutKey === 'agility' ? '#ffffff' : 'var(--text-secondary)',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s'
              }}
            >
              <Zap size={18} color="#06b6d4" />
              <span>2. 跑者敏捷性訓練組</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Follow-Along Video Player Screen */}
      <div className="glass-card glass-card-orange" style={{ padding: '24px' }}>
        
        {/* Workout Progress Bar */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
            <span>總進度：第 {currentRound} / {totalRounds} 輪 · 動作 {currentExerciseIdx + 1} / {totalExercises}</span>
            <span>{Math.round(currentTotalProgress * 100)}% 完成</span>
          </div>
          <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{
              width: `${Math.min(100, Math.max(0, currentTotalProgress * 100))}%`,
              height: '100%',
              background: `linear-gradient(90deg, ${activeWorkout.color}, #f59e0b)`,
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>

        {/* Player Layout: Real Human Video Player (Left) + Realtime Controls (Right) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(360px, 1.4fr) minmax(280px, 1fr)',
          gap: '24px',
          alignItems: 'start'
        }}>
          
          {/* Left: Real Human Video Demonstration Screen */}
          <div>
            <RealHumanDemonstrationPlayer
              exercise={activeExercise}
              displayMode={displayMode}
              setDisplayMode={setDisplayMode}
              phase={phase === 'idle' ? 'work' : phase}
            />

            {/* Quick Exercise Navigation Dots */}
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '16px' }}>
              {activeWorkout.exercises.map((ex, idx) => (
                <button
                  key={ex.id}
                  onClick={() => {
                    setCurrentExerciseIdx(idx);
                    setTimeLeft(workDuration);
                    if (phase !== 'idle') setPhase('work');
                  }}
                  title={ex.name}
                  style={{
                    width: idx === currentExerciseIdx ? '32px' : '10px',
                    height: '10px',
                    borderRadius: '5px',
                    background: idx === currentExerciseIdx ? activeWorkout.color : 'rgba(255, 255, 255, 0.2)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.25s'
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right: Timer & Interactive Control Board */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Current Exercise Title & EnName */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span className="badge badge-orange" style={{ fontSize: '0.75rem' }}>
                  動作 {currentExerciseIdx + 1} / {totalExercises}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {activeExercise.difficulty}難度
                </span>
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>
                {activeExercise.name}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {activeExercise.enName}
              </p>
            </div>

            {/* Giant Circular / Digital Timer Countdown Display */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '16px',
              padding: '20px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              textAlign: 'center'
            }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  {phase === 'countdown' ? '⚡ 預備倒數' : phase === 'rest' ? '☕ 休息倒數' : '⏱️ 執行時間'}
                </div>
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '3.5rem',
                  fontWeight: 900,
                  color: phase === 'rest' ? '#06b6d4' : phase === 'countdown' ? '#f59e0b' : '#fc4c02',
                  lineHeight: 1
                }}>
                  {timeLeft < 10 ? `0${timeLeft}` : timeLeft}
                  <span style={{ fontSize: '1.2rem', fontWeight: 500, color: 'var(--text-muted)' }}>s</span>
                </div>
              </div>

              <div style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '20px', textAlign: 'left' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  輪次：<b style={{ color: '#ffffff' }}>{currentRound} / {totalRounds}</b>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  動作：<b style={{ color: '#ffffff' }}>{currentExerciseIdx + 1} / {totalExercises}</b>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  下個動作：<span style={{ color: 'var(--cyan-bright)' }}>
                    {currentExerciseIdx < totalExercises - 1 ? activeWorkout.exercises[currentExerciseIdx + 1].name.slice(0, 10) + '...' : '本輪收尾'}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons: Play/Pause/Skip/Mute */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {phase === 'idle' ? (
                <button
                  className="btn-strava"
                  onClick={startWorkout}
                  style={{ flex: 1, padding: '14px', fontSize: '1.1rem', justifyContent: 'center' }}
                >
                  <Play size={20} fill="#ffffff" />
                  <span>開始跟練 (Start)</span>
                </button>
              ) : (
                <button
                  className="btn-secondary"
                  onClick={pauseWorkout}
                  style={{
                    flex: 1,
                    padding: '14px',
                    fontSize: '1.1rem',
                    justifyContent: 'center',
                    background: 'rgba(244, 63, 94, 0.2)',
                    borderColor: 'rgba(244, 63, 94, 0.4)',
                    color: '#ff8095'
                  }}
                >
                  <Pause size={20} />
                  <span>暫停 (Pause)</span>
                </button>
              )}

              <button
                className="btn-secondary"
                onClick={skipPrev}
                disabled={currentExerciseIdx === 0}
                style={{ padding: '14px', opacity: currentExerciseIdx === 0 ? 0.4 : 1 }}
                title="上一個動作"
              >
                <SkipBack size={18} />
              </button>

              <button
                className="btn-secondary"
                onClick={skipNext}
                disabled={currentExerciseIdx === totalExercises - 1}
                style={{ padding: '14px', opacity: currentExerciseIdx === totalExercises - 1 ? 0.4 : 1 }}
                title="下一個動作"
              >
                <SkipForward size={18} />
              </button>

              <button
                className="btn-secondary"
                onClick={restartWorkout}
                style={{ padding: '14px' }}
                title="重新開始"
              >
                <RotateCcw size={18} />
              </button>

              <button
                className="btn-secondary"
                onClick={() => setIsMuted(!isMuted)}
                style={{ padding: '14px', color: isMuted ? 'var(--rose-danger)' : 'var(--emerald-success)' }}
                title={isMuted ? '解除靜音' : '靜音語音提示'}
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
            </div>

            {/* Target Muscles Badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '2px' }}>
              {activeExercise.targetMuscles.map((m, idx) => (
                <span key={idx} style={{
                  fontSize: '0.75rem',
                  background: 'rgba(255,255,255,0.06)',
                  color: 'var(--cyan-bright)',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  border: '1px solid rgba(255,255,255,0.08)'
                }}>
                  🎯 {m}
                </span>
              ))}
            </div>

            {/* Interval Adjusters */}
            <div style={{
              display: 'flex',
              gap: '12px',
              fontSize: '0.85rem',
              color: 'var(--text-muted)',
              paddingTop: '8px',
              borderTop: '1px solid rgba(255,255,255,0.06)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>動作時間:</span>
                <select
                  value={workDuration}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    setWorkDuration(v);
                    if (phase === 'idle') setTimeLeft(v);
                  }}
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    color: '#ffffff',
                    border: '1px solid var(--border-color)',
                    borderRadius: '6px',
                    padding: '3px 8px'
                  }}
                >
                  <option value={30}>30 秒</option>
                  <option value={40}>40 秒 (推薦)</option>
                  <option value={50}>50 秒</option>
                </select>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>休息時間:</span>
                <select
                  value={restDuration}
                  onChange={(e) => setRestDuration(Number(e.target.value))}
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    color: '#ffffff',
                    border: '1px solid var(--border-color)',
                    borderRadius: '6px',
                    padding: '3px 8px'
                  }}
                >
                  <option value={15}>15 秒</option>
                  <option value={20}>20 秒 (推薦)</option>
                  <option value={30}>30 秒</option>
                </select>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>總輪數:</span>
                <select
                  value={totalRounds}
                  onChange={(e) => setTotalRounds(Number(e.target.value))}
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    color: '#ffffff',
                    border: '1px solid var(--border-color)',
                    borderRadius: '6px',
                    padding: '3px 8px'
                  }}
                >
                  <option value={2}>2 輪 (快速)</option>
                  <option value={3}>3 輪 (標準)</option>
                  <option value={4}>4 輪 (高強度)</option>
                </select>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Completion Modal / Banner */}
      {phase === 'completed' && (
        <div className="glass-card" style={{
          padding: '24px',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(6, 182, 212, 0.1) 100%)',
          border: '1px solid rgba(16, 185, 129, 0.4)',
          textAlign: 'center'
        }}>
          <div style={{ display: 'inline-flex', padding: '12px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', marginBottom: '12px' }}>
            <Award size={36} color="var(--emerald-success)" />
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff' }}>
            🎉 訓練完成！太棒了！
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: '8px 0 16px 0' }}>
            你已成功完成 {totalRounds} 輪「{activeWorkout.title}」，有效強化了跑者專屬下肢動力鏈與核心穩定性。
          </p>
          <button
            className="btn-strava"
            onClick={restartWorkout}
            style={{ margin: '0 auto' }}
          >
            <RotateCcw size={16} /> 再次訓練
          </button>
        </div>
      )}

      {/* Detailed Exercise Library Breakdown Cards */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff' }}>
              🎥 12 大動作真人示範清單與要領
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              點擊任一動作卡片即可切換上方播放器觀看真人示範影片並開始跟練。
            </p>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: '16px'
        }}>
          {activeWorkout.exercises.map((ex, idx) => {
            const isCurrent = idx === currentExerciseIdx;
            return (
              <div
                key={ex.id}
                className="glass-card"
                style={{
                  padding: '20px',
                  border: isCurrent ? `2px solid ${activeWorkout.color}` : '1px solid var(--border-color)',
                  background: isCurrent ? 'rgba(252, 76, 2, 0.08)' : 'var(--bg-card)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '12px'
                }}
                onClick={() => {
                  setCurrentExerciseIdx(idx);
                  setTimeLeft(workDuration);
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span className="badge badge-orange" style={{ fontSize: '0.75rem' }}>
                      第 {idx + 1} 動 · {ex.difficulty}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      ⏱️ {workDuration}s 動作 / {restDuration}s 休息
                    </span>
                  </div>

                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
                    {ex.name}
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                    {ex.enName}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                    {ex.targetMuscles.map((m, mIdx) => (
                      <span key={mIdx} style={{
                        fontSize: '0.7rem',
                        background: 'rgba(255,255,255,0.06)',
                        color: 'var(--cyan-bright)',
                        padding: '2px 8px',
                        borderRadius: '4px'
                      }}>
                        {m}
                      </span>
                    ))}
                  </div>

                  {/* Purpose & Cues */}
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '10px' }}>
                    <b style={{ color: '#ffffff' }}>💡 訓練效益：</b>{ex.purpose}
                  </div>

                  <div style={{
                    background: 'rgba(0, 0, 0, 0.25)',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    color: 'var(--text-secondary)'
                  }}>
                    <div style={{ color: '#fbbf24', fontWeight: 600, marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <AlertCircle size={14} /> 真人示範關鍵要領：
                    </div>
                    <ul style={{ paddingLeft: '16px', margin: 0 }}>
                      {ex.cues.slice(0, 2).map((cue, cIdx) => (
                        <li key={cIdx} style={{ marginBottom: '2px' }}>{cue}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ fontSize: '0.8rem', color: isCurrent ? activeWorkout.color : 'var(--text-muted)', fontWeight: 600 }}>
                    {isCurrent ? '▶️ 播放中' : '點擊載入真人影片'}
                  </span>
                  <button
                    className="btn-secondary"
                    style={{ fontSize: '0.8rem', padding: '4px 10px' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDetailModal(ex);
                    }}
                  >
                    <Info size={14} /> 完整動作指南
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Runner Training Guidelines & Frequency Advisor */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldCheck size={20} color="var(--emerald-success)" />
          跑者週課表搭配建議 (How to Schedule)
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <h4 style={{ color: '#ff7033', fontWeight: 700, fontSize: '0.95rem', marginBottom: '8px' }}>
              🏋️ 肌力訓練建議安排
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              • <b>頻率</b>：每週 2 次（建議安排在輕鬆跑 Easy Run 日的下午，或質量課表結束後的當天，貫徹「Hard Days Hard, Easy Days Easy」原則）。<br />
              • <b>避免時機</b>：不要在長距離 LSD 或高強度間歇跑前一天進行力竭肌力訓練，避免肌肉疲勞影響跑姿。
            </p>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <h4 style={{ color: '#38bdf8', fontWeight: 700, fontSize: '0.95rem', marginBottom: '8px' }}>
              ⚡ 敏捷與反應訓練建議安排
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              • <b>頻率</b>：每週 2~3 次（可作為主跑課表前的「動態熱身神經點火」，每次 10-15 分鐘）。<br />
              • <b>重點</b>：強調動作的「爆發力與短接觸時間」，在神經完全不疲勞的狀態下執行效果最佳。
            </p>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <h4 style={{ color: '#34d399', fontWeight: 700, fontSize: '0.95rem', marginBottom: '8px' }}>
              🧘 居家無器材執行防傷重點
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              • <b>著地緩衝</b>：跳躍敏捷動作落地時膝蓋絕不內夾，保持腳尖與膝關節朝向一致。<br />
              • <b>赤足 vs 穿鞋</b>：波戈跳與十字跳初期建議穿著跑步鞋提供足底支撐，進階後可赤足進行提踵強化足底內在肌群。
            </p>
          </div>
        </div>
      </div>

      {/* Modal for Full Detailed Exercise Breakdown */}
      {showDetailModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '16px'
        }}
        onClick={() => setShowDetailModal(null)}
        >
          <div
            className="glass-card"
            style={{
              maxWidth: '600px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '28px',
              border: '1px solid rgba(252, 76, 2, 0.4)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div>
                <span className="badge badge-orange">{showDetailModal.difficulty}難度</span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginTop: '6px' }}>
                  {showDetailModal.name}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{showDetailModal.enName}</p>
              </div>
              <button
                className="btn-secondary"
                style={{ padding: '6px 12px', borderRadius: '8px' }}
                onClick={() => setShowDetailModal(null)}
              >
                ✕ 關閉
              </button>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', margin: '12px 0 16px 0' }}>
              {showDetailModal.targetMuscles.map((m, idx) => (
                <span key={idx} style={{
                  background: 'rgba(252, 76, 2, 0.15)',
                  color: '#ff7033',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  fontWeight: 600
                }}>
                  🎯 {m}
                </span>
              ))}
            </div>

            <div style={{ marginBottom: '16px' }}>
              <h4 style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.95rem', marginBottom: '4px' }}>
                💡 跑者專屬效益：
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                {showDetailModal.purpose}
              </p>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <h4 style={{ color: '#34d399', fontWeight: 700, fontSize: '0.95rem', marginBottom: '6px' }}>
                ✅ 真人教練示範步驟：
              </h4>
              <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                {showDetailModal.cues.map((c, idx) => (
                  <li key={idx} style={{ marginBottom: '4px' }}>{c}</li>
                ))}
              </ul>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: '#f43f5e', fontWeight: 700, fontSize: '0.95rem', marginBottom: '6px' }}>
                ⚠️ 常見錯誤（避免受傷）：
              </h4>
              <ul style={{ paddingLeft: '20px', color: '#fda4af', fontSize: '0.85rem', lineHeight: 1.5 }}>
                {showDetailModal.mistakes.map((m, idx) => (
                  <li key={idx} style={{ marginBottom: '4px' }}>{m}</li>
                ))}
              </ul>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                className="btn-strava"
                style={{ flex: 1, justifyContent: 'center' }}
                onClick={() => {
                  const idx = activeWorkout.exercises.findIndex(e => e.id === showDetailModal.id);
                  if (idx !== -1) {
                    setCurrentExerciseIdx(idx);
                    setTimeLeft(workDuration);
                  }
                  setShowDetailModal(null);
                }}
              >
                <Play size={18} /> 載入此動作開始跟練
              </button>
              <a
                href={`https://www.youtube.com/results?search_query=${showDetailModal.videoSearchQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}
              >
                <ExternalLink size={16} /> YouTube 真人示範
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
