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



  const TASKBAR_H = 30;
  const SAFE_MARGIN = 8;
  const MOBILE_MAX_W = 640;     // 이보다 좁으면 '모바일'로 간주해 자동 최대화
  const TITLEBAR_H = 32;


  // ===========================

  const getResponsiveSize = () => {
    const W = window.innerWidth;
    const H = window.innerHeight;
    const baseW = defaultSize?.width ?? 560;
    const baseH = defaultSize?.height ?? 360;
    const maxW = Math.max(300, W - SAFE_MARGIN * 2);
    const maxH = Math.max(220, H - TASKBAR_H - SAFE_MARGIN * 2);
    return { width: Math.min(baseW, maxW), height: Math.min(baseH, maxH) };
  };

  const [size, setSize] = useState(getResponsiveSize());
  const [isMaximized, setIsMaximized] = useState(false);
  const [isCompact, setIsCompact] = useState(() => window.innerWidth < MOBILE_MAX_W);
  const [isAutoMax, setIsAutoMax] = useState(() => window.innerWidth < MOBILE_MAX_W); // ★ 자동 최대화 여부

  const dragging = useRef(false);
  const position = useRef(defaultPosition || { x: 80, y: 60 });
  const offset = useRef({ x: 0, y: 0 });

  if (!isVisible) return null;

  const clamp = (x, y, w, h) => {
    const maxX = window.innerWidth - w - SAFE_MARGIN;
    const maxY = window.innerHeight - TASKBAR_H - h - SAFE_MARGIN;
    return {
      x: Math.min(Math.max(SAFE_MARGIN, x), Math.max(SAFE_MARGIN, maxX)),
      y: Math.min(Math.max(SAFE_MARGIN, y), Math.max(SAFE_MARGIN, maxY)),
    };
  };

  const handlePointerDown = (e) => {
    if (isMaximized) return;
    if (e.target.closest("button")) return; // 버튼은 드래그 제외
    dragging.current = true;
    offset.current = { x: e.clientX - position.current.x, y: e.clientY - position.current.y };
    try {
      if (modalRef.current && e.pointerId != null) modalRef.current.setPointerCapture(e.pointerId);
    } catch {}
  };

  const handlePointerMove = (e) => {
    if (!dragging.current) return;
    const newX = e.clientX - offset.current.x;
    const newY = e.clientY - offset.current.y;
    const clamped = clamp(newX, newY, size.width, size.height);
    position.current = clamped;
    if (modalRef.current) modalRef.current.style.transform = `translate(${clamped.x}px, ${clamped.y}px)`;
  };

  const handlePointerUp = (e) => {
    dragging.current = false;
    try {
      if (modalRef.current && e.pointerId != null) modalRef.current.releasePointerCapture(e.pointerId);
    } catch {}
  };
  const handleMouseUp = () => { dragging.current = false; };

  const maximizeWindow = () => {
    if (!modalRef.current) return;
    modalRef.current.style.position = "fixed";
    modalRef.current.style.top = "0px";
    modalRef.current.style.left = "0px";
    modalRef.current.style.transform = "none";
    setSize({ width: window.innerWidth, height: window.innerHeight - TASKBAR_H });
    position.current = { x: 0, y: 0 };
  };

  const restoreWindow = () => {
    if (!modalRef.current) return;
    modalRef.current.style.position = "absolute";
    const nextSize = getResponsiveSize();
    setSize(nextSize);
    const centerX = Math.round((window.innerWidth - nextSize.width) / 2);
    const centerY = Math.round((window.innerHeight - TASKBAR_H - nextSize.height) / 2 - TITLEBAR_H);
    const clamped = clamp(centerX, centerY, nextSize.width, nextSize.height);
    position.current = clamped;
    modalRef.current.style.transform = `translate(${clamped.x}px, ${clamped.y}px)`;
  };

  const toggleMaximize = () => {
    if (isAutoMax) return; // ★ 자동 최대화 모드에서는 토글 막기(버튼도 숨기지만 방어적으로)
    if (!isMaximized) maximizeWindow(); else restoreWindow();
    setIsMaximized((v) => !v);
  };

  useEffect(() => {
    const onResize = () => {
      const shouldAutoMax = window.innerWidth < MOBILE_MAX_W;

      // 자동 최대화 상태 갱신
      setIsCompact(shouldAutoMax);
      setIsAutoMax(shouldAutoMax);

      if (shouldAutoMax) {
        if (!isMaximized) setIsMaximized(true);
        maximizeWindow();
        return;
      }

      // 데스크톱 폭으로 돌아오면 자동 최대화 해제 및 복원
      if (isMaximized && isAutoMax) {
        setIsMaximized(false);
        restoreWindow();
        return;
      }

      if (isMaximized) {
        maximizeWindow();
      } else {
        const nextSize = getResponsiveSize();
        setSize(nextSize);
        const clamped = clamp(position.current.x, position.current.y, nextSize.width, nextSize.height);
        position.current = clamped;
        if (modalRef.current) {
          modalRef.current.style.transform = `translate(${clamped.x}px, ${clamped.y}px)`;
        }
      }
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mouseup", handleMouseUp);
    onResize(); // 초기 진입 시 1회 체크

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mouseup", handleMouseUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMaximized, isAutoMax]);

  return (
    <div
      ref={modalRef}
      className={styles.modal}
      style={{
        width: size.width,
        height: size.height,
        position: "absolute",
        transform: `translate(${position.current.x}px, ${position.current.y}px)`,
        overflow: "hidden",
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
          {/* 자동 최대화일 때는 최소화/최대화 버튼 숨김 */}
          {!isAutoMax && (
            <>
              <button className={styles.squareBtn} onClick={onMinimize} aria-label="Minimize">▁</button>
              <button className={styles.squareBtn} onClick={toggleMaximize} aria-label="Maximize">
                {isMaximized ? "🗗" : "🗖"}
              </button>
            </>
          )}
          <button className={`${styles.squareBtn} ${styles.closeBtn}`} onClick={onClose} aria-label="Close">✕</button>
        </div>
      </div>

      <div className={styles.content}>{children}</div>
    </div>
  );
}
