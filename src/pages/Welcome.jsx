import { useEffect, useState } from "react";
import ModalWindow from "../components/ModalWindow";
import styles from "./Welcome.module.css";

export default function Welcome({ title, onClose,onMinimize }) {
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowContent(true), 300);
        return () => clearTimeout(timer);
    }, []);

    return (
        <ModalWindow
            title="🌟 Welcome 🌟"
            onClose={onClose}
            defaultPosition={{ x: 50, y: 80 }}
            defaultSize={{ width: 700, height: 400 }}
            onMinimize={onMinimize}
        >
            <div className={`${styles.container} ${showContent ? styles.fadeIn : ""}`}>
                <h1 className={styles.title}>👋 Hello, Welcome!</h1>
                <p className={styles.subtitle}>
                    I’m <span className={styles.highlight}>Yunji Heo</span>, and this is my portfolio.
                </p>
                <p className={styles.description}>
                    Explore my projects, skills, and experiences. Let’s make something amazing together!
                </p>
                <button className={styles.startButton} onClick={onClose}>
                    🚀 시작하기
                </button>
            </div>
        </ModalWindow>
    );
}
