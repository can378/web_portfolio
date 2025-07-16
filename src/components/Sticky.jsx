import { useState, useRef } from "react";
import styles from "./Sticky.module.css";

export default function Sticky({ title, initialText, editable, onClose }) {
    const [content, setContent] = useState(initialText);
    const [position, setPosition] = useState({ x: 100, y: 100 }); // 💡 초기 위치
    const [dragging, setDragging] = useState(false);
    const offset = useRef({ x: 0, y: 0 });

    const handleMouseDown = (e) => {
        setDragging(true);
        offset.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        };
        e.preventDefault();
    };

    const handleMouseMove = (e) => {
        if (!dragging) return;
        const newX = e.clientX - offset.current.x;
        const newY = e.clientY - offset.current.y;
        setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
        setDragging(false);
    };

    return (
        <div
            className={styles.sticky}
            style={{
                left: position.x,
                top: position.y,
            }}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            <div
                className={styles.titleBar}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
            >
                <span className={styles.title}>{title}</span>
                <button className={styles.closeButton} onClick={onClose}>
                    ✕
                </button>
            </div>
            <textarea
                className={styles.textarea}
                value={content}
                onChange={(e) => {
                    if (editable) setContent(e.target.value);
                }}
                placeholder="스티커 메모를 입력하세요..."
                readOnly={!editable}
            />
        </div>
    );
}
