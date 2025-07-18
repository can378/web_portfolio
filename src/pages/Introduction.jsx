import { useEffect, useState } from "react";
import ModalWindow from "../components/ModalWindow";
import styles from "./Introduction.module.css";

export default function Introduction({ title, onClose }) {
    const [visibleChats, setVisibleChats] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [typingChat, setTypingChat] = useState(null);

    const chatData = [
        { sender: "question", text: "넌 누구야?" },
        { sender: "me", text: "저는 허윤지이고, ~~대학교를 졸업했고 게임 개발과 AI 연구를 해왔어요." },
        { sender: "question", text: "너의 스킬이 뭐야?" },
        { sender: "me", text: "Unity, Python, C++, 그리고 AI 모델 개발과 데이터 처리에 능숙해요." },
        { sender: "question", text: "최근엔 뭐 하고 있어?" },
        { sender: "me", text: "지금은 Unity로 2D 로그라이크 게임을 개발 중이에요. 팀 리더로 활동하면서 기획도 하고 있어요." },
        { sender: "question", text: "자랑하고 싶은거 있어?" },
        { sender: "me", text: "장학금!" },
        { sender: "question", text: "자격증은?" },
        { sender: "me", text: "자격증" },
    ];

    useEffect(() => {
        if (currentIndex >= chatData.length) return;

        const currentChat = chatData[currentIndex];
        let charIndex = 0;

        setTypingChat({ sender: currentChat.sender, text: "" });

        const typingInterval = setInterval(() => {
            const nextChar = currentChat.text[charIndex];

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
                {/* 채팅 내용 */}
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

                {/* 타이핑 중 */}
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

            {/* ✅ 입력창 & 전송 버튼 */}
            <div className={styles.inputContainer}>
                <input
                    type="text"
                    placeholder="메시지를 입력하세요..."
                    className={styles.inputBox}
                />
                <button className={styles.sendButton}>전송</button>
            </div>
        </ModalWindow>
    );
}
