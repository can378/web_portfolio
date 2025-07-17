const linkArray = [
    {
        id: 1,
        name: "github",
        link: "https://github.com/",
        folder: "바탕화면",
        icon: "/web_portfolio/assets/image/icons/github_icon.png",

    },
    {
        id: 2,
        name: "linkedin",
        link: "https://www.linkedin.com/feed/",
        folder: "바탕화면",
        icon: "/web_portfolio/assets/image/icons/linkedin_icon.png",

    },
    {
        id: 3,
        name: "blog",
        link: "https://yun000.tistory.com/",
        folder: "바탕화면",
        icon: "/web_portfolio/assets/image/icons/blog_icon.png",

    },
];


const linkMap = new Map(linkArray.map((m) => [m.id, m]));

export default linkMap;
