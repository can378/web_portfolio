import { useEffect, useState } from "react";
import ModalWindow from "../components/ModalWindow";
import styles from "./Welcome.module.css";
const OPEN = {
  about: 1003,
  projects: 1001,
  contact: 1005,
};
export default function Welcome({ title, onClose, onMinimize, onOpen,onDragEnd,  initialIsMaximized,  onMaximizedChange,defaultPosition }) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const safeOpen = (id) => {
    if (typeof onOpen === "function") onOpen(id);
    // onOpen이 안 넘어온 경우를 대비한 안전장치(선택)
  };
  
  return (
    <ModalWindow
      title="Welcome"
      onClose={onClose}
      defaultPosition={defaultPosition || { x: 30, y: 30 }}
      defaultSize={{ width: 600, height: 300 }}
      onMinimize={onMinimize}
      onDragEnd={onDragEnd}
      initialIsMaximized={initialIsMaximized}
      onMaximizedChange={onMaximizedChange}
    >
      <div className={`${styles.container} ${showContent ? styles.fadeIn : ""}`}>
        {/* Retro Header */}
        <header className={styles.headerBar} role="banner">
          <div className={styles.headerLeft}>
            <span className={styles.headerTitle}>Hello, Welcome!</span>
          </div>
          <nav className={styles.headerRight} aria-label="quick actions">
            <button
              className={styles.headBtn}
              onClick={() => safeOpen(OPEN.about)}
            >
              About
            </button>
            <button
              className={styles.headBtn}
              onClick={() => safeOpen(OPEN.projects)}
            >
              Projects
            </button>
            <button
              className={styles.headBtn}
              onClick={() => safeOpen(OPEN.contact)}
            >
              Contact
            </button>
          </nav>
        </header>

        {/* Body */}
        <main className={styles.body} role="main">
          <h1 className={styles.title}>Hello, Welcome!</h1>
          <p className={styles.subtitle}>
            I’m <span className={styles.highlight}>Yunji Heo</span>, and this is my portfolio.
          </p>
          <p className={styles.description}>
            Explore my projects, skills, and experiences.
            <br />
            Ask my assistant dog anything you’re curious about in this portfolio!
          </p>
        </main>

        {/* Retro Footer / Status bar */}
        <footer className={styles.statusBar} role="contentinfo">
          <div className={styles.statusLeft}>
            <span/> Let's go!
          </div>
          <div className={styles.statusCenter}>
            Tip: You can make the assistant dog stop by clicking her.
          </div>
          <div className={styles.statusRight}>
            v1.0.0
          </div>
        </footer>
      </div>
    </ModalWindow>
  );
}
