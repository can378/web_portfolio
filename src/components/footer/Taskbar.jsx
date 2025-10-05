import { useState, useEffect, useMemo,useRef } from "react";
import styles from "./Taskbar.module.css";

import StartMenu from "./StartMenu";
import WinLogo from "./WinLogo";


export default function Taskbar({ openWindows, toggleWindow }) {

  // START MENU-------------------------------------------
  const [startOpen, setStartOpen] = useState(false);
  const startTextRef = useRef(null); //welcome 버튼. 이건눌러도 startMenu안닫히게 하려고

  // TIME CLOCK-------------------------------------------
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

  // taskbar-----------------------------------------------
  return (
    <>
    <div className={styles.taskbar}>

      {/* Start 버튼--------------------------------------- */}
      <div className={styles.startButton}
        onClick={() => setStartOpen((v) => !v)}
        role="button"
        tabIndex={0}
        aria-haspopup="menu"
        aria-expanded={startOpen ? "true" : "false"}>
        <WinLogo />
        <span
          ref={startTextRef}
          className={styles.startText}
          onClick={(e) => {
            e.stopPropagation();
            setStartOpen(v => !v);
          }}
        >
          Welcome ▾
        </span>

      </div>

      
      {/* 열린 창------------------------------------------- */}
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
            {/* <span className={styles.btnIcon}>
              {type === "folder" && "📁"}
              {type === "memo" && "📝"}
            </span> */}
            <span className={styles.btnLabel}>{title}</span>
          </button>
        ))}
      </div>

      {/* 구분선-------------------------------------- */}
      <div className={styles.traySeparator} aria-hidden />

      {/* icon + clock-------------------------------------- */}
      <div className={styles.tray}>
        <div className={styles.clock} aria-label="Clock">
          {hhmm}
        </div>
      </div>
    </div>


    {/* popup start menu */}
    <StartMenu
      open={startOpen}
      onClose={() => setStartOpen(false)}
      ignoreRefs={[startTextRef]}
    />
    </>
  );

}
