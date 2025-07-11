import styles from "./Home.module.css";
import projects from "../data/projects";
import projectStyles from "./Project.module.css";

export default function Projects() {
  return (
    <section id="projects" className={styles.section}>
      <h1>Projects</h1>
      <div className="project-list">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <img src={project.image} alt={project.title} className={projectStyles.projectImg}/>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <p>Tech: {project.technologies.join(", ")}</p>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              View Project
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}


