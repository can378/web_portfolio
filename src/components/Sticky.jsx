import { useState, useRef, useEffect } from "react";
import styles from "./Sticky.module.css";

export default function Sticky({ title, initialText, editable, onClose }) {
  const [content, setContent] = useState(initialText);
  const [position, setPosition] = useState(() => {
    if (typeof window === "undefined") {
      return { x: 10, y: 20 };
    }
    const saved = window.localStorage.getItem(`sticky_pos_${title}`);
    if (!saved) return { x: 10, y: 20 };
    try {
      const parsed = JSON.parse(saved);
      return typeof parsed.x === "number" && typeof parsed.y === "number"
        ? parsed
        : { x: 10, y: 20 };
    } catch {
      return { x: 10, y: 20 };
    }
  });
  const [dragging, setDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });
  const stickyRef = useRef(null);

  // 위치 변경될 때마다 localStorage에 저장
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(
      `sticky_pos_${title}`,
      JSON.stringify(position)
    );
  }, [position, title]);

  const handlePointerDown = (e) => {
    if (e.target.closest("button")) return;
    setDragging(true);
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };

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
