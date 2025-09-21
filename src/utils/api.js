const API_BASE = import.meta.env?.VITE_API_BASE_URL;

// 연결 확인
export async function checkConnect() {
  const res = await fetch(`${API_BASE}`);
  if (!res.ok) throw new Error("Backend 연결 실패");
  return res.text();  // 혹은 return res.json() 등 명시적으로 반환
}

// 이메일 전송 (429 → "1분에 1회만 이메일 전송이 가능합니다"로 치환)
export async function sendEmail(payload) {
  const res = await fetch(`${API_BASE}/email/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let errBody = null;
    try { errBody = await res.json(); } catch {}

    if (res.status === 429) {
      // Retry-After 헤더(초 또는 날짜) → 남은 초 계산 (없으면 60초)
      const h = res.headers.get("Retry-After");
      let retryAfter;
      if (h) {
        const n = Number(h);
        if (!Number.isNaN(n)) retryAfter = n;
        else {
          const t = new Date(h).getTime();
          if (!Number.isNaN(t)) {
            const diff = Math.ceil((t - Date.now()) / 1000);
            retryAfter = diff > 0 ? diff : 0;
          }
        }
      }
      if (retryAfter == null) retryAfter = 60;

      // 호출부에서 err.code === 429 확인 가능
      throw {
        error: "1분에 1회만 이메일 전송이 가능합니다",
        code: 429,
        retryAfter,
        serverMessage: errBody?.error,
      };
    }

    throw {
      error: errBody?.error || "이메일 전송 실패",
      code: res.status,
    };
  }

  return res.json();
}

// AI 에이전트에게 질문
export async function askAgent(question) {
  const payload = { query: question };
  const res = await fetch(`${API_BASE}/ai/agent/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("AI 에이전트 호출 실패");
  return res.json();
}

// 방문 로그 전송
export async function sendVisitLog({ path, referrer, user_agent, ip } = {}) {
  const url = `${API_BASE}/log/visit/`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path, referrer, user_agent, ip }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`visit log failed: ${res.status} ${body}`);
  }
  return res.json(); // response_model=int 이면 숫자 반환
}