const stickerArray = [
    {
        id: 1,
        name: "스티커 1",
        text: `
Goal 

1. 기본적인 AI지식을 바탕으로 실제 백엔드 서비스에 통합할 수 있는 개발자

2. 프로젝트 참여시 불필요한 세팅 시간을 감축하기 위해 해당 과정을 잘 정리하고 전달하는 개발자

3. 5년 뒤 PL으로서 작업을 지시할 때 필요한 일을 정확하고 상세히 정리하여 전달하는 개발자

4. 고객사의 요청 사항을 잘 뽑아낼 수 있는 개발자

5. 담당한 도메인에 대해 잘 알고 있는 개발자

6. 지독한 개발자

7. 끝까지 최적화
 `,
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
        fixed:true
    },
];

const stickerMap = new Map(stickerArray.map((s) => [s.id, s]));

export default stickerMap;
