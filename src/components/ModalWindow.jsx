import { useEffect, useRef, useState } from "react";
import styles from "./ModalWindow.module.css";

export default function ModalWindow({
  title,
  iconSrc,
  onClose,
  onMinimize,
  children,
  defaultPosition,
  defaultSize,
  isVisible = true,
}) {
  const modalRef = useRef(null);
  const [size, setSize] = useState(defaultSize || { width: 560, height: 360 });
  const [isMaximized, setIsMaximized] = useState(false);

  const dragging = useRef(false);
  const position = useRef(defaultPosition || { x: 80, y: 60 });
  const offset = useRef({ x: 0, y: 0 });

  const taskbarHeight = 40;
  if (!isVisible) return null;

  const handlePointerDown = (e) => {
    if (isMaximized) return;
    if (e.target.closest("button")) return; // 버튼은 드래그 제외

    dragging.current = true;
    offset.current = {
      x: e.clientX - position.current.x,
      y: e.clientY - position.current.y,
    };
    if (modalRef.current && e.pointerId != null) {
      try { modalRef.current.setPointerCapture(e.pointerId); } catch {}
    }
  };

  const handlePointerMove = (e) => {
    if (!dragging.current) return;
    const newX = e.clientX - offset.current.x;
    const newY = e.clientY - offset.current.y;
    position.current = { x: newX, y: newY };
    if (modalRef.current) {
      modalRef.current.style.transform = `translate(${newX}px, ${newY}px)`;
    }
  };

  const handlePointerUp = (e) => {
    dragging.current = false;
    if (modalRef.current && e.pointerId != null) {
      try { modalRef.current.releasePointerCapture(e.pointerId); } catch {}
    }
  };

  const handleMouseUp = () => { dragging.current = false; };

  const maximizeWindow = () => {
    if (!modalRef.current) return;
    modalRef.current.style.position = "fixed";
    modalRef.current.style.top = "0px";
    modalRef.current.style.left = "0px";
    modalRef.current.style.transform = "none";
    setSize({ width: window.innerWidth, height: window.innerHeight - taskbarHeight });
  };

  const restoreWindow = () => {
    if (!modalRef.current) return;
    modalRef.current.style.position = "absolute";
    modalRef.current.style.transform = `translate(${position.current.x}px, ${position.current.y}px)`;
    setSize(defaultSize || { width: 560, height: 360 });
  };

  const toggleMaximize = () => {
    if (!isMaximized) maximizeWindow(); else restoreWindow();
    setIsMaximized(!isMaximized);
  };

  useEffect(() => {
    const onResize = () => { if (isMaximized) maximizeWindow(); };
    window.addEventListener("resize", onResize);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mouseup", handleMouseUp);
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
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <div className={styles.titleBar} onPointerDown={handlePointerDown}>
        <div className={styles.titleLeft}>
          {iconSrc && <img className={styles.windowIcon} src={iconSrc} alt="" />}
          <span className={styles.title}>{title}</span>
        </div>

        <div className={styles.buttonGroup}>
          <button className={styles.squareBtn} onClick={onMinimize} aria-label="Minimize">▁</button>
          <button className={styles.squareBtn} onClick={toggleMaximize} aria-label="Maximize">
            {isMaximized ? "🗗" : "🗖"}
          </button>
          <button className={`${styles.squareBtn} ${styles.closeBtn}`} onClick={onClose} aria-label="Close">✕</button>
        </div>
      </div>

      <div className={styles.content}>{children}</div>
    </div>
  );
}
