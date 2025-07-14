import homeStyles from "./Home.module.css";
import introStyles from "./Introduction.module.css";
import skillData from "../data/skillset"; // 데이터 import

export default function Introduction() {
    return (
        <section id="introduction" className={homeStyles.section}>
            <div>
                <h1>Introduction</h1>
                <p><strong>Yunji Heo</strong></p>

                <h2>Skillset</h2>
                <div className={introStyles.skillset}>
                    {/* 언어 */}
                    <h3>Languages</h3>
                    {skillData.skillsetData.language.map((lang, index) => (
                        <div key={index} className={introStyles.skillCard}>
                            <h4>{lang.name} (Level {lang.level}/5)</h4>
                            <p>{lang.description}</p>
                        </div>
                    ))}

                    {/* 프레임워크 */}
                    <h3>Frameworks & Tools</h3>
                    {skillData.skillsetData.framework.map((fw, index) => (
                        <div key={index} className={introStyles.skillCard}>
                            <h4>{fw.name} (Level {fw.level}/5)</h4>
                            <p>{fw.description}</p>
                        </div>
                    ))}
                </div>

                <h2>Education</h2>
                <div className={introStyles.education}>
                    <p>⚡ [학교 이름] — 학사, [전공 이름] (20XX~20XX)</p>
                    <p>⚡ 교환학생 경험 및 연구활동: 독일, CV 연구실 인턴 등</p>
                </div>
            </div>
        </section>
    );
}
