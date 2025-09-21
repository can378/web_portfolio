import { useEffect } from 'react'
import Desktop from './pages/Desktop'
import './App.css'
import { sendVisitLog } from "./utils/api";

const API_BASE = import.meta.env?.VITE_API_BASE_URL;

function App() {

  useEffect(() => {
    (async () => {
      try {
        await sendVisitLog({
          path: window.location.pathname,
          referrer: document.referrer || null,
          user_agent: navigator.userAgent,
        });
      } catch (e) {
        // 방문 로그 실패는 UX에 영향 없게 조용히 처리
        console.warn("[visit log] skipped:", e?.message || e);
      }
    })();
  }, []);// [] → App이 처음 렌더링될 때 딱 한 번 실행

  return (
    <div className="app">
      <Desktop />
    </div>
  )
}

export default App
