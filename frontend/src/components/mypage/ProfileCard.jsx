export default function ProfileCard({ user }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 shrink-0">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xl font-bold shrink-0">
          {user?.username?.[0] || "나"}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-bold text-gray-900 truncate">{user?.username || "내 이름"}</h2>
          <p className="text-sm text-gray-400 mb-2">@{user?.username || "username"}</p>
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
  );
}