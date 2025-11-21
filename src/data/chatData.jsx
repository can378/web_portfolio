import History from "../components/History";
import Certification from "../components/Certification.jsx";
import Skill from "../components/Skill.jsx";

const chatData = [
  { sender: "question", text: "당신은 누구인가요?" },
  { sender: "me", text: "저는 개발자 허윤지입니다." },
  { sender: "question", text: "가지고 있는 스킬은 무엇인가요?" },
  { sender: "me", text: "저는 아래와 같은 스킬들을 가지고 있습니다.",component: () => <Skill /> },
  { sender: "question", text: "지금까지 어떤 일들을 해왔나요?" },
  {
    sender: "me",
    text:
      "성인이 된 직후 1년간 재수 공부를 하였고 그 이후부터는 아래와 같은 길을 걸었습니다.\n",
    component: () => <History />
  },
  { sender: "question", text: "자격증은 보유하고 있나요?" },
  {
    sender: "me",
    text: "아래와 같은 자격증을 보유하고 있습니다.",
    component: () => <Certification />
  },
  { sender: "question", text: "그 외에 자랑하고 싶은거 있나요?" },
  { sender: "me", text: "2020,2021,2022 3회 성적 우수 장학금을 받은 적이 있습니다." },
  { sender: "question", text: "연락하려면 어떻게 하나요?" },
  {
    sender: "me",
    text:
      "devmoon00@gmail.com으로 연락해주세요! \n\n" +
      "아니면 이 포트폴리오 바탕화면의 Email 아이콘을 눌러서 \n\n" +
      "구현된 이메일 전송 기능을 사용할 수 있습니다."
  }
];

export default chatData;
