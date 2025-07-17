const imgArray = [
    {
        id: 1,
        name: "childhood",
        img: "/web_portfolio/assets/image/childhood.jpg",
        folder: "Trashbin",
        icon: "/web_portfolio/assets/image/childhood.jpg",
    },
];


const imgMap = new Map(imgArray.map((m) => [m.id, m]));

export default imgMap;
