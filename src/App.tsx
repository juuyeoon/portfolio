import React, { useState } from "react";
import "./App.css";

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

// 포트폴리오 데이터
const portfolioItems = [
  // 성인교육기획 (부트캠프) - 5개
  {
    category: "성인교육기획 (부트캠프)",
    title: "커뮤니티형 교육 표준화",
    tags: ["#AI", "#교육기획", "#커리큘럼설계"],
    imageType: "gradient",
    imageContent: {
      text: "AI 부트캠프",
      colors: "from-blue-500 to-indigo-600",
    },
    type: "Bootcamp",
  },
  {
    category: "성인교육기획 (부트캠프)",
    title: "동향 세미나·아카이브 구축",
    tags: ["#데이터분석", "#SQL", "#Python"],
    imageType: "gradient",
    imageContent: {
      text: "Data Analysis Course",
      colors: "from-yellow-400 to-orange-500",
    },
    type: "Bootcamp",
  },
  {
    category: "성인교육기획 (부트캠프)",
    title: "상담 인입 자동화",
    tags: ["#AI", "#교육기획", "#커리큘럼설계"],
    imageType: "gradient",
    imageContent: {
      text: "AI 부트캠프",
      colors: "from-blue-500 to-indigo-600",
    },
    type: "Bootcamp",
  },
  {
    category: "성인교육기획 (부트캠프)",
    title: "운영 대시보드 구축",
    tags: ["#데이터분석", "#SQL", "#Python"],
    imageType: "gradient",
    imageContent: {
      text: "Data Analysis Course",
      colors: "from-yellow-400 to-orange-500",
    },
    type: "Bootcamp",
  },
  {
    category: "성인교육기획 (부트캠프)",
    title: "K-DT 신규 제안서 작성",
    tags: ["#프론트엔드", "#React", "#TypeScript"],
    imageType: "gradient",
    imageContent: {
      text: "Frontend Bootcamp",
      colors: "from-green-400 to-blue-500",
    },
    type: "Bootcamp",
  },
  // K-12교육기획 - 2개
  {
    category: "K-12교육기획",
    title: "국립항공박물관 'A-ble'",
    tags: ["#코딩교육", "#스크래치", "#초등교육"],
    imageType: "tags",
    imageContent: {
      tags: [
        { name: "K-12", color: "bg-green-500" },
        { name: "Coding", color: "bg-teal-500" },
        { name: "Education", color: "bg-emerald-500" },
      ],
    },
    type: "K-12",
  },
  {
    category: "K-12교육기획",
    title: "교육부 '디지털새싹'",
    tags: ["#코딩교육", "#스크래치", "#초등교육"],
    imageType: "tags",
    imageContent: {
      tags: [
        { name: "K-12", color: "bg-green-500" },
        { name: "Coding", color: "bg-teal-500" },
        { name: "Education", color: "bg-emerald-500" },
      ],
    },
    type: "K-12",
  },
  // 컨퍼런스 - 4개
  {
    category: "컨퍼런스",
    title: "2024 MODUCON 세션 운영",
    tags: ["#개발자행사", "#컨퍼런스", "#이벤트기획"],
    imageType: "gradient",
    imageContent: {
      text: "Dev Conference 2024",
      colors: "from-purple-500 to-pink-500",
    },
    type: "Conference",
  },
  {
    category: "컨퍼런스",
    title: "AI 관련 컨퍼런스 참여",
    tags: ["#개발자행사", "#컨퍼런스", "#이벤트기획"],
    imageType: "gradient",
    imageContent: {
      text: "Dev Conference 2024",
      colors: "from-purple-500 to-pink-500",
    },
    type: "Conference",
  },
  {
    category: "컨퍼런스",
    title: "Web 개발 관련 컨퍼런스 참여",
    tags: ["#개발자행사", "#컨퍼런스", "#이벤트기획"],
    imageType: "gradient",
    imageContent: {
      text: "Dev Conference 2024",
      colors: "from-purple-500 to-pink-500",
    },
    type: "Conference",
  },
  {
    category: "컨퍼런스",
    title: "HCI 관련 컨퍼런스 참여",
    tags: ["#개발자행사", "#컨퍼런스", "#이벤트기획"],
    imageType: "gradient",
    imageContent: {
      text: "Dev Conference 2024",
      colors: "from-purple-500 to-pink-500",
    },
    type: "Conference",
  },
  // 대외활동 - 2개
  {
    category: "대외활동",
    title: "인천시민연구소 퍼실리테이터",
    tags: ["#네트워킹", "#스터디", "#리더십"],
    imageType: "tags",
    imageContent: {
      tags: [
        { name: "Community", color: "bg-sky-500" },
        { name: "Study", color: "bg-cyan-500" },
        { name: "Leadership", color: "bg-blue-500" },
      ],
    },
    type: "Activity",
  },
  {
    category: "대외활동",
    title: "기술고도화 과정 자문",
    tags: ["#네트워킹", "#스터디", "#리더십"],
    imageType: "tags",
    imageContent: {
      tags: [
        { name: "Community", color: "bg-sky-500" },
        { name: "Study", color: "bg-cyan-500" },
        { name: "Leadership", color: "bg-blue-500" },
      ],
    },
    type: "Activity",
  },
  // 기타 - 1개
  {
    category: "기타",
    title: "교육공학을 위한 생성형AI 스터디",
    tags: ["#글쓰기", "#콘텐츠제작", "#기술블로그"],
    imageType: "tags",
    imageContent: {
      tags: [
        { name: "Tech Blog", color: "bg-gray-700" },
        { name: "Writing", color: "bg-slate-600" },
        { name: "Content", color: "bg-zinc-500" },
      ],
    },
    type: "Etc",
  },
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
const PortfolioCard = ({ item }: { item: (typeof portfolioItems)[0] }) => {
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
        {item.imageType === "gradient" && (
          <div
            className={`flex h-full w-full items-center justify-center rounded-lg bg-gradient-to-br text-2xl font-bold text-white ${item.imageContent.colors} text-center`}
          >
            {item.imageContent.text}
          </div>
        )}
        {item.imageType === "tags" && (
          <div className="flex h-full w-full flex-wrap items-center justify-center gap-2 rounded-lg bg-gray-800 p-4">
            {item.imageContent.tags.map((tag) => (
              <span
                key={tag.name}
                className={`rounded-full px-3 py-1 text-sm font-semibold text-white ${tag.color}`}
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

function App() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems =
    activeCategory === "All"
      ? portfolioItems
      : portfolioItems.filter((item) => item.type === activeCategory);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="bg-white font-sans">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between border-b border-gray-100 py-4">
            <h1 className="text-2xl font-bold">Portfolio_임주연</h1>
            <nav className="hidden items-center gap-8 md:flex">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                About
              </a>
              <a href="#" className="border-b-2 border-gray-800 pb-1 font-semibold text-gray-900">
                Projects
              </a>
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
          {filteredItems.map((item, index) => (
            <PortfolioCard key={index} item={item} />
          ))}
        </div>
      </main>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed right-8 bottom-8 flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 text-white shadow-lg transition-colors duration-300 hover:bg-gray-900"
      >
        <ArrowUpIcon />
      </button>
    </div>
  );
}

export default App;
