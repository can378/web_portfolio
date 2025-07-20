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

        try {
            const response = await fetch("http://localhost:8000/email/send", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    sender: receiverEmail,           // 보내는 사람 이메일
                    recipient: "devmoon00@gmail.com", // 받는 사람 이메일 (고정)
                    subject: "포트폴리오에서 온 새 메시지", // 제목
                    body: message,                   // 메시지 본문
                }),
            });

            // 서버 응답이 성공이면
            if (response.ok) {
                const result = await response.json();
                console.log(result);
                setStatus("메일 전송 성공!");
                setReceiverEmail(""); // 입력 초기화
                setMessage("");
            } 
            // 서버가 400/500 오류를 반환했으면
            else {
                const errorResult = await response.json();
                console.error(errorResult);

                let errorMessage = "";
                if (typeof errorResult.detail === "string") {
                    errorMessage = errorResult.detail; // 문자열 detail
                } else if (Array.isArray(errorResult.detail)) {
                    errorMessage = errorResult.detail[0]?.msg || "유효성 검사 실패";
                } else {
                    errorMessage = "알 수 없는 오류가 발생했습니다.";
                }

                setStatus(`${errorMessage}`);
            }
        } 
        // fetch 자체가 실패한 경우 (네트워크 끊김 등)
        catch (error) {
            console.error(error);
            setStatus("네트워크 오류가 발생했습니다.");
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
