import { useState } from "react";
import styles from "./Main.module.css";
import projects from "../data/projects";
import projectStyles from "./Project.module.css";
import ProjectModal from "../components/ProjectModal";

export default function Project() {
  const [selectedProject, setSelectedProject] = useState(null);

  const openModal = (project) => setSelectedProject(project);
  const closeModal = () => setSelectedProject(null);

  return (
    <section id="projects" className={styles.section}>
      <h1 className={styles.heading}>Project</h1>
      <div className={projectStyles.projectList}>
        {projects.map((project, index) => (
          <div
            key={index}
            className={projectStyles.projectCard}
            onClick={() => openModal(project)} // 클릭 시 모달 열기
          >
            <img
              src={project.image}
              alt={project.title}
              className={projectStyles.projectImg}
            />
            <div className={projectStyles.projectContent}>
              <h2>{project.title}</h2>
              <p>{project.short_description}</p>
              <p className={projectStyles.tech}>
                <strong>Tech:</strong> {project.technologies.join(", ")}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 모달 */}
      <ProjectModal project={selectedProject} onClose={closeModal} />
    </section>
  );
}
