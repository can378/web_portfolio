import { useEffect } from 'react'
import Desktop from './pages/Desktop'
import './App.css'

const API_BASE = import.meta.env?.VITE_API_BASE_URL;

function App() {
  useEffect(() => {
    // 페이지 첫 로딩 시 방문 로그 전송
    fetch(`${API_BASE}/logs/visit`, {
      method: "POST",
      body: JSON.stringify({
        path: window.location.pathname,
        referrer: document.referrer || null,
        user_agent: navigator.userAgent,
      }),
      headers: { "Content-Type": "application/json" }
    });

  }, []); // [] → App이 처음 렌더링될 때 딱 한 번 실행

  return (
    <div className="app">
      <Desktop />
    </div>
  )
}

export default App
