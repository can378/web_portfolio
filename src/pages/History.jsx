import homeStyles from "./Main.module.css"; // section만 여기서
import historyStyles from "./History.module.css"; // 나머지 전용 스타일
import historyData from "../data/history"; // 데이터 import

export default function History() {
    return (
        <section id="history" className={homeStyles.section}>
            <div className={historyStyles.timeline}>
                <h1 className={historyStyles.title}>History</h1>
                {historyData.history.map((item, index) => (
                    <div key={index} className={historyStyles.timelineItem}>
                        <div className={historyStyles.timelineDot}></div>
                        <div className={historyStyles.timelineContent}>
                            <h3>{item.title}</h3>
                            <p className={historyStyles.dates}>
                                {item.start} ~ {item.end}
                            </p>
                            <p>{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
