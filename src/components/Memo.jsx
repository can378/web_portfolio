import { useState } from "react";
import ModalWindow from "./ModalWindow";

export default function Memo({ title, initialText, editable, onClose, onMinimize }) {
    const [content, setContent] = useState(initialText);

    return (
        <ModalWindow title={title} onClose={onClose}  onMinimize={onMinimize}>
            <textarea
                style={{
                    width: "100%",
                    height: "150px",
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    resize: "none",
                    outline: "none",
                    backgroundColor: editable ? "#fff" : "#f0f0f0",
                }}
                value={content}
                onChange={(e) => {
                    if (editable) setContent(e.target.value);
                }}
                placeholder="메모를 입력하세요..."
                readOnly={!editable}
            />
        </ModalWindow>
    );
}
