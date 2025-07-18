import { useState, useEffect } from "react";
import ModalWindow from "../components/ModalWindow";
import historyData from "../data/history"; // 프로젝트 데이터
import styles from "./History.module.css";

export default function History({ onClose }) {
    const [position, setPosition] = useState({ x: 100, y: 0 });
    const [velocity, setVelocity] = useState({ x: 0, y: 0 });
    const [isJumping, setIsJumping] = useState(false);
    const [pressedKeys, setPressedKeys] = useState([]);
    const [showProjectList, setShowProjectList] = useState(false);

    const speed=10;
    const gravity=0.36;
    const mapWidth = 2000; // ✅ 전체 맵 너비
    const viewportWidth = 900; // ✅ 뷰포트 크기 (ModalWindow 기본 너비)

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!pressedKeys.includes(e.key)) {
                setPressedKeys((keys) => [...keys, e.key]);
            }

            if (e.key === "w" || e.key === "W" || e.key === "ArrowUp") {
                if (!isJumping) {
                    setVelocity((v) => ({ ...v, y: +10 })); // 점프
                    setIsJumping(true);
                }
            }
        };

        const handleKeyUp = (e) => {
            setPressedKeys((keys) => keys.filter((key) => key !== e.key));
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [isJumping, pressedKeys]);

    useEffect(() => {
        // 좌우 이동 처리
        let newX = 0;
        if (
            pressedKeys.includes("d") ||
            pressedKeys.includes("D") ||
            pressedKeys.includes("ArrowRight")
        ) {
            newX += speed;
        }
        if (
            pressedKeys.includes("a") ||
            pressedKeys.includes("A") ||
            pressedKeys.includes("ArrowLeft")
        ) {
            newX -= speed-3;
        }
        setVelocity((v) => ({ ...v, x: newX }));
    }, [pressedKeys]);

    useEffect(() => {
        const interval = setInterval(() => {
            setPosition((pos) => {
                let newX = pos.x + velocity.x;
                let newY = pos.y + velocity.y;

                let newVelocityY = velocity.y - gravity;

                // 캐릭터가 맵 범위 밖으로 나가지 않도록 제한
                if (newX < 0) newX = 0;
                if (newX > mapWidth - 50) newX = mapWidth - 50; // 캐릭터 크기 고려

                if (newY <= 0) {
                    newY = 0;
                    newVelocityY = 0;
                    setIsJumping(false);
                }

                setVelocity((v) => ({ ...v, y: newVelocityY }));

                return { x: newX, y: newY };
            });
        }, 20);

        return () => clearInterval(interval);
    }, [velocity]);

    // ✅ 카메라 위치 계산
    const cameraX = Math.min(
        Math.max(position.x - viewportWidth / 2, 0), // 왼쪽 범위 제한
        mapWidth - viewportWidth                     // 오른쪽 범위 제한
    );

    return (
        <ModalWindow
            title="History Game"
            onClose={onClose}
            defaultPosition={{ x: 50, y: 80 }}
            defaultSize={{ width: viewportWidth, height: 600 }}
        >
            {/* 오른쪽 상단 버튼 */}
            <button
                className={styles.projectButton}
                onClick={() => setShowProjectList(!showProjectList)}
            >
                Projects
            </button>

            <div className={styles.gameContainer}>
                {/* 카메라 이동 효과 */}
                <div
                    className={styles.gameArea}
                    style={{
                        transform: `translateX(${-cameraX}px)`, // ✅ 카메라 이동
                    }}
                >
                    {/* 캐릭터 */}
                    <div
                        className={styles.character}
                        style={{
                            left: `${position.x}px`,
                            bottom: `${position.y}px`,
                        }}
                    />

                    {/* 프로젝트 박스들 */}
                    {historyData.history.map((item, index) => (
                        <div
                            key={index}
                            className={styles.projectBox}
                            style={{
                                left: `${200 + index * 300}px`,
                                bottom: "0px",
                            }}
                        >
                            <div className={styles.projectTitle}>{item.title}</div>
                        </div>
                    ))}
                </div>

                {showProjectList && (
                    <div className={styles.projectList}>
                        <h3>Projects</h3>
                        <ul>
                            {historyData.history.map((item, index) => (
                                <li key={index}>
                                    <strong>{item.title}</strong>: {item.start} ~ {item.end}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

            </div>
        </ModalWindow>
    );
}
