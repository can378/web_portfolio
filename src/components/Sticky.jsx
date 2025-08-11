import { useState, useRef } from "react";
import styles from "./Sticky.module.css";

export default function Sticky({ title, initialText, editable, onClose }) {
  const [content, setContent] = useState(initialText);
  const [position, setPosition] = useState({ x: 200, y: 300 });
  const [dragging, setDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });
  const stickyRef = useRef(null);

  const handlePointerDown = (e) => {
    if (e.target.closest("button")) return;
    // 제목바에서만 시작
    setDragging(true);
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };

    // 포인터 캡처해서 요소 밖으로 나가도 move/up 받기
    if (stickyRef.current && e.pointerId != null) {
      try {
        stickyRef.current.setPointerCapture(e.pointerId);
      } catch {}
    }
  };

  const handlePointerMove = (e) => {
    if (!dragging) return;
    const newX = e.clientX - offset.current.x;
    const newY = e.clientY - offset.current.y;
    setPosition({ x: newX, y: newY });
  };

  const handlePointerUp = (e) => {
    setDragging(false);
    if (stickyRef.current && e.pointerId != null) {
      try {
        stickyRef.current.releasePointerCapture(e.pointerId);
      } catch {}
    }
  };

  return (
    <div
      ref={stickyRef}
      className={styles.sticky}
      style={{ left: position.x, top: position.y }}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <div
        className={styles.titleBar}
        onPointerDown={handlePointerDown}
      >
        <span className={styles.title}>{title}</span>
        <button className={styles.closeButton} onClick={onClose}>✕</button>
      </div>

      <textarea
        className={styles.textarea}
        value={content}
        onChange={(e) => editable && setContent(e.target.value)}
        placeholder="스티커 메모를 입력하세요..."
        readOnly={!editable}
      />
    </div>
  );
}
