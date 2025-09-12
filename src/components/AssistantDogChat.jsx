import { useEffect, useRef, useState } from "react";
import { askAgent } from "../utils/api";
import styles from "./AssistantDogChat.module.css";

const AssistantDogChat = ({ onClose, style }) => {
  const [messages, setMessages] = useState([
    { role: "bot", content: "안녕! 이 포트폴리오에 대해 질문해주세요! (하지만 지금은 아직 동작하지 않아요)" },
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
      className={styles.chatContainer}
      style={style}
      onMouseDown={(e) => e.stopPropagation()}
      onMouseUp={(e) => e.stopPropagation()}
    >
      {/* 윈도우95 헤더 */}
      <div className={styles.header}>
        <span>Assistant Dog</span>
        <button className={styles.closeBtn} onClick={onClose}>✕</button>
      </div>

      <div className={styles.content}>

      
      <div className={styles.messagesContainer}>
        {messages.map((m, i) => (
          <div
            key={i}
            className={`${styles.messageRow} ${
              m.role === "user" ? styles.userRow : styles.botRow
            }`}
          >
            <span
              className={`${styles.messageBubble} ${
                m.role === "user" ? styles.userBubble : styles.botBubble
              }`}
            >
              {m.content}
            </span>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>
      <div className={styles.inputArea}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          disabled={loading}
        />
        <button className={styles.sendBtn} onClick={handleSend} disabled={loading}>
          {loading ? "..." : "send"}
        </button>
      </div>

      </div>
    </div>
  );
};

export default AssistantDogChat;
