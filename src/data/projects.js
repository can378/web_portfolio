const projects = [

  //웹개발============================================================================
  {
    title: "web portfolio",
    short_description: "이 포트폴리오 개발",
    technologies: ["React", "fastApi", ""],
    icon:"/web_portfolio/assets/image/icons/star_icon.png",
    image: "/web_portfolio/assets/image/icons/star_icon.png",
    description: `
<div style="text-align:center; font-weight:bold; font-size:1.15em; line-height:1.5;">
  "윈도우 XP 스타일의 레트로 UI 웹 포트폴리오입니다."
</div>

---

**진행 일정**: 2025.07.09 ~ 2025.08.31  
**참여 인원**: 개인

실제 Windows 환경처럼 아이콘을 클릭하고 창을 관리할 수 있는 인터페이스와 함께 

AI 기술을 활용하여 사용자가 자연어로 포트폴리오 정보를 탐색할 수 있도록 설계하였습니다.

---

### ■ Github
https://github.com/can378/web_portfolio.git

---

### ■ 기술 스택

#### 백엔드
- FastAPI — Python 웹 프레임워크  
- LangChain + Groq LLM (Llama3-70b-8192) — AI 에이전트 시스템  
- MCP (Model Context Protocol) — AI 도구  
- Gmail API — 이메일 전송 서비스  
- Docker — Oracle Cloud 서버 CI/CD 배포 구현

#### 프론트엔드
- React 19.1.0 + Vite  
- react-draggable  
- CSS Modules  
- GitHub Pages — 프론트 배포  

---

### ■ 주요 기능
- AI 에이전트 서비스: 자연어 질의로 포트폴리오 정보 탐색  
- 이메일 서비스: Gmail API 연동으로 메시지 전송  
- MCP 도구 시스템: 포트폴리오 데이터 조회/관리  
- 보안/운영: Rate Limiting, CORS 설정, 로깅  

---

### ■ 디자인 특징
- 레트로 스타일: Windows 95/98 클래식 UI  
- 반응형 디자인: 모바일 · 데스크톱 모두 지원  
  `
  },
  {
    title: "자산화",
    short_description: "사용자 편의성을 증대하고자 기능 개선",
    technologies: ["C++", "SDL2", "Team Management"],
    icon:"/web_portfolio/assets/image/icons/metafactory_icon.png",
    image: "/web_portfolio/assets/image/icons/metafactory_icon.png",
    description: `
<div style="text-align:center; font-weight:bold; font-size:1.15em; line-height:1.5;">
  "시연용 프로젝트 웹사이트 기능 추가 및 코드 리팩토링, 성능 개선"
</div>

---

**진행 일정:** 2025.03.17 ~ 2025.04.20 (분석/설계:10일, 개발:15일)

**참여 인원:** 개인

학습을 위해 분석/설계/기획 부터 개발을 진행했으며

기존 코드를 MVC 패턴으로 구조화하고, 하드코딩 된 부분들을 데이터베이스 기반으로 변경했으며 

고립성과 확장성을 고려하여 데이터베이스 테이블을 재설계 했습니다. 

Redis 캐싱 사용 등으로 성능 또한 개선하였습니다.

---

### ■ 기술 스택
- Vue 3 + Nuxt 3  (Vuetify 3 + Pinia...)
- Node.js + Express  서버
- aws + github actions ㅡ CI/CD 구현
- 프로젝트 진행 관리: Jira

---

### ■ 웹페이지 화면

### **metafactory-v1**

=모든 기능이 들어간 웹사이트입니다.

![metafactory-v1](/web_portfolio/assets/image/projects/metafactory/metafactoryV1.png)

### **metafactory-v2**

= 사용 빈도가 적은 기능을 제외한 최종 웹사이트 스크린샷 입니다.

![metafactory-v2](/web_portfolio/assets/image/projects/metafactory/metafactoryV2.png)

---

### ■ 프로젝트 분석/설계

**🔷 As-Is/To-Be**
<img src="/web_portfolio/assets/image/projects/metafactory/asistobe.png" width="300" />

**🔷 요구사항 명세서**
<img src="/web_portfolio/assets/image/projects/metafactory/요구사항명세서.png" width="400" />

**🔷 개발 WBS 문서**
<img src="/web_portfolio/assets/image/projects/metafactory/wbs.png" width="400" />

**🔷 ERD 설계**

= 데이터베이스 재설계, 정규화 - 3NF를 목표

- 확장성 고려

  ex) 공장, 창고 테이블이 2개 존재하던 것에서 기업, 캠퍼스, 빌딩, 층, 라인… 계층적 구조로 설계

- 고립성과 재사용성 고려

  primary key를 AUTO_INCREMENT와 FOREIGN KEY로 설계.

  단일 테이블에 모든 정보를 다 넣지 않고 고립성과 재사용성을 고려

- 인덱스

  캠퍼스 테이블에 대해 위치id, 유저 세팅 테이블에 유저id → 조회 성능 향상

- 추후 개선 포인트

  varchar로 되어있는 PK를 FK/조인용으로 INT surrogate key로 변경

  ENUM, Lookup 테이블 사용

---

### ■ 기능 개발

1. 웹 디자인 
    = 전면 변경

2. 지도 확대 
    = 국가 선택 시 해당 국가 맵으로 이동. 

    통일감을 위해 python으로 도트 맵 생성.

    html2canvas 라이브러리로 특정 요소를 캡쳐하고 Canvas 객체로 바꾸어 그 데이터를 Data Url로 바꾸어 이미지 다운

3. 캠퍼스 정보 = hover, click 시 캠퍼스 정보 확인. 

    캠퍼스 명, 현지 시간, 환율, 날씨, 캠퍼스 위치 표시. 
    
    캠퍼스 즐겨찾기 추가 및 삭제 가능. 

    레이아웃 업데이트 시 알림. 각 campus가 위치한 도시 표기. 

    즐겨찾기 한 캠퍼스는 목록으로 메인 페이지에서 확인 가능

4. 캠퍼스 스케줄 
    = 캠퍼스 스케줄 관리 가능. 
    
    일정 현황 확인, 달력에 해당 국가의 공휴일 표시. 
    
    엑셀로 일괄 업로드, 다운로드

5. 공지 
    = 공지 관리, 파일 업로드, 이미지 미리 보기, 
    
    공지 기한 설정, 공지 노출 허용 유저 설정, 공지 상단 고정

    AWS S3 서명 URL로 s3를 비공개로 설정하고 특정 객체에 일정 시간 동안 접근 가능한 임시 링크를 제공하여 
    
    파일을 안전하게 조회할 수 있게 함

6. 레이아웃 업데이트 
    = 업데이트 시 알림. 알림 기간 설정 가능

7. 사용자별 자주 사용하는 UI 즐겨 찾기 기능

8. 한/영 국제화. 
    사용자 별 기본 언어 설정 가능

9. 뉴스 
    = 키워드로 뉴스 웹 크롤링 후 목록 제공
    
    Cheerio로 네이버에서 지정 키워드를 기반으로 검색 후
    
    HTML을 jquery로 조작할 수 있게 하는 라이브러리를 활용하여 원하는 검색 결과 HTML 속에서 원하는 정보를 가져왔다. 

---

### ■ Refactoring

🔷 MVC 패턴

= 백엔드를 Model, Controller, Service, Routes로 분리

+) 공통 함수를 Utils폴더 내로 분리. Scheduler 따로 분리
  
  - 코드 유지 보수성 향상
  - 각 모듈 역할 명확히 분리
  - 반복 작업과 함수 재 사용성 향상

🔷 데이터 베이스 기반

= 하드 코딩 된 부분을 데이터 베이스 기반으로 변경.
  - 유연성 확보
  - 동적 관리 가능

---
  
### ■ 기능 개선

변경이 빈번하지 않은 데이터 redis 캐싱 적용으로 조회 성능 향상

vuedraggable(용량 많이 차지하는 라이브러리) 코드 직접 구현 등… 

Lighthouse통해 성능 개선 확인 
  `
  },
  {
    title: "Library - Bible",
    short_description: "library web",
    technologies: ["Python", "PyTorch", "Mediapipe"],
    icon:"/web_portfolio/assets/image/icons/bible_icon.png",
    image: "/web_portfolio/assets/image/icons/bible_icon.png",
    description:`
<div style="text-align:center; font-weight:bold; font-size:1.15em; line-height:1.5;">
  "온라인 도서 대여 서비스"
</div>

---

**진행일정**: 2025.02.03 ~ 2025.02.14

**참여 인원**: 5명

**벤치마킹**: 교보문고


도서 검색 및 추천, 대여 및 예약, 구매 기능을 제공하며

관리자 기능을 통해 원활한 운영 및 관리가 가능하게 한 웹사이트입니다.

---

### ■ Github
https://github.com/hyeran0920/Bible.git

---

### ■ 기술 스택
Vue, Spring Boot, Docker, Azure

---

### ■ 형상 관리 및 협업 툴
Notion, Googl Drive, drow.io, git+github, Figma, erd cloud

---

### ■ 담당 기능
- Rest API 설계
- 도서 목록 관리, 조회, 추가, 삭제
- 도서, 유저 관리를 위한 QR 생성, 인식, 암호화
- 이미지나 파일을 aws S3를 통해 관리
- 웹 소켓 알람
- coolsms를 사용한 문자 전송
- 스케줄러 활용
- Apache POI Excel파일 업로드 다운로드
- 장바구니 기능
- toss 결제 api 적용
- 구매 내역 조회, 관리 기능
- 마이 페이지 디자인
- 관리자 페이지 디자인
- Redis 적용
- 국제화 적용

---

### ■ 개발 환경

![dev-env](/web_portfolio/assets/image/projects/bible/개발환경.png)

---

### ■ ERD

![ERD](/web_portfolio/assets/image/projects/bible/erd.png)

---

### ■ 화면 설계

![screen1](/web_portfolio/assets/image/projects/bible/화면설계1.png)

---

### ■ 시스템 구성도

![screen2](/web_portfolio/assets/image/projects/bible/화면설계2.png)

---

### ■ 시연 영상

![video](/web_portfolio/assets/image/projects/bible/video.mp4)


`


  },
  {
    title: "아무개전",
    short_description: "Classifies walking, running, and standing from webcam data.",
    technologies: ["Python", "PyTorch", "Mediapipe"],
    icon:"/web_portfolio/assets/image/icons/spirit_icon.png",
    image: "/web_portfolio/assets/image/icons/spirit_icon.png",
    description:`
<div style="text-align:center; font-weight:bold; font-size:1.15em; line-height:1.5;">
  "Unity 2D 조선풍 로그라이크 PC게임 개발"
</div>

---

**진행 일정:** 2023.09 - 현재 개발 완료 후 아트 제작 중

**참여 인원:** 3인

**챕터:** 저퀴-그슨대-장산범-지하국대적


여동생이 지하국대적에게 납치되었다

언니는 다양한 무기를 사용해 방마다 무작위로 등장하는 한국 요괴들을 물리치며 여동생을 구하기 위한 모험을 떠난다.

유용한 스킬과 방어구를 선택해 강력한 최종 보스에 도전하자

---

### ■ Github
https://github.com/can378/SpiritGameProject.git

---

### ■ 기술 스택
- Unity 2D

---

### ■ 담당 분야

- Animation적용 구현

- Player 기본 동작, UI 구현

- Enemy, Boss 구현

- 챕터 - 챕터별 데이터 load, enemy setting 등..

- 데이터 local 저장, 조회 구현

- 오디오, setting 구현

- 기획 및 아트


    `
  },

  //게임개발============================================================================
  {
    title: "새콤달콤 딸기공장",
    short_description: "Classifies walking, running, and standing from webcam data.",
    technologies: ["Python", "PyTorch", "Mediapipe"],
    icon:"/web_portfolio/assets/image/icons/strawberry_icon.png",
    image: "/web_portfolio/assets/image/icons/strawberry_icon.png",
    description:`
<div style="text-align:center; font-weight:bold; font-size:1.15em; line-height:1.5;">
  "Unity 2D Android 캐주얼 게임. 딸기를 키우고 수집하여 돈을 버는 게임입니다."
</div>

---

**진행 일정**: 2022.01 ~ 2023.02 

**참여 인원**: 팀파머 (7인)

---

### ■ Github
https://github.com/Team-Farmer/Strawberry

---

### ■ 기술 스택

Unity 2D

### ■ 지원 플랫폼

Android

---

### ■ 담당 개발

연구, 알바, 도전 과제 시스템, 미니 게임, 오디오 등..개발

![berry1](/web_portfolio/assets/image/projects/berry/berry1.png)

![berry2](/web_portfolio/assets/image/projects/berry/berry2.png)

![berry3](/web_portfolio/assets/image/projects/berry/berry3.png)

![berry4](/web_portfolio/assets/image/projects/berry/berry4.png)

![berry5](/web_portfolio/assets/image/projects/berry/berry5.png)

    `
  },
  {
    title: "멍냥멍냥",
    short_description: "Classifies walking, running, and standing from webcam data.",
    technologies: ["Python", "PyTorch", "Mediapipe"],
    icon:"/web_portfolio/assets/image/icons/dog_cat_icon.png",
    image: "/web_portfolio/assets/image/icons/dog_cat_icon.png",
    description:`
OpenGL, SDL2를 사용한 2D 2인 협동 퍼즐 게임

4명이 개발한 게임으로 

기획/개발을 맡으며 팀장으로써 팀을 이끌었습니다.

### 제작 기간

2024.04.01 - 2024.06.12
+ 2024.11.15 - 2024.11.24 (업데이트)

https://youtu.be/SdC8TNcZ2sU?si=pcIDDEzaBsRHx351

### 소개
![berry5](/web_portfolio/assets/image/projects/dogCat/dogcat.png)
![berry5](/web_portfolio/assets/image/projects/dogCat/dogcat2.jpg)
두 명의 플레이어가 한 대의 PC로 플레이하는 2인 협동 게임입니다.

오지 않는 주인을 마중 나가기 위해 집안 곳곳을 헤쳐나간다는 스토리를 기반으로
각 플레이어는 강아지와 고양이 중 하나를 맡아
맵들을 하나씩 클리어 해냅니다.

고양이와 강아지는 각자 가지고 있는 패널티와 한계, 능력이 다르기 때문에 서로가 서로를 꼭 필요로 합니다

### 제작 동기

컴퓨터로 할 수 있는 놀이가 바로 게임이라고 생각합니다.
예로부터 놀이는 혼자서 하는 것이 아닌 여러명이서 즐기는 문화였습니다.
하지만 현대의 게임은 과거의 놀이와는 다른 모습을 보입니다.

기술의 덕택으로 혼자서 게임을 즐길 수도 있고, 혹은 익명의 누군가와 별다른 인사 없이 게임을 시작할 수도 있죠. 과거와는 달라진 놀이의 양상 속에서 플레이어들은 혼자 게임을 즐기며 타인과의 연결을 차단하기도 하고 익명성 뒤에서 타인에게 상처가 되는 말을 내뱉기도 합니다.

저희 개발진은 이러한 문제 상황을 해결하고 놀이의 또 다른 본질인 ‘유대’의 가치를 회복하고자 멍냥 멍냥을 만들었습니다. 사랑스러운 강아지, 고양이 캐릭터와 함께, 사람과 직접 마주하여 게임을 플레이하는 과정에서, 함께 해냈다는 따뜻하고 뭉클한 성취감이 플레이어 분들께 전달될 수 있길 진심으로 바랍니다

### 개발 파트

게임 인트로, 매뉴얼, 게임 스테이지 등등 게임 phase interface 설계
물체들 간의 충돌 감지(위치, 크기, 물체 간 거리 기반)

게임 캐릭터가 딛고 서있는 발판 구현 - 점프+중력 구현 후 모든 terrain에 접촉하면 이동하지 못하도록 막게 구현
게임 캐릭터 이동 조작 구현
게임 캐릭터 스킬 구현 
- “강아지가 냄새 맡기”로 occlusion 투명도 조절로 가려진 것을 확인하는 스킬
- “고양이 액체화”로 좁은 틈 이동. 특정 캐릭터에만 충돌하도록 구현. 해당 상태일 때 애니메이션 변경으로 상태 확인 가능

버튼을 누르면 이동하는 발판 구현. 여러 버튼과 여러 발판이 연결되도록 연결. 발판의 위치는 단지 직선이 아닌 방향 벡터와 이동 거리 계산으로 특정 어느 방향으로도 일정한 속도로 이동할 수 있게 구현

특정 오브젝트(쿠션) 닿으면 점프력 증가
특정 캐릭터(강아지)만 박스를 밀 수 있도록 구현
접촉하면 투명도 낮아진 끝에 사라지는 발판
열쇠와 자물쇠 구현. 열쇠를 얻은 캐릭터만 자물쇠 해제 가능
맵 별 구조 배치
게임 스테이지별 시작, 엔딩 구현 - 스테이지 시작시 특정 위치에서 시작. 특정 오브젝트에 두 캐릭터가 모두 접촉하면 게임 클리어

### 깃허브
https://github.com/can378/SDLGame.git

### 업데이트

맵 2개 추가

새로운 오브젝트 5개 추가 

(램프, 흔들 발판, 텔레포트, 로봇청소기)

### 게임 설명서
    `
  },
  {
    title: "ERROR",
    short_description: "Classifies walking, running, and standing from webcam data.",
    technologies: ["Python", "PyTorch", "Mediapipe"],
    icon:"/web_portfolio/assets/image/icons/error_icon.png",
    image: "/web_portfolio/assets/image/icons/error_icon.png",
    description:`
  Unreal short film

### Production Period
![berry5](/web_portfolio/assets/image/projects/error/image.png)
2024.04 one week

### Description

This is a one-person production video.

Except for the initial subway scene, all backgrounds were created by me.

In the scene with the white monitors, I had intended to include videos on each monitor, but due to insufficient computer specifications, they were ultimately removed from the final version.

### Final Video

I recommend watching it at 2x speed.

https://youtu.be/HBr-nuXH8xA?si=cn3ZKZRcgBWvvWza

### Plot Summary

While taking the subway, Megan suddenly finds herself transported to an unknown place. In this new space, she encounters a monster and begins to run in fear, not understanding what's happening.

At one point, the monster disappears, but strange phenomena continue to occur(The sky turns dark) and she sees someone who looks just like her standing in front of her.

As she realizes this, the errors escalate, ultimately leading to an unmanageable situation where Megan's data is deleted.

The story reveals that Megan was in a virtual space within a computer, and it ends by showing that there are numerous similar virtual spaces.

At the end, the word "error" appears reversed on the screen, signifying that our world is also a virtual one. It represents the idea that we have uncovered this secret through the video, resulting in the display of the "error" message.

    `
  },

  //기타============================================================================
  {
    title: "Pose Estimation",
    short_description: "Classifies walking, running, and standing from webcam data.",
    technologies: ["Python", "PyTorch", "Mediapipe"],
    icon:"/web_portfolio/assets/image/icons/pose_icon.png",
    image: "/web_portfolio/assets/image/icons/pose_icon.png",
    description:`
  # HPE - Pytorch

<aside>
🤸🏻

 Human pose estimation + action recognition

</aside>

MediaPipe를 활용한 human pose estimation + action recognition

### 개발 기간

2024.08 1주일

### 코드

### 관절 각도 기준 판별 → Ensemble(Random Forest) →  LSTM

accuracy : 85%

### 프로젝트 설명서


### 개발 환경

jupyter notebook

numpy, pandas, metaplotlib …

python

### 추후 기획

제자리에서 **Running, Walking, Crouching, Crouching and Walking**을 구분하기 위해

속도 feature값을 추가하여 정확도를 높일 계획입니다.

추후에 완벽하게 classification이 가능해지면 Unreal혹은 Unity 3D와 연결하여 사람의 모션 캡쳐로 상호 작용하는 게임을 제작할 계획입니다.

### 프로젝트 응용

운동 자세 보정, 의료 분야에서 환자의 재활을 위해 움직임 분석, 
스포츠 선수의 자세 분석, 노인 확인 용 Cctv, 애완동물 Cctv 등…
    `
  },


];

export default projects;
