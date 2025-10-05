import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./StartMenu.module.css";

const DEFAULT_ITEMS = [
  { id: "programs", label: "Programs" },
  { id: "documents", label: "Documents" },
  { id: "settings", label: "Settings" },
  { id: "find", label: "Find" },
  { id: "run", label: "Run" },
  { id: "separator" },
  { id: "shutdown", label: "Shut Down", danger: true },
];

export default function StartMenu({
  items = DEFAULT_ITEMS,
  className,
  open,        // 외부에서만 제어
  onClose,     // 닫기 콜백
  ignoreRefs = [],
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef(null);
  const listRef = useRef(null);

  const focusable = useMemo(
    () => items.filter((it) => it.id !== "separator"),
    [items]
  );

  // 바깥 클릭 / ESC 닫기 + 키보드 탐색
  useEffect(() => {
    if (!open) return;


    function onDocClick(e) {
      if (!rootRef.current) return;

      const target = e.target;
      const path = typeof e.composedPath === "function" ? e.composedPath() : [];

      // 1) 메뉴 내부 클릭이면 닫지 않음
      const insideRoot =
        rootRef.current.contains(target) || (path.length && path.includes(rootRef.current));
      if (insideRoot) return;

      // 2) 무시 대상(ignoreRefs)에 포함되면 닫지 않음
      if (Array.isArray(ignoreRefs)) {
        const hitIgnored = ignoreRefs.some((r) => {
          const el = r?.current ?? r; // ref 또는 Element 허용
          if (!el) return false;
          return el.contains?.(target) || (path.length && path.includes(el));
        });
        if (hitIgnored) return;
      }

      // 3) 그 외엔 닫기
      onClose?.();
    }




    function onKey(e) {
      if (!open) return;
      if (e.key === "Escape") return onClose?.();

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((p) => (p + 1) % focusable.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((p) => (p - 1 + focusable.length) % focusable.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        const it = focusable[activeIndex];
        if (it) handleSelect(it);
      }
    }

    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, focusable, activeIndex, onClose, ignoreRefs]);



  // 메뉴 열릴 때 포커스 이동
  useEffect(() => {
    if (open && listRef.current) {
      const el = listRef.current.querySelector(`[data-index='${activeIndex}']`);
      el?.focus();
    }
  }, [open, activeIndex]);

  function handleSelect(item) {
    if (item.id === "separator") return;
    console.log("select", item);
  }

  if (!open) return null;




  const panel = (
    <div
      className={`${styles.menuWrapper} ${className ?? ""}`}
      role="menu"
      aria-label="Start Menu"
      ref={rootRef}
      style={{ position: "fixed" }}
      onMouseDown={(e) => e.stopPropagation()}
    >

      {/* left side bar=========================== */}
      <div className={styles.sidebar} aria-hidden>
        <div className={styles.sidebarText}>Start</div>
      </div>

      {/* menu items=========================== */}
      <ul className={styles.menuList} ref={listRef}>
        {items.map((item, i) =>
          item.id === "separator" ? (
            <li key={`sep-${i}`} className={styles.separator} aria-hidden />
          ) : (
            <li key={item.id}>
              <button
                type="button"
                role="menuitem"
                className={`${styles.menuItem} ${item.danger ? styles.danger : ""}`}
                onClick={() => handleSelect(item)}
                data-index={focusable.findIndex((f) => f.id === item.id)}
                tabIndex={
                  activeIndex === focusable.findIndex((f) => f.id === item.id)
                    ? 0
                    : -1
                }
              >
                <span className={styles.itemLabel}>{item.label}</span>
              </button>
            </li>
          )
        )}
      </ul>
    </div>
  );

  return createPortal(panel, document.body);
}
