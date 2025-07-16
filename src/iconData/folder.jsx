const folderArray = [
    {
        id: "projects",
        name: "Projects",
        icon: "/web_portfolio/assets/image/icons/folder_icon.png",
        memoIds: [1, 2], // 이 폴더 안의 메모 ID
    },
    {
        id: "documents",
        name: "Documents",
        icon: "/web_portfolio/assets/image/icons/folder_icon.png",
        memoIds: [3], // 다른 메모들
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
