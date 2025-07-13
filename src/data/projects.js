const projects = [

  //웹개발============================================================================
  {
    title: "기업 자산화 포탈 사이트 개선",
    description: "사용자 편의성을 증대하고자 기능 개선",
    technologies: ["C++", "SDL2", "Team Management"],
    image: "/web_portfolio/assets/image/projects/test.jpg",
    desciprtion:`
      **진행 일정: 2025.03.17 ~ 2025.04.20 (분석/설계:10일, 개발:15일)**

      **참여 인원:** 개인

      **사용 툴:** Vue 3 + Nuxt 3  (Vuetify 3 + Pinia...)  /  Node.js + Express  서버

      **프로젝트 진행 관리**: Jira

      사내 내재화 프로젝트의 웹사이트에 기능 추가 및 코드 리팩토링, 성능 개선을 진행했습니다. 

      학습을 위해 분석/설계 부터 개발을 진행했으며

      기존 코드를 MVC 패턴으로 구조화하고, 하드코딩 된 부분들을 데이터베이스 기반으로 변경했으며 

      고립성과 확장성을 고려하여 데이터베이스 테이블을 재설계 했습니다. 

      Redis 캐싱 사용 등으로 성능을 개선하였습니다.

      ### **As-Is/To-Be**

      ![image.png](attachment:1e7dc70a-f43a-4280-aaea-bce5edb250ee:image.png)

      ### 프로젝트 분석/설계

      **🔷 요구사항 명세서**

      **🔷 개발 WBS 문서**

      **🔷 ERD 설계**

      데이터베이스 재설계, 정규화 - 3NF를 목표

      ● 확장성 고려
      ex) 공장, 창고 테이블이 2개 존재하던 것에서 기업, 캠퍼스, 빌딩, 층, 라인… 계층적 구조로 설계

      ● 고립성과 재사용성 고려
      primary key를 AUTO_INCREMENT와 FOREIGN KEY로 설계.
      단일 테이블에 모든 정보를 다 넣지 않고 고립성과 재사용성을 고려

      ● 인덱스
      캠퍼스 테이블에 대해 위치id, 유저 세팅 테이블에 유저id

      → 조회 성능 향상

      ● 고려한 개선점
      varchar로 되어있는 PK를 FK/조인용으로 INT surrogate key로 변경
      ENUM, Lookup 테이블 사용

      ### 기능 개발

      1. 웹 디자인 = 전면 변경

      2. 지도 확대 = 국가 선택 시 해당 국가 맵으로 이동. 
      통일감을 위해 python으로 도트 맵 생성.
      이미지 파일을 canvas에 그린 후 픽셀 색상 정보를 가져온다. 그것을 일정 간격으로 자르고 해당 영역에 어두운 픽셀 있으면 <div class=”dot”>을 넣어서 도트 맵 생성.

      +) html2canvas 라이브러리로 특정 요소를 캡쳐하고 Canvas 객체로 바꾸어 그 데이터를 Data Url로 바꾸어 이미지 다운

      ![image.png](attachment:63f46a5c-1ef0-4b76-b3ea-3bfb4c202161:image.png)

      1. 캠퍼스 정보 = hover, click 시 캠퍼스 정보 확인. 
      캠퍼스 명, 현지 시간, 환율, 날씨, 캠퍼스 위치 표시. 
      캠퍼스 즐겨찾기 추가 및 삭제 가능. 
      레이아웃 업데이트 시 알림. 각 campus가 위치한 도시 표기. 
      즐겨찾기 한 캠퍼스는 목록으로 메인 페이지에서 확인 가능

      ![image.png](attachment:d44db5dd-75b9-4c9f-8d2e-232a9f7fea00:image.png)

      1. 캠퍼스 스케줄 = 캠퍼스 스케줄 관리 가능. 
      일정 현황 확인, 달력에 해당 국가의 공휴일 표시. 엑셀로 일괄 업로드, 다운로드

      ![image.png](attachment:39f7def4-3640-47a4-9063-1fecdd4da78a:image.png)

      1. 공지 = 공지 관리, 파일 업로드, 이미지 미리 보기, 
      공지 기한 설정, 공지 노출 허용 유저 설정, 공지 상단 고정

      +) AWS S3 서명 URL
      = S3를 비공개로 설정하고 특정 객체에 일정 시간 동안 접근 가능한 임시 링크를 제공하여 안전하게 조회할 수 있게 함

      2. 레이아웃 업데이트 = 업데이트 시 알림. 알림 기간 설정 가능

      3. 사용자 개별로 자주 사용하는 UI 즐겨 찾기, 순서 변경 기능

      ![image.png](attachment:98dd76ed-a199-48e2-bd49-b4169afe970e:image.png)

      1. 한/영 국제화. 사용자 별 기본 언어 설정 가능

      2. 뉴스 = 유저 정보 기반 키워드로 뉴스 웹 크롤링 후 목록 제공
      +) Cheerio 활용 = 네이버에서 지정 키워드를 기반으로 검색했고, HTML을 jquery로 조작할 수 있게 하는 라이브러리를 활용하여 원하는 검색 결과 HTML 속에서 원하는 정보를 가져왔다. 

      ### Refactoring

      1. MVC 패턴 
      = 백엔드를 Model, Controller, Service, Routes로 분리
          
          + 공통 함수를 Utils폴더 내로 분리. Scheduler 따로 분리
          
          - 코드 유지 보수성 향상
          - 각 모듈 역할 명확히 분리
          - 반복 작업과 함수 재 사용성 향상
      2. 데이터 베이스 기반 = 하드 코딩 된 부분을 데이터 베이스 기반으로 변경.
          - 유연성 확보
          - 동적 관리 가능

      ### 기능 개선

      Redis 적용 = 변경이 빈번하지 않은 데이터 redis 캐싱 적용 → 조회 성능 향상

      +) 이미지 압축, vuedraggable(용량 많이 차지하는 라이브러리) 코드 직접 구현 등…

      ⇒ Lighthouse통해 성능 개선 확인

      ![image.png](attachment:998a250f-bad0-4d50-aa89-a90edc01f69a:image.png)

      ## 고려한 추가 성능 향상 방안

      배포 시 정적 파일은 캐싱, compression (gzip)

      FCP,LCP점수 개선

      node.js cluster mode 사용
    `
  },
  {
    title: "Library - Bible",
    description: "library web",
    technologies: ["Python", "PyTorch", "Mediapipe"],
    image: "/web_portfolio/assets/image/projects/test.jpg",
    desciprtion:`![image.png](attachment:159d14ac-341a-4b3b-b93e-fa0cf9c936f5:f25496cb-0b45-450a-a094-9fba959e7d88.png)

# Bible - 온라인 도서 대여 서비스

<aside>

**도서 검색 및 추천, 대여 및 예약, 구매 기능을 제공하며,**

**관리자 기능을 통해 원활한 운영 및 관리가 가능하게 한다.**

</aside>

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

![image.png](attachment:9c537ffd-577b-4391-b177-80b995a0fd3e:image.png)

## 형상 관리 및 협업 툴

Notion, Googl Drive, drow.io, git, Figma

## ERD

![image.png](attachment:d7e0daf2-717a-49d2-a35f-4a58e2526ff9:image.png)

## 화면 설계

![image.png](attachment:c7961f5c-fe65-4a48-aafc-0ae367b35e34:edfcbe9b-495f-4c44-9c09-994f0914c5b9.png)

![image.png](attachment:2651f408-c45a-47d8-b688-6b64e3a10a8a:image.png)

## 시스템 구성도

![image.png](attachment:77d7c42f-a079-4fc2-b826-b36be2627039:image.png)

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

![image.png](attachment:d55f907e-878e-418e-b6d6-173ba2f9149b:image.png)

### 📖 장바구니

![image.png](attachment:02f66aaf-4ea2-4731-8bf5-557c1c86c4c2:image.png)

### 📖 구매 페이지

![image.png](attachment:3a2d54bd-e975-4a46-ab69-61b52a0560e4:image.png)

### 📖 Toss 결제

![image.png](attachment:1d7f6bbf-1921-46aa-9e4f-8b81c6e85ee5:image.png)

### 📖 구매 기록 확인 - 마이 페이지

![image.png](attachment:52b3a140-1cd6-427d-9cfb-13195c28c4d6:image.png)

### 📖  책 목록 관리

![image.png](attachment:8f2606c3-a8ca-4a29-8a02-dbe6aabda211:image.png)

### 📖 구매 기록 확인 - 관리자

![image.png](attachment:a8e73a58-a21e-44f8-8d1d-0c52a9e7daba:image.png)

![image.png](attachment:10cf0518-a736-4f56-9d94-2eb6ee3d6fae:image.png)

![image.png](attachment:766d53b6-fc0b-4278-a727-6a9c8f9248f6:image.png)

![image.png](attachment:0ff72612-c1c8-4e00-a7dd-3acf1af4a897:image.png)

![image.png](attachment:400c0870-bf15-4b0f-8ca2-7c99a5c3d158:image.png)

시연 영상
`


  },
  {
    title: "아무개전",
    description: "Classifies walking, running, and standing from webcam data.",
    technologies: ["Python", "PyTorch", "Mediapipe"],
    image: "/web_portfolio/assets/image/projects/test.jpg",
    desciprtion:`
    
    ### 개발 기획

    [아무개전](https://www.notion.so/73ed0b6a89fe47c69faf998ded771f97?pvs=21) 

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

    ![아트에 기획 전달을 위한 스케치](https://prod-files-secure.s3.us-west-2.amazonaws.com/22898de6-20ca-4258-9acb-dde4e60c7149/207eff1c-9b12-4161-b1ae-e03681e1798c/Notes_240707_200249_1_(1).jpg)

    아트에 기획 전달을 위한 스케치

    ![지하국대적.PNG](https://prod-files-secure.s3.us-west-2.amazonaws.com/22898de6-20ca-4258-9acb-dde4e60c7149/2bf7bc81-6adf-47a0-a1e8-1ad6a1ada401/f13875fe-a4c3-462e-9076-a362165e8727.png)`
  },

  //게임개발============================================================================
  {
    title: "새콤달콤 딸기공장",
    description: "Classifies walking, running, and standing from webcam data.",
    technologies: ["Python", "PyTorch", "Mediapipe"],
    image: "/web_portfolio/assets/image/projects/test.jpg",
    desciprtion:``
  },
  {
    title: "멍냥멍냥",
    description: "Classifies walking, running, and standing from webcam data.",
    technologies: ["Python", "PyTorch", "Mediapipe"],
    image: "/web_portfolio/assets/image/projects/test.jpg",
    desciprtion:``
  },
  {
    title: "ERROR",
    description: "Classifies walking, running, and standing from webcam data.",
    technologies: ["Python", "PyTorch", "Mediapipe"],
    image: "/web_portfolio/assets/image/projects/test.jpg",
    desciprtion:``
  },

  //기타============================================================================
  {
    title: "baseball info",
    description: "Classifies walking, running, and standing from webcam data.",
    technologies: ["Python", "PyTorch", "Mediapipe"],
    image: "/web_portfolio/assets/image/projects/test.jpg",
    desciprtion:``
  },
  {
    title: "쭐래쭐래",
    description: "Classifies walking, running, and standing from webcam data.",
    technologies: ["Python", "PyTorch", "Mediapipe"],
    image: "/web_portfolio/assets/image/projects/test.jpg",
    desciprtion:``
  },
  {
    title: "Human Post Estimation",
    description: "Classifies walking, running, and standing from webcam data.",
    technologies: ["Python", "PyTorch", "Mediapipe"],
    image: "/web_portfolio/assets/image/projects/test.jpg",
    desciprtion:``
  },


];

export default projects;
