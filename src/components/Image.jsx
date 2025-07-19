import ModalWindow from "./ModalWindow";
import styles from "./Image.module.css";

export default function ImageViewer({ title, imageUrl, onClose, onMinimize }) {
    return (
        <ModalWindow
            title={title}
            onClose={onClose}
            onMinimize={onMinimize}
            defaultPosition={{ x: 150, y: 200 }}
            defaultSize={{ width: 500, height: 500 }}
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
