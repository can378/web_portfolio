import { useRef } from "react";
import Draggable from "react-draggable";
import styles from "./Icon.module.css";

export default function Icon({ icon, label, onClick, bounds, fixed = false }) {
  const nodeRef = useRef(null);

  return (
    // Draggable을 쓸 거면 여기 Draggable로 감싸세요. (지금은 생략)
    <div className={styles.iconContainer} onClick={onClick}>
      <div className={styles.thumb}>
        <img src={icon} alt={label} />
      </div>
      <p className={styles.iconLabel}>{label}</p>
    </div>
  );
}
