import FolderWindow from "../components/FolderWindow";
import Memo from "../components/Memo";
import Sticky from "../components/Sticky";
import ImageViewer from "../components/Image";
import GameLibrary from "../pages/GameLibrary";

const iconArray = [
    // 📂 폴더
    {
        id: 100,
        type: "folder",
        name: "Projects",
        icon: "/web_portfolio/assets/image/icons/folder_icon.png",
        path: "desktop",
        component: FolderWindow,
        props: { folderId: 100 },
        childIds: [200, 201],
    },
    {
        id: 101,
        type: "folder",
        name: "Trash",
        icon: "/web_portfolio/assets/image/icons/trash_icon.png",
        path: "desktop",
        component: FolderWindow,
        props: { folderId: 101 },
        childIds: [203,204,400,1000],
    },
    {
        id: 102,
        type: "folder",
        name: "Work",
        icon: "/web_portfolio/assets/image/icons/folder_icon.png",
        path: "desktop",
        component: FolderWindow,
        props: { folderId: 102 },
        childIds: [200, 201],
    },

    // 📝 메모
    {
        id: 200,
        type: "memo",
        name: "메모 1",
        text: "메모 1의 기본 텍스트입니다.",
        editable: true,
        path: "desktop",
        icon: "/web_portfolio/assets/image/icons/memo_icon.png",
        fixed: true,
        component: Memo,
        props: { title: "메모 1", initialText: "메모 1의 기본 텍스트입니다.", editable: true }
    },
    {
        id: 201,
        type: "memo",
        name: "메모 2",
        text: "메모 2의 기본 텍스트입니다.",
        editable: false,
        path: "projects",
        icon: "/web_portfolio/assets/image/icons/memo_icon.png",
        fixed: true,
        component: Memo,
        props: { title: "메모 2", initialText: "메모 2의 기본 텍스트입니다.", editable: false }
    },
    {
        id: 202,
        type: "memo",
        name: "메모 3",
        text: "메모 3의 기본 텍스트입니다.",
        editable: true,
        path: "documents",
        icon: "/web_portfolio/assets/image/icons/memo_icon.png",
        fixed: true,
        component: Memo,
        props: { title: "메모 3", initialText: "메모 3의 기본 텍스트입니다.", editable: true }
    },
    {
        id: 203,
        type: "memo",
        name: "Hobby",
        text: "1. 식물 키우기 2. 피겨스케이트",
        editable: true,
        path: "trashbin",
        icon: "/web_portfolio/assets/image/icons/memo_icon.png",
        fixed: true,
        component: Memo,
        props: { title: "Hobby", initialText: "1. 식물 키우기 2. 피겨스케이트", editable: true }
    },
    {
        id: 204,
        type: "memo",
        name: "Bucket List",
        text: "bucket list 1 2 3 4",
        editable: true,
        path: "trashbin",
        icon: "/web_portfolio/assets/image/icons/memo_icon.png",
        fixed: true,
        component: Memo,
        props: { title: "Bucket List", initialText: "bucket list 1 2 3 4", editable: true }
    },

    // 🌐 링크
    {
        id: 300,
        type: "link",
        name: "GitHub",
        url: "https://github.com/",
        path: "desktop",
        icon: "/web_portfolio/assets/image/icons/github_icon.png",
    },
    {
        id: 301,
        type: "link",
        name: "LinkedIn",
        url: "https://www.linkedin.com/feed/",
        path: "desktop",
        icon: "/web_portfolio/assets/image/icons/linkedin_icon.png",
    },
    {
        id: 302,
        type: "link",
        name: "Blog",
        url: "https://yun000.tistory.com/",
        path: "desktop",
        icon: "/web_portfolio/assets/image/icons/blog_icon.png",
    },

    // 🖼️ 이미지
    {
        id: 400,
        type: "image",
        name: "Childhood",
        imageUrl: "/web_portfolio/assets/image/childhood.jpg",
        path: "trashbin",
        icon: "/web_portfolio/assets/image/childhood.jpg",
        component: ImageViewer,
        props: { title: "Childhood", imageUrl: "/web_portfolio/assets/image/childhood.jpg" }
    },

    // 📌 스티커
    {
        id: 500,
        type: "sticker",
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
        path: "desktop",
        icon: "/web_portfolio/assets/image/icons/sticky_icon.png",
        component: Sticky,
        props: {
            title: "스티커 1",
            initialText: `
Goal 

1. 기본적인 AI지식을 바탕으로 실제 백엔드 서비스에 통합할 수 있는 개발자

2. 프로젝트 참여시 불필요한 세팅 시간을 감축하기 위해 해당 과정을 잘 정리하고 전달하는 개발자

3. 5년 뒤 PL으로서 작업을 지시할 때 필요한 일을 정확하고 상세히 정리하여 전달하는 개발자

4. 고객사의 요청 사항을 잘 뽑아낼 수 있는 개발자

5. 담당한 도메인에 대해 잘 알고 있는 개발자

6. 지독한 개발자

7. 끝까지 최적화
`,
            editable: true
        }
    },
    {
        id: 501,
        type: "sticker",
        name: "스티커 2",
        text: "스티커 2 기본 텍스트입니다.",
        editable: false,
        path: "documents",
        icon: "/web_portfolio/assets/image/icons/sticky_icon.png",
        fixed: true,
        component: Sticky,
        props: {
            title: "스티커 2",
            initialText: "스티커 2 기본 텍스트입니다.",
            editable: false
        }
    },
    {
        id: 601,
        type: "pdf",
        name: "resume",
        path: "desktop",
        icon: "/web_portfolio/assets/image/icons/pdf_icon.png",
        fixed: false,
        filepath:"/web_portfolio/assets/pdf/cv.pdf",
    },
    // Special
    {
        id:1000,
        type:"website",
        name:"Games",
        path:"tashbin",
        icon:"/web_portfolio/assets/image/icons/steam_icon.png",
        fixed:true,
        component:GameLibrary,
        props: { 
            title: "Steam 라이브러리",
            headerImage: "/web_portfolio/assets/image/gameThumbnail/header.png",
            gameImages: [
                "/web_portfolio/assets/image/gameThumbnail/bioshock2_remaster.png",
                "/web_portfolio/assets/image/gameThumbnail/bioshock_infinite.png",
            ]
        }
    }
];

const iconMap = new Map(iconArray.map((icon) => [icon.id, icon]));

export default iconMap;
