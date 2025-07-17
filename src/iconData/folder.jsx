const folderArray = [
    {
        id: "projects",
        name: "Projects",
        icon: "/web_portfolio/assets/image/icons/folder_icon.png",
        memoIds: [1, 2], // 이 폴더 안의 메모 ID
        
    },
    {
        id: "trashbin",
        name: "Trash",
        icon: "/web_portfolio/assets/image/icons/trash_icon.png",
        memoIds: [4,5], // 다른 메모들
        imgIds:[1],
    },
    {
        id: "work",
        name: "Work",
        icon: "/web_portfolio/assets/image/icons/folder_icon.png",
        memoIds: [], // 비어있는 폴더
    },
];

// 배열 → Map 변환
const folderMap = new Map(folderArray.map((f) => [f.id, f]));

export default folderMap;
