// Certification.jsx
import React from "react";
import styles from "./Certification.module.css";
import certData from "../data/certifications.js";

export default function Certification({ title = "자격증 / 어학" }) {
  const { certificationData } = certData;

  return (
    <div className={styles.window}>
      <div className={styles.body}>


        {Object.entries(certificationData).map(([category, items]) => (
          <div key={category} className={styles.section}>
            <h3 className={styles.sectionTitle}>
              {category === "computer" ? "컴퓨터 관련" : "어학"}
            </h3>
            <div className={styles.list}>
              {items.map((item, idx) => (
                <div key={idx} className={styles.item}>
                  <div className={styles.itemName}>{item.name}</div>
                  {item.score && (
                    <div className={styles.itemScore}>점수: {item.score}</div>
                  )}
                  <div className={styles.itemDate}>{item.date}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
