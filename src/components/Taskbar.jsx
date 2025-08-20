import styles from "./Taskbar.module.css";
import { useState, useEffect } from "react";

export default function Taskbar({ openWindows, toggleWindow }) {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date) =>
        date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    return (
        <div className={styles.taskbar}>
            <div className={styles.startButton}>Welcome</div>
            <div className={styles.openWindows}>
                {openWindows.map(({ id, type, title, isVisible }) => (
                    <span
                    key={id}
                    className={`${styles.windowItem} ${isVisible ? styles.active : ""}`}
                    onClick={() => toggleWindow(id)}
                    >
                    {type === "folder" && <>📁 {title}</>}
                    {type === "memo" && <>📝 {title}</>}
                    {type === "sticker" && <>📌 {title}</>}
                    {type === "image" && <>🖼 {title}</>}
                    {!["folder", "memo", "sticker", "image"].includes(type) && <>{title}</>}
                    </span>
                ))}
            </div>
            <div className={styles.clock}>{formatTime(time)}</div>
        </div>
    );
}
