const memoArray = [
    {
        id: 1,
        name: "메모 1",
        text: "메모 1의 기본 텍스트입니다.",
        editable: true,
        folder: "바탕화면",
        icon: "/web_portfolio/assets/image/icons/memo_icon.png",
    },
    {
        id: 2,
        name: "메모 2",
        text: "메모 2의 기본 텍스트입니다.",
        editable: false,
        folder: "Projects",
        icon: "/web_portfolio/assets/image/icons/memo_icon.png",
    },
    {
        id: 3,
        name: "메모 3",
        text: "메모 3의 기본 텍스트입니다.",
        editable: true,
        folder: "Documents",
        icon: "/web_portfolio/assets/image/icons/memo_icon.png",
    },
];

// 배열 → Map 변환
const memoMap = new Map(memoArray.map((m) => [m.id, m]));

export default memoMap;
