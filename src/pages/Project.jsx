import { useState, useMemo } from "react";
import ModalWindow from "../components/ModalWindow";
import styles from "./Project.module.css";
import projects from "../data/projects";
import ReactMarkdown from "react-markdown";

export default function Project({ title, onClose, onMinimize }) {
  const [selectedProject, setSelectedProject] = useState(null);

  // 오른쪽 영역 제목
  const rightTitle = useMemo(() => {
    if (!selectedProject) return `Contents of 'Archives'`;
    return `Contents of '${selectedProject.title}'`;
  }, [selectedProject]);

  // 왼쪽 트리 항목 클릭
  const selectNone = () => setSelectedProject(null);
  const selectProject = (p) => setSelectedProject(p);

  return (
    <ModalWindow
      title={title}
      onClose={onClose}
      defaultPosition={{ x: 150, y: 200 }}
      defaultSize={{ width: 800, height: 520 }}
      onMinimize={onMinimize}
    >
        <div className={styles.container}>
        {/* ===== 상단 헤더 ===== */}
        <div className={styles.topHeader}>
            <div className={styles.menuBar}>
            <span>File</span>
            <span>Edit</span>
            <span>View</span>
            <span>Tools</span>
            <span>Help</span>
            </div>
            <div className={styles.pathBar}>
            <span className={styles.pathLabel}>Address:</span>
            <span className={styles.pathValue}>
                Desktop ▸ Archives{selectedProject ? ` ▸ ${selectedProject.title}` : ""}
            </span>
            </div>
        </div>

        {/* ===== 본문 (좌측 트리 / 우측 콘텐츠) ===== */}
        <div className={styles.bodyArea}>
            {/* 좌측 트리 */}
            <aside className={styles.sidebar}>
            <div className={styles.treeHeader}>All Folders</div>
            <ul className={styles.tree}>
                <li className={styles.treeItem}>
                <button
                    className={`${styles.treeBtn} ${!selectedProject ? styles.active : ""}`}
                    onClick={selectNone}
                    title="Open Archives"
                >
                    <span className={styles.iconFolder} aria-hidden />
                    <span className={styles.treeText}>Archives</span>
                </button>

                <ul className={styles.treeChildren}>
                    {projects.map((p, i) => (
                    <li key={i} className={styles.treeItem}>
                        <button
                        className={`${styles.treeBtn} ${
                            selectedProject?.title === p.title ? styles.active : ""
                        }`}
                        onClick={() => selectProject(p)}
                        title={p.title}
                        >
                        <span className={styles.iconFile} aria-hidden />
                        <span className={styles.treeText}>{p.title}</span>
                        </button>
                    </li>
                    ))}
                </ul>
                </li>
            </ul>
            </aside>

            {/* 우측 콘텐츠 */}
            <section className={styles.rightPane}>
            <div className={styles.rightHeader}>
                <div className={styles.rightHeaderTitle}>
                {selectedProject ? `Contents of '${selectedProject.title}'` : `Contents of 'Archives'`}
                </div>
                <div className={styles.breadcrumb}>
                Desktop ▸ Archives{selectedProject ? ` ▸ ${selectedProject.title}` : ""}
                </div>
            </div>

            {/* 목록 화면 */}
            {!selectedProject && (
                <>
                <h1 className={styles.explorerTitle}>Archives</h1>
                <div className={styles.grid}>
                    {projects.map((project, idx) => (
                    <button
                        key={idx}
                        className={styles.gridItem}
                        onClick={() => selectProject(project)}
                        title={project.title}
                    >
                        <img
                        src={project.icon || "/icons/doc.png"}
                        alt=""
                        className={styles.gridIcon}
                        />
                        <span className={styles.gridLabel}>{project.title}</span>
                    </button>
                    ))}
                </div>
                </>
            )}

            {/* 상세 화면 */}
            {selectedProject && (
                <div className={styles.detailWrap}>
                <div className={styles.detailHeader}>
                    <img
                    src={selectedProject.icon || "/icons/doc.png"}
                    alt=""
                    className={styles.detailIcon}
                    />
                    <h2 className={styles.detailTitle}>{selectedProject.title}</h2>
                    <button className={styles.backBtn} onClick={selectNone}>
                    ◀ Back
                    </button>
                </div>

                <div className={styles.detailBody}>
                    <div className={styles.detailDescription}>
                    <ReactMarkdown>{selectedProject.description || ""}</ReactMarkdown>
                    </div>
                </div>
                </div>
            )}
            </section>
        </div>

        {/* ===== 하단 푸터 ===== */}
        <div className={styles.footer}>
            <span>{selectedProject ? `${selectedProject.title} opened` : "Ready"}</span>
            <span className={styles.footerRight}>
            {selectedProject ? "Details" : `${projects.length} items`}
            </span>
        </div>
        </div>

    </ModalWindow>
  );
}
