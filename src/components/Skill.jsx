import React from "react";
import styles from "./Skill.module.css";
import skillset from "../data/skillset.js";

function Meter({ level = 0, max = 5 }) {
  const lv = Math.max(0, Math.min(max, level));
  const filled = "■".repeat(lv);
  const empty = "□".repeat(max - lv);
  return (
    <span className={styles.meter} aria-label={`숙련도 ${lv} / ${max}`}>
      {filled}
      {empty}
    </span>
  );
}

export default function Skillset({ title = "Skillset" }) {
  const { skillsetData } = skillset;
  if (!skillsetData) return null;

  const sections = [
    { key: "language", label: "언어" },
    { key: "framework", label: "프레임워크 / 도구" },
  ];

  return (
    <div className={styles.window}>
      <div className={styles.body}>

        {sections.map(({ key, label }) => {
          const items = skillsetData[key] || [];
          if (!items.length) return null;

          return (
            <section key={key} className={styles.section}>
              <h3 className={styles.sectionTitle}>{label}</h3>
              <div className={styles.list}>
                {items.map((it, idx) => (
                  <div key={idx} className={styles.item}>
                    <div className={styles.rowTop}>
                      <div className={styles.name}>{it.name}</div>
                      <Meter level={it.level} />
                    </div>
                    {it.description && (
                      <div className={styles.desc}>{it.description}</div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
