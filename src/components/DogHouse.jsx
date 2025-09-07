import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import styles from "./DogHouse.module.css";

const DogHouse = forwardRef(function DogHouse(
  {
    src = "/web_portfolio/assets/dog_house.svg",
    margin = 10,
    offsetY = 40, // ← 위로 띄우기
    occupied = false,  // 개가 집에 있으면 눈 표시
    onClick,           // 클릭 시 밖으로 나오게
    anchorOffset = { x: 0, y: -20 },
    eyesOffset = { x: 0, y: 0 }, // 눈 위치 보정
  },
  ref
) {
  const houseRef = useRef(null);

  useImperativeHandle(ref, () => ({
    getAnchor: () => {
      const el = houseRef.current;
      if (!el) return { x: 0, y: 0 };
      const rect = el.getBoundingClientRect();
      const x = rect.left + rect.width * 0.2 -40 + anchorOffset.x;
      const y = rect.top + rect.height - 20 + anchorOffset.y;
      return { x, y };
    },
    getDropZone: (inflate = 1) => {
      const el = houseRef.current;
      if (!el) return new DOMRect(0, 0, 0, 0);
      const r = el.getBoundingClientRect();
      return new DOMRect(r.left - inflate, r.top - inflate, r.width + inflate * 2, r.height + inflate * 2);
    },
  }));




  return (
    <div
      className={styles.wrapper}
      style={{ right: margin, bottom: margin + offsetY }}
      onClick={onClick}
    >
      {/* dog house */}
      <img
        ref={houseRef}
        className={styles.house}
        src={src}
        alt="Dog House"
        draggable={false}
      />

      {/* 개가 집에 있을 때 눈 */}
      {occupied && (
        <div
          className={styles.eyes}
          style={{ transform: `translate(${eyesOffset.x}px, ${eyesOffset.y}px)` }}
        >
          <span className={styles.eye} />
          <span className={styles.eye} />
        </div>
      )}
    </div>
  );
});

export default DogHouse;
