import iconMap from "../data/IconData";
import ModalWindow from "./ModalWindow";
import Icon from "./Icon";
import ImageViewer from "./Image";
import { useState } from "react";

export default function FolderWindow({ folderId, onClose, onOpen }) {
    const folder = iconMap.get(folderId);
    if (!folder) return null;

    const [openWindows, setOpenWindows] = useState([]);

    const openWindow = (childId) => {
        const child = iconMap.get(childId);
        if (!child) return;

        if (child.type === "link" && child.url) {
            window.open(child.url, "_blank");
            return;
        }

        if (!openWindows.includes(childId)) {
            setOpenWindows([...openWindows, childId]);
        }
    };

    const closeWindow = (childId) => {
        setOpenWindows(openWindows.filter((id) => id !== childId));
    };

    return (
        <>
            <ModalWindow title={folder.name} onClose={onClose}>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    {folder.childIds?.map((childId) => {
                        const child = iconMap.get(childId);
                        if (!child) return null;

                        return (
                            <Icon
                                key={child.id}
                                icon={child.icon}
                                label={child.name}
                                onClick={() => openWindow(child.id)}
                                fixed={true}
                            />
                        );
                    })}
                </div>
            </ModalWindow>

            {/* 열린 창들 렌더링 */}
            {openWindows.map((childId) => {
                const child = iconMap.get(childId);
                if (!child?.component) return null;

                const Component = child.component;

                return (
                    <Component
                        key={child.id}
                        {...child.props}
                        onClose={() => closeWindow(child.id)}
                        onOpen={onOpen} // 상위에 열기 요청 전달
                    />
                );
            })}
        </>
    );
}
