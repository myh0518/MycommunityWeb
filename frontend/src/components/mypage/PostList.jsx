import PostItem from "./PostItem";

// 나중에 API로 교체할 더미 데이터
const posts = [
  { id: 1, title: "첫 번째 게시글", content: "안녕하세요! 첫 게시글입니다.", likes: 12, comments: 3, date: "2025.03.15" },
  { id: 2, title: "오늘의 일상", content: "오늘은 날씨가 정말 좋았어요.", likes: 8, comments: 5, date: "2025.03.16" },
  { id: 3, title: "개발 공부 중", content: "React + Spring Boot 조합 너무 좋다!", likes: 24, comments: 9, date: "2025.03.17" },
  { id: 4, title: "테스트 게시글", content: "스크롤 테스트용 게시글이에요.", likes: 5, comments: 1, date: "2025.03.18" },
  { id: 5, title: "또 다른 게시글", content: "게시글이 많아져도 괜찮아요!", likes: 3, comments: 2, date: "2025.03.19" },
];

export default function PostList() {
  return (
    <div className="flex flex-col md:min-h-0 md:flex-1">
      <h3 className="text-sm font-bold text-gray-700 mb-2 px-1 shrink-0">내 게시글</h3>
      <div className="overflow-y-auto max-h-80 md:max-h-none md:flex-1 space-y-2 pr-1">
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}