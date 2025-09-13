import { useState, useMemo, useRef, useEffect } from "react";
import ModalWindow from "../components/ModalWindow";
import styles from "./Project.module.css";
import projects from "../data/projects";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export default function Project({ title, onClose, onMinimize }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

    // 오른쪽 영역 제목
    const rightTitle = useMemo(() => {
        if (!selectedType && !selectedProject) return `Contents of 'Archives'`;
        if (selectedType && !selectedProject) return `Contents of '${selectedType}'`;
        return `Contents of '${selectedProject.title}'`;
    }, [selectedType, selectedProject]);

    // Breadcrumb (경로) 통일
    const breadcrumb = useMemo(() => {
        const parts = ["Desktop", "Archives"];
        if (selectedType) parts.push(selectedType);
        if (selectedProject) parts.push(selectedProject.title);
        return parts.join(" ▸ ");
    }, [selectedType, selectedProject]);


  
  const descRef = useRef(null);

// 프로젝트가 바뀔 때 description 스크롤을 맨 위로
useEffect(() => {
  if (descRef.current) {
    // 즉시 초기화
    descRef.current.scrollTop = 0;
    // 또는 부드럽게
    // descRef.current.scrollTo({ top: 0, behavior: "auto" });
  }
}, [selectedProject]);



  //type별 groupy화
  const groupedByType = useMemo(() => {
    const map = new Map();
    for (const p of projects) {
        const t = (p.type && String(p.type).trim()) || "Uncategorized";
        if (!map.has(t)) map.set(t, []);
        map.get(t).push(p);
    }
    return Array.from(map.entries())
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([type, arr]) => [type, arr.sort((x, y) => x.title.localeCompare(y.title))]);
  }, []);

  const gridItems = useMemo(() => {
    if (selectedProject) return [];
    if (selectedType) {
        const found = groupedByType.find(([t]) => t === selectedType);
        return found ? found[1] : [];
    }
    return groupedByType.map(([type, arr]) => ({
        _isTypeFolder: true,
        type,
        count: arr.length,
        icon: "/web_portfolio/assets/image/icons/folder_icon_mini.svg",
        title: type,
    }));
  }, [selectedType, selectedProject, groupedByType]);

  // 왼쪽 트리 항목 클릭
  const selectNone = () => {
    setSelectedType(null);
    setSelectedProject(null);
  };
    const selectType = (type) => {
    setSelectedType(type);
    setSelectedProject(null);
  };
    const selectProject = (p) => {
    setSelectedType(p.type || "Uncategorized");
    setSelectedProject(p);
  };

  // 한 단계 위로 이동
  const goUp = () => {
    if (selectedProject) {
        // 프로젝트 상세 → 타입 폴더
        setSelectedProject(null);
    } else if (selectedType) {
        // 타입 폴더 → 전체(Archives)
        setSelectedType(null);
    }
  };


  return (
    <ModalWindow
      title={title}
      onClose={onClose}
      defaultPosition={{ x: 150, y: 600 }}
      defaultSize={{ width: 800, height: 530 }}
      onMinimize={onMinimize}
    >
        <div className={styles.container}>
             
        {/* ===== 상단 header ===== */}
        {/*
        <div className={styles.topHeader}>
            <div className={styles.menuBar}>
            <span>File</span>
            <span>Edit</span>
            <span>View</span>
            <span>Tools</span>
            <span>Help</span>
            </div>
            <div className={styles.pathBar}>
              <span className={styles.pathLabel}>Address</span>
              <span className={styles.pathValue}>{breadcrumb}</span>
            </div>
        </div>
            */}
        {/* ===== 본문 (좌측 트리 / 우측 콘텐츠) ===== */}
        <div className={styles.bodyArea}>
            {/* 좌측 트리 */}
            <aside className={styles.sidebar}>
            <div className={styles.treeHeader}>All Folders</div>
            <ul className={styles.tree}>
                <li className={styles.treeItem}>
                    <button
                        className={`${styles.treeBtn} ${(selectedType === null && selectedProject === null) ? styles.active : ""}`}
                        onClick={selectNone}
                        title="Open Archives"
                    >
                        <span  aria-hidden />
                        <span className={styles.treeText}>Archives</span>
                    </button>
                    {/* folder, project list */}
                    <ul className={styles.treeChildren}>
                        {groupedByType.map(([type, arr]) => (
                            <li key={type} className={styles.treeItem}>

                                {/* group folder=========================== */}
                                <button
                                    className={`${styles.treeBtn} ${selectedType === type && !selectedProject ? styles.active : ""}`}
                                    onClick={() => selectType(type)}
                                >
                                    <span className={styles.treeText}>
                                        {type} <span className={styles.countMuted}>({arr.length})</span>
                                    </span>
                                </button>
                                {/* projects================================== */}
                                <ul className={styles.treeChildren}>
                                    {arr.map((p) => (
                                    <li key={`${type}-${p.title}`} className={styles.treeItem}>
                                        <button
                                        className={`${styles.treeBtn} ${selectedProject?.title === p.title ? styles.active : ""}`}
                                        onClick={() => selectProject(p)}
                                        >
                                            <span className={styles.iconFile} aria-hidden />
                                            <span className={styles.treeText}>{p.title}</span>
                                        </button>
                                    </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </li>
            </ul>
            </aside>

            {/* 우측 콘텐츠 */}
            <section className={styles.rightPane}>
            <div className={styles.rightHeader}>
                <div className={styles.leftBlock}>
                    <div className={styles.rightHeaderTitle}>{rightTitle}</div>
                    <div className={styles.breadcrumb}>{breadcrumb}</div>
                </div>
                {(selectedType || selectedProject) && (
                    <button className={styles.backBtn} onClick={goUp}>
                        ◀ {selectedProject ? "List" : "All"}
                    </button>
                )}
            </div>


            {/* 총 목록 화면 */}
            {!selectedProject && (
                <div className={styles.grid}>
                    {gridItems.map((item, idx) =>
                    item._isTypeFolder ? (
                        <button
                        key={idx}
                        className={styles.gridItem}
                        onClick={() => selectType(item.type)}
                        title={item.title}
                        >
                        <img src={item.icon} className={styles.gridIcon} alt="" />
                        <span className={styles.gridLabel}>
                            {item.title} <span className={styles.countMuted}>({item.count})</span>
                        </span>
                        </button>
                    ) : (
                        <button
                        key={idx}
                        className={styles.gridItem}
                        onClick={() => selectProject(item)}
                        title={item.title}
                        >
                        <img src={item.icon || "/icons/doc.png"} className={styles.gridIcon} alt="" />
                        <span className={styles.gridLabel}>{item.title}</span>
                        </button>
                    )
                    )}
                </div>
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

                </div>
                {/* project description */}
                <div className={styles.detailBody}>
                    <div className={styles.detailDescription} ref={descRef}>
                        <div className={styles.markdown}>
                            <ReactMarkdown
                                key={selectedProject?.title}
                                rehypePlugins={[rehypeRaw]}
                                components={{
                                    img: ({ ...props }) => (
                                    <img
                                        {...props}
                                        style={{
                                        maxWidth: "100%",
                                        height: "auto",
                                        display: "block",
                                        margin: "12px 0",
                                        }}
                                    />
                                    ),
                                    iframe: ({ ...props }) => (
                                    <div className={styles.iframeWrap}>
                                        <iframe
                                        {...props}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                        style={{ border: 0 }}
                                        />
                                    </div>
                                    ),
                                }}
                                >
                                {selectedProject.description || ""}
                            </ReactMarkdown>
                        </div>
                    </div>
                </div>
                </div>
            )}
            </section>
        </div>

        {/* ===== 하단 footer ===== */}
        <div className={styles.footer}>
            <span>{selectedProject ? `${selectedProject.title} opened` : "Ready"}</span>
            <span className={styles.footerRight}>
            {selectedProject ? "Details" : `${projects.length} projects`}
            </span>
        </div>
        </div>

    </ModalWindow>
  );
}
