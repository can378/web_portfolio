import FolderWindow from "../components/FolderWindow";
import Memo from "../components/Memo";
import Sticky from "../components/Sticky";
import ImageViewer from "../components/Image";
import GameLibrary from "../pages/GameLibrary";
import Project from "../pages/Project";
import Welcome from "../pages/Welcome";
import Introduction from "../pages/Introduction";
import History from "../pages/History";
import Email from "../pages/Email";


const iconArray = [
    // 📂 폴더
    {
        id: 100,
        type: "folder",
        name: "Work",
        icon: "/web_portfolio/assets/image/icons/folder_icon.svg",
        path: "desktop",
        component: FolderWindow,
        props: { folderId: 100 },
        childIds: [200],
    },
    {
        id: 101,
        type: "folder",
        name: "user",
        icon: "/web_portfolio/assets/image/icons/user_icon.svg",
        path: "desktop",
        component: FolderWindow,
        props: { 
            folderId: 101, 
            defaultSize:{ width: 400, height: 200 }, 
        },
        childIds: [203,401,1000],
    },
    {
        id: 102,
        type: "folder",
        name: "Favorite",
        icon: "/web_portfolio/assets/image/icons/favorite_icon.svg",
        path: "desktop",
        component: FolderWindow,
        props: { 
            folderId: 102,
            defaultPosition:{ x: 70, y: 260 },
            defaultSize:{ width: 400, height: 200 },
        },
        childIds: [300,302,601,1001],

    },

    // 📝 메모
    {
        id: 200,
        type: "memo",
        name: "Metanet",
        editable: true,
        path: "work",
        icon: "/web_portfolio/assets/image/icons/memo_icon.svg",
        fixed: true,
        component: Memo,
        props: { title: "Metanet", initialText: `
인턴 경력

메타넷디지털 - 모던팩토리
인턴
2025.03.04-2025.05.02
- 기존 하드코딩된 구조를 MariaDB 기반으로 전환하여 유지보수성과 확장성 확보
- 프론트(Vue3 Nuxt) 전면 개편 및 백엔드(Node.js Express) MVC 패턴 적용
- 5개 이상의 기능 수정 및 추가
- 웹 크롤링을 통한 키워드 기반 네이버 뉴스 기사 제공 기능 구현
- MPC 툴 기반 AI Agent 챗봇 API 개발, DB 연동형 지능형 서비스 구축
- AWS CI/CD 파이프라인 및 S3 업로드 다운로드 기능 구현
- AWS CodeCatalyst 기반 Git 환경 도입으로 협업 효율 향상



메타넷디지털-모던팩토리
사원
2025.05.06
<m.pluto-hub>
= MCP tool이나 AI Agent 상세 정보 및 사용 방법을 등록하는 웹사이트 개발 
(회원 가입, 등록, 목록 필터링 등 핵심 기능 전반 구현)

<metanet-warehouse-backend>
창고 관련 unity digital twin의 Backend 개발
AWS 기반 CI/CD 적용 (MCP MSIS Web & MSIS Unity 빌드/배포 자동화)

<metanet-warehouse-unity>
Computer Vision 기반 AI Detection 결과를 Unity 환경에 적용
Unity LiDAR 구현 구상 및 설계
Coroutine → UniTask 변환 작업 (Unitask, Coroutine 정리 후 일부 교체)
프로젝트를 AWS CodeCatalyst에 업로드하여 협업/배포 환경 구축
AI Navigation을 활용한 AGV 구현

내용 추가 수정!!!!!!!!!!!!!!!!!!!!!!!!!!!
            `
            
            , editable: true }
    },
    {
        id: 201,
        type: "memo",
        name: "메모 2",
        editable: false,
        path: "projects",
        icon: "/web_portfolio/assets/image/icons/memo_icon.svg",
        fixed: true,
        component: Memo,
        props: { title: "메모 2", initialText: "메모 2의 기본 텍스트입니다.", editable: false }
    },
    {
        id: 202,
        type: "memo",
        name: "메모 3",
        editable: true,
        path: "documents",
        icon: "/web_portfolio/assets/image/icons/memo_icon.svg",
        fixed: true,
        component: Memo,
        props: { title: "메모 3", initialText: "메모 3의 기본 텍스트입니다.", editable: true }
    },
    {
        id: 203,
        type: "memo",
        name: "Hobby",
        editable: true,
        path: "user",
        icon: "/web_portfolio/assets/image/icons/memo_icon.svg",
        fixed: true,
        component: Memo,
        props: 
        { 
            title: "Hobby", 
            initialText: "1. 식물 키우기 \n2. 피겨 스케이트\n3. 배드민턴\n4. 여행\n5. 그림 그리기\n6. 개발\n7. 안 먹어본 음식 먹어보기", 
            editable: true 
        }
    },

    // 🌐 링크
    {
        id: 300,
        type: "link",
        name: "GitHub",
        url: "https://github.com/can378",
        path: "desktop",
        icon: "/web_portfolio/assets/image/icons/github_icon.svg",
    },
    {
        id: 302,
        type: "link",
        name: "Blog",
        url: "https://yun000.tistory.com/",
        path: "desktop",
        icon: "/web_portfolio/assets/image/icons/blog_icon.svg",
    },

    // 🖼️ 이미지
    {
        id: 400,
        type: "image",
        name: "Childhood",
        imageUrl: "/web_portfolio/assets/image/childhood.jpg",
        path: "user",
        icon: "/web_portfolio/assets/image/childhood.jpg",
        component: ImageViewer,
        props: { title: "Childhood", imageUrl: "/web_portfolio/assets/image/childhood.jpg" }
    },
    {
        id: 401,
        type: "image",
        name: "favorite",
        imageUrl: "/web_portfolio/assets/image/henri_rousseau.jpg",
        path: "user",
        icon: "/web_portfolio/assets/image/henri_rousseau.jpg",
        component: ImageViewer,
        props: { title: "favorite", imageUrl: "/web_portfolio/assets/image/henri_rousseau.jpg" }
    },

    
    // 📌 스티커
    {
        id: 500,
        type: "sticker",
        name: "Goal",
        editable: true,
        path: "desktop",
        icon: "/web_portfolio/assets/image/icons/sticky_icon.svg",
        component: Sticky,
        props: {
            title: "Goal",
            initialText: `
1. 기본적인 AI지식을 바탕으로 실제 백엔드 서비스에 통합할 수 있는 개발자

2. 프로젝트 참여시 불필요한 세팅 시간을 감축하기 위해 세팅 과정을 잘 정리하고 다른 개발자에게 전달하는 개발자

3. 5년 뒤 PL으로서 작업을 지시할 때 필요한 일을 정확하고 상세히 정리하여 전달하는 개발자

4. 고객사의 요청 사항을 잘 뽑아낼 수 있는 개발자

5. 담당한 도메인에 대해 잘 알고 있는 개발자

6. 오류를 끝까지 해결하려 노력하고 더 나은 방안을 찾기위해 지독하게 매달리는 개발자

7. 끝까지 테스트하고 최적화하는 개발자
`,
            editable: true
        }
    },
    {
        id: 501,
        type: "sticker",
        name: "스티커 2",
        editable: false,
        path: "documents",
        icon: "/web_portfolio/assets/image/icons/sticky_icon.svg",
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
        icon: "/web_portfolio/assets/image/icons/resume_icon.svg",
        fixed: false,
        filepath:"/web_portfolio/assets/pdf/cv.pdf",
    },
    // Special
    {
        id:1000,
        type:"website",
        name:"Games",
        path:"tashbin",
        icon:"/web_portfolio/assets/image/icons/steam_icon.svg",
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
    },
    {
        id:1001,
        type:"website",
        name:"Projects",
        path:"desktop",
        icon:"/web_portfolio/assets/image/icons/projects_icon.svg",
        fixed:false,
        component:Project,
        props: { 
            title: "Projects",
        }
    },
    {
        id:1002,
        type:"website",
        name:"Welcome",
        path:"desktop",
        icon:"/web_portfolio/assets/image/icons/welcome_icon.svg",
        fixed:false,
        component:Welcome,
    },
    {
        id:1003,
        type:"website",
        name:"Messenger",
        path:"desktop",
        icon:"/web_portfolio/assets/image/icons/messanger_icon.svg",
        fixed:false,
        component:Introduction,
    },
    {
        id:1005,
        type:"website",
        name:"Email",
        path:"desktop",
        icon:"/web_portfolio/assets/image/icons/email_icon.svg",
        fixed:false,
        component:Email,
        props: { 
            title: "Email",
        }
    }
];

const iconMap = new Map(iconArray.map((icon) => [icon.id, icon]));

export default iconMap;
