import { useState } from "react";
import ModalWindow from "../components/ModalWindow";
import styles from "./Email.module.css";

export default function Email({ title, onClose, onMinimize }) {
    const [receiverEmail, setReceiverEmail] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState(""); // 상태 메시지 표시
    const [loading, setLoading] = useState(false); // 로딩 상태

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(""); // 상태 초기화

        const formData = new FormData();
        formData.append("access_key", "");
        formData.append("subject", "포트폴리오에서 온 새 메시지"); // 메일 제목
        formData.append("email", receiverEmail); // 보낸 사람 이메일
        formData.append("message", message); // 메시지 내용

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            if (result.success) {
                setStatus("✅ 메일 전송 성공!");
                setReceiverEmail(""); // 입력 초기화
                setMessage("");
            } else {
                setStatus("❌ 메일 전송 실패. 다시 시도해 주세요.");
            }
        } catch (error) {
            console.error(error);
            setStatus("❌ 오류 발생. 네트워크를 확인하세요.");
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
                        value={receiverEmail}
                        onChange={(e) => setReceiverEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className={styles.input}
                    />
                </div>
                <div>
                    receiver
                    <input
                        type="email"
                        value="m@naver.com"
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
