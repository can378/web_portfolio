import styles from "./Home.module.css";
import defaultData from "../data/default";

export default function Main() {
    return (
        <section id="home" className={styles.section}>
            <h1>defaultData.title</h1>
            <p>defaultData.description</p>
        </section>
    );
}
