import { useRef, useState } from "react";
import styles from "./ModalWindow.module.css";

export default function ModalWindow({
    title,
    onClose,
    children,
    defaultPosition,
    defaultSize, // ✅ 크기 props 추가
}) {
    const modalRef = useRef(null);
    const [position, setPosition] = useState(defaultPosition || { x: 100, y: 100 });
    const offset = useRef({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);

    const handleMouseDown = (e) => {
        setDragging(true);
        const rect = modalRef.current.getBoundingClientRect();
        offset.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
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
            ref={modalRef}
            className={styles.modal}
            style={{
                left: position.x,
                top: position.y,
                width: defaultSize?.width || 400, // ✅ 기본 너비 400
                height: defaultSize?.height || 300, // ✅ 기본 높이 300
                position: "absolute",
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
            <div className={styles.content}>{children}</div>
        </div>
    );
}
