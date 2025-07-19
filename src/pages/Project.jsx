import { useState } from "react";
import ModalWindow from "../components/ModalWindow";
import styles from "./Project.module.css";
import projects from "../data/projects";
import ReactMarkdown from "react-markdown";

export default function Project({ title, onClose,onMinimize }) {
    const [selectedProject, setSelectedProject] = useState(null); // 상세보기 상태

    return (
        <ModalWindow
            title={title}
            onClose={onClose}
            defaultPosition={{ x: 150, y: 200 }}
            defaultSize={{ width: 600, height: 500 }}
            onMinimize={onMinimize}
        >
            <div className={styles.container}>
                {/* 상세보기일 때 상단 고정 뒤로가기 */}
                {selectedProject && (
                    <div className={styles.fixedHeader}>
                        <button
                            className={styles.backButtonFixed}
                            onClick={() => setSelectedProject(null)}
                        >
                            ← 뒤로가기
                        </button>
                        <h2 className={styles.detailTitle}>{selectedProject.title}</h2>
                    </div>
                )}

                {/* Google 스타일 */}
                {!selectedProject && (
                    <h1 className={styles.giggle}>
                        <span className={styles.blue}>A</span>
                        <span className={styles.red}>r</span>
                        <span className={styles.yellow}>c</span>
                        <span className={styles.blue}>h</span>
                        <span className={styles.green}>i</span>
                        <span className={styles.red}>ves</span>
                    </h1>
                )}

                {/* ✅ 목록 화면 */}
                {!selectedProject && (
                    <div className={styles.projectGrid}>
                        {projects.map((project, index) => (
                            <div
                                key={index}
                                className={styles.projectItem}
                                onClick={() => setSelectedProject(project)} // ✅ 클릭 시 상세보기로
                            >
                                <img
                                    src={project.icon}
                                    alt={project.title}
                                    className={styles.projectIcon}
                                />
                                <p className={styles.projectTitle}>{project.title}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* ✅ 상세보기 화면 */}
                {selectedProject && (
                    <div className={styles.projectDetail}>
                        <img
                            src={selectedProject.image}
                            alt={selectedProject.title}
                            className={styles.detailImage}
                        />
                        {/* ✅ Markdown 렌더링 */}
                        <div className={styles.detailDescription}>
                            <ReactMarkdown>{selectedProject.description}</ReactMarkdown>
                        </div>
                    </div>
                )}
            </div>
        </ModalWindow>
    );
}
