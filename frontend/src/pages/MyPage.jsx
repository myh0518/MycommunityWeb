import Calendar from "../components/Calendar";
import Timetable from "../components/Timetable";

const posts = [
  { id: 1, title: "첫 번째 게시글", content: "안녕하세요! 첫 게시글입니다.", likes: 12, comments: 3, date: "2025.03.15" },
  { id: 2, title: "오늘의 일상", content: "오늘은 날씨가 정말 좋았어요.", likes: 8, comments: 5, date: "2025.03.16" },
  { id: 3, title: "개발 공부 중", content: "React + Spring Boot 조합 너무 좋다!", likes: 24, comments: 9, date: "2025.03.17" },
  { id: 4, title: "테스트 게시글", content: "스크롤 테스트용 게시글이에요.", likes: 5, comments: 1, date: "2025.03.18" },
  { id: 5, title: "또 다른 게시글", content: "게시글이 많아져도 괜찮아요!", likes: 3, comments: 2, date: "2025.03.19" },
];

export default function MyPage() {
  return (
    <div className="flex flex-col md:flex-row gap-4 md:h-full py-2">

      {/* ── 왼쪽: 프로필 + 게시글 ── */}
      <div className="w-full md:w-1/3 md:shrink-0 flex flex-col gap-4 md:min-h-0">

        {/* 프로필 카드 */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xl font-bold shrink-0">
              나
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold text-gray-900 truncate">내 이름</h2>
              <p className="text-sm text-gray-400 mb-2">@username</p>
              <div className="flex gap-4 text-sm">
                <div className="text-center">
                  <p className="font-bold text-gray-900">3</p>
                  <p className="text-gray-400 text-xs">게시글</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-gray-900">128</p>
                  <p className="text-gray-400 text-xs">팔로워</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-gray-900">64</p>
                  <p className="text-gray-400 text-xs">팔로잉</p>
                </div>
              </div>
            </div>
            <button className="px-3 py-1.5 border border-gray-200 rounded-xl text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors self-start shrink-0">
              편집
            </button>
          </div>
          <p className="mt-3 text-sm text-gray-500 leading-relaxed">
            안녕하세요! SNS 커뮤니티를 개발 중입니다. 🚀
          </p>
        </div>

        {/* 게시글 영역 */}
        <div className="flex flex-col md:min-h-0 md:flex-1">
          <h3 className="text-sm font-bold text-gray-700 mb-2 px-1 shrink-0">내 게시글</h3>
          {/* 모바일: 높이 제한 없이 자연스럽게 / PC: 남은 공간에 내부 스크롤 */}
<div className="overflow-y-auto max-h-80 md:max-h-none md:flex-1 space-y-2 pr-1">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:border-indigo-200 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h4 className="font-semibold text-gray-900 text-sm mb-0.5 truncate">{post.title}</h4>
                    <p className="text-xs text-gray-500 line-clamp-2">{post.content}</p>
                  </div>
                  <span className="text-xs text-gray-300 shrink-0">{post.date}</span>
                </div>
                <div className="flex gap-3 mt-2 text-xs text-gray-400">
                  <span>❤️ {post.likes}</span>
                  <span>💬 {post.comments}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 오른쪽: 캘린더 + 시간표 ── */}
      <div className="w-full md:w-2/3 flex flex-col gap-4 md:min-h-0">
        {/* 모바일: 자동 높이 / PC: 1:1 비율 */}
        <div className="md:flex-1 md:min-h-0">
          <Calendar />
        </div>
        <div className="md:flex-1 md:min-h-0">
          <Timetable />
        </div>
      </div>

    </div>
  );
}