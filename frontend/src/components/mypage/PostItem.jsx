export default function PostItem({ post }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:border-indigo-200 transition-colors cursor-pointer">
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
  );
}