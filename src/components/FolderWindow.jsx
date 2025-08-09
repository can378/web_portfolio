import iconMap from "../data/IconData";
import ModalWindow from "./ModalWindow";
import Icon from "./Icon";

export default function FolderWindow({
    folderId,
    iconSrc,
    onClose,
    onOpen, // 부모 Desktop의 openWindow를 받음
    defaultPosition,
    defaultSize,
    onMinimize
}) {
    const folder = iconMap.get(folderId);
    if (!folder) return null;

    return (
        <ModalWindow
            title={folder.name}
            iconSrc={iconSrc}
            onClose={onClose}
            onMinimize={onMinimize}
            defaultPosition={defaultPosition}
            defaultSize={defaultSize}
        >
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {folder.childIds?.map((childId) => {
                    const child = iconMap.get(childId);
                    if (!child) return null;

                    return (
                        <Icon
                            key={child.id}
                            icon={child.icon}
                            label={child.name}
                            onClick={() => onOpen(child.id)}
                            fixed={true}
                        />
                    );
                })}
            </div>
        </ModalWindow>
    );
}
