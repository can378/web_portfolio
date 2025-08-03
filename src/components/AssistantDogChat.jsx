import { useState } from "react";

const AssistantDogChat = ({ onClose, style }) => {
  const [messages, setMessages] = useState([{ role: "bot", content: "안녕! 난 너의 도우미야 🐶" }]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: input }, { role: "bot", content: "대답이에요!" }]);
    setInput("");
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

      <div style={{ maxHeight: "150px", overflowY: "auto", marginBottom: "8px" }}>
        {messages.map((m, i) => (
          <div key={i} style={{ textAlign: m.role === "user" ? "right" : "left", margin: "4px 0" }}>
            <span style={{ background: m.role === "user" ? "#daf" : "#eee", padding: "5px 10px", borderRadius: "10px" }}>
              {m.content}
            </span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: "4px" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          style={{ flex: 1 }}
        />
        <button onClick={handleSend}>전송</button>
        <button onClick={onClose}>✕</button>
      </div>
    </div>
  );
};

export default AssistantDogChat;
