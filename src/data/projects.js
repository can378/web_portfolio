const projects = [

  //웹개발============================================================================
  {
    title: "Pluto - MCP Hub",
    short_description: "MCP Server와 AI Agent를 한 곳에서 등록·검색·공유하는 허브 서비스입니다.",
    technologies: ["vue3", "Go"],
    icon:"/web_portfolio/assets/image/icons/pluto_icon.svg",
    image: "/web_portfolio/assets/image/icons/pluto_icon.svg",
    type:"web",
    description: `
<div style="text-align:center; font-weight:bold; font-size:1.15em; line-height:1.5;">
  "MCP Server & AI Agent 공유 허브 플랫폼"
</div> 

---

**진행 일정**: 2025.06.18 ~ 2025.07.22  
**참여 인원**: 개인  
**역할**: 기획 · 설계 · 프론트엔드 · 백엔드 · 배포 전 과정 단독 수행

---

### ■ 프로젝트 개요

팀/개인이 각각 개발한 MCP Server와 AI Agent가 흩어져 있어  
어떤 도구가 있는지 찾기 어렵다는 문제를 해결하고자 시작한 프로젝트입니다.

Pluto는 MCP Server와 AI Agent를 한 곳에 모아  
**등록 → 검색 → 상세 정보 확인 → 관리**까지 할 수 있는 허브 역할을 합니다.  
새 프로젝트를 시작할 때 기존 MCP를 재활용하기 쉽게 만들어  
중복 개발을 줄이고 도구 활용도를 높이는 데에 목표를 두었습니다.

---

### ■ 기술 스택

- 백엔드: Go  
- 프론트엔드: Vue3  
- 배포: 빌드 결과를 Tar 파일로 패키징하여 서버에 업로드해 배포

---

### ■ 주요 기능

- **MCP Server / AI Agent 등록 및 관리**  
  - 사용자가 직접 MCP Server와 AI Agent 정보를 등록  
  - 등록한 리소스를 목록/상세 화면에서 확인 및 수정·삭제 가능  

- **검색 및 필터링 기능**  
  - 키워드, 카테고리, 태그 기반 검색으로 원하는 MCP를 빠르게 찾을 수 있도록 구현  
  - 상세 설명, 태그를 통해 각 서버·에이전트의 특성을 한눈에 파악 가능  

- **회원가입 및 로그인**  
  - 계정 기반으로 MCP 리소스를 관리할 수 있도록 회원 인증 시스템 구현  
  - 향후 조직/권한별 접근 제어 확장을 고려한 구조로 설계  
`
  },

  {
    title: "Web Portfolio",
    short_description: "윈도우 XP 스타일의 레트로 UI + AI 에이전트를 결합한 인터랙티브 웹 포트폴리오",
    technologies: ["React", "fastApi", "MCP", "AI agent"],
    icon:"/web_portfolio/assets/image/icons/star_icon.svg",
    image: "/web_portfolio/assets/image/icons/star_icon.svg",
    type:"web",
    description: `
<div style="text-align:center; font-weight:bold; font-size:1.15em; line-height:1.5;">
  "윈도우 XP 스타일의 레트로 UI에 AI 에이전트를 결합한 인터랙티브 웹 포트폴리오"
</div> 

---

**진행 일정**: 2025.07.09 ~ 2025.08.31  
**참여 인원**: 개인  
**역할**: 전체 기획, UI 디자인, 프론트엔드, 백엔드, AI 에이전트 설계 및 CI/CD배포

---

### ■ 프로젝트 개요

정적인 포트폴리오의 한계를 넘어
사용자가 대화로 정보를 탐색할 수 있는 AI 기반 인터랙티브 포트폴리오입니다.
“프로젝트 설명해줘”, “자격증 보여줘” 같은 자연어로 포트폴리오 탐색이 가능합니다.

아이콘을 클릭하면 창이 열리고 드래그로 이동도 가능하는 등
Windows XP UI에 영감을 받아 조금 더 재미있고 색다른 방식으로 제 포트폴리오를 경험할 수 있도록 설계했습니다.

---

### ■ 기술 스택

#### 백엔드
- FastAPI — Python 웹 프레임워크  
- LangChain + Groq LLM (Llama3-70b-8192) — AI 에이전트 시스템  
- MCP (Model Context Protocol) — AI 도구  
- Gmail API — 이메일 전송 서비스  
- Docker, Oracle Cloud 서버 Github Actions를 통해 CI/CD 파이프라인

#### 프론트엔드
- React 19.1.0 + Vite  
- react-draggable — 창 이동 시스템  
- CSS Modules  
- GitHub Pages — 프론트 배포  

---

### ■ 주요 기능

- **AI 에이전트 서비스**  
  - 자연어 질의로 프로젝트/경력/스킬 등의 정보를 자동 탐색  
  - MCP 도구 호출로 실제 데이터 조회 후 응답 생성  

- **창 기반 인터페이스 (Window Manager)**  
  - Windows XP UI 스타일  
  - 창 이동, 최소화/최대화, Z-index 관리, 아이콘 클릭으로 실행  

- **이메일 서비스**  
  - Gmail API로 실제 이메일 전송 가능  

- **운영/보안 기능**  
  - Rate Limiting 적용으로 비정상적인 다량 요청이나 봇 공격으로부터 API를 보호하고 서버 안정성을 향상
  - 상세 로깅 시스템 구축  
  - CORS 설정

---

### ■ 디자인 특징
- 레트로 스타일: Windows 95/98 클래식 UI  
- 반응형 디자인: 모바일 · 데스크톱 모두 지원  
  `
  },
  {
    title: "자산화",
    short_description: "시연용 프로젝트 웹사이트 기능 추가 및 코드 리팩토링, 성능 개선",
    technologies: ["Vue3+Nuxt3 ", "Node.js+Express"],
    icon:"/web_portfolio/assets/image/icons/metafactory_icon.svg",
    image: "/web_portfolio/assets/image/icons/metafactory_icon.svg",
    type:"web",
    description: `
<div style="text-align:center; font-weight:bold; font-size:1.15em; line-height:1.5;">
  "시연용 프로젝트 웹사이트 기능 추가 및 코드 리팩토링, 성능 개선"
</div>

---

**진행 일정:** 2025.03.17 ~ 2025.04.20 (분석/설계:10일, 개발:15일)

**참여 인원:** 개인

**역할:** 분석, 설계, 데이터베이스 재설계, 백엔드/프론트 개발, 리팩토링, 배포

---

### ■ 프로젝트 개요

기존 시연용 웹사이트는 하드코딩된 데이터, 비효율적인 구조, 중복된 로직 등으로  
기능 확장과 유지보수가 어려운 상태였습니다.

이를 해결하기 위해  
전체 구조 분석, MVC 기반 리팩토링, DB 재설계, 기능 확장, 성능 개선까지  
전 과정을 수행했습니다.

특히 공장/창고의 구조를 DB로 유연하게 표현하고 
자주 변경되지 않는 데이터는 Redis 캐싱으로 성능을 높였으며,  
유저별 즐겨찾기, 스케줄 관리, 공지, 레이아웃 업데이트 등
사용자의 편의성과 경험을 실질적으로 향상시키는 기능들을 실제 서비스 수준으로 구현했습니다.

---

### ■ 기술 스택

Frontend

- Framework: Vue3 (with Composition API), Nuxt3
- UI Library: Vuetify3 (with Material Design Icons)
- State Management: Pinia
- HTTP Client: Axios
- Bundler: Vite
- Other: Integration with Unity WebGL builds


Backend

- Runtime: Node.js
- Web Framework: Express
- Database: MariaDB (mariadb package)
- HTTP Client: Axios
- Web Scraping: Cheerio (for news)
- Task Scheduling: node-schedule
- API Documentation: Swagger (swagger-jsdoc, swagger-ui-express)
- Authentication: jsonwebtoken
- Other: CORS, dotenv


프로젝트 진행 관리: jira

---

### ■ CI/CD

GitHub Actions로 코드 변경 시  
- Docker Image 자동 Build  
- Amazon ECR Push  
- EC2에 새로운 Container 자동 Deploy  

---

### ■ 프로젝트 분석/설계

**🔷 As-Is/To-Be**

<table style="width:100%; border-collapse:collapse; margin-top:10px;">
  <thead>
    <tr style="background:#f7f7f7;">
      <th style="border:1px solid #ccc; padding:8px; text-align:center;">항목</th>
      <th style="border:1px solid #ccc; padding:8px; text-align:center;">As-Is (기존)</th>
      <th style="border:1px solid #ccc; padding:8px; text-align:center;">To-Be (개선/구현)</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td style="border:1px solid #ccc; padding:8px;">공지사항 표시</td>
      <td style="border:1px solid #ccc; padding:8px;">전체 공지 노출</td>
      <td style="border:1px solid #ccc; padding:8px;">사용자 권한, 기한 기반 공지 필터링</td>
    </tr>
    <tr>
      <td style="border:1px solid #ccc; padding:8px;">공지사항 수정</td>
      <td style="border:1px solid #ccc; padding:8px;">공지사항 조회만 가능</td>
      <td style="border:1px solid #ccc; padding:8px;">공지사항 수정/삭제 추가, 첨부 파일 업로드, 고정 핀</td>
    </tr>
    <tr>
      <td style="border:1px solid #ccc; padding:8px;">지도</td>
      <td style="border:1px solid #ccc; padding:8px;">위치만 표기</td>
      <td style="border:1px solid #ccc; padding:8px;">레이아웃 변경 시 업데이트 뱃지 표기, 기간 설정, 지역 확대</td>
    </tr>
    <tr>
      <td style="border:1px solid #ccc; padding:8px;">생산 스케줄</td>
      <td style="border:1px solid #ccc; padding:8px;">미지원</td>
      <td style="border:1px solid #ccc; padding:8px;">조회/등록/수정/삭제, 엑셀 업로드/다운로드, 공장 시간대 및 휴일 반영</td>
    </tr>
    <tr>
      <td style="border:1px solid #ccc; padding:8px;">UI 즐겨찾기</td>
      <td style="border:1px solid #ccc; padding:8px;">미지원</td>
      <td style="border:1px solid #ccc; padding:8px;">사용자별 메뉴 즐겨찾기, 순서 변경, 검색</td>
    </tr>
    <tr>
      <td style="border:1px solid #ccc; padding:8px;">공장 즐겨찾기</td>
      <td style="border:1px solid #ccc; padding:8px;">미지원</td>
      <td style="border:1px solid #ccc; padding:8px;">공장별 즐겨찾기 추가/삭제, 마커로 지도에 표시, 리스트 제공</td>
    </tr>
    <tr>
      <td style="border:1px solid #ccc; padding:8px;">언어 지원</td>
      <td style="border:1px solid #ccc; padding:8px;">한국어만 지원</td>
      <td style="border:1px solid #ccc; padding:8px;">영어/한국어 국제화(i18n) 적용</td>
    </tr>
    <tr>
      <td style="border:1px solid #ccc; padding:8px;">파일 저장</td>
      <td style="border:1px solid #ccc; padding:8px;">미지원</td>
      <td style="border:1px solid #ccc; padding:8px;">AWS S3 + 서명 URL로 보안 강화</td>
    </tr>
    <tr>
      <td style="border:1px solid #ccc; padding:8px;">마이페이지</td>
      <td style="border:1px solid #ccc; padding:8px;">미지원</td>
      <td style="border:1px solid #ccc; padding:8px;">유저 본인의 정보 확인</td>
    </tr>
    <tr>
      <td style="border:1px solid #ccc; padding:8px;">뉴스</td>
      <td style="border:1px solid #ccc; padding:8px;">미지원</td>
      <td style="border:1px solid #ccc; padding:8px;">스마트 팩토리 관련 뉴스 항목 조회</td>
    </tr>
  </tbody>
</table>



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
    title: "Library Website - Bible",
    short_description: "온라인 도서 대여 서비스",
    technologies: ["Vue2", "Spring Boot", "Docker", "Azure"],
    icon:"/web_portfolio/assets/image/icons/bible_icon.svg",
    image: "/web_portfolio/assets/image/icons/bible_icon.svg",
    type:"web",
    description:`
<div style="text-align:center; font-weight:bold; font-size:1.15em; line-height:1.5;">
  "온라인 도서 대여 서비스"
</div>

---

**진행일정**: 2025.02.03 ~ 2025.02.14

**참여 인원**: 5명

**벤치마킹**: 교보문고


도서 검색 및 추천, 대여 및 예약, 구매 기능을 갖춘 온라인 도서관 웹서비스로

유저 기능과 관리자 기능을 모두 포함하는 실제 운영 형태와 유사한 웹사이트를 개발했습니다.

백엔드 API, 외부 연동 기능, 관리자 기능 UI, 부가 기능(문자 전송·QR·S3·결제 등..)을 중심으로 담당했습니다.

---

### ■ Github
<a href="https://github.com/hyeran0920/Bible.git" target="_blank" rel="noopener noreferrer">
https://github.com/hyeran0920/Bible.git
</a>

---

### ■ 기술 스택
- **Frontend**: Vue2  
- **Backend**: Spring Boot  
- **Infra**: Docker, Azure  
- **Storage**: AWS S3, Redis  

---

### ■ 형상 관리 및 협업 툴
Notion, Google Drive, draw.io, Git + GitHub, Figma, ERD Cloud

---

### ■ 담당 기능

- **REST API 설계 및 백엔드 구현**
  - 도서, 유저, 대여/예약 관련 CRUD API 설계 및 개발

- **QR 기능**
  - 도서/유저 정보를 QR로 생성 및 인식
  - 데이터 변조 방지를 위한 암호화 적용

- **파일 관리 기능**
  - 이미지/문서 파일을 AWS S3에 업로드/조회
  - 서명 URL을 적용해 안전한 접근 방식 구현

- **웹소켓 알림**
  - 예약 만료, 도서 상태 변경 등 실시간 알림 처리

- **문자 발송(coolsms)**  
  - 인증번호, 예약 안내 등 SMS 발송 기능 구현

- **스케줄러**
  - 예약 만료·대여 기간 자동 처리 등 배치 작업 구현

- **Excel 업로드·다운로드**
  - Apache POI 기반 도서 데이터 일괄 등록 및 관리

- **장바구니 + 결제(toss API)**
  - 주문 생성, 결제 승인/실패 처리 로직 구현

- **마이페이지·관리자 페이지 디자인 및 일부 기능 구현**

- **Redis 도입**
  - 자주 조회되는 데이터 캐싱하여 응답 성능 개선

- **국제화(i18n)**
  - 다국어(한국어/영어) 지원

---

### ■ 개발 환경


<div style="width:100%; display:flex; justify-content:left;">
  <div style="width:100%; max-width:900px;">
    <img 
      src="/web_portfolio/assets/image/projects/bible/개발환경.png" 
      style="width:100%; height:auto; border:1px solid #ddd; border-radius:6px;" 
    />
  </div>
</div>

---

### ■ 시스템 구성도

<div style="width:100%; display:flex; justify-content:left;">
  <div style="width:100%; max-width:900px;">
    <img 
      src="/web_portfolio/assets/image/projects/bible/시스템구성도.png" 
      style="width:100%; height:auto; border:1px solid #ddd; border-radius:6px;"
    />
  </div>
</div>

---

### ■ ERD

<div style="width:100%; display:flex; justify-content:left;">
  <div style="width:100%; max-width:900px;">
    <img 
      src="/web_portfolio/assets/image/projects/bible/erd.png" 
      style="width:100%; height:auto; border:1px solid #ddd; border-radius:6px;"
    />
  </div>
</div>

---

### ■ 화면 설계

<div style="width:100%; display:flex; justify-content:left; margin-bottom:10px;">
  <div style="width:100%; max-width:900px;">
    <img 
      src="/web_portfolio/assets/image/projects/bible/화면설계1.png" 
      style="width:100%; height:auto; border:1px solid #ddd; border-radius:6px; margin-bottom:10px;"
    />
  </div>
</div>

<div style="width:100%; display:flex; justify-content:left;">
  <div style="width:100%; max-width:900px;">
    <img 
      src="/web_portfolio/assets/image/projects/bible/화면설계2.png" 
      style="width:100%; height:auto; border:1px solid #ddd; border-radius:6px;"
    />
  </div>
</div>


`
  },
  {
    title: "아무개전",
    short_description: "Unity 2D 조선풍 로그라이크 PC게임 개발",
    technologies: ["C#", "Unity"],
    icon:"/web_portfolio/assets/image/icons/spirit_icon.svg",
    image: "/web_portfolio/assets/image/icons/spirit_icon.svg",
    type:"game",
    description:`
<div style="text-align:center; font-weight:bold; font-size:1.15em; line-height:1.5;">
  "Unity 2D 조선풍 로그라이크 PC게임 개발"
</div>

---

**진행 일정:** 2023.09 - 현재 개발 완료 후 아트 제작 중

**참여 인원:** 3인

**장르:** 2D 조선풍 로그라이크 / 스테이지 기반 진행

**챕터:** 저퀴-그슨대-장산범-지하국대적

---

### ■ 프로젝트 개요

로그라이크 PC 게임으로 한국 요괴와 조선풍 분위기를 활용해 

스테이지마다 무작위 배치된 방, 다채로운 적을 구현한 프로젝트입니다.

플레이어는 다양한 무기와 스킬을 조합하며 방을 돌파하고  

최종 보스인 지하국대적에게 납치된 여동생을 구하는 스토리입니다.

전체 시스템 개발, Enemy, 미로 생성, UI·플레이어 로직, 기획 및 아트를 담당했습니다.

---

### ■ Github
<a href="https://github.com/can378/SpiritGameProject.git" target="_blank" rel="noopener noreferrer">
https://github.com/can378/SpiritGameProject.git
</a>

---

### ■ 기획
<a href="https://brazen-artichoke-628.notion.site/9703d0b12d374601b6857d143bb52cfa?source=copy_link" target="_blank" rel="noopener noreferrer">
아무개전 기획
</a>

---

### ■ 기술 스택
- Unity 2D
- C#

---

### ■ 담당 분야

- **플레이어 시스템**
  - 이동, 점프, 피격, 무기 사용 등 기본 동작 구현
  - 스킬 시스템 설계 및 UI 반영

- **Enemy / Boss 시스템**
  - 일반 몬스터 및 보스 패턴 개발
  - Enemy AI 이동/추격 로직, 공격 패턴 구현
  - 챕터별 Enemy 세팅 및 데이터 로드 구조 개발

- **게임 진행 구조**
  - 스테이지 전환 구조
  - 리스폰/게임 클리어 조건 처리

- **UI/UX**
  - 인벤토리 및 상태 UI
  - 게임 설정 메뉴 및 오디오 시스템 구현

- **데이터 관리**
  - JSON 기반 로컬 데이터 저장/로드 시스템 자체 구현

- **기획 및 아트 참여**
  - 스토리 구조, 챕터 구분 및 난이도 설계
  - 일부 배경 / 오브젝트 컨셉 아트 제작

`
  },

  //게임개발============================================================================
  {
    title: "새콤달콤 딸기공장",
    short_description: "Classifies walking, running, and standing from webcam data.",
    technologies: ["Python", "PyTorch", "Mediapipe"],
    icon:"/web_portfolio/assets/image/icons/strawberry_icon.svg",
    image: "/web_portfolio/assets/image/icons/strawberry_icon.svg",
    type:"game",
    description:`
<div style="text-align:center; font-weight:bold; font-size:1.15em; line-height:1.5;">
  "Unity 2D Android 캐주얼 게임. 딸기를 키우고 수집하여 돈을 버는 게임입니다."
</div>

---

**진행 일정**: 2022.01 ~ 2023.02 

**참여 인원**: 팀파머 (7인)

---

### ■ Github
<a href="https://github.com/Team-Farmer/Strawberry" target="_blank" rel="noopener noreferrer">
https://github.com/Team-Farmer/Strawberry
</a>

---

### ■ 기술 스택

Unity 2D

### ■ 지원 플랫폼

Android

---

### ■ 담당 개발

연구, 아르바이트, 도전 과제 시스템, 미니 게임, 오디오 등..개발

<div style="width:100%; display:flex; justify-content:left; margin-bottom:10px;">
  <div style="width:100%; max-width:700px;">
    <img 
      src="/web_portfolio/assets/image/projects/berry/berry1.png" 
      style="width:100%; height:auto; border:1px solid #ddd; border-radius:6px;"
    />
  </div>
</div>

<div style="width:100%; display:flex; justify-content:left; margin-bottom:10px;">
  <div style="width:100%; max-width:700px;">
    <img 
      src="/web_portfolio/assets/image/projects/berry/berry2.png" 
      style="width:100%; height:auto; border:1px solid #ddd; border-radius:6px;"
    />
  </div>
</div>

<div style="width:100%; display:flex; justify-content:left; margin-bottom:10px;">
  <div style="width:100%; max-width:700px;">
    <img 
      src="/web_portfolio/assets/image/projects/berry/berry3.png" 
      style="width:100%; height:auto; border:1px solid #ddd; border-radius:6px;"
    />
  </div>
</div>

<div style="width:100%; display:flex; justify-content:left; margin-bottom:10px;">
  <div style="width:100%; max-width:700px;">
    <img 
      src="/web_portfolio/assets/image/projects/berry/berry4.png" 
      style="width:100%; height:auto; border:1px solid #ddd; border-radius:6px;"
    />
  </div>
</div>

<div style="width:100%; display:flex; justify-content:left;">
  <div style="width:100%; max-width:700px;">
    <img 
      src="/web_portfolio/assets/image/projects/berry/berry5.png" 
      style="width:100%; height:auto; border:1px solid #ddd; border-radius:6px;"
    />
  </div>
</div>

    `
  },
  {
    title: "멍냥멍냥",
    short_description: "OpenGL · SDL2 기반 2인 협동 퍼즐 게임 (팀장/기획·개발 담당)",
    technologies: ["C++", "SDL2", "OpenGL", "Team Management"],
    icon:"/web_portfolio/assets/image/icons/dog_cat_icon.svg",
    image: "/web_portfolio/assets/image/icons/dog_cat_icon.svg",
    type:"game",
    description:`
<div style="text-align:center; font-weight:bold; font-size:1.15em; line-height:1.5;">
  "OpenGL, SDL2로 개발한 2D 2인 협동 퍼즐 게임"
</div>

---

**진행 일정**: 

2024.04.01 - 2024.06.12

2024.11.15 - 2024.11.24 (업데이트)

**참여 인원**: 4명

**역할**: 팀장, 기획, 주요 시스템 개발

<div style="width:100%; display:flex; justify-content:left; margin:10px 0 20px;">
  <div style="width:100%; max-width:700px;">
    <img 
      src="/web_portfolio/assets/image/projects/dogCat/dogcat.png" 
      style="width:100%; height:auto; border:1px solid #ddd; border-radius:6px;"
    />
  </div>
</div>

### ■ 프로젝트 개요

OpenGL, SDL2로 개발한 로컬 2인 협동 퍼즐 게임입니다.  

한 대의 PC에서 강아지와 고양이 캐릭터를 각각 조작하여  

오지 않는 주인을 마중 나가기 위해 집 안의 다양한 방을 함께 클리어하는 구조입니다.



각 캐릭터는 서로 다른 제약과 능력(액체화, 냄새 맡기 등)을 가지고 있어  

혼자서는 클리어할 수 없고 협동을 해야지만 클리어할 수 있도록 레벨을 디자인 했습니다.

저는 팀장으로서 전체 기획, 게임 구조 설계, 주요 시스템 개발을 담당했습니다.


---

### ■ Github
<a href="https://github.com/can378/SDLGame.git" target="_blank" rel="noopener noreferrer">
  https://github.com/can378/SDLGame.git
</a>

---

### ■ 기술 스택
- C++
- SDL2
- OpenGL

---

### ■ 영상
<a href="https://youtu.be/SdC8TNcZ2sU?si=pcIDDEzaBsRHx351" target="_blank" rel="noopener noreferrer">
  유튜브 플레이 영상 보러가기
</a>

---

### ■ 개발 파트

- 게임 인트로, 매뉴얼, 게임 스테이지 등등 게임 phase interface 설계
- 물체들 간의 충돌 감지(위치, 크기, 물체 간 거리 기반)

- 게임 캐릭터가 딛고 서있는 발판 구현 - 점프+중력 구현 후 모든 terrain에 접촉하면 이동하지 못하도록 막게 구현
- 게임 캐릭터 이동 조작 구현
- 게임 캐릭터 스킬 구현 
    “강아지가 냄새 맡기”로 occlusion 투명도 조절로 가려진 것을 확인하는 스킬
    “고양이 액체화”로 좁은 틈 이동. 특정 캐릭터에만 충돌하도록 구현. 해당 상태일 때 애니메이션 변경으로 상태 확인 가능

- 버튼을 누르면 이동하는 발판 구현. 여러 버튼과 여러 발판이 연결되도록 연결. 발판의 위치는 단지 직선이 아닌 방향 벡터와 이동 거리 계산으로 특정 어느 방향으로도 일정한 속도로 이동할 수 있게 구현

- 특정 오브젝트(쿠션) 닿으면 점프력 증가
- 특정 캐릭터(강아지)만 박스를 밀 수 있도록 구현
- 접촉하면 투명도 낮아진 끝에 사라지는 발판
- 열쇠와 자물쇠 구현. 열쇠를 얻은 캐릭터만 자물쇠 해제 가능
- 맵 별 구조 배치
- 게임 스테이지별 시작, 엔딩 구현 - 스테이지 시작시 특정 위치에서 시작. 특정 오브젝트에 두 캐릭터가 모두 접촉하면 게임 클리어

---

### ■ 업데이트

- 신규 맵 2개 추가  
- 신규 오브젝트 5개 추가  
  (램프, 흔들 발판, 텔레포트, 로봇청소기 등)

---

### ■ 게임 설명서
<a href="/web_portfolio/assets/pdf/dogCat.pdf" download>명냥 게임 설명서 다운로드</a>

<div style="width:100%; display:flex; justify-content:left; margin:10px 0 0;">
  <div style="width:100%; max-width:700px;">
    <img 
      src="/web_portfolio/assets/image/projects/dogCat/dogcat2.jpg" 
      style="width:100%; height:auto; border:1px solid #ddd; border-radius:6px;"
    />
  </div>
</div>
    `
  },
  //기타============================================================================
  {
    title: "Warehouse Digital Twin",
    short_description: "Metafactory Warehouse Digital Twin",
    technologies: ["Python", "Unity","FastAPI"],
    icon:"/web_portfolio/assets/image/icons/warehouse_icon.svg",
    image: "/web_portfolio/assets/image/icons/warehouse_icon.svg",
    type:"AI",
    description:`
<div style="text-align:center; font-weight:bold; font-size:1.15em; line-height:1.5;">
  "Unity 3D Warehouse Digital Twin"
</div>

---

**진행 일정**: 2025.07.02 - 2025.09.04    
**참여 인원**: Unity 개발 2명, 디자인 2명, WPF 2명  
**역할**: 백엔드 단독 개발 + Unity 기능 다수 구현

---

### ■ 프로젝트 개요

본래는 실제 창고 데이터를 연결해 운영 상태를 시각화하는 디지털 트윈 프로젝트를 수행하지만  

이 프로젝트는 사이드 프로젝트로 진행했기 때문에 가상의 3D 창고를 Unity에서 구현하고  

Python FastAPI + MariaDB 기반으로 데이터를 관리 하도록 개발했습니다.

Unity에서는 AGV 이동, 배치 저장 시각화, 녹화, AI Detection, 카메라 포커싱, 날씨 효과 등 실제 서비스 수준의 기능을 구현했습니다.

---

### ■ 개발 환경

- Unity 3D  
- Python FastAPI  
- WPF (협업팀)  
- MariaDB  
- AWS (EC2, ECR, GitHub Actions CI/CD)

---

### ■ 담당 분야

#### 1. 백엔드
#### DB 설계 및 API 전담 구현  
  - 기존에 TXT 파일로 저장되던 데이터를 **MariaDB**로 관리하기 위해 데이터베이스 설계 및 API 개발.  
  - 창고의 **배치, 물품, 적재 상품 정보** 등을 저장하는 데이터베이스를 설계.  
  - **Python FastAPI**를 활용하여 백엔드 서버 구현.
  - Githun actions를 통한 AWS CI/CD  


#### 2. Unity 기능

#### AGV (Automated Guided Vehicle)
- Unity **NavMesh**를 활용하여 AGV가 지정된 지점들을 최적 경로로 이동하도록 구현.  

#### Snapshot 기능
- 사용자가 원하는 위치에 랙(Rack) 등의 오브젝트를 배치하고 상태를 저장할 수 있는 기능 구현.  
- 오브젝트의 삭제, 수정, 추가, 스냅샷 추가 및 이름 변경 가능.  

#### Recording 기능
- Unity에서 캡처한 화면을 **FFmpeg**으로 인코딩하여 런타임 녹화 기능 구현 
  - Unity 상에서 사용자가 보고 있는 화면 녹화.  
  - 미리 지정한 경로를 일정 속도로 촬영.  
  +) 경로 촬영 시 Unity 내부의 배속 처리를 적용하여 실제 촬영 시간을 단축하고 원하는 영상을 효율적으로 추출 가능.  

#### AI Detection 기능
- 실제 카메라 실시간 영상을 AI 모델로 분석한 결과(사람/차량 위치)를 Unity에 반영.  
- 사람의 경우 **애니메이션 적용**.  
- 물체 생성에는 **오브젝트 풀링(Object Pooling)** 도입.  

#### MCP AI Agent
- **MariaDB**에 저장된 데이터를 기반으로 API 호출·조회.  
- **ChatGroq** 및 **LLaMA 3 모델**을 연동하여 **AI Agent** 기능 구현.  

#### Focusing 기능
- **Cinemachine**을 사용하여 지정된 오브젝트들을 카메라가 한 화면에 담아 **자동 포커싱**.  

#### 날씨 구현
- **Particle System**으로 눈, 비, 안개 효과 구현.  
- **Light intensity, Fog, Skybox** 조절을 통해 흐림 효과 및 시간 변화 구현.  

#### 리팩토링
- 일부 **Coroutine**을 **UniTask**로 대체하여 비동기 처리 효율성 향상.  
- Update 문에서 Find 대신 **Inspector 직접 연결 방식**으로 개선.  
등..

### Git 도입
- 프로젝트 용량으로 인해 code catalyst 사용 도입

    `

  },
  {
    title: "Human Pose Estimation",
    short_description: "Human pose estimation + action recognition",
    technologies: ["Python", "PyTorch", "Mediapipe"],
    icon:"/web_portfolio/assets/image/icons/pose_icon.svg",
    image: "/web_portfolio/assets/image/icons/pose_icon.svg",
    type:"AI",
    description:`
<div style="text-align:center; font-weight:bold; font-size:1.15em; line-height:1.5;">
  "MediaPipe를 활용한 human pose estimation + action recognition"
</div>

---

**진행 일정**: 2024.08 1주  
**참여 인원**: 개인

---

### ■ 개발 환경

- Python, Jupyter Notebook  
- Mediapipe Holistic  
- numpy, pandas, metaplotlib …

---

### ■ 프로젝트 개요

웹캠 기반 실시간 Pose Keypoints(관절 좌표)를 추출하고  
이를 기반으로 5가지 동작(neutral / walking / running / crouch / crouch-walk)을 분류하는 모델을 제작했습니다.

단순 Rule-based → 전통 ML → LSTM 딥러닝 모델까지  
3가지 접근을 모두 실험해 성능을 비교한 프로젝트입니다.

---

### ■ 데이터 수집

- Mediapipe Holistic 사용  
- 총 33개 관절의 3D 좌표(x,y,z) + visibility  
- 웹캠 입력 → TXT/CSV 파일로 자동 저장  
- LSTM 입력을 위한 sequence 형태로 전처리  

---

### ■ 프로젝트, 접근 과정

**1. 관절 각도 기반 분류 (Rule-based)**

Mediapipe로 계산한 관절 각도를 기준으로 임계값 기반 단순 분류 시도.

(예: 무릎 각도(오금)가 90°인 경우 → sitting으로 판별.)

▶ 정적이고 단순한 자세(요가 포즈 등) 분류에는 유효.

▷ 하지만 동적인 동작(걷기, 달리기 등)에서는 정확도가 낮음 → 시계열적 변화를 반영하기 어려움.

<br>

**2. Ensemble 기반 분류 (전통 ML 접근)**

수집된 pose data를 CSV 파일로 저장 후 학습.

Pipeline: StandardScaler (정규화), RandomForestClassifier (앙상블 기법)

▶ 전통 ML 모델을 활용한 분류 가능성 확인.

▷ 복잡한 연속 동작 구분에는 성능 한계.

<br>

**3. LSTM 기반 시계열 분류 (딥러닝 접근)**

Sequential Model (LSTM) 구조를 사용하여 동작 시계열 패턴 학습.

데이터셋: pose data (CSV) 기반 시퀀스화.

모델 구조:

- LSTM 레이어

- Dropout

- Dense(units=5, activation="softmax") → 5가지 label(neutral, walking, running, crouch, crouchWalk) 출력

하이퍼파라미터:

- Optimizer: Adam

- Loss: sparse_categorical_crossentropy

- Epochs: 100

- Batch Size: 32

- Train/Test split: 80% / 20%

▶ 가장 효과적인 방법으로 확인됨. 동적 동작 구분에서 좋은 성능을 보임.

---

### ■ 결론

- Rule-based (관절 각도) → 단순 포즈 구분에는 유효하지만 동작 분류에는 부적합.

- Random Forest (Ensemble) → 기본적인 분류 가능하나 시계열 패턴 반영 한계.

- LSTM (Sequential Model) → 동작의 시간적 연속성을 반영하여 가장 높은 정확도를 달성. (최종)

<a href="/web_portfolio/assets/pdf/humanPoseEstimation+ActionRecognition.pdf" download>자세한 구현 설명서 다운로드</a>


---

### ■ 추후 기획

- 속도 기반 feature 추가 → walking / running 정확도 향상  

- Occlusion 보정 / smoothing / joint jittering 보강  

- 수집 데이터 확대 후 CNN-LSTM, Transformer Encoder 실험  

- 최종적으로 Unity / Unreal Engine과 연결해  
  실시간 모션 캡쳐 연동 디모(게임·트래킹) 제작 예정

---

### ■ 프로젝트 응용

운동 자세 보정, 의료 분야에서 환자의 재활을 위해 움직임 분석, 
스포츠 선수의 자세 분석, 노인 확인 용 Cctv, 애완동물 Cctv 등…
    `,
    summary:`Mediapipe로 웹캠에서 추출한 관절 좌표 데이터를 활용해
5가지 동작(neutral, walking, running, crouch, crouchWalk)을 분류하는 프로젝트를 진행(2024.08, 개인, 1주일).
관절 각도 기반 Rule-based → Ensemble(Random Forest) → LSTM 모델을 순차적으로 시도했으며
LSTM 기반 시계열 분류가 가장 효과적이었으므로 최종 선정하여 구현(정확도 약 85%).
데이터는 txt/csv로 저장 후 학습에 활용했으며 향후 속도 feature를 추가해 성능을 높이고 Unreal/Unity와 연계한 모션 캡쳐 응용을 계회입니다.`
  },


];

export default projects;
