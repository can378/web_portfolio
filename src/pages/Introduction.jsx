import { useEffect, useState } from "react";
import ModalWindow from "../components/ModalWindow";
import styles from "./Introduction.module.css";

export default function Introduction({ title, onClose }) {
    const [visibleChats, setVisibleChats] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [typingChat, setTypingChat] = useState(null);

    const chatData = [
        { sender: "question", text: "이름이 뭐야?" },
        { sender: "me", text: "저는 허윤지이고, ~~대학교를 졸업했고 게임 개발과 AI 연구를 해왔어요." },
        { sender: "question", text: "너의 스킬이 뭐야?" },
        { sender: "me", text: "Unity, Python, C++, 그리고 AI 모델 개발과 데이터 처리에 능숙해요." },
        { sender: "question", text: "최근엔 뭐 하고 있어?" },
        { sender: "me", text: "지금은 Unity로 2D 로그라이크 게임을 개발 중이에요. 팀 리더로 활동하면서 기획도 하고 있어요." },
    ];

    useEffect(() => {
        if (currentIndex >= chatData.length) return;

        const currentChat = chatData[currentIndex];
        let charIndex = 0;

        setTypingChat({ sender: currentChat.sender, text: "" });

        const typingInterval = setInterval(() => {
            const nextChar = currentChat.text[charIndex];

            // ✅ nextChar가 undefined가 아니면 추가
            if (typeof nextChar !== "undefined") {
                setTypingChat((prev) => ({
                    sender: prev.sender,
                    text: prev.text + nextChar,
                }));
                charIndex++;
            } else {
                clearInterval(typingInterval);
                setTimeout(() => {
                    setVisibleChats((prev) => [...prev, currentChat]);
                    setTypingChat(null);
                    setCurrentIndex((prev) => prev + 1);
                }, 500);
            }
        }, 50);

        return () => clearInterval(typingInterval);
    }, [currentIndex]);

    return (
        <ModalWindow
            title="Messenger"
            onClose={onClose}
            defaultPosition={{ x: 50, y: 80 }}
            defaultSize={{ width: 700, height: 600 }}
        >
            <div className={styles.chatContainer}>
                {visibleChats.map((chat, index) => (
                    <div
                        key={index}
                        className={`${styles.message} ${
                            chat.sender === "me" ? styles.me : styles.question
                        }`}
                    >
                        <p>{chat.text}</p>
                    </div>
                ))}

                {typingChat && (
                    <div
                        className={`${styles.message} ${
                            typingChat.sender === "me" ? styles.me : styles.question
                        }`}
                    >
                        <p>{typingChat.text}</p>
                    </div>
                )}
            </div>


        </ModalWindow>
    );
}
