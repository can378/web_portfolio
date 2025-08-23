import { useEffect, useState } from "react";
import ModalWindow from "../components/ModalWindow";
import styles from "./Welcome.module.css";

export default function Welcome({ title, onClose, onMinimize }) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ModalWindow
      title="Welcome"
      onClose={onClose}
      defaultPosition={{ x: 30, y: 30 }}
      defaultSize={{ width: 600, height: 300 }}
      onMinimize={onMinimize}
    >
      <div className={`${styles.container} ${showContent ? styles.fadeIn : ""}`}>
        {/* Retro Header */}
        <header className={styles.headerBar} role="banner">
          <div className={styles.headerLeft}>
            <span className={styles.headerTitle}>Hello, Welcome!</span>
          </div>
          <nav className={styles.headerRight} aria-label="quick actions">
            <button className={styles.headBtn} onClick={() => alert("About me!")}>About</button>
            <button className={styles.headBtn} onClick={() => alert("Open projects!")}>Projects</button>
            <button className={styles.headBtn} onClick={() => alert("Say hi!")}>Contact</button>
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
