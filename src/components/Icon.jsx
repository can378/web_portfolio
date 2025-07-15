import { useRef } from "react";
import Draggable from "react-draggable";
import styles from "./Icon.module.css";

export default function Icon({ icon, label, onClick, bounds }) {
    const nodeRef = useRef(null);

    return (
        <Draggable nodeRef={nodeRef} bounds={bounds}>
            <div ref={nodeRef} className={styles.iconContainer} onDoubleClick={onClick}>
                <img src={icon} alt={label} className={styles.iconImage} />
                <p className={styles.iconLabel}>{label}</p>
            </div>
        </Draggable>
    );
}
