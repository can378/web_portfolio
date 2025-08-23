// History.jsx
import React, { useMemo } from "react";
import styles from "./History.module.css";
import historyData from "../data/history.js";

// ---- helpers ----
const parseYM = (s) => {
  if (!s || s === "now")
    return new Date().getFullYear() + new Date().getMonth() / 12;
  const parts = s.split("-");
  const year = parseInt(parts[0], 10);
  const month = parts[1] ? parseInt(parts[1], 10) : 1;
  return year + (month - 1) / 12;
};

const clamp = (v, a, b) => Math.min(Math.max(v, a), b);

const packIntoLanes = (items) => {
  const lanes = [];
  const placed = [];
  items
    .map((d, i) => ({ ...d, _idx: i }))
    .sort((a, b) => parseYM(a.start) - parseYM(b.start))
    .forEach((item) => {
      const start = parseYM(item.start);
      const end = parseYM(item.end) ?? start + 0.25;
      let lane = 0;
      for (; lane < lanes.length; lane++) {
        if (lanes[lane] <= start) break;
      }
      lanes[lane] = end;
      placed.push({ ...item, lane, _start: start, _end: end });
    });
  return { placed, laneCount: lanes.length || 1 };
};

export default function History({ title = "History" }) {
  const parsed = useMemo(() => {
    const data = historyData.history;
    if (!data?.length) return null;

    // 데이터 범위 계산 + 2020~2026으로 클램프
    const starts = data.map((d) => parseYM(d.start));
    const ends = data.map((d) => parseYM(d.end) ?? parseYM(d.start));
    const dataMin = Math.min(...starts);
    const dataMax = Math.max(...ends);

    const hardMin = 2020;
    const hardMax = 2026;
    let min = Math.max(hardMin, Math.floor(dataMin));
    let max = Math.min(hardMax, Math.ceil(dataMax) + 0.001);
    if (max <= min) max = min + 1;

    const { placed, laneCount } = packIntoLanes(data);
    const xOf = (v) => ((v - min) / (max - min)) * 100;

    const years = [];
    for (let y = Math.floor(min); y <= Math.ceil(max); y++) years.push(y);

    // 레이아웃 상수
    const TOP_OFFSET = 16;
    const LANE_GAP = 60;
    const BAR_HEIGHT = 60;
    const BOTTOM_PAD = 12;

    const bars = placed.map((d) => {
      const left = clamp(xOf(d._start), 0, 100);
      const right = clamp(xOf(d._end), 0, 100);
      const width = Math.max(1, right - left);
      return {
        title: d.title,
        description: d.description,
        lane: d.lane,
        top: `${TOP_OFFSET + d.lane * LANE_GAP}px`,
        left: `${left}%`,
        width: `${width}%`,
        start: d.start,
        end: d.end,
      };
    });

    const contentHeight =
      TOP_OFFSET + (laneCount - 1) * LANE_GAP + BAR_HEIGHT + BOTTOM_PAD;

    // 👇 목록에 그대로 쓰기 위해 원본도 반환
    return { bars, years, laneCount, contentHeight, raw: data };
  }, []);

  if (!parsed) return null;
  const { bars, years, contentHeight, raw } = parsed;

  return (
    <div className={styles.window}>
      <div className={styles.body}>
        {/* 타임라인 */}
        <div className={styles.timeline}>
          {bars.map((b, i) => (
            <div
              key={i}
              className={styles.bar}
              style={{ left: b.left, width: b.width, top: b.top }}
              title={`${b.title}\n${b.description}`}
            >
              {b.title}
            </div>
          ))}
          <div aria-hidden style={{ height: `${contentHeight}px` }} />
        </div>

        {/* 연도 눈금 */}
        <div className={styles.years}>
          {years.map((y) => (
            <span key={y} className={styles.year}>
              {y}
            </span>
          ))}
        </div>

        {/* 👇 전체 항목 목록 (history.js 원본 그대로 출력) */}
        <div className={styles.list}>
          {raw.map((item, idx) => (
            <div key={idx} className={styles.listItem}>
              <div className={styles.listTitle}>{item.title}</div>
              <div className={styles.listMeta}>
                {item.start} ~ {item.end ?? "now"}
              </div>
              {item.description && (
                <div className={styles.listDesc}>{item.description}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
