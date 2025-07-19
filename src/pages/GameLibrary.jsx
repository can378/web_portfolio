import ModalWindow from "../components/ModalWindow";
import styles from "./GameLibrary.module.css";

export default function GameLibrary({ title, headerImage, gameImages, onClose, onMinimize }) {
    return (
        <ModalWindow
            title={title}
            onClose={onClose}
            onMinimize={onMinimize} // ✅ 최소화 콜백 추가
        >
            <div className={styles.container}>
                {/* 왼쪽 상단 고정 이미지 */}
                <div className={styles.header}>
                    <img src={headerImage} alt="Header" className={styles.headerImage} />
                </div>

                {/* 게임 목록 */}
                <div className={styles.gameGrid}>
                    {gameImages.map((game, index) => (
                        <img
                            key={index}
                            src={game}
                            alt={`Game ${index + 1}`}
                            className={styles.gameImage}
                        />
                    ))}
                </div>
            </div>
        </ModalWindow>
    );
}
