import { useState } from "react";
import ModalWindow from "../components/ModalWindow";
import styles from "./Email.module.css";
import { sendEmail } from "../utils/api";

export default function Email({ title, onClose, onMinimize }) {
    const [senderEmail, setSenderEmail] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState(""); // 상태 메시지 표시
    const [loading, setLoading] = useState(false); // 로딩 상태

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus("");

        try {
            const result = await sendEmail({
                sender: senderEmail,
                recipient: "devmoon00@gmail.com",
                subject: "포트폴리오에서 온 새 메시지",
                body: message,
            });

            // console.log(result);
            setStatus("메일 전송 성공!");
            setSenderEmail("");
            setMessage("");

        } catch (errorResult) {
            console.error(errorResult);

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

            {/* ✅ 헤더 */}
            <div className={styles.header} role="banner">
            <div className={styles.headerLeft}>
                <span className={styles.headerTitle}>Send Email</span>
            </div>
            <div className={styles.headerRight}>
                <button type="button" className={styles.headerBtn} title="Reply">↩</button>
                <button type="button" className={styles.headerBtn} title="Forward">⤴</button>
                <button type="button" className={styles.headerBtn} title="Delete">🗑</button>
            </div>
            </div>

            <div className={styles.field}>
                <label className={styles.label} htmlFor="sender">From</label>
                <input
                id="sender"
                type="email"
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className={styles.input}
                disabled={loading}
                />
            </div>

            <div className={styles.field}>
                <label className={styles.label} htmlFor="receiver">To</label>
                <input
                id="receiver"
                type="email"
                value="devmoon00@gmail.com"
                disabled
                className={styles.input}
                />
            </div>

            <div className={styles.field}>
                <label className={styles.label} htmlFor="message">Message</label>
                <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message…"
                required
                className={styles.textarea}
                disabled={loading}
                />
            </div>




              {/* 푸터: 버튼 + 상태바를 같이 감싸기 */}
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

                <div className={styles.statusbar}>
                <div className={styles.statusCell}>
                    {status ? status : (loading ? "Working..." : "Ready")}
                </div>
                <div className={styles.statusCellRight}>
                    {loading ? "..." : "✓"}
                </div>
                </div>
            </footer>
            </form>

        </ModalWindow>
    );
}
