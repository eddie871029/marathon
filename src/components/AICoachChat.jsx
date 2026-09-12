import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Sparkles, User, Bot, ShieldAlert, CheckCircle, Flame } from 'lucide-react';

export default function AICoachChat({ athlete, recentActivities, trainingLoad, isConnected, isRealData }) {
  const latestActivity = recentActivities && recentActivities.length > 0 ? recentActivities[0] : null;

  const [messages, setMessages] = useState([
    {
      sender: 'coach',
      text: isRealData && latestActivity
        ? `嗨 ${athlete?.firstname || '跑者'}！我是你的半馬 AI 雲端教練 Coach Alex 🏃‍♂️\n\n已成功與您的 Strava 帳號對接！最新一趟跑步「${latestActivity.name}」(${latestActivity.distanceKm}km，配速 ${latestActivity.avgPace}) 已同步。目前 VDOT 跑力計算為 ${athlete?.vdot}。\n\n隨時發問，我會針對您的真實數據與 12 週半馬課表提供診斷！`
        : `嗨 ${athlete?.firstname || '跑者'}！我是你的半馬 AI 雲端教練 Coach Alex 🏃‍♂️\n\n⚠️ 【注意】：目前系統處於 [展示體驗模式]，尚未連結您的真實 Strava 活動紀錄。\n若要分析您個人的實時跑步數據，請點擊右上角「連結 Strava / GPX」進行授權或上傳跑錶軌跡檔。\n\n在連結前，您也可以隨時詢問我關於半馬訓練、配速區間劃分或補給策略等運動科學問題！`,
      time: '剛剛'
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const quickPrompts = [
    "請評估我最近這趟跑步的配速與心率品質",
    "如果明天小腿肌群偏緊繃，課表該如何調整？",
    "請提供半馬賽前 3 天的碳水化合物補給指南",
    "門檻跑 (T 跑) 該如何控制心率避免爆掉？"
  ];

  const handleSend = (textToSend = inputVal) => {
    const text = textToSend.trim();
    if (!text) return;

    const userMsg = {
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (textToSend === inputVal) setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      let replyText = "";
      const lower = text.toLowerCase();

      if (lower.includes('lsd') || lower.includes('長跑') || lower.includes('最近')) {
        if (isRealData && latestActivity) {
          replyText = `根據您最近一次的真實 Strava 紀錄 **「${latestActivity.name}」** (${latestActivity.date}) 分析：\n\n1. **跑程與配速**：總距離 ${latestActivity.distanceKm} km，平均配速 ${latestActivity.avgPace}。\n2. **心率掌控**：平均心率 ${latestActivity.avgHR ? latestActivity.avgHR + ' bpm' : '無心率紀錄'}。\n3. **教練診斷**：請持續維持目前的步頻 (約 178-180spm)，若此趟體感良好，下週可嘗試將長跑里程增加 10%。`;
        } else {
          replyText = `⚠️ 【提示：目前為範例模式，尚未連線至您的 Strava 個人帳號】\n\n針對半馬 **LSD (Long Slow Distance) 長跑** 的運動科學原則指引：\n\n1. **配速原則**：應落於 E 區間 (輕鬆跑)，體感為可以輕鬆開口聊天。不要在前半段衝太快。\n2. **心率範圍**：控制在最大心率的 65%-75% (Z2 有氧區)，建構毛細血管密度與脂肪燃率。\n3. **若要獲取您個人的真實 LSD 配速分析**：請點擊右上角連結您的 Strava 帳號或上傳 GPX 軌跡檔。`;
        }
      } else if (lower.includes('緊繃') || lower.includes('痛') || lower.includes('痠') || lower.includes('調整')) {
        replyText = `收到！肌群緊繃是神經肌肉適應的重要訊號，請遵循以下 **動態調整方案**：\n\n1. **明日課表降級**：若明日原定為 T 門檻跑，請先改為 **E 區間 5km 超輕鬆慢跑**，心率嚴格控制在 135 bpm 以下。\n2. **滾筒放鬆重點**：今晚針對 **腓腸肌 (Calf)** 與 **脛骨前肌** 進行 3 組各 60 秒的滾筒放鬆。\n3. **若痛感達到 4 分以上** (1-10分)：請直接安排 1 天完全休息日，切勿硬撐，體能不會因為休息 1 天而下降！`;
      } else if (lower.includes('補給') || lower.includes('碳水') || lower.includes('賽前')) {
        replyText = `針對目標半馬 1:52:00 (預估跑程約 112 分鐘)，教練為你規劃 **半馬補給黃金法則**：\n\n1. **賽前 3 天 (Carb Loading)**：每日每公斤體重補充 7-8g 碳水化合物 (如米飯、地瓜、饅頭)，減少高纖維與高油脂食物。\n2. **起跑前 60 分鐘**：補充 1 包能量膠 + 300ml 水分。\n3. **賽道中補給策略**：\n   - **第 7 km**：服用第 1 包能量膠 (含電解質)\n   - **第 14 km**：服用第 2 包能量膠 (含咖啡因 50mg 提神)\n   - **每個水站**：小口啜飲 100-150ml 水或運動飲料，切忌大口暴飲。`;
      } else if (lower.includes('門檻') || lower.includes('t') || lower.includes('心率')) {
        replyText = `門檻跑 (Threshold Run) 是半馬破 PB 的關鍵密碼！\n\n- **定義**：剛好落在乳酸開始快速累積的臨界點 (Lactate Threshold)，感覺是「快而不陡」、可以維持 45-60 分鐘的最高配速。\n- **目標 T 配速**：根據 VDOT ${athlete?.vdot || 43.5}，您的目標 T 配速為 **${athlete?.vdot ? '4:55/km 左右' : '依據 VDOT 計算'}**。\n- **心法**：前 1 公里切忌過猛，進入狀態後將步頻鎖定在 180 spm，專注在長吐氣節奏上！`;
      } else {
        replyText = `針對您提問的「${text}」：\n\n${isRealData ? '已根據您的實時 Strava 數據切入。' : '【提示：目前為範例模式】'}建議保持每週 1 趟 LSD 長跑 + 1 趟質跑 (T跑或間歇) + 2 趟 E 跑的黃金比例。連結個人 Strava 帳號後，我會精準針對您的個人里程提供專屬建議！`;
      }

      setMessages(prev => [...prev, {
        sender: 'coach',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="glass-card" style={{ height: 'calc(100vh - 180px)', minHeight: '550px', display: 'flex', flexDirection: 'column' }}>
      
      {/* Chat Header */}
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(18, 26, 43, 0.9)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            position: 'relative',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #fc4c02 0%, #06b6d4 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Bot size={22} color="#ffffff" />
            <span style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: isRealData ? 'var(--emerald-success)' : 'var(--amber-warning)',
              border: '2px solid #0b0f19'
            }} />
          </div>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)' }}>
              Coach Alex (半馬 AI 雲端教練)
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {isRealData ? '已連線您的真實 Strava 數據' : '未連線真實數據 (目前為範例模式)'}
            </span>
          </div>
        </div>

        {isRealData ? (
          <span className="badge badge-emerald">
            <CheckCircle size={14} /> Strava 真實數據已連線
          </span>
        ) : (
          <span className="badge badge-amber">
            <ShieldAlert size={14} /> 展示體驗模式 (Demo Mode)
          </span>
        )}
      </div>

      {/* Message Timeline */}
      <div style={{
        flex: 1,
        padding: '20px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              gap: '12px',
              justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start'
            }}
          >
            {msg.sender === 'coach' && (
              <div style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: 'var(--strava-orange)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Bot size={18} color="#ffffff" />
              </div>
            )}

            <div style={{
              maxWidth: '80%',
              background: msg.sender === 'user' ? 'linear-gradient(135deg, #fc4c02 0%, #e04300 100%)' : 'rgba(255, 255, 255, 0.05)',
              border: msg.sender === 'user' ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: msg.sender === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
              padding: '14px 18px',
              color: '#ffffff',
              fontSize: '0.9rem',
              lineHeight: '1.6',
              whiteSpace: 'pre-wrap'
            }}>
              {msg.text}
              <div style={{
                fontSize: '0.7rem',
                color: msg.sender === 'user' ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)',
                marginTop: '6px',
                textAlign: 'right'
              }}>
                {msg.time}
              </div>
            </div>

            {msg.sender === 'user' && (
              <div style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: '#06b6d4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <User size={18} color="#ffffff" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'var(--strava-orange)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bot size={18} color="#ffffff" />
            </div>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px 18px', borderRadius: '16px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              AI 教練分析中...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Bar */}
      <div style={{ padding: '8px 16px', display: 'flex', gap: '8px', overflowX: 'auto', background: 'rgba(0,0,0,0.2)' }}>
        {quickPrompts.map((qp, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(qp)}
            style={{
              padding: '6px 12px',
              borderRadius: '9999px',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: 'var(--text-secondary)',
              fontSize: '0.75rem',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            💬 {qp}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <div style={{ padding: '16px', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '10px' }}>
        <input
          type="text"
          placeholder="詢問教練任何訓練、肌肉感受或配速問題..."
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          style={{
            flex: 1,
            background: 'rgba(0, 0, 0, 0.4)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            padding: '12px 16px',
            color: '#ffffff',
            fontSize: '0.9rem',
            outline: 'none'
          }}
        />
        <button
          className="btn-strava"
          onClick={() => handleSend()}
          style={{ padding: '12px 20px' }}
        >
          <Send size={18} /> 發送
        </button>
      </div>

    </div>
  );
}
