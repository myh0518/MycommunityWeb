import { useAuth } from "../context/AuthContext";
import ProfileCard from "../components/mypage/ProfileCard";
import PostList from "../components/mypage/PostList";
import Calendar from "../components/mypage/Calendar";
import Timetable from "../components/mypage/Timetable";

export default function MyPage() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col md:flex-row gap-4 md:h-full py-2">

      {/* ── 왼쪽: 프로필 + 게시글 ── */}
      <div className="w-full md:w-1/3 md:shrink-0 flex flex-col gap-4 md:min-h-0">
        <ProfileCard user={user} />
        <PostList />
      </div>

      {/* ── 오른쪽: 캘린더 + 시간표 ── */}
      <div className="w-full md:w-2/3 flex flex-col gap-4 md:min-h-0">
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
