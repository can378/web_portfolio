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
        icon: "/web_portfolio/assets/image/icons/folder_icon.png",
        path: "desktop",
        component: FolderWindow,
        props: { folderId: 100 },
        childIds: [200],
    },
    {
        id: 101,
        type: "folder",
        name: "user",
        icon: "/web_portfolio/assets/image/icons/user_icon.png",
        path: "desktop",
        component: FolderWindow,
        props: { folderId: 101 },
        childIds: [203,204,401,1000],
    },
    {
        id: 102,
        type: "folder",
        name: "Favorite",
        icon: "/web_portfolio/assets/image/icons/favorite_icon.png",
        path: "desktop",
        component: FolderWindow,
        props: { 
            folderId: 102,
            defaultPosition:{ x: 70, y: 260 },
            defaultSize:{ width: 500, height: 300 },
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
        icon: "/web_portfolio/assets/image/icons/memo_icon.png",
        fixed: true,
        component: Memo,
        props: { title: "메모 1", initialText: "Metanet 에서 근무하였습니다.", editable: true }
    },
    {
        id: 201,
        type: "memo",
        name: "메모 2",
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
        editable: true,
        path: "user",
        icon: "/web_portfolio/assets/image/icons/memo_icon.png",
        fixed: true,
        component: Memo,
        props: 
        { 
            title: "Hobby", 
            initialText: "1. 식물 키우기 \n2. 피겨 스케이트\n3. 배드민턴\n4. 여행\n5. 그림 그리기\n6. 개발\n7. 안 먹어본 음식 먹어보기", 
            editable: true 
        }
    },
    {
        id: 204,
        type: "memo",
        name: "Bucket List",
        editable: true,
        path: "user",
        icon: "/web_portfolio/assets/image/icons/memo_icon.png",
        fixed: true,
        component: Memo,
        props: 
        { 
            title: "Bucket List", 
            initialText: `1. 스카이 다이빙
2. 비행기 직접 조종하기
3. F1 차를 몰아보기
4. 수천 만 명을 도울 수 있는 프로그램을 개발하기
5. 엄마의 핸드폰 사용을 돕는 프로그램 개발하기
6. 영어를 원어민 수준으로 하기
7. 백준 플레1 달성
8. 미국, 호주, 뉴질랜드, 멕시코, 러시아, 발트해3국, 남극, 태국, 코타키나발루, 케냐, 몽골, 캐나다는 꼭 방문해보기
9. 엑스트라 알바 해보기
10. 독일어 b1 취득
11. 백발이 되어보기
12. 친구와 가족에게 항상 밥을 사줄 수 있는 사람이 되기
13. 엄마 아빠 과천에 집 사주기
14. 지프차 몰기
15. 작은 온실을 가지기
`,
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
        icon: "/web_portfolio/assets/image/icons/github_icon.png",
    },
    /*
    {
        id: 301,
        type: "link",
        name: "LinkedIn",
        url: "https://www.linkedin.com/feed/",
        path: "desktop",
        icon: "/web_portfolio/assets/image/icons/linkedin_icon.png",
    },
    */
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
        icon: "/web_portfolio/assets/image/icons/sticky_icon.png",
        component: Sticky,
        props: {
            title: "Goal",
            initialText: `
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
        icon: "/web_portfolio/assets/image/icons/resume_icon.png",
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
    },
    {
        id:1001,
        type:"website",
        name:"Projects",
        path:"desktop",
        icon:"/web_portfolio/assets/image/icons/projects_icon.png",
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
        icon:"/web_portfolio/assets/image/icons/welcome_icon.png",
        fixed:false,
        component:Welcome,
    },
    {
        id:1003,
        type:"website",
        name:"Messanger",
        path:"desktop",
        icon:"/web_portfolio/assets/image/icons/messanger_icon.png",
        fixed:false,
        component:Introduction,
    },
    {
        id:1005,
        type:"website",
        name:"Email",
        path:"desktop",
        icon:"/web_portfolio/assets/image/icons/email_icon.png",
        fixed:false,
        component:Email,
    }
];

const iconMap = new Map(iconArray.map((icon) => [icon.id, icon]));

export default iconMap;
