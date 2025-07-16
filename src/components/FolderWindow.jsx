import folderMap from "../iconData/folder";
import memoMap from "../iconData/memo";
import ModalWindow from "./ModalWindow";
import Icon from "./Icon";

export default function FolderWindow({ folderId, onClose, onOpenMemo }) {
    const folder = folderMap.get(folderId);
    if (!folder) return null;

    return (
        <ModalWindow title={folder.name} onClose={onClose}>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {folder.memoIds.map((memoId) => {
                    const memo = memoMap.get(memoId);
                    if (!memo) return null;
                    return (
                        <Icon
                            key={memo.id}
                            icon={memo.icon}
                            label={memo.name}
                            onClick={() => onOpenMemo(memo.id)} // 📢 부모로 메모 열기 요청
                        />
                    );
                })}
            </div>
        </ModalWindow>
    );
}
