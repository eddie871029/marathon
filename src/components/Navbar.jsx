import React from 'react';
import { Activity, Calendar, Award, MessageSquare, Zap, RefreshCw, Flame, CheckCircle, History } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, athlete, isConnected, onOpenConnectModal }) {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(11, 15, 25, 0.85)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '12px 24px'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img
            src="/logo.jpg"
            alt="Strava AI Coach Logo"
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              objectFit: 'cover',
              boxShadow: '0 4px 16px rgba(252, 76, 2, 0.4)',
              border: '1px solid rgba(252, 76, 2, 0.4)'
            }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.25rem',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: '#ffffff'
              }}>
                STRAVA <span className="gradient-text-orange">AI COACH</span>
              </h1>
              <span className="badge badge-orange">Half Marathon</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              半馬個人化 AI 雲端教練 & 跑步數據分析系統
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '6px', overflowX: 'auto', padding: '4px 0' }}>
          <button
            className={`nav-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <Activity size={18} /> 總覽儀表板
          </button>

          <button
            className={`nav-tab ${activeTab === 'calendar' ? 'active' : ''}`}
            onClick={() => setActiveTab('calendar')}
          >
            <Calendar size={18} /> 12週半馬課表
          </button>

          <button
            className={`nav-tab ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            <Award size={18} /> VDOT與體能分析
          </button>

          <button
            className={`nav-tab ${activeTab === 'chat' ? 'active' : ''}`}
            onClick={() => setActiveTab('chat')}
          >
            <MessageSquare size={18} /> AI 教練診斷室
          </button>

          <button
            className={`nav-tab ${activeTab === 'monthly' ? 'active' : ''}`}
            onClick={() => setActiveTab('monthly')}
          >
            <History size={18} /> 月份歷史回顧
          </button>

          <button
            className={`nav-tab ${activeTab === 'workout' ? 'active' : ''}`}
            onClick={() => setActiveTab('workout')}
            style={activeTab === 'workout' ? { borderColor: 'rgba(252, 76, 2, 0.6)', background: 'linear-gradient(135deg, rgba(252, 76, 2, 0.3) 0%, rgba(252, 76, 2, 0.1) 100%)' } : {}}
          >
            <Flame size={18} color="#fc4c02" /> 居家肌力敏捷跟練
          </button>

          <button
            className={`nav-tab ${activeTab === 'pacing' ? 'active' : ''}`}
            onClick={() => setActiveTab('pacing')}
          >
            <Zap size={18} /> 賽事配速策略
          </button>
        </nav>

        {/* Right Status & Strava Sync Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {athlete && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '6px 12px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <img
                src={athlete.profile}
                alt={athlete.firstname}
                style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div style={{ fontSize: '0.85rem' }}>
                <span style={{ fontWeight: 600, color: '#ffffff' }}>{athlete.firstname} {athlete.lastname}</span>
                <div style={{ fontSize: '0.75rem', color: 'var(--cyan-bright)', fontWeight: 600 }}>
                  VDOT {athlete.vdot}
                </div>
              </div>
            </div>
          )}

          <button
            className={isConnected ? "btn-secondary" : "btn-strava"}
            onClick={onOpenConnectModal}
            style={{ fontSize: '0.85rem', padding: '8px 14px' }}
          >
            {isConnected ? (
              <>
                <CheckCircle size={16} color="var(--emerald-success)" />
                <span style={{ color: 'var(--emerald-success)', fontWeight: 600 }}>Strava 已連結</span>
              </>
            ) : (
              <>
                <RefreshCw size={16} />
                <span>連結 Strava / GPX</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
