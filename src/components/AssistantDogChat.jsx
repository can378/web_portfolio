import { useEffect, useRef, useState } from "react";
import { askAgent } from "../utils/api";

const AssistantDogChat = ({ onClose, style }) => {
  const [messages, setMessages] = useState([
    { role: "bot", content: "안녕! 이 포트폴리오에 궁금한 게 있으면 물어봐!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messageEndRef = useRef(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setMessages((prev) => [...prev, { role: "bot", content: "..." }]);

    try {
      const res = await askAgent(input);
      const botMessage = { role: "bot", content: res.response };
      setMessages((prev) => [...prev.slice(0, -1), botMessage]);
    } catch {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "bot", content: "문제가 발생했어.. 다시 시도해 줄래?" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onMouseDown={(e) => e.stopPropagation()}
      onMouseUp={(e) => e.stopPropagation()}
      style={{
        ...style,
        background: "#fff",
        padding: "10px",
        borderRadius: "12px",
        width: "250px",
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
      }}
    >
      <div
        style={{
          maxHeight: "150px",
          overflowY: "auto",
          marginBottom: "8px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              textAlign: m.role === "user" ? "right" : "left",
              marginBottom: "8px",
              display: "flex",
              justifyContent: m.role === "user" ? "flex-end" : "flex-start",
            }}
          >
            <span
              style={{
                background: m.role === "user" ? "#daf" : "#eee",
                padding: "6px 10px",
                borderRadius: "12px",
                maxWidth: "80%",
                wordBreak: "break-word",
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>
      <div style={{ display: "flex", gap: "4px" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          style={{ flex: 1 }}
          disabled={loading}
        />
        <button onClick={handleSend} disabled={loading}>
          {loading ? "..." : "전송"}
        </button>
        <button onClick={onClose}>✕</button>
      </div>
    </div>
  );
};

export default AssistantDogChat;
