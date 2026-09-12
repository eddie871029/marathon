import React, { useState } from 'react';
import { X, RefreshCw, UploadCloud, Key, CheckCircle, Flame, FileText, Lock, Sparkles } from 'lucide-react';
import { getStravaAuthUrl, fetchStravaAthlete, fetchStravaActivities, parseGPXFile } from '../services/stravaApi';
import { mockAthleteProfile, mockStravaActivities } from '../utils/mockStravaData';

export default function StravaConnectModal({
  isOpen,
  onClose,
  onConnected,
  onImportGPX,
  isConnected,
  oauthCode,
  clientIdInput,
  setClientIdInput,
  clientSecretInput,
  setClientSecretInput,
  onExchangeCodeManual
}) {
  const [tokenInput, setTokenInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [gpxFileName, setGpxFileName] = useState('');

  if (!isOpen) return null;

  const handleOAuthClick = () => {
    if (!clientIdInput) {
      setErrorMsg('請先輸入 Strava Client ID');
      return;
    }
    localStorage.setItem('strava_client_id', clientIdInput.trim());
    if (clientSecretInput) {
      localStorage.setItem('strava_client_secret', clientSecretInput.trim());
    }
    const url = getStravaAuthUrl(clientIdInput.trim());
    window.location.href = url;
  };

  const handleConnectToken = async () => {
    const cleanToken = tokenInput.trim();
    if (!cleanToken) {
      setErrorMsg('請輸入 Access Token');
      return;
    }
    setLoading(true);
    setErrorMsg('');

    try {
      const athlete = await fetchStravaAthlete(cleanToken);
      const activities = await fetchStravaActivities(cleanToken).catch(() => []);
      onConnected(athlete, activities);
      onClose();
    } catch (err) {
      console.error(err);
      setErrorMsg(`認證失敗 (401/403)：Strava Access Token 已效期過期或權限不足。建議點擊下方「OAuth 授權連線」完成全權限綁定。`);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadDemoData = () => {
    setLoading(true);
    setTimeout(() => {
      onConnected(mockAthleteProfile, mockStravaActivities);
      setLoading(false);
      onClose();
    }, 400);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setGpxFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsedActivity = parseGPXFile(event.target.result, file.name);
        onImportGPX(parsedActivity);
        onClose();
      } catch (err) {
        setErrorMsg('GPX 解析失敗：' + err.message);
      }
    };
    reader.readAsText(file);
  };

  return (
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
      <div className="glass-card" style={{
        width: '100%',
        maxWidth: '580px',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '28px',
        position: 'relative'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <img
            src="/logo.jpg"
            alt="Strava AI Coach Logo"
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              objectFit: 'cover',
              border: '1px solid rgba(252, 76, 2, 0.4)'
            }}
          />
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)' }}>
              連結 Strava / 匯入跑步數據
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              授權存取您的真實 Strava 跑步里程、心率與 VDOT 跑力
            </p>
          </div>
        </div>

        {errorMsg && (
          <div style={{
            background: 'rgba(244, 63, 94, 0.1)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            color: '#f43f5e',
            padding: '12px 14px',
            borderRadius: '10px',
            fontSize: '0.85rem',
            marginBottom: '16px',
            lineHeight: '1.4'
          }}>
            {errorMsg}
          </div>
        )}

        {/* OAuth Code Exchange Active Banner */}
        {oauthCode && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(16, 185, 129, 0.1) 100%)',
            border: '1px solid var(--cyan-bright)',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '20px'
          }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={18} color="var(--cyan-bright)" />
              已接收 Strava 授權碼！請完成最後對接
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
              授權碼：<code style={{ background: 'rgba(0,0,0,0.4)', padding: '2px 6px', borderRadius: '4px', color: '#ffffff' }}>{oauthCode.slice(0, 12)}...</code>
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input
                type="text"
                placeholder="輸入 Strava Client ID (如 148392)"
                value={clientIdInput}
                onChange={(e) => setClientIdInput(e.target.value)}
                style={{
                  background: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  color: '#ffffff',
                  fontSize: '0.85rem'
                }}
              />
              <input
                type="password"
                placeholder="輸入 Strava Client Secret (在 Settings -> API 頁面)"
                value={clientSecretInput}
                onChange={(e) => setClientSecretInput(e.target.value)}
                style={{
                  background: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  color: '#ffffff',
                  fontSize: '0.85rem'
                }}
              />
              <button
                className="btn-strava"
                onClick={onExchangeCodeManual}
                style={{ justifyContent: 'center', marginTop: '4px' }}
              >
                <Lock size={16} /> 完成對接並同步我的真實 Strava 跑步紀錄
              </button>
            </div>
          </div>
        )}

        {/* OAuth Step-by-Step Box */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '20px'
        }}>
          <h4 style={{ fontSize: '0.9rem', color: '#ffffff', fontWeight: 700, marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Key size={16} color="var(--strava-orange)" />
            方法 1： Strava OAuth 2.0 一鍵授權連線 (推薦全功能)
          </h4>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '12px', lineHeight: '1.4' }}>
            自動取得包含 <code style={{ color: 'var(--cyan-bright)' }}>activity:read_all</code> 權限的完整 Token，永久自動同步。
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input
              type="text"
              placeholder="輸入您的 Strava Client ID (至 Settings -> API 複製)"
              value={clientIdInput}
              onChange={(e) => setClientIdInput(e.target.value)}
              style={{
                background: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '10px 14px',
                color: '#ffffff',
                fontSize: '0.85rem'
              }}
            />
            <input
              type="password"
              placeholder="輸入您的 Strava Client Secret (至 Settings -> API 複製)"
              value={clientSecretInput}
              onChange={(e) => setClientSecretInput(e.target.value)}
              style={{
                background: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '10px 14px',
                color: '#ffffff',
                fontSize: '0.85rem'
              }}
            />
            <button
              className="btn-strava"
              onClick={handleOAuthClick}
              style={{ justifyContent: 'center' }}
            >
              開啟 Strava 授權頁面 (Authorize)
            </button>
          </div>
        </div>

        {/* Option 2: 1-Click Demo Data */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(252, 76, 2, 0.12) 0%, rgba(6, 182, 212, 0.05) 100%)',
          border: '1px solid rgba(252, 76, 2, 0.25)',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff' }}>
              方法 2：載入 1-Click 範例數據體驗
            </h3>
            <span className="badge badge-orange">免 Key 體驗</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>
            包含 16K LSD、門檻跑、分段心率與 VDOT 43.5 跑者檔案。
          </p>
          <button
            className="btn-secondary"
            onClick={handleLoadDemoData}
            disabled={loading}
            style={{ width: '100%', justifyContent: 'center' }}
          >
            {loading ? <RefreshCw className="animate-spin" size={16} /> : <CheckCircle size={16} />}
            一鍵載入範例 Strava 跑者數據
          </button>
        </div>

        {/* Option 3: GPX File Upload */}
        <div style={{
          border: '2px dashed rgba(255, 255, 255, 0.15)',
          borderRadius: '12px',
          padding: '16px',
          textAlign: 'center',
          cursor: 'pointer'
        }}>
          <UploadCloud size={28} color="var(--cyan-bright)" style={{ marginBottom: '6px' }} />
          <h4 style={{ fontSize: '0.85rem', color: '#ffffff', fontWeight: 600 }}>
            方法 3：手動拖曳上傳 GPX 軌跡檔
          </h4>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '2px 0 10px 0' }}>
            支援從 Strava / Garmin / Apple Watch 匯出的 .gpx 檔
          </p>
          <input
            type="file"
            accept=".gpx"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
            id="gpxInputModal"
          />
          <label htmlFor="gpxInputModal" className="btn-secondary" style={{ cursor: 'pointer', display: 'inline-flex' }}>
            <FileText size={16} /> 選擇 GPX 檔案 {gpxFileName && `(${gpxFileName})`}
          </label>
        </div>

      </div>
    </div>
  );
}
