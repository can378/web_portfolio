import styles from "./Home.module.css";
import mainStyles from "./Main.module.css";
import defaultData from "../data/default";

export default function Main() {
    return (
        <section id="home" className={styles.section}>
            <div className={mainStyles.centerContent}>
                <h1>{defaultData.title}</h1>
                <p>{defaultData.description}</p>
            </div>
        </section>
    );
}
