import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import "./App.css";

type PortfolioItemBase = {
  id: string;
  category: string;
  title: string;
  tags: string[];
  type: string;
  period: string;
  description: string;
  detailImage: string;
  summary?: string;
};

type ImagePortfolioItem = PortfolioItemBase & {
  imageType: "image";
  imageContent: {
    src: string;
  };
};

type GradientPortfolioItem = PortfolioItemBase & {
  imageType: "gradient";
  imageContent: {
    text: string;
    colors: string;
  };
};

type PortfolioItem = ImagePortfolioItem | GradientPortfolioItem;

// 아이콘 컴포넌트들 (SVG)
const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-6 w-6 text-gray-800"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const GlobeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-6 w-6 text-gray-800"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);

const MoonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-6 w-6 text-gray-800"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 A7 7 0 0 0 21 12.79z"></path>
  </svg>
);

const LaptopIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.29 2.58A2 2 0 0 1 19.7 21H4.3a2 2 0 0 1-1.59-2.42L4 16" />
  </svg>
);

const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const FlagIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
    <line x1="4" y1="22" x2="4" y2="15"></line>
  </svg>
);

const UsersIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

const HandshakeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M14.5 10.5a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H13v-5h1.5z" />
    <path d="M9.5 10.5a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2H11v-5H9.5z" />
    <path d="M16 11.5a2.5 2.5 0 0 0-5 0v1a2.5 2.5 0 0 0 5 0v-1z" />
    <path d="M3 16.5v-3a2 2 0 0 1 2-2h1" />
    <path d="M21 16.5v-3a2 2 0 0 0-2-2h-1" />
  </svg>
);

const SettingsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="36"
    height="36"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-blue-500"
    {...props}
  >
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2.73l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2.73l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const MoreVerticalIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-gray-400"
  >
    <circle cx="12" cy="12" r="1"></circle>
    <circle cx="12" cy="5" r="1"></circle>
    <circle cx="12" cy="19" r="1"></circle>
  </svg>
);

const ArrowUpIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-6 w-6"
  >
    <path d="m5 12 7-7 7 7" />
    <path d="M12 19V5" />
  </svg>
);

const ShareIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <polyline points="16 6 12 2 8 6" />
    <line x1="12" y1="2" x2="12" y2="15" />
  </svg>
);

// 포트폴리오 데이터
const portfolioItems: PortfolioItem[] = [
  // 성인교육기획 (부트캠프) - 5개
  {
    id: "bootcamp-1",
    category: "성인교육기획 (부트캠프)",
    title: "커뮤니티형 교육 표준화",
    tags: ["#교육기획", "#교육설계", "#교육환경개선"],
    imageType: "image",
    imageContent: {
      src: "/kakao/community.jpg",
    },
    type: "Bootcamp",
    period: "2024.10 - 2025.01",
    description: `☝️ **한 줄 요약**
- 부트캠프 특유의 일방적인 강의 형식에서 벗어나, 수강생들이 서로 지식을 공유하고 함께 성장할 수 있는 커뮤니티 중심의 학습 환경을 구축


👩‍💻 **역할**
- 온보딩 설계: 테크 리터러시 격차를 고려한 실습 위주의 툴 학습 세션 마련. 주기별 목표 시각화로 참여 기준·방향 고정. 도구 적응–그라운드룰 합의–목표 그리기를 한 흐름으로 엮어 첫 주 안에 공통 규범과 개인 방향을 동시에 확립.
- 심리적 안전 장치 도입: 그라운드룰·행동 포스터 정립. 강의 중 이해도 투표(1~5점) 도입. 이해도 투표 결과에 따른 대처 방법 수립 (재설명·개별 보충 등). 그라운드룰을 통한 질문의 활성화.
- 자율학습 시간 리디자인 및 선택형 세션 구조화: 개인 자습 2시간을 선택형 세션 운영으로 변경. 멘토 리뷰·기록 세션·페어프로그래밍 등 다양한 선택지 제공. 당일 학습소화도 기반 자율 선택으로 참여 동력 강화. 난이도·목표 적합도에 따른 트랙화로 과부하 감소. ‘오늘 할 수 있는 것’ 중심의 경험 설계.
- 운영 표준 수립: 활동별 운영 위키 제작. 기수별 아카이브 정착. 주간 운영회의 공유 체계로 확산. 전 과정 적용 가능한 커뮤니티형 교육 표준화. 세션별 요약–자료–후속 링크 표준 템플릿 도입으로 검색성·재사용성 강화.


🥇 **성과**
- 과정 개강 후 초기 이탈자가 3명 → 0명으로 대폭 감소
- 선택형 세션 평균 참여율 20%p 이상 상승
- 모두의연구소 부트캠프 운영 중 가장 높은 운영 관련 NPS 점수 달성`,
    detailImage: "/kakao/community.jpg",
  },
  {
    id: "bootcamp-2",
    category: "성인교육기획 (부트캠프)",
    title: "동향 세미나·아카이브 구축",
    tags: ["#동향_큐레이션", "#세미나_운영", "#아카이빙", "#Github"],
    imageType: "image",
    imageContent: {
      src: "/kakao/blog.png",
    },
    type: "Bootcamp",
    period: "2024.11 - 2025.06",
    description: `☝️ **한 줄 요약**
- 비전공자 학습자도 스스로 최신 기술 동향을 탐색하고, 학습해 나갈 수 있도록 돕는 정기적 세션 운영 및 아카이브 구축

👩‍💻 **역할**
- 동향 큐레이션 프로세스 설계 : 소스 선정(컨퍼런스·테크블로그·논문) → 스크리닝 기준(실무 연계·신뢰도·난이도) → Gemini를 활용한 요약·태깅 규칙 정립으로 재현성 확보. 과정 내 담당자가 해당 프로세스를 통해 주 1회 이상 양질의 콘텐츠를 확보하고 과정 내에 전파하도록 함.
- 세미나 운영 체계화 : 과정 당 주 1회 발표-토의-후속 기록의 포맷 고정. Github Discussion 기능을 활용해 주제와 자료를 업로드 한 뒤, 동료들이 피드백을 올려 자유롭게 의견을 나눌 수 있도록 세팅.
- 커뮤니티 상호작용 활성화 : 피어리뷰 및 피어멘토링 체크리스트 제공을 통해 활동 부담감 완화 및 참여도 증대, 질문 가이드 배포로 발화 장벽 완화 및 자발적 발표 유도.
- 아카이브 표준화 : 요약·자료·후속 링크 템플릿, 태깅/검색 스키마 구축, 세션 산출물의 아카이브 귀속으로 재학습·재사용성 제고. 학습 자산을 확보하고 접근성을 높여 모든 학습자들이 편하게 자료에 접근할 수 있도록 함.

🥇 **성과**
- 105회의 세미나 진행을 통한 커뮤니티 활성화 (과정 내 자발적 모임 0회 → 4회로 증대)
- 200개 이상의 최신 동향 콘텐츠 확보 및 아카이빙
- 학습자들의 능동적인 태도 변화`,
    detailImage: "/kakao/blog.png",
  },
  // ... 다른 portfolioItems 에도 id, period, summary, description, detailImage 필드를 유사하게 추가해주세요.
  // 예시 데이터만 일부 수정했습니다.
  {
    id: "bootcamp-3",
    category: "성인교육기획 (부트캠프)",
    title: "상담 인입 자동화",
    tags: ["#Forms", "#Zapier", "#Slack", "#상담_자동매칭"],
    imageType: "image",
    imageContent: {
      src: "/kakao/forms.jpg",
    },
    type: "Bootcamp",
    period: "2024. 06 - 2024. 07",
    summary:
      "챗봇과 CRM을 연동하여 교육 과정 문의 및 상담 신청 프로세스를 자동화하고, 운영 효율성을 개선했습니다.",
    description: `☝️ **한 줄 요약**
- 기존에 여러 채널로 분산되었던 학습자 상담 요청을 Forms - Zapier - Slack 연계를 통해 일원화하고, 상담 처리 시간을 단축하여 높은 운영 만족도 달성


👩‍💻 **역할**
- 인입 채널 정비 : Discord DM 및 자유 채널·이메일·문자·전화로 흩어져 있던 문의를 Google Forms으로 통합, 단일 파이프라인 구축.
- 태그·키워드 라우팅 설계 : Zapier 연계를 통해 폼 응답이 스프레드시트에 적재되면 내용 태그에 따라 업무용 Slack에서 담당자 멘션·역할별 자동 할당.


🥇 **성과**
- 서류 발급 처리 시간이 평균 15분에서 3분 이내로 단축
- 누락·중복 대응의 감소로 운영 관련 NPS 점수가 17점 상승 (80점 > 97점)
- 모두의연구소 부트캠프 운영 중 가장 높은 운영 관련 NPS 점수 달성`,
    detailImage: "/kakao/forms.jpg",
  },
  {
    id: "bootcamp-4",
    category: "성인교육기획 (부트캠프)",
    title: "운영 대시보드 구축",
    tags: ["#SpreadSheet", "#CursorAI", "#Zapier", "#이탈_지표_트래킹"],
    imageType: "image",
    imageContent: {
      src: "/kakao/dashboard.jpg",
    },
    type: "Bootcamp",
    period: "2024. 06 - 2024. 07",
    summary:
      "수강생 데이터, 학습 진도, 만족도 등 핵심 지표를 시각화하는 운영 대시보드를 구축하여 데이터 기반 의사결정을 지원했습니다.",
    description: `☝️ **한 줄 요약**
- SpreadSheet - CursorAI를 활용한 경량 웹 - Zapier 연계를 통한 과정 전반 데이터 취합 및 이탈 위험자 트래킹을 통한 선제 상담


👩‍💻 **역할**
- 학습자 관련 데이터 수집 파이프라인 구축 (고용노동부 API를 활용한 출결 데이터 수집, Discord 활동 데이터, Github 과제 제출 데이터 등)
- 데이터 별 평균 활동 지표 설정
- 저성취자 및 참여도가 낮은 학습자의 지표 설정
- 시각적 요소가 두드러지는 대시보드로 구현하여 저성취자 및 참여도가 낮은 학습자 체크


🥇 **성과**
- 이탈 위험자 트래킹을 통해 '선제 상담' 제도 마련
- 학습자의 지표를 토대로 운영 전담 매니저가 상담을 진행하며 학습 과정 전반을 보조하고, 이탈을 적극적으로 방지`,
    detailImage: "/kakao/dashboard.jpg",
  },
  {
    id: "bootcamp-5",
    category: "성인교육기획 (부트캠프)",
    title: "K-DT 신규 제안서 작성",
    tags: ["#K-Digital Training", "#재직자_도약과정", "#제안서", "#승인"],
    imageType: "image",
    imageContent: {
      src: "/kakao/kdt.jpg",
    },
    type: "Bootcamp",
    period: "2024. 12 - 2025. 02",
    summary:
      "정부 지원 K-Digital Training 사업에 신규 과정으로 참여하기 위한 사업 계획서 및 제안서를 작성하여 성공적으로 선정되었습니다.",
    description: `☝️ **한 줄 요약**
- 고용노동부 K-Digital Training 사업의 신규 교육과정 (재직자 도약과정) 제안서 작성 및 승인


👩‍💻 **역할**
- 성인 직무 교육 시장 분석 후 교육 분야 선정 (개발자 AI, PM, AI UX, 마케팅 등)
- 각 분야 별 교육 로드맵 설계
- 교육 전담 강사진 섭외
- 교육과정 제안서 작성 및 심사 전담 (서류 심사, 인터뷰 심사)
- 교육과정 별 참여기업 모집 및 관리


🥇 **성과**
- K-DT 고성과 맞춤형 과정 1개 승인 완료
- K-DT 재직자 도약 과정 2개 승인 완료
- 총 40여개의 참여기업 신규 발굴 및 관리`,
    detailImage: "/kakao/kdt.jpg",
  },
  // K-12교육기획 - 2개
  {
    id: "k12-1",
    category: "K-12교육기획",
    title: "국립항공박물관 'A-ble' 교육 총괄",
    tags: ["#특수학생", "#SW교육", "#드론교육", "#교육기획", "#박물관교육"],
    imageType: "image",
    imageContent: {
      src: "/kakao/able.jpg",
    },
    type: "K-12",
    period: "2022.04 - 2022.12",
    description: `☝️ **한 줄 요약**
- 국토교통부 산하 국립항공박물관 'A-ble' 교육 프로그램의 총괄 기획 및 운영


👩‍💻 **역할**
- 항공문화 접근성이 낮은 장애학생에게 SW·드론 기반 항공문화 교육 제공
- 학교–박물관 연계 교육 기획 및 경험 확장
- 박물관 내 장애학생을 위한 특별교육 신설
- 박물관 내 학습 공간 조성 및 운영
- 특수교육 전담 강사 양성 및 관리


🥇 **성과**
- 국내 최초 특수학급 대상 SW 정규 교과 편성 및 차년도 운영 대상 확장
- 특수학급 대상 SW, 항공 교육 전담 강사 양성
- 대상 특성 맞춤 교구재 제작 및 과제 조작성 조정을 통한 학습 참여도·안전성 동시 확보 `,
    detailImage: "/kakao/able.jpg",
  },
  {
    id: "k12-2",
    category: "K-12교육기획",
    title: "교육부 - 한국과학창의재단 '디지털새싹' 사업 PL",
    tags: ["#초중고_맞춤형", "#블록코딩", "#PBL기반", "#협동학습", "#프로그래밍교육"],
    imageType: "image",
    imageContent: {
      src: "/kakao/disac.jpg",
    },
    type: "K-12",
    period: "2022.12 - 2023.03",
    description: `☝️ **한 줄 요약**
- 교육부, 각 시·도 교육청과 한국과학창의재단이 주관하는 '디지털새싹' 사업의 제안서, 전 과정 커리큘럼 설계, 교구재 개발, 전북권역 총괄 담당


👩‍💻 **역할**
- 디지털 역량강화를 위한 초·중·고 맞춤형 SW 교육과정 및 콘텐츠 개발
- 교육 내 활용되는 교구재 개발
- 전북권역 내 교육 운영 총괄 (13인 구성의 현장 지원팀 운영)
- 200여명 규모의 강사교육 기획 및 직접 강의


🥇 **성과**
- 전국 사업기관 중 우수 교육사례로 선정
- 겨울방학 간 8천여명의 학생에게 디지털 역량강화 교육 제공
- 19억 규모의 사업을 성공적으로 수행, 원활한 차년도 사업 수주로 이어짐 `,
    detailImage: "/kakao/disac.jpg",
  },
  // 컨퍼런스 - 4개
  {
    id: "conference-1",
    category: "컨퍼런스",
    title: "2024 MODUCON 세션 운영",
    tags: ["#개발자행사", "#컨퍼런스", "#기획", "#운영"],
    imageType: "image",
    imageContent: {
      src: "/kakao/moducon.jpg",
    },
    type: "Conference",
    period: "2024.11 - 2024.12",
    description: `☝️ **한 줄 요약**
- 연간 1만명 이상이 참석하는 '모두의연구소' 주최 'MODUCON 2024'에서 'Connect&Learn' 세션을 기획·운영

👩‍💻 **역할**
- 세션 별 연사 관리 및 커뮤니케이션 총괄
- 세션 구성 및 현장 운영 기획
- 행사 당일 현장 운영 총괄
- 멘토링 형식의 5개 세션 진행


🥇 **성과**
- 200여명 이상의 멘티가 현장에 방문하여 멘토링 세션 참여 `,
    detailImage: "/kakao/moducon.jpg",
  },
  {
    id: "conference-2",
    category: "컨퍼런스",
    title: "AI 관련 컨퍼런스 참여",
    tags: ["#개발자행사", "#AI", "#GDG", "#Google_Developer_Group"],
    imageType: "image",
    imageContent: {
      src: "/kakao/gdg.jpg",
    },
    type: "Conference",
    period: "-",
    description:
      "🎫 AI와 관련된 컨퍼런스, 특히 GDG(Google Developer Group)에서 개최하는 'Google I/O Extended', 'Build with AI' 등 다양한 행사에 직접 참여하여 여러 현업자들의 인사이트를 얻고, 커뮤니티를 구축해 나갔습니다.",
    detailImage: "/kakao/gdg.jpg",
  },
  {
    id: "conference-3",
    category: "컨퍼런스",
    title: "개발 관련 컨퍼런스 참여",
    tags: ["#개발자행사", "#K-Devcon", "#PyCon"],
    imageType: "image",
    imageContent: {
      src: "/kakao/devcon.jpg",
    },
    type: "Conference",
    period: "-",
    description:
      "🎫 개발과 관련된 컨퍼런스에 직접 참여하여 후원부스를 운영하거나, 세션을 듣고 네트워킹에 적극적으로 참여하며 커뮤니티에 속해있는 개발자들을 가까이서 접했습니다.",
    detailImage: "/kakao/devcon.jpg",
  },
  {
    id: "conference-4",
    category: "컨퍼런스",
    title: "다양한 분야의 행사 참여",
    tags: ["#HCI", "#비개발자", "#넓은_인사이트", "#네트워킹"],
    imageType: "image",
    imageContent: {
      src: "/kakao/hci.jpg",
    },
    type: "Conference",
    period: "-",
    description:
      "🎫 HCI (Human-Computer Interaction), IT기업의 비개발자 포지션(데이터 분석, TPM, 개발 교육)의 전문가들과 함께하는 행사 등에 직접 참여하여 개발자 외의 다른 직군에 있는 분들의 인사이트를 얻을 수 있었습니다.",
    detailImage: "/kakao/hci.jpg",
  },
  // 대외활동 - 2개
  {
    id: "activity-1",
    category: "대외활동",
    title: "인천 시민연구소 명예시민 연구원",
    tags: ["#SOS_LAB", "#사회문제_해결", "#퍼실리테이션"],
    imageType: "image",
    imageContent: { src: "/kakao/sos.jpg" },
    type: "Activity",
    period: "2020.08 - 현재",
    description: `☝️ **한 줄 요약**
- 인천의 아동 문제를 중심으로 아젠다를 발굴하고, SW 기술을 기반으로 문제를 해결할 수 있는 방안을 모색하는 사회 혁신 프로젝트 

👩‍💻 **역할**
- 인천시 아동학대 문제를 중심으로 아젠다 발굴 및 해결 방안 모색
- 퍼실리테이터로서 팀원 간의 원활한 소통과 협업 촉진
- 프로젝트 진행을 위한 일정 관리 및 조율
- 아이디어 테스트 및 피드백 수집

🥇 **성과**
- 아동학대 예방을 위한 부모교육 프로그램 기획 및 유관기관에 제안
- 활동에 대한 좋은 피드백을 받아 4년간 지속적으로 활동 진행
- 전문 퍼실리테이터 양성 과정을 수료하여 이후 퍼실리테이터로 해당 활동에 지속적으로 참여
- 2022년 인천 명예 시민연구원 위촉`,
    detailImage: "/kakao/sos.jpg",
  },
  {
    id: "activity-2",
    category: "대외활동",
    title: "인천 시빅테크랩 전문위원",
    tags: ["#기술기반_문제해결", "#사용자분석"],
    imageType: "image",
    imageContent: { src: "/kakao/cibic.png" },
    type: "Activity",
    period: "2021. 05 - 현재",
    description: `☝️ **한 줄 요약**
- 인천 시민들이 생활 문제를 해결하기 위한 아이디어를 제안하고, 지역 내 SW 기업과의 협업으로 기술 개발 및 사업화를 진행하는 프로젝트

👩‍💻 **역할**
- 인천시에서 발생하는 생활 문제 도출
- 문제를 해결할 수 있는 기술 기반의 아이디어 고도화
- 지역 내 SW 기업과의 협업을 통한 기술 개발 및 테스트

🥇 **성과**
- AI를 활용하여 표정으로 우울증을 진단하는 앱 서비스 기획
- 인천 내 AI 전문 기업과의 협업으로 앱 프로토타입 개발
- 인천 시빅테크랩 전문위원으로 4년째 활동 중`,
    detailImage: "/kakao/cibic.png",
  },
  // 기타 - 3개
  {
    id: "etc-1",
    category: "기타",
    title: "연세교육공학회 에듀테크 분과 스터디 운영",
    tags: ["#교육공학", "#에듀테크", "#Vibe_Coding", "#스터디"],
    imageType: "image",
    imageContent: {
      src: "/kakao/edu.png",
    },
    type: "Etc",
    period: "2024.05 - 현재",
    description:
      "📚 연세교육공학회에서 에듀테크 분과의 리드를 맡아 주기적인 스터디를 운영하고 있습니다. 에듀테크 분야의 최신 트렌드와 기술에 대한 이해를 통해 교육공학적 접근을 심도있게 하는 스터디를 운영하였습니다. 최근에는 Vibe Coding을 통해 교육현장에 적합한 형태의 서비스를 PRD 작성부터 MVP 개발까지 직접 진행하는 스터디를 운영하였으며, 많은 성원과 참여가 이어졌습니다.",
    detailImage: "/kakao/edu.png",
  },
  {
    id: "etc-2",
    category: "기타",
    title: "포트폴리오 바이브 코딩",
    tags: ["#Vibe_Coding", "#프로그래밍", "#React"],
    imageType: "image",
    imageContent: {
      src: "/kakao/vibe.png",
    },
    type: "Etc",
    period: "-",
    description:
      "💻 Github Copilot을 활용하여 Kakao의 페이지를 오마주한 포트폴리오를 제작하였습니다. React 기반의 간단한 페이지이며, 카카오가 기술을 소개하는 페이지의 형식을 본따서 프로젝트의 실제 사진 등을 공유하였습니다.",
    detailImage: "/kakao/vibe.png",
  },
  {
    id: "etc-3",
    category: "기타",
    title: "LinkedIn 활동",
    tags: ["#LinkedIn", "#네트워킹", "#인사이트_수집"],
    imageType: "image",
    imageContent: {
      src: "/kakao/linkedin.png",
    },
    type: "Etc",
    period: "-",
    description:
      "🌐 LinkedIn에서 분야에 국한되지 않고, 수많은 전문가들과 네트워킹을 구축하고 있습니다. 제가 경험하며 깨닫게 된 좋은 인사이트를 정리하거나, 깊게 생각해 볼만한 주제의 이야기들을 담고 있습니다. 링크드인 네트워크를 통해 훌륭한 연사님을 세미나에 모시기도 하고, 함께 사이트 프로젝트를 진행하는 등 의미와 재미가 모두 있는 연결을 이어나가고 있습니다.<br /><br />[💡 링크드인 바로가기](https://www.linkedin.com/in/juyeon-ayla)",
    detailImage: "/kakao/linkedin.png",
  },
  // ... 나머지 항목들도 id 및 상세 정보 필드 추가
];

const categories = [
  { name: "ALL", type: "All" },
  { name: "성인교육기획 (부트캠프)", type: "Bootcamp" },
  { name: "K-12교육기획", type: "K-12" },
  { name: "컨퍼런스", type: "Conference" },
  { name: "대외활동", type: "Activity" },
  { name: "기타", type: "Etc" },
];

// 포트폴리오 카드 컴포넌트
const PortfolioCard = ({ item }: { item: PortfolioItem }) => {
  const categoryStyles = {
    "Bootcamp": {
      icon: LaptopIcon,
      color: "blue",
      bgColor: "bg-blue-500",
      textColor: "text-blue-500",
    },
    "K-12": {
      icon: UserIcon,
      color: "yellow",
      bgColor: "bg-yellow-500",
      textColor: "text-yellow-500",
    },
    "Conference": {
      icon: FlagIcon,
      color: "green",
      bgColor: "bg-green-500",
      textColor: "text-green-500",
    },
    "Activity": {
      icon: UsersIcon,
      color: "orange",
      bgColor: "bg-orange-500",
      textColor: "text-orange-500",
    },
    "Etc": {
      icon: SettingsIcon,
      color: "gray",
      bgColor: "bg-gray-500",
      textColor: "text-gray-500",
    },
  };

  const style = categoryStyles[item.type as keyof typeof categoryStyles] || categoryStyles.Etc;
  const IconComponent = style.icon;

  return (
    <Link to={`/project/${item.id}`} className="block h-full">
      <div className="flex h-full transform cursor-pointer flex-col rounded-2xl bg-gray-50 p-6 shadow-sm transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className={`flex h-6 w-6 items-center justify-center rounded-md ${style.bgColor}`}>
              <IconComponent width={16} height={16} className="h-4 w-4 text-white" />
            </div>
            <span className={`text-sm font-semibold ${style.textColor}`}>{item.category}</span>
          </div>
        </div>
        <h3 className="mb-2 flex-grow text-xl font-bold text-gray-800">{item.title}</h3>
        <div className="mb-6 text-sm text-gray-500">{item.tags.join(" ")}</div>
        <div className="mt-auto flex h-48 items-center justify-center rounded-lg p-4">
          {item.imageType === "gradient" ? (
            <div
              className={`flex h-full w-full items-center justify-center rounded-lg bg-gradient-to-br text-2xl font-bold text-white ${item.imageContent.colors} text-center`}
            >
              {item.imageContent.text}
            </div>
          ) : (
            <img
              src={item.imageContent.src}
              alt={item.title}
              className="h-full w-full rounded-lg object-cover"
            />
          )}
        </div>
      </div>
    </Link>
  );
};

const ProjectList = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems =
    activeCategory === "All"
      ? portfolioItems
      : portfolioItems.filter((item) => item.type === activeCategory);

  return (
    <>
      <div className="mb-12">
        <div className="mb-2 flex items-center gap-3">
          <SettingsIcon />
          <h2 className="text-4xl font-extrabold text-gray-900">Projects</h2>
        </div>
        <p className="text-lg text-gray-500">
          지금까지 제가 경험한 프로젝트들입니다.
          <br />
          카드를 누르면 자세한 내용을 보실 수 있습니다.
        </p>
      </div>

      {/* Category Filters */}
      <div className="mb-8 flex flex-wrap items-center gap-2">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => setActiveCategory(category.type)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
              activeCategory === category.type
                ? "bg-gray-800 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <PortfolioCard key={item.id} item={item} />
        ))}
      </div>
    </>
  );
};

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const item = portfolioItems.find((p) => p.id === id);

  if (!item) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold">프로젝트를 찾을 수 없습니다.</h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 rounded-md bg-gray-800 px-4 py-2 text-white"
        >
          목록으로 돌아가기
        </button>
      </div>
    );
  }

  const recommendedItems = portfolioItems.filter(
    (p) => p.id !== item.id && p.category === item.category,
  );

  return (
    <div className="py-12">
      <div className="mx-auto max-w-4xl">
        {/* Title Section */}
        <div className="mb-12 text-center">
          <p className="mb-2 font-semibold text-blue-600">{item.category}</p>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
            {item.title}
          </h1>
          <p className="text-gray-500">{item.period}</p>
        </div>

        {/* Image */}
        <img
          src={item.detailImage}
          alt={item.title}
          className="mx-auto my-12 w-full max-w-3xl rounded-lg object-cover"
        />

        {/* Main Content */}
        <div className="prose prose-lg mx-auto max-w-3xl">
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            components={{
              a: ({ node, ...props }) => (
                <a
                  {...props}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                />
              ),
            }}
          >
            {item.description}
          </ReactMarkdown>
        </div>

        {/* Tags Section */}
        <div className="my-12 flex flex-wrap justify-center gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="cursor-pointer rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-200"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Back to List Button */}
        <div className="mt-12 border-t border-gray-200 pt-8 text-center">
          <button
            onClick={() => navigate("/")}
            className="rounded-md bg-gray-800 px-6 py-3 font-semibold text-white hover:bg-gray-900"
          >
            목록보기
          </button>
        </div>
      </div>

      {/* Recommended Content */}
      {recommendedItems.length > 0 && (
        <div className="mt-24">
          <div className="container mx-auto px-4">
            <h3 className="mb-8 text-center text-2xl font-bold">추천 콘텐츠</h3>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {recommendedItems.map((recItem) => (
                <PortfolioCard key={recItem.id} item={recItem} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function App() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Router basename="/kakao">
      <div className="bg-white font-sans">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between border-b border-gray-100 py-4">
              <Link to="/" className="text-2xl font-bold">
                Portfolio_임주연
              </Link>
              <nav className="hidden items-center gap-8 md:flex">
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  About
                </a>
                <Link
                  to="/"
                  className="border-b-2 border-gray-800 pb-1 font-semibold text-gray-900"
                >
                  Projects
                </Link>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Blog
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Contact
                </a>
              </nav>
              <div className="flex items-center gap-4">
                <SearchIcon />
                <GlobeIcon />
                <MoonIcon />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-16">
          <Routes>
            <Route path="/" element={<ProjectList />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
          </Routes>
        </main>

        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className="fixed right-8 bottom-8 flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 text-white shadow-lg transition-colors duration-300 hover:bg-gray-900"
        >
          <ArrowUpIcon />
        </button>
      </div>
    </Router>
  );
}

export default App;
