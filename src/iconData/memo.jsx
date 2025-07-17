const memoArray = [
    {
        id: 1,
        name: "메모 1",
        text: "메모 1의 기본 텍스트입니다.",
        editable: true,
        folder: "",
        icon: "/web_portfolio/assets/image/icons/memo_icon.png",
        fixed:true
    },
    {
        id: 2,
        name: "메모 2",
        text: "메모 2의 기본 텍스트입니다.",
        editable: false,
        folder: "Projects",
        icon: "/web_portfolio/assets/image/icons/memo_icon.png",
        fixed:true
    },
    {
        id: 3,
        name: "메모 3",
        text: "메모 3의 기본 텍스트입니다.",
        editable: true,
        folder: "Documents",
        icon: "/web_portfolio/assets/image/icons/memo_icon.png",
        fixed:true
    },
    {
        id: 4,
        name: "Hobby",
        text: "1. 식물 키우기 2. 피겨스케이트",
        editable: true,
        folder: "Trashbin",
        icon: "/web_portfolio/assets/image/icons/memo_icon.png",
        fixed:true
    },
    {
        id: 5,
        name: "Bucket List",
        text: "bucket list 1 2 3 4",
        editable: true,
        folder: "Trashbin",
        icon: "/web_portfolio/assets/image/icons/memo_icon.png",
        fixed:true
    },
];

// 배열 → Map 변환
const memoMap = new Map(memoArray.map((m) => [m.id, m]));

export default memoMap;
