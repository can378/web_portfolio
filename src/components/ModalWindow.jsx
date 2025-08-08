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

  // 드래그 상태/좌표
  const dragging = useRef(false);
  const position = useRef(defaultPosition || { x: 100, y: 100 });
  const offset = useRef({ x: 0, y: 0 });

  const taskbarHeight = 40;

  if (!isVisible) return null;

  // === 포인터 드래그 ===
  const handlePointerDown = (e) => {
    if (isMaximized) return;
    if (e.target.closest("button")) return;

    dragging.current = true;

    // 현재 포인터 기준 offset 계산
    offset.current = {
      x: e.clientX - position.current.x,
      y: e.clientY - position.current.y,
    };

    // 모달이 포인터 캡처 -> 창 밖으로 나가도 move/up 받음
    if (modalRef.current && e.pointerId != null) {
      try {
        modalRef.current.setPointerCapture(e.pointerId);
      } catch {}
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
      try {
        modalRef.current.releasePointerCapture(e.pointerId);
      } catch {}
    }
  };

  // === 마우스 업(안전망) ===
  const handleMouseUp = () => {
    dragging.current = false;
  };

  // === 최대화/복원 ===
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

  // 리사이즈/포인터 업 글로벌 처리
  useEffect(() => {
    const handleResize = () => {
      if (isMaximized) {
        maximizeWindow();
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("resize", handleResize);
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
      <div
        className={styles.titleBar}
        onPointerDown={handlePointerDown}
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
