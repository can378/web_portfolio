import { useState, useMemo } from "react";
import ModalWindow from "./ModalWindow";
import styles from "./Memo.module.css";

export default function Memo({ title, initialText, editable, onClose, onMinimize }) {
  const [content, setContent] = useState(initialText || "");
  const charCount = useMemo(() => content.length, [content]);

  return (
    <ModalWindow title={title} onClose={onClose} onMinimize={onMinimize} defaultSize={{ width: 300, height: 400 }}>
      <div className={styles.container}>
        {/* 헤더 메뉴바 */}
        {/* 
        <div className={styles.menubar} role="menubar" aria-label="Memo menu">
          <span className={styles.menuItem} role="menuitem">File</span>
          <span className={styles.menuItem} role="menuitem">Edit</span>
          <span className={styles.menuItem} role="menuitem">Search</span>
          <span className={styles.menuItem} role="menuitem">Help</span>
        </div>
          */}
        {/* 본문: textarea가 가득 차도록 */}
        <div className={styles.body}>
          <textarea
            className={`${styles.textarea} ${editable ? styles.editable : styles.readonly}`}
            value={content}
            onChange={(e) => {
              if (editable) setContent(e.target.value);
            }}
            placeholder="메모를 입력하세요..."
            readOnly={!editable}
          />
        </div>

        {/* 푸터 상태바 */}
        <div className={styles.statusbar}>
          <span>{editable ? "Editable" : "Read-only"}</span>
          <span className={styles.sep}>|</span>
          <span>Chars: {charCount}</span>
        </div>
      </div>
    </ModalWindow>
  );
}
