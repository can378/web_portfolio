import styles from "./Taskbar.module.css";
import { useState, useEffect, useMemo } from "react";

function WinLogo() {
  // 작은 Win95 로고 (SVG) — 12px 높이 기준
  return (
    <svg
      className={styles.winLogo}
      viewBox="0 0 16 16"
      aria-hidden
      focusable="false"
    >
      <rect x="0" y="0" width="8" height="8" fill="#0094ff" />
      <rect x="8" y="0" width="8" height="8" fill="#ff1e1e" />
      <rect x="0" y="8" width="8" height="8" fill="#ffd400" />
      <rect x="8" y="8" width="8" height="8" fill="#00b400" />
    </svg>
  );
}

export default function Taskbar({ openWindows, toggleWindow }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const hhmm = useMemo(
    () =>
      time
        .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })
        .replace(":", ":"),
    [time]
  );

  return (
    <div className={styles.taskbar}>
      {/* Start 버튼 */}
      <button className={styles.startButton}>
        <WinLogo />
        <span className={styles.startText}>Welcome ▾</span>
      </button>

      
      {/* 열린 창 버튼 영역 */}
      <div className={styles.taskButtons} role="tablist" aria-label="Open windows">
        
        {openWindows.map(({ id, title, type, isVisible }) => (
          <button
            key={id}
            role="tab"
            aria-selected={isVisible ? "true" : "false"}
            className={`${styles.taskButton} ${isVisible ? styles.pressed : styles.raised}`}
            onClick={() => toggleWindow(id)}
            title={title}
          >
            <span className={styles.btnIcon}>
              {type === "folder" && "📁"}
              {type === "memo" && "📝"}
              {type === "sticker" && "📌"}
              {type === "image" && "🖼"}
            </span>
            <span className={styles.btnLabel}>{title}</span>
          </button>
        ))}
      </div>

      {/* 트레이 구분선 */}
      <div className={styles.traySeparator} aria-hidden />

      {/* 시스템 트레이 + 시계 */}
      <div className={styles.tray}>
        <span className={styles.trayIcon} title="Locale">
          💻
        </span>
        <span className={styles.trayIcon} title="Printer">
          🔔
        </span>

        <div className={styles.clock} aria-label="Clock">
          {hhmm}
        </div>
      </div>
    </div>
  );
}
