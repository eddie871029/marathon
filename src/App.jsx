import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import TrainingCalendar from './components/TrainingCalendar';
import PerformanceAnalytics from './components/PerformanceAnalytics';
import AICoachChat from './components/AICoachChat';
import RacePacingCalculator from './components/RacePacingCalculator';
import MonthlyReview from './components/MonthlyReview';
import WorkoutStudio from './components/WorkoutStudio';
import StravaConnectModal from './components/StravaConnectModal';

import { mockAthleteProfile, mockStravaActivities } from './utils/mockStravaData';
import { calculateTrainingLoadTimeline } from './utils/trainingLoad';
import { generateHalfMarathonPlan } from './utils/planGenerator';
import { calculateVDOT, predictRaceTime, secondsToTimeString } from './utils/vdotCalculator';
import { fetchStravaAthlete, fetchStravaActivities, exchangeOAuthCode } from './services/stravaApi';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [athlete, setAthlete] = useState(mockAthleteProfile);
  const [activities, setActivities] = useState(mockStravaActivities);
  const [isConnected, setIsConnected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState('');
  const [isRealData, setIsRealData] = useState(false);
  const [oauthCode, setOauthCode] = useState('');
  const [clientIdInput, setClientIdInput] = useState(localStorage.getItem('strava_client_id') || '');
  const [clientSecretInput, setClientSecretInput] = useState(localStorage.getItem('strava_client_secret') || '');

  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 5000);
  };

  const handleConnected = (newAthlete, newActivities) => {
    let computedVdot = newAthlete?.vdot;
    let computedTargetTime = newAthlete?.targetHalfMarathonTime;

    if (newActivities && newActivities.length > 0) {
      setActivities(newActivities);

      // Calculate VDOT score from the athlete's real Strava runs
      let maxVdot = 0;
      newActivities.forEach(act => {
        if (act.distanceKm >= 2.5 && act.durationMinutes > 0) {
          const v = calculateVDOT(act.distanceKm * 1000, act.durationMinutes * 60);
          if (v > maxVdot && v < 85) maxVdot = v;
        }
      });

      if (maxVdot > 0) {
        computedVdot = maxVdot;
        const predictedSec = predictRaceTime(computedVdot, 21097.5);
        computedTargetTime = secondsToTimeString(predictedSec, true);
      }
    }

    setAthlete(prev => ({
      ...prev,
      ...newAthlete,
      vdot: computedVdot || prev.vdot || 43.5,
      targetHalfMarathonTime: computedTargetTime || prev.targetHalfMarathonTime || '01:52:00'
    }));
    setIsConnected(true);
    setIsRealData(true);
    showToast(`Strava 帳號「${newAthlete.firstname || ''}」連線成功！已更新實時跑步數據與 VDOT (${computedVdot || 43.5})。`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      setOauthCode(code);
      const savedClientId = localStorage.getItem('strava_client_id');
      const savedClientSecret = localStorage.getItem('strava_client_secret');

      if (savedClientId && savedClientSecret) {
        exchangeOAuthCode(savedClientId, savedClientSecret, code)
          .then(async (token) => {
            const athleteData = await fetchStravaAthlete(token);
            const activitiesData = await fetchStravaActivities(token).catch(() => []);
            handleConnected(athleteData, activitiesData);
            window.history.replaceState({}, document.title, window.location.pathname);
            setOauthCode('');
          })
          .catch(err => {
            showToast('OAuth 授權失敗: ' + err.message);
          });
      } else {
        setIsModalOpen(true);
        showToast('已檢測到 Strava 授權碼！請輸入 Client ID 與 Secret 完成對接。');
      }
    }
  }, []);

  const handleExchangeCodeManual = async () => {
    if (!clientIdInput || !clientSecretInput || !oauthCode) {
      showToast('請輸入 Client ID、Client Secret 與授權碼！');
      return;
    }

    localStorage.setItem('strava_client_id', clientIdInput.trim());
    localStorage.setItem('strava_client_secret', clientSecretInput.trim());

    try {
      const token = await exchangeOAuthCode(clientIdInput, clientSecretInput, oauthCode);
      const athleteData = await fetchStravaAthlete(token);
      const activitiesData = await fetchStravaActivities(token).catch(() => []);
      handleConnected(athleteData, activitiesData);
      window.history.replaceState({}, document.title, window.location.pathname);
      setOauthCode('');
      setIsModalOpen(false);
    } catch (err) {
      showToast('換取 Token 失敗: ' + err.message);
    }
  };

  const handleImportGPX = (gpxActivity) => {
    setActivities(prev => {
      const updated = [gpxActivity, ...prev];
      let maxVdot = 0;
      updated.forEach(act => {
        if (act.distanceKm >= 2.5 && act.durationMinutes > 0) {
          const v = calculateVDOT(act.distanceKm * 1000, act.durationMinutes * 60);
          if (v > maxVdot && v < 85) maxVdot = v;
        }
      });

      if (maxVdot > 0) {
        const predictedSec = predictRaceTime(maxVdot, 21097.5);
        const targetTime = secondsToTimeString(predictedSec, true);
        setAthlete(athletePrev => ({ ...athletePrev, vdot: maxVdot, targetHalfMarathonTime: targetTime }));
      }
      return updated;
    });
    setIsConnected(true);
    setIsRealData(true);
    showToast(`GPX 跑步軌跡「${gpxActivity.name}」匯入成功！已整合至體能與課表。`);
  };

  const handleUpdateGoalTime = (newGoal) => {
    setAthlete(prev => ({ ...prev, targetHalfMarathonTime: newGoal }));
    showToast(`目標半馬時間已修改為 ${newGoal}！已動態重新計算 12 週課表。`);
  };

  const trainingLoad = calculateTrainingLoadTimeline(activities, 60);
  const planWeeks = generateHalfMarathonPlan(athlete.vdot, athlete.targetHalfMarathonTime, 4);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        athlete={athlete}
        isConnected={isConnected}
        onOpenConnectModal={() => setIsModalOpen(true)}
      />

      {/* Toast Notification */}
      {notification && (
        <div style={{
          position: 'fixed',
          top: '80px',
          right: '24px',
          zIndex: 99,
          background: 'linear-gradient(135deg, #fc4c02 0%, #e04300 100%)',
          color: '#ffffff',
          fontWeight: 600,
          padding: '12px 20px',
          borderRadius: '12px',
          boxShadow: '0 8px 24px rgba(252, 76, 2, 0.4)',
          fontSize: '0.9rem'
        }}>
          ✨ {notification}
        </div>
      )}

      {/* Main App Container */}
      <main style={{
        maxWidth: '1280px',
        width: '100%',
        margin: '0 auto',
        padding: '24px 16px 48px 16px',
        flex: 1
      }}>
        {activeTab === 'dashboard' && (
          <Dashboard
            athlete={athlete}
            recentActivities={activities}
            trainingLoad={trainingLoad}
            currentWeekPlan={planWeeks[0]}
            onNavigate={(tab) => setActiveTab(tab)}
            isRealData={isRealData}
          />
        )}

        {activeTab === 'calendar' && (
          <TrainingCalendar
            planWeeks={planWeeks}
            athlete={athlete}
            onUpdateGoalTime={handleUpdateGoalTime}
          />
        )}

        {activeTab === 'analytics' && (
          <PerformanceAnalytics
            athlete={athlete}
            trainingLoad={trainingLoad}
          />
        )}

        {activeTab === 'chat' && (
          <AICoachChat
            athlete={athlete}
            recentActivities={activities}
            trainingLoad={trainingLoad}
            isConnected={isConnected}
            isRealData={isRealData}
          />
        )}

        {activeTab === 'monthly' && (
          <MonthlyReview
            activities={activities}
          />
        )}

        {activeTab === 'workout' && (
          <WorkoutStudio
            onWorkoutComplete={({ type, rounds, durationMin }) => {
              const newAct = {
                id: `workout-${Date.now()}`,
                name: `🏠 ${type} (${rounds} 輪跟練)`,
                type: 'Workout',
                distanceKm: 0,
                durationMinutes: durationMin || 20,
                avgHeartRate: 135,
                trimp: Math.round(durationMin * 1.5),
                date: new Date().toISOString().split('T')[0]
              };
              setActivities(prev => [newAct, ...prev]);
              showToast(`🎉 已完成「${type}」！已同步至訓練負荷與活動紀錄。`);
            }}
          />
        )}

        {activeTab === 'pacing' && (
          <RacePacingCalculator
            athlete={athlete}
          />
        )}
      </main>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '20px',
        borderTop: '1px solid var(--border-color)',
        color: 'var(--text-muted)',
        fontSize: '0.8rem'
      }}>
        Strava AI Coach © 2026 | Powered by Jack Daniels VDOT & Banister TRIMP Science | 專屬半馬雲端教練
      </footer>

      {/* Strava Connect & GPX Modal */}
      <StravaConnectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConnected={handleConnected}
        onImportGPX={handleImportGPX}
        isConnected={isConnected}
        oauthCode={oauthCode}
        clientIdInput={clientIdInput}
        setClientIdInput={setClientIdInput}
        clientSecretInput={clientSecretInput}
        setClientSecretInput={setClientSecretInput}
        onExchangeCodeManual={handleExchangeCodeManual}
      />

    </div>
  );
}
