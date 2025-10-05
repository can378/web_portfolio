import styles from "./WinLogo.module.css";

export default function WinLogo() {
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
