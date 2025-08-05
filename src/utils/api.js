const API_BASE = import.meta.env?.VITE_API_BASE_URL;

// 연결 확인
export async function checkConnect() {
  const res = await fetch(`${API_BASE}`);
  if (!res.ok) throw new Error("Backend 연결 실패");
  return res.text();  // 혹은 return res.json() 등 명시적으로 반환
}

// 이메일 전송
export async function sendEmail(payload) {
  const res = await fetch(`${API_BASE}/email/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorResult = await res.json();
    throw errorResult; // 에러 객체를 던짐
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
