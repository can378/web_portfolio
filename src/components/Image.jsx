import ModalWindow from "./ModalWindow";
import styles from "./Image.module.css";

export default function ImageViewer({ title, imageUrl, onClose }) {
    return (
        <ModalWindow title={title} onClose={onClose}>
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
