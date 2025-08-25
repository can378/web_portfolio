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

### ■ 주요 기능
- AI 에이전트 서비스: 자연어 질의로 포트폴리오 정보 탐색  
- 이메일 서비스: Gmail API 연동으로 메시지 전송  
- MCP 도구 시스템: 포트폴리오 데이터 조회/관리  
- 보안/운영: Rate Limiting, CORS 설정, 로깅  

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

# Bible - 온라인 도서 대여 서비스



**도서 검색 및 추천, 대여 및 예약, 구매 기능을 제공하며,**

**관리자 기능을 통해 원활한 운영 및 관리가 가능하게 한다.**


**벤치마킹: 교보문고**

**진행일정: 2025.02.03 ~ 2025.02.14**

**참여 인원:** 5명

**사용 툴:** Vue, Spring Boot, Docker, Azure

> 도서 목록 관리, 조회, 추가, 삭제
QR 생성, 인식
이미지 관리
웹 소켓 알람
문자 전송
스케줄러
Apache POI로 데이터 업로드 다운로드
장바구니
toss 결제
구매 내역 조회, 관리
주소
마이 페이지 디자인
관리자 페이지 디자인
Redis
> 

## Github

https://github.com/hyeran0920/Bible.git

## 개발 환경



## 형상 관리 및 협업 툴

Notion, Googl Drive, drow.io, git, Figma

## ERD


## 화면 설계



## 시스템 구성도



## 구현된 주요 기능

- [x]  데이터 시각화 chart.js
- [x]  권한 처리&jwt 토큰 인증
- [x]  스케줄링&웹소켓
- [x]  국제화 il8n
- [x]  Jacoco활용한 테스트 코드 커버리지
- [x]  Apache POI Excel파일 업로드 다운로드
- [x]  Axios로 비동기 처리
- [x]  AOP활용 메서드 접근 로그
- [x]  Rest API활용
- [x]  Lock을 활용한 Thread-safe객체 처리

## 담당 구현 설명

### 📖 책 목록 조회



### 📖 장바구니



### 📖 구매 페이지



### 📖 Toss 결제


### 📖 구매 기록 확인 - 마이 페이지


### 📖  책 목록 관리



### 📖 구매 기록 확인 - 관리자

시연 영상
`


  },
  {
    title: "아무개전",
    short_description: "Classifies walking, running, and standing from webcam data.",
    technologies: ["Python", "PyTorch", "Mediapipe"],
    icon:"/web_portfolio/assets/image/icons/spirit_icon.png",
    image: "/web_portfolio/assets/image/icons/spirit_icon.png",
    description:`
### 개발 기획

### 제작 기간

2023.09 - 현재 개발 완료 후 아트 제작 중

### 담당 분야

Animation적용 구현

Player 기본 동작, UI 구현

Enemy, Boss 구현

챕터 - 챕터별 load, enemy setting 등..

데이터 local 저장 구현

오디오, setting 구현

기획 및 아트 스케치

### 게임 소개

**챕터 : 저퀴-그슨대-장산범-지하국대적**

여동생이 지하국대적에게 납치되었다

언니는 다양한 무기를 사용해 방마다 무작위로 등장하는 한국 요괴들을 물리치며 여동생을 구하기 위한 모험을 떠난다.

유용한 스킬과 방어구를 선택해 강력한 최종 보스에 도전하자

### 깃허브

https://github.com/can378/SpiritGameProject.git


아트에 기획 전달을 위한 스케치

    `
  },

  //게임개발============================================================================
  {
    title: "새콤달콤 딸기공장",
    short_description: "Classifies walking, running, and standing from webcam data.",
    technologies: ["Python", "PyTorch", "Mediapipe"],
    icon:"/web_portfolio/assets/image/icons/strawberry_icon.png",
    image: "/web_portfolio/assets/image/icons/strawberry_icon.png",
    description:``
  },
  {
    title: "멍냥멍냥",
    short_description: "Classifies walking, running, and standing from webcam data.",
    technologies: ["Python", "PyTorch", "Mediapipe"],
    icon:"/web_portfolio/assets/image/icons/dog_cat_icon.png",
    image: "/web_portfolio/assets/image/icons/dog_cat_icon.png",
    description:``
  },
  {
    title: "ERROR",
    short_description: "Classifies walking, running, and standing from webcam data.",
    technologies: ["Python", "PyTorch", "Mediapipe"],
    icon:"/web_portfolio/assets/image/icons/error_icon.png",
    image: "/web_portfolio/assets/image/icons/error_icon.png",
    description:``
  },

  //기타============================================================================
  {
    title: "baseball info",
    short_description: "Classifies walking, running, and standing from webcam data.",
    technologies: ["Python", "PyTorch", "Mediapipe"],
    icon:"/web_portfolio/assets/image/icons/baseball_icon.png",
    image: "/web_portfolio/assets/image/icons/baseball_icon.png",
    description:``
  },
  {
    title: "쭐래쭐래",
    short_description: "Classifies walking, running, and standing from webcam data.",
    technologies: ["Python", "PyTorch", "Mediapipe"],
    icon:"/web_portfolio/assets/image/icons/arduino_icon.png",
    image: "/web_portfolio/assets/image/icons/arduino_icon.png",
    description:``
  },
  {
    title: "Pose Estimation",
    short_description: "Classifies walking, running, and standing from webcam data.",
    technologies: ["Python", "PyTorch", "Mediapipe"],
    icon:"/web_portfolio/assets/image/icons/pose_icon.png",
    image: "/web_portfolio/assets/image/icons/pose_icon.png",
    description:`### test`
  },


];

export default projects;
