import ReactMarkdown from "react-markdown";

import projectStyles from "./ProjectModal.module.css";

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className={projectStyles.modalOverlay} onClick={onClose}>
      <div
        className={projectStyles.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={projectStyles.closeButton}
          onClick={onClose}
        >
          &times;
        </button>
        <h2>{project.title}</h2>
        <div className={projectStyles.modalDescription}>
          <ReactMarkdown>{project.description || ""}</ReactMarkdown>
        </div>

      </div>
    </div>
  );
}
