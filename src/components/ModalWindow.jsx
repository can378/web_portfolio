import { useEffect, useRef, useState } from "react";
import styles from "./ModalWindow.module.css";

export default function ModalWindow({
    title,
    onClose,
    onMinimize,
    children,
    defaultPosition,
    defaultSize,
    isVisible = true,
}) {
    const modalRef = useRef(null);
    const [size, setSize] = useState(defaultSize || { width: 400, height: 300 });
    const [isMaximized, setIsMaximized] = useState(false);
    const dragging = useRef(false);
    const position = useRef(defaultPosition || { x: 100, y: 100 }); // 위치 기억
    const offset = useRef({ x: 0, y: 0 });
    const taskbarHeight = 40;

    if (!isVisible) return null;

    const handleMouseDown = (e) => {
        if (isMaximized) return;

        dragging.current = true;

        // 현재 transform 위치 포함한 offset 계산
        offset.current = {
            x: e.clientX - position.current.x,
            y: e.clientY - position.current.y,
        };

        e.preventDefault();
    };

    const handleMouseMove = (e) => {
        if (!dragging.current) return;

        const newX = e.clientX - offset.current.x;
        const newY = e.clientY - offset.current.y;

        position.current = { x: newX, y: newY };

        if (modalRef.current) {
            modalRef.current.style.transform = `translate(${newX}px, ${newY}px)`;
        }
    };

    const handleMouseUp = () => {
        dragging.current = false;
    };

    const maximizeWindow = () => {
    if (!modalRef.current) return;

    modalRef.current.style.position = "fixed";
    modalRef.current.style.top = "0px";
    modalRef.current.style.left = "0px";
    modalRef.current.style.transform = "none";

    const viewportHeight = window.innerHeight - taskbarHeight;
    const viewportWidth = window.innerWidth;

    setSize({
        width: viewportWidth,
        height: viewportHeight,
    });
};

const restoreWindow = () => {
    if (!modalRef.current) return;

    modalRef.current.style.position = "absolute";
    modalRef.current.style.transform = `translate(${position.current.x}px, ${position.current.y}px)`;

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

    useEffect(() => {
        const handleResize = () => {
            if (isMaximized) {
                maximizeWindow();
            }
        };

        const handleMouseUpGlobal = () => {
            dragging.current = false;
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("mouseup", handleMouseUpGlobal);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mouseup", handleMouseUpGlobal);
        };
    }, [isMaximized]);

    return (
        <div
            ref={modalRef}
            className={styles.modal}
            style={{
                width: size.width,
                height: size.height,
                position: "absolute",
                transform: `translate(${position.current.x}px, ${position.current.y}px)`,
            }}
            onMouseMove={handleMouseMove}
        >
            <div
                className={styles.titleBar}
                onMouseDown={handleMouseDown}
            >
                <span className={styles.title}>{title}</span>
                <div className={styles.buttonGroup}>
                    <button className={styles.minimizeButton} onClick={onMinimize}>🗕</button>
                    <button className={styles.maximizeButton} onClick={toggleMaximize}>
                        {isMaximized ? "🗗" : "🗖"}
                    </button>
                    <button className={styles.closeButton} onClick={onClose}>✕</button>
                </div>
            </div>
            <div className={styles.content}>{children}</div>
        </div>
    );
}
