import { useEffect, useRef, useState } from "react";
import styles from "./ModalWindow.module.css";

export default function ModalWindow({
    title,
    onClose,
    onMinimize,
    children,
    defaultPosition,
    defaultSize, // size props
    isVisible=true,
}) {
    const modalRef = useRef(null);
    const [position, setPosition] = useState(defaultPosition || { x: 100, y: 100 });
    const [size, setSize] = useState(defaultSize || { width: 400, height: 300 });
    const [dragging, setDragging] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false); // 최대화 상태 관리
    const offset = useRef({ x: 0, y: 0 });
    const taskbarHeight = 40;

    if (!isVisible) return null;

    const handleMouseDown = (e) => {
        if (isMaximized) return; // 최대화 상태일 때 드래그 막기
        console.log("dragging");
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

    const maximizeWindow = () => {
    if (!modalRef.current?.parentElement) return;

    const parentRect = modalRef.current.parentElement.getBoundingClientRect(); // 부모 크기 가져오기
    setPosition({ x: 0, y: 0 });
    setSize({
        width: parentRect.width,
        height: parentRect.height - taskbarHeight,
    });
};


    const restoreWindow = () => {
        //setPosition(defaultPosition || { x: 100, y: 100 });
        setSize(defaultSize || { width: 400, height: 300 });
    };

    const toggleMaximize = () => {
        if (!isMaximized) {
            maximizeWindow();
        } else {
            restoreWindow();
        }
        setIsMaximized(!isMaximized);
    };
    const toggleMinimize=()=>{
        onMinimize();

    }
    // 창 크기 바뀌면 최대화 상태 유지
    useEffect(() => {
        const handleResize = () => {
            if (isMaximized) {
                maximizeWindow();
            }
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [isMaximized]);

    return (
        <div
            ref={modalRef}
            className={styles.modal}
            style={{
                left: position.x,
                top: position.y,
                width: size.width,
                height: size.height,
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
                <div className={styles.buttonGroup}>
                    <button className={styles.minimizeButton} onClick={toggleMinimize}>🗕</button>
                    <button className={styles.maximizeButton} onClick={toggleMaximize}>
                        {isMaximized ? "🗗" : "🗖"} {/* 최대화/복원 */}
                    </button>
                    <button className={styles.closeButton} onClick={onClose}>
                        ✕
                    </button>
                </div>
            </div>
            <div className={styles.content}>{children}</div>
        </div>
    );
}
