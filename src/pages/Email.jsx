import { useState } from "react";
import ModalWindow from "../components/ModalWindow";
import styles from "./Email.module.css";
import { sendEmail } from "../utils/api";

export default function Email({ title, onClose, onMinimize }) {
  const [senderEmail, setSenderEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const SUBJECT = "포트폴리오에서 온 새 메시지";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const result = await sendEmail({
        sender: senderEmail,
        recipient: "devmoon00@gmail.com",
        subject: SUBJECT,
        body: message,
      });
      setStatus("메일 전송 성공!");
      setSenderEmail("");
      setMessage("");
    } catch (errorResult) {
      console.error(errorResult);
      // 429: 너무 잦은 전송
      if (errorResult?.code === 429) {
        setStatus(
          `1분에 1회만 이메일 전송이 가능합니다`
        );
        return;
      }

      let errorMessage = "";
      if (typeof errorResult.detail === "string") {
        errorMessage = errorResult.detail;
      } else if (Array.isArray(errorResult.detail)) {
        errorMessage = errorResult.detail[0]?.msg || "유효성 검사 실패";
      } else {
        errorMessage = "알 수 없는 오류가 발생했습니다.";
      }
      setStatus(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalWindow
      title={title}
      onClose={onClose}
      onMinimize={onMinimize}
      defaultPosition={{ x: 150, y: 100 }}
      defaultSize={{ width: 600, height: 700 }}
    >
      <form className={styles.container} onSubmit={handleSubmit} aria-busy={loading}>
        {/* 메뉴바 */}
        {/*
        <nav className={styles.menuBar} role="menubar" aria-label="Mail menu">
          <span className={styles.menuItem}>File</span>
          <span className={styles.menuItem}>Edit</span>
          <span className={styles.menuItem}>View</span>
          <span className={styles.menuItem}>Insert</span>
          <span className={styles.menuItem}>Format</span>
          <span className={styles.menuItem}>Tools</span>
        </nav>
           */}
        

        {/* 주소/제목 필드 (음각 입력) */}
        <div className={styles.fieldRow}>
          <label htmlFor="sender" className={styles.fieldLabel}>From:</label>
          <input
            id="sender"
            type="email"
            value={senderEmail}
            onChange={(e) => setSenderEmail(e.target.value)}
            placeholder="your@email.com"
            required
            disabled={loading}
            className={`${styles.input} ${styles.sunken}`}
          />
        </div>

        <div className={styles.fieldRow}>
          <label htmlFor="receiver" className={styles.fieldLabel}>To:</label>
          <input
            id="receiver"
            type="email"
            value="devmoon00@gmail.com"
            disabled
            className={`${styles.input} ${styles.sunken}`}
          />
        </div>

        <div className={styles.fieldRow}>
          <label htmlFor="subject" className={styles.fieldLabel}>Subject:</label>
          <input
            id="subject"
            type="text"
            value={SUBJECT}
            readOnly
            className={`${styles.input} ${styles.sunken}`}
            aria-readonly
          />
        </div>

        {/* 본문 (큰 음각 박스) */}
        <div className={`${styles.messageWrap} ${styles.sunken}`}>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message…"
            required
            disabled={loading}
            className={styles.textarea}
          />
        </div>

        {/* 하단: 버튼 + 상태바 */}
        <footer className={styles.footer}>
          <div className={styles.toolbar}>
            <button type="submit" className={styles.btn} disabled={loading} aria-disabled={loading}>
              {loading ? "Sending..." : "Send"}
            </button>
            <button
              type="button"
              className={styles.btn}
              onClick={() => { setSenderEmail(""); setMessage(""); setStatus(""); }}
              disabled={loading}
            >
              Clear
            </button>
          </div>

          
        </footer>


        <div className={styles.statusbar}>
            <div className={styles.statusCell}>
              {status ? status : (loading ? "Working..." : "Ready")}
            </div>
            <div className={styles.statusCellRight}>
              {loading ? "..." : "✓"}
            </div>
          </div>
      </form>
    </ModalWindow>
  );
}
