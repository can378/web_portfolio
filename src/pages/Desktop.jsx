import iconMap from "../data/IconData";
import Icon from "../components/Icon";
import Taskbar from "../components/TaskBar";
import styles from "./Desktop.module.css";
import { useState } from "react";

export default function Desktop() {
    // 열린 창들을 하나의 배열로 관리 (id, type 정보만 저장)
    const [openWindows, setOpenWindows] = useState([]);

    const openWindow = (id) => {
        const icon = iconMap.get(id);
        if (!icon) return;

        if (icon.type === "link" && icon.url) {
            window.open(icon.url, "_blank");
            return;
        }

        if(icon.type==="pdf"&&icon.filepath){
            const link = document.createElement("a");
            link.href = icon.filepath;
            link.download = "yunji_cv.pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        if (!openWindows.find((w) => w.id === id)) {
            setOpenWindows([...openWindows, { id, type: icon.type }]);
        }
    };

    const closeWindow = (id) => {
        setOpenWindows(openWindows.filter((w) => w.id !== id));
    };

    return (
        <div className={styles.desktopContainer}>
            <div className={styles.desktop}>
                {/* 바탕화면 아이콘 */}
                <div className={styles.desktopIcons}>
                    {[...iconMap.values()]
                    .filter((icon) => icon.path === "desktop")
                    .map((icon) => (
                        <Icon
                            key={icon.id}
                            icon={icon.icon}
                            label={icon.name}
                            onClick={() => openWindow(icon.id)}
                            fixed={icon.fixed}
                        />
                    ))}
                </div>

                {/* 열린 창들 렌더링 */}
                {openWindows.map(({ id }) => {
                    const icon = iconMap.get(id);
                    if (!icon?.component) return null;

                    const Component = icon.component;

                    return (
                        <Component
                            key={id}
                            {...icon.props}
                            onClose={() => closeWindow(id)}
                            onOpen={(childId) => openWindow(childId)} 
                            // 폴더 내부에서 열기 지원
                        />
                    );
                })}

            </div>

            {/* 작업표시줄 */}
            <Taskbar openWindows={openWindows} />
        </div>
    );
}
