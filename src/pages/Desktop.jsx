import iconMap from "../data/IconData";
import Icon from "../components/Icon";
import Taskbar from "../components/Taskbar";
import styles from "./Desktop.module.css";
import AssistantDog from "../components/AssistantDog";
import { useState } from "react";

export default function Desktop() {
    const [openWindows, setOpenWindows] = useState([]);
    const [zCounter, setZCounter] = useState(1); // ✅ zIndex 카운터

    const openWindow = (id) => {
        const icon = iconMap.get(id);
        if (!icon) return;

        if (icon.type === "link" && icon.url) {
            window.open(icon.url, "_blank");
            return;
        }

        if (icon.type === "pdf" && icon.filepath) {
            const link = document.createElement("a");
            link.href = icon.filepath;
            link.download = "yunji_cv.pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            return;
        }

        const existing = openWindows.find((w) => w.id === id);
        if (existing) {
            // 이미 열려있으면 최소화된 상태 복원
            if (!existing.isVisible) {
                bringToFront(id);
                setOpenWindows(openWindows.map((w) =>
                    w.id === id ? { ...w, isVisible: true } : w
                ));
            } else {
                bringToFront(id);
            }
            return;
        }

        // 새 창 열기
        setOpenWindows([
            ...openWindows,
            { id, type: icon.type, isVisible: true, zIndex: zCounter, title:icon.name }
        ]);
        setZCounter(zCounter + 1);
    };

    const bringToFront = (id) => {
        setOpenWindows(openWindows.map((w) =>
            w.id === id ? { ...w, zIndex: zCounter } : w
        ));
        setZCounter(zCounter + 1);
    };

    const closeWindow = (id) => {
        setOpenWindows(openWindows.filter((w) => w.id !== id));
    };

    const minimizeWindow = (id) => {
        setOpenWindows(openWindows.map((w) =>
            w.id === id ? { ...w, isVisible: false } : w
        ));
    };

    const toggleWindow = (id) => {
        const win = openWindows.find((w) => w.id === id);
        if (!win) return;

        if (!win.isVisible) {
            // 최소화된 창 복원 + 맨 앞으로
            setOpenWindows(openWindows.map((w) =>
                w.id === id ? { ...w, isVisible: true, zIndex: zCounter } : w
            ));
            setZCounter(zCounter + 1);
        } else {
            // 이미 열려있으면 최소화
            setOpenWindows(openWindows.map((w) =>
                w.id === id ? { ...w, isVisible: false } : w
            ));
        }
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

                {/* 열린 창들 */}
                {openWindows.map(({ id, isVisible, zIndex }) => {
                    const icon = iconMap.get(id);
                    if (!icon?.component || !isVisible) return null;

                    const Component = icon.component;

                    return (
                        <div
                            key={id}
                            style={{ position: "absolute", zIndex }}
                            onMouseDown={() => bringToFront(id)} // ✅ 클릭 시 맨 앞으로
                        >
                            <Component
                                {...icon.props}
                                onClose={() => closeWindow(id)}
                                onMinimize={() => minimizeWindow(id)}
                                onOpen={openWindow}
                            />
                        </div>
                    );
                })}
            </div>
            
            {/* Assistant AI Agent Dog */}
            <AssistantDog status="sitting" />


            {/* 작업표시줄 */}
            <Taskbar
                openWindows={openWindows}
                toggleWindow={toggleWindow}
            />
        </div>
    );
}
