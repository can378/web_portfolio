import memoMap from "../iconData/memo";
import folderMap from "../iconData/folder";
import Icon from "../components/Icon";
import FolderWindow from "../components/FolderWindow";
import Memo from "../components/Memo";
import stickerMap from "../iconData/sticky";
import Sticky from "../components/Sticky";
import Taskbar from "../components/TaskBar";
import styles from "./Main.module.css";
import { useState } from "react";

export default function Main() {
    const [openFolders, setOpenFolders] = useState([]);
    const [openMemos, setOpenMemos] = useState([]);
    const [openStickies, setOpenStickies] = useState([]);

    const openFolder = (folderId) => {
        if (!openFolders.includes(folderId)) {
            setOpenFolders([...openFolders, folderId]);
        }
    };

    const closeFolder = (folderId) => {
        setOpenFolders(openFolders.filter((id) => id !== folderId));
    };

    const openMemo = (memoId) => {
        if (!openMemos.includes(memoId)) {
            setOpenMemos([...openMemos, memoId]);
        }
    };

    const closeMemo = (memoId) => {
        setOpenMemos(openMemos.filter((id) => id !== memoId));
    };

    const openSticker = (stickerId) => {
    if (!openStickies.includes(stickerId)) {
        setOpenStickies([...openStickies, stickerId]);
        }
    };

    const closeSticker = (stickerId) => {
        setOpenStickies(openStickies.filter((id) => id !== stickerId));
    };


    return (
        <div className={styles.desktopContainer}>
            {/* 바탕화면 */}
            <div className={styles.desktop}>
                {/* 👇 아이콘 전용 영역 */}
                <div className={styles.desktopIcons}>
                    {[...folderMap.values()].map((folder) => (
                        <Icon
                            key={folder.id}
                            icon={folder.icon}
                            label={folder.name}
                            onClick={() => openFolder(folder.id)}
                        />
                    ))}

                    {[...memoMap.values()]
                        .filter((memo) => memo.folder === "바탕화면")
                        .map((memo) => (
                            <Icon
                                key={memo.id}
                                icon={memo.icon}
                                label={memo.name}
                                onClick={() => openMemo(memo.id)}
                            />
                        ))}
                    {/* 바탕화면 스티커 아이콘 */}
                    {[...stickerMap.values()]
                        .filter((sticky) => sticky.folder === "바탕화면")
                        .map((sticky) => (
                            <Icon
                                key={sticky.id}
                                icon={sticky.icon}
                                label={sticky.name}
                                onClick={() => openSticker(sticky.id)}
                            />
                        ))}

                </div>

                {/* 👇 열린 폴더/메모들은 배경 위에 띄움 */}
                {openFolders.map((folderId) => (
                    <FolderWindow
                        key={folderId}
                        folderId={folderId}
                        onClose={() => closeFolder(folderId)}
                        onOpenMemo={openMemo}
                    />
                ))}

                {openMemos.map((memoId) => {
                    const memo = memoMap.get(memoId);
                    return (
                        <Memo
                            key={memo.id}
                            title={memo.name}
                            initialText={memo.text}
                            editable={memo.editable}
                            onClose={() => closeMemo(memo.id)}
                        />
                    );
                })}

                {/* 열린 스티커들 */}
                {openStickies.map((stickerId) => {
                    const sticky = stickerMap.get(stickerId);
                    return (
                        <Sticky
                            key={sticky.id}
                            title={sticky.name}
                            initialText={sticky.text}
                            editable={sticky.editable}
                            onClose={() => closeSticker(sticky.id)}
                        />
                    );
                })}
            </div>

            {/* Taskbar */}
            <Taskbar
                openFolders={openFolders}
                openMemos={openMemos}
                openStickies={openStickies} 
            />
        </div>
    );
}
