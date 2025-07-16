import styles from "./Taskbar.module.css";
import { useState, useEffect } from "react";

export default function Taskbar({ openFolders, openMemos }) {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date) =>
        date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    return (
        <div className={styles.taskbar}>
            <div className={styles.startButton}>🟢 Start</div>
            <div className={styles.openWindows}>
                {openFolders.map((id) => (
                    <span key={id} className={styles.windowItem}>
                        📁 {id}
                    </span>
                ))}
                {openMemos.map((id) => (
                    <span key={id} className={styles.windowItem}>
                        📝 {id}
                    </span>
                ))}
            </div>
            <div className={styles.clock}>{formatTime(time)}</div>
        </div>
    );
}
