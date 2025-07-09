import styles from './Sidebar.module.css';

function Sidebar(){
    const scrollToSection=(id)=>{
        document.getElementById(id).scrollIntoView({behavior:"smooth"});

    };

    return(
        <div>
            <button onClick={()=>scrollToSection("about")}>About</button>
            <button onClick={()=>scrollToSection("projects")}>projects</button>
            <button onClick={()=>scrollToSection("contact")}>contact</button>
        </div>
    )
}
export default Sidebar;
