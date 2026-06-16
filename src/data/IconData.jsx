import FolderWindow from "../components/FolderWindow";
import Memo from "../components/Memo";
import Sticky from "../components/Sticky";
// import ImageViewer from "../components/Image";
import GameLibrary from "../pages/GameLibrary";
import Project from "../pages/Project";
import Welcome from "../pages/Welcome";
import Introduction from "../pages/Introduction";
import Email from "../pages/Email";


export const iconArray = [
    // 📂 폴더
    {
        id: 100,
        type: "folder",
        name: "Work",
        icon: "/web_portfolio/assets/image/icons/folder_icon.svg",
        path: "desktop",
        component: FolderWindow,
        description:"근무 경력 / 경력 요약",
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
        description:"개인적인 정보가 담김 파일입니다. \n 취미, 좋아하는 게임 등을\n 확인할 수 있습니다.",
        props: { 
            folderId: 101, 
            defaultSize:{ width: 400, height: 200 }, 
        },
        childIds: [203,1000],
    },
    {
        id: 102,
        type: "folder",
        name: "Favorite",
        icon: "/web_portfolio/assets/image/icons/favorite_icon.svg",
        path: "desktop",
        component: FolderWindow,
        description:"포트폴리오에서 가장 중요한 정보들이 담긴 폴더입니다.",
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
■ 메타넷디지털 - 모던팩토리팀 인턴

직급: 인턴
기간: 2025.03.04-2025.05.02

<Node.js vue3 교육 수강>
- inflearn 교육 수강
- Node.js 학습 내용 세미나 진행

<사내 자산화 프로젝트>
- 기존 하드코딩 된 구조를 MariaDB 기반으로 전환하여 유지보수성과 확장성 확보
- 프론트(Vue3 Nuxt) 전면 개편 및 백엔드(Node.js Express) MVC 패턴 적용
- 기존 기능 개선 및 신규 기능 추가
- 웹 크롤링을 통한 키워드 기반 네이버 뉴스 기사 제공 기능 구현
- MPC 툴 기반 AI Agent 챗봇 API 개발, DB 연동형 지능형 서비스 구축
- AWS CI/CD 파이프라인 및 S3 업로드 다운로드 기능 구현



■ 메타넷디지털 - 모던팩토리 정규직
직급: 사원
기간: 2025.05.06-

<m.pluto-hub>
= Go + Vue3
MCP Server와 AI Agent를 손쉽게 등록·검색·공유할 수 있는 플랫폼 개발.

<metanet-warehouse>
- Unity 3D 기반 가상 창고 디지털 트윈 구현 프로젝트 (백엔드·Unity·WPF 협업).
- MariaDB + FastAPI로 데이터베이스 및 API 설계·구현.
- Unity에서 AGV 최적 경로 이동, Snapshot/Recording, AI Detection 기능 개발.
- Object Pooling, Cinemachine, Particle System 활용한 성능 최적화와 시각 효과 구현.
- ChatGroq + LLaMA3 연동 AI Agent와 코드 리팩토링.


<연구개발지식화>
연구개발 데이터를 자연어로 조회하고 활용할 수 있는 LLM 기반 지식화 시스템을 개발.

MCP 기반 데이터 조회 챗봇과 RAG 기반 논문 검색·추천·작성 챗봇을 구축.

LLM Tool Calling을 활용한 Agent Workflow를 구현. 


Text-to-SQL 기능을 통해 사용자가 자연어로 데이터베이스를 조회할 수 있도록 지원하고

사용자 권한 검증 절차를 적용하여 비인가 데이터 접근을 방지. 


Milvus 기반 Vector Search와 Hybrid Search를 적용하여 논문 검색 정확도를 향상시켰으며

커스텀 태그 기반 스트리밍 응답 제어를 통해 답변 일관성을 개선. 


조회 결과의 Excel 다운로드 기능을 개발.

MCP Tool 내부에서 필터 생성 및 조회를 수행하도록 구조를 개선하여 논문 추천 응답 시간을 약 50% 단축.


            `
            
            , editable: true }
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
    // {
    //     id: 400,
    //     type: "image",
    //     name: "Childhood",
    //     imageUrl: "/web_portfolio/assets/image/childhood.jpg",
    //     path: "user",
    //     icon: "/web_portfolio/assets/image/childhood.jpg",
    //     component: ImageViewer,
    //     props: { title: "Childhood", imageUrl: "/web_portfolio/assets/image/childhood.jpg" }
    // },
    // {
    //     id: 401,
    //     type: "image",
    //     name: "favorite",
    //     imageUrl: "/web_portfolio/assets/image/henri_rousseau.jpg",
    //     path: "user",
    //     icon: "/web_portfolio/assets/image/henri_rousseau.jpg",
    //     component: ImageViewer,
    //     props: { title: "favorite", imageUrl: "/web_portfolio/assets/image/henri_rousseau.jpg" }
    // },

    
    // 📌 스티커
    {
        id: 500,
        type: "sticker",
        name: "Goal",
        editable: true,
        path: "desktop",
        icon: "/web_portfolio/assets/image/icons/sticky_icon.svg",
        component: Sticky,
        description:"개발자로서의 목표가 적힌 스티커입니다.",
        props: {
            title: "Goal",
            initialText: `
0. 끊임없이 성장하고 새로운 기술을 능동적으로 습득하는 개발자

1. 기본적인 AI지식을 바탕으로 실제 백엔드 서비스에 통합할 수 있는 개발자

2. 적극적으로 다른 개발자를 돕는 개발자

3. 리더로서 필요한 작업을 정확히 정의하고 명확하게 전달하는 개발자

4. 고객사의 요구 사항을 잘 뽑아낼 수 있는 개발자

5. 담당한 도메인에 대해 잘 알고 있는 개발자

6. 오류를 해결하고자 지독하게 매달리는 개발자

7. 끝까지 테스트하고 성능을 최적화하는 개발자
`,
            editable: true
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
        description:"진행한 프로젝트들이 담겨있습니다.",
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
        description:"포트폴리오에 오신 것을 환영합니다.\n 간단한 사용법이 담겨있습니다.",
    },
    {
        id:1003,
        type:"website",
        name:"Messenger",
        path:"desktop",
        icon:"/web_portfolio/assets/image/icons/messanger_icon.svg",
        fixed:false,
        component:Introduction,
        description:"포트폴리오 오너에 대한 소개입니다.",
    },
    {
        id:1005,
        type:"website",
        name:"Email",
        path:"desktop",
        icon:"/web_portfolio/assets/image/icons/email_icon.svg",
        fixed:false,
        component:Email,
        description:"이메일 전송 기능이 있는 창입니다.",
        props: { 
            title: "Email",
        }
    }
];

const iconMap = new Map(iconArray.map((icon) => [icon.id, icon]));

export default iconMap;
