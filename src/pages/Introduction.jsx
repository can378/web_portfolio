import { useEffect, useRef, useState } from "react";
import ModalWindow from "../components/ModalWindow";
import styles from "./Introduction.module.css";
import chatData from "../data/chatData";
import ReactMarkdown from "react-markdown";

export default function Introduction({ title, onClose, onMinimize }) {
  const [visibleChats, setVisibleChats] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typingChat, setTypingChat] = useState(null);

  // ⬇︎ 채팅 영역 auto-scroll용(선택)
  /*
  const scrollRef = useRef(null);
  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [visibleChats, typingChat]);
  */
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
          // ⬇︎ 방금 채팅을 확정 목록으로 옮김
          setVisibleChats((prev) => [...prev, currentChat]);
          setTypingChat(null);
          setCurrentIndex((prev) => prev + 1);
        }, 50);
      }
    }, 40);

    return () => clearInterval(typingInterval);
  }, [currentIndex]);

  // ⬇︎ component만 렌더 (함수형/JSX 직접값 둘 다 지원)
  const renderAttachment = (chat) => {
    if (!chat?.component) return null;

    // 함수형: () => <SomeComponent />
    if (typeof chat.component === "function") {
      const Comp = chat.component;
      return (
        <div style={{ marginTop: 8 }}>
          <Comp />
        </div>
      );
    }

    // JSX 직접값: component: <SomeComponent />
    return <div style={{ marginTop: 8 }}>{chat.component}</div>;
  };

  return (
    <ModalWindow
      title="Messenger"
      onClose={onClose}
      onMinimize={onMinimize}
      defaultPosition={{ x: 50, y: 80 }}
      defaultSize={{ width: 700, height: 600 }}
    >
      <div className={styles.container}>
        <div className={styles.menuBar}>
          <span>File</span><span>Edit</span><span>Actions</span><span>Tools</span><span>Help</span>
        </div>

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
                  <div className={styles.md}>
                    <ReactMarkdown>{chat.text}</ReactMarkdown>
                  </div>
                  {/* ⬇︎ 메시지 뒤에 component 렌더 */}
                  {renderAttachment(chat)}
                </div>
              ))}

              {typingChat && (
                <div
                  className={`${styles.message} ${typingChat.sender === "me" ? styles.me : styles.question}`}
                >
                  <div className={styles.md}>
                    <ReactMarkdown>{typingChat.text}</ReactMarkdown>
                  </div>
                </div>
              )}
            </div>

            <div className={styles.inputContainer}>
              <input type="text" placeholder="메시지를 입력하세요..." className={styles.inputBox} />
              <button className={styles.sendButton}>Send</button>
            </div>
          </div>

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

        <footer className={styles.statusBar}>
          <span>This is Introduction of myself…</span>
          <span className={styles.statusRight}>✔</span>
        </footer>
      </div>
    </ModalWindow>
  );
}
