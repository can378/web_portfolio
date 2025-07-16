const stickerArray = [
    {
        id: 1,
        name: "스티커 1",
        text: "스티커 1 기본 텍스트입니다.",
        editable: true,
        folder: "바탕화면",
        icon: "/web_portfolio/assets/image/icons/sticky_icon.png",
    },
    {
        id: 2,
        name: "스티커 2",
        text: "스티커 2 기본 텍스트입니다.",
        editable: false,
        folder: "Documents",
        icon: "/web_portfolio/assets/image/icons/sticky_icon.png",
    },
];

const stickerMap = new Map(stickerArray.map((s) => [s.id, s]));

export default stickerMap;
