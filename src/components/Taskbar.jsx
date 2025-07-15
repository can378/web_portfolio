import styles from "./Taskbar.module.css";

export default function Taskbar() {
    return (
        <div className={styles.taskbar}>
            <div className={styles.startButton}>Start</div>
            <div className={styles.taskbarItems}>
                <span>My Computer</span>
                <span>Recycle Bin</span>
            </div>
            <div className={styles.clock}>3:02 AM</div>
        </div>
    );
}
