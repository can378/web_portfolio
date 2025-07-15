import Icon from "../components/Icon";
import styles from "./Main.module.css";
import Taskbar from "../components/TaskBar";
import ModalWindow from "../components/ModalWindow";
import { useRef } from "react";
import { useState } from "react";

export default function Main() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const desktopRef = useRef(null); // 바탕화면 영역 참조

    const openFolderWindow = () => {
        console.log("폴더 열림!");
    };

    return (
        <div className={styles.desktop} ref={desktopRef}>
            {/* 아이콘들 */}
            <div className={styles.desktopIcons}>
                <Icon
                    icon={"/web_portfolio/assets/image/icons/folder_icon.png"}
                    label="Projects"
                    onClick={openModal}
                />
                <Icon
                    icon={"/web_portfolio/assets/image/icons/trash_icon.png"}
                    label="Recycle Bin"
                    onClick={() => alert("휴지통 클릭!")}
                />
            </div>

            {isModalOpen && (
                <ModalWindow title="Projects" onClose={closeModal} />
            )}

            {/* 작업표시줄 */}
            <Taskbar />
        </div>
    );
}
