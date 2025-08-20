import { useEffect, useState } from "react";
import ModalWindow from "../components/ModalWindow";
import styles from "./Introduction.module.css";
import chatData from "../data/chatData";

export default function Introduction({ title, onClose, onMinimize }) {
  const [visibleChats, setVisibleChats] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typingChat, setTypingChat] = useState(null);

  useEffect(() => {
    if (currentIndex >= chatData.length) return;
    const currentChat = chatData[currentIndex];
    let charIndex = 0;
    setTypingChat({ sender: currentChat.sender, text: "" });

    const typingInterval = setInterval(() => {
      const nextChar = currentChat.text[charIndex];
      if (typeof nextChar !== "undefined") {
        setTypingChat((prev) => ({ sender: prev.sender, text: prev.text + nextChar }));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setVisibleChats((prev) => [...prev, currentChat]);
          setTypingChat(null);
          setCurrentIndex((prev) => prev + 1);
        }, 200);
      }
    }, 40);

    return () => clearInterval(typingInterval);
  }, [currentIndex]);

  return (
    <ModalWindow
      title="Messenger"
      onClose={onClose}
      onMinimize={onMinimize}
      defaultPosition={{ x: 50, y: 80 }}
      defaultSize={{ width: 700, height: 600 }}
    >
      <div className={styles.container}>
        {/* 상단 메뉴바 (고정) */}
        <div className={styles.menuBar}>
          <span>File</span><span>Edit</span><span>Actions</span><span>Tools</span><span>Help</span>
        </div>

        {/* 아이콘 툴바 (고정) */}
        {/* <div className={styles.toolBar}>
          <button>👥 Invite</button>
          <button>📁 Send Files</button>
          <button>🎥 Video</button>
          <button>🎤 Voice</button>
          <button>🎲 Activities</button>
          <button>🃏 Games</button>
        </div> */}

        {/* 본문: 가운데 채팅 + 오른쪽 프로필 (높이 가변) */}
        <div className={styles.mainArea}>
          <div className={styles.chatPanel}>
            <div className={styles.toField}>To: Yunji Heo</div>

            {/* ✅ 이 영역만 스크롤 */}
            <div className={styles.messagesScroll}>
              {visibleChats.map((chat, i) => (
                <div
                  key={i}
                  className={`${styles.message} ${chat.sender === "me" ? styles.me : styles.question}`}
                >
                  <p>{chat.text}</p>
                </div>
              ))}
              {typingChat && (
                <div
                  className={`${styles.message} ${typingChat.sender === "me" ? styles.me : styles.question}`}
                >
                  <p>{typingChat.text}</p>
                </div>
              )}
            </div>

            {/* 하단 툴바(고정) */}
            {/* <div className={styles.inputToolbar}>
              <button>😀</button>
              <button>🎤</button>
              <button>🖼️</button>
              <button>🎁</button>
            </div> */}

            {/* 입력창 + 전송(고정) */}
            <div className={styles.inputContainer}>
              <input type="text" placeholder="메시지를 입력하세요..." className={styles.inputBox} />
              <button className={styles.sendButton}>Send</button>
            </div>
          </div>

          {/* 👉 오른쪽 프로필: 상단(나), 하단(상대) */}
          <aside className={styles.profilesRight}>
            <div className={styles.profileCard}>
              <div className={styles.profileInner}>
                <img src="/web_portfolio/assets/my_profile.png" alt="Me" />
              </div>
              <span className={styles.sideTab} />
              <span className={styles.bottomChevron} />
            </div>

            <div className={`${styles.profileCard} ${styles.other}`}>
              <div className={styles.profileInner}>
                <img src="/web_portfolio/assets/other_profile.png" alt="Other" />
              </div>
              <span className={styles.sideTab} />
              <span className={styles.bottomChevron} />
            </div>
          </aside>
        </div>

        {/* ✅ 하단 footer/상태바 */}
        <footer className={styles.statusBar}>
          <span>Click for new Emoticons and Theme Packs…</span>
          <span className={styles.statusRight}>✔</span>
        </footer>

        {/* 하단 상태바 (원하면 넣기) */}
        {/* <div className={styles.statusBar}>Click for new Emoticons and Theme Packs…</div> */}
      </div>
    </ModalWindow>
  );
}
