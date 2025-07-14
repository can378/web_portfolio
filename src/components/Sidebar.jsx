import styles from './Sidebar.module.css';

function Sidebar(){
    const scrollToSection=(id)=>{
        document.getElementById(id).scrollIntoView({behavior:"smooth"});

    };

    return(
        <div className={styles.sidebar}>
            <button onClick={()=>scrollToSection("home")}>Home</button>
            <button onClick={()=>scrollToSection("introduction")}>Introduction</button>
            <button onClick={()=>scrollToSection("goal")}>Goal</button>
            <button onClick={()=>scrollToSection("history")}>history</button>
            <button onClick={()=>scrollToSection("projects")}>projects</button>
            <button onClick={()=>scrollToSection("contact")}>contact</button>
        </div>
    )
}
export default Sidebar;
