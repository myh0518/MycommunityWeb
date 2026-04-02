import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const tabs = [
  {
    label: "홈",
    path: "/",
    icon: (active) => (
      <svg className="w-6 h-6" fill={active ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    label: "게시판",
    path: "/board",
    icon: (active) => (
      <svg className="w-6 h-6" fill={active ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
      </svg>
    ),
  },
  {
    label: "좋아요",
    path: "/likes",
    icon: (active) => (
      <svg className="w-6 h-6" fill={active ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    label: "마이",
    path: "/mypage",
    icon: (active) => (
      <svg className="w-6 h-6" fill={active ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
];

export default function BottomTabBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex items-center z-30 md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {tabs.map((tab) => {
        const active = location.pathname === tab.path;
        return (
          <button
            key={tab.path}
            onClick={() => {
              if (!user && tab.path === "/mypage") {
                navigate("/login");
              } else {
                navigate(tab.path);
              }
            }}
            className={`flex-1 flex flex-col items-center justify-center gap-1 py-3 transition-colors
              ${active ? "text-indigo-600" : "text-gray-400"}`}
          >
            {tab.icon(active)}
            <span className="text-xs font-medium">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}