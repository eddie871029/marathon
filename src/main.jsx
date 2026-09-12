import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("React Error Boundary Caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '40px',
          color: '#ffffff',
          fontFamily: 'sans-serif',
          maxWidth: '600px',
          margin: '50px auto',
          background: 'rgba(244, 63, 94, 0.1)',
          border: '1px solid #f43f5e',
          borderRadius: '16px'
        }}>
          <h2 style={{ color: '#f43f5e', marginBottom: '12px' }}>⚠️ 應用程式載入時發生錯誤</h2>
          <pre style={{
            background: 'rgba(0,0,0,0.5)',
            padding: '16px',
            borderRadius: '8px',
            overflowX: 'auto',
            fontSize: '0.85rem'
          }}>
            {this.state.error?.toString() || '未知錯誤'}
          </pre>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: '16px',
              padding: '10px 20px',
              background: '#fc4c02',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            重新載入網頁
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
} else {
  console.error("Root element #root not found!");
}
