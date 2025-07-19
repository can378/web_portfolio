import ModalWindow from "./ModalWindow";
import styles from "./Image.module.css";

export default function ImageViewer({ title, imageUrl, onClose, onMinimize }) {
    return (
        <ModalWindow
            title={title}
            onClose={onClose}
            onMinimize={onMinimize} // ✅ 최소화 콜백 추가
        >
            <div className={styles.imageContainer}>
                <img
                    src={imageUrl}
                    alt={title}
                    className={styles.image}
                />
            </div>
        </ModalWindow>
    );
}
