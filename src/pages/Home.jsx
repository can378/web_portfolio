import styles from "./Home.module.css"

export default function Home(){
    return(
        <div>
            <section id="about" className={styles.section}>
                <h1>Me</h1>
                <p>hello its me</p>
            </section>


            <section id="projects" className={styles.section}>
                <h1>projects</h1>
                <p>lists</p>
            </section>

            <section id="contact" className={styles.section}>
                <h1>contact</h1>
                <p>lists</p>
            </section>
        </div>
    )
}
