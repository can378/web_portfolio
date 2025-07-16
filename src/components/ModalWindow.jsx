import { useRef, useState, useEffect } from "react";
import styles from "./ModalWindow.module.css";

export default function ModalWindow({ title, onClose, children, defaultPosition }) {
    const modalRef = useRef(null);
    const [position, setPosition] = useState(defaultPosition || { x: 100, y: 100 });
    const [dragging, setDragging] = useState(false);
    const offset = useRef({ x: 0, y: 0 });

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
        let newX = e.clientX - offset.current.x;
        let newY = e.clientY - offset.current.y;
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
