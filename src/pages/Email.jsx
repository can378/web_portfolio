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
            <form className={styles.container} onSubmit={handleSubmit}>
                <div>
                    sender
                    <input
                        type="email"
                        value={senderEmail}
                        onChange={(e) => setSenderEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className={styles.input}
                    />
                </div>
                <div>
                    receiver
                    <input
                        type="email"
                        value="devmoon00@gmail.com"
                        disabled
                        className={styles.input}
                    />
                </div>
                <div>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Enter your message"
                        required
                        className={styles.textarea}
                    />
                </div>
                <button type="submit" className={styles.sendButton}>
                    {loading ? "Sending..." : "Send"}
                </button>

                {status && <p className={styles.status}>{status}</p>}
            </form>
        </ModalWindow>
    );
}
