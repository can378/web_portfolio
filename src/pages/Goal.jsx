import homeStyles from "./Home.module.css";
import goalStyles from "./Goal.module.css";

export default function Goal() {
    return (
        <section id="goal" className={homeStyles.section}>
            <div className={goalStyles.goalContainer}>
                <h1 className={goalStyles.title}>My Goals</h1>
                <ul className={goalStyles.goalList}>
                    <li>
                        <span className={goalStyles.goalNumber}>1.</span>
                        기본적인 AI 지식을 바탕으로 실제 백엔드 서비스에 통합할 수 있는 개발자
                    </li>
                    <li>
                        <span className={goalStyles.goalNumber}>2.</span>
                        프로젝트 참여 시 불필요한 세팅 시간을 감축하기 위해 해당 과정을 잘 정리하고 전달하는 개발자
                    </li>
                    <li>
                        <span className={goalStyles.goalNumber}>3.</span>
                        5년 뒤 PL로서 작업을 지시할 때 필요한 일을 정확하고 상세히 정리하여 전달하는 개발자
                    </li>
                    <li>
                        <span className={goalStyles.goalNumber}>4.</span>
                        고객사의 요청 사항을 잘 뽑아낼 수 있는 개발자
                    </li>
                    <li>
                        <span className={goalStyles.goalNumber}>5.</span>
                        담당한 도메인에 대해 잘 알고 있는 개발자
                    </li>
                </ul>
            </div>
        </section>
    );
}
