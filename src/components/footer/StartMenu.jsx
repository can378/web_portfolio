import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./StartMenu.module.css";

const DEFAULT_ITEMS = [
  { id: "programs",  label: "Programs",  detail: "Installed programs and groups." },
  { id: "documents", label: "Documents", detail: "Recently opened files." },
  { id: "settings",  label: "Settings",  detail: "Control Panel and system settings." },
  { id: "find",      label: "Find",      detail: "Search for files or folders." },
  { id: "run",       label: "Run",       detail: "Run a program or command." },
  { id: "separator" },
  { id: "shutdown",  label: "Shut Down", danger: true, detail: "Turn off or restart the computer." },
];

export default function StartMenu({
  items = DEFAULT_ITEMS,
  className,
  open,        // 외부 제어
  onClose,     // 닫기 콜백
  ignoreRefs = [],
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [detailId, setDetailId] = useState(null); // ▶ 상세 패널 대상
  const rootRef = useRef(null);
  const listRef = useRef(null);

  const focusable = useMemo(
    () => items.filter((it) => it.id !== "separator"),
    [items]
  );

  // 열림/닫힘 변화 시 상세 패널 초기화
  useEffect(() => {
    if (!open) setDetailId(null);
  }, [open]);

  // 바깥 클릭 / ESC 닫기 + 키보드 탐색
  useEffect(() => {
    if (!open) return;

    function onDocClick(e) {
      if (!rootRef.current) return;

      const target = e.target;
      const path = typeof e.composedPath === "function" ? e.composedPath() : [];

      // 1) 내부 클릭이면 닫지 않음
      const insideRoot =
        rootRef.current.contains(target) || (path.length && path.includes(rootRef.current));
      if (insideRoot) return;

      // 2) 무시 대상이면 닫지 않음
      if (Array.isArray(ignoreRefs)) {
        const hitIgnored = ignoreRefs.some((r) => {
          const el = r?.current ?? r;
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
        // Enter는 기존대로 선택행동을 원하면 여기에서 처리
        // 이번 요구에서는 메뉴 닫지 않으므로 아무것도 안 함
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

  if (!open) return null;

  const currentDetail = items.find((it) => it.id === detailId);

  const panel = (
    <div
      className={`${styles.menuWrapper} ${className ?? ""}`}
      role="menu"
      aria-label="Start Menu"
      ref={rootRef}
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()} // click 버블도 차단
    >
      {/* left side bar */}
      <div className={styles.sidebar} aria-hidden>
        <div className={styles.sidebarText}>Start</div>
      </div>

      {/* menu items */}
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
                onClick={(e) => {
                  e.stopPropagation(); // 부모 버튼 onClick 방지
                  setDetailId((prev) => (prev === item.id ? null : item.id));
                }}
                data-index={focusable.findIndex((f) => f.id === item.id)}
                tabIndex={
                  activeIndex === focusable.findIndex((f) => f.id === item.id)
                    ? 0
                    : -1
                }
              >
                <span className={styles.itemLabel}>{item.label}▶</span>
              </button>
            </li>
          )
        )}
      </ul>



      {/* 오른쪽 상세 설명 패널========================*/}
      {currentDetail && (
        <div
          className={styles.detailPanel}
          role="region"
          aria-label={`${currentDetail.label} details`}
        >
          <div className={styles.detailTitle}>{currentDetail.label}</div>
          <div className={styles.detailBody}> {currentDetail.detail ?? "No additional info."} </div>
        </div>
      )}




    </div>
  );

  return createPortal(panel, document.body);
}
