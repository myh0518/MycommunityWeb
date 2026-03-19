import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [tab, setTab] = useState("login");
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async () => {
  setError("");

  // ── 회원가입 빈 칸 체크 ──
  if (tab === "register") {
    if (!form.username.trim()) {
      setError("닉네임을 입력해 주세요.");
      return;
    }
    if (!form.email.trim()) {
      setError("이메일을 입력해 주세요.");
      return;
    }
    if (!form.password.trim()) {
      setError("비밀번호를 입력해 주세요.");
      return;
    }
  }

  // ── 로그인 빈 칸 체크 ──
  if (tab === "login") {
    if (!form.email.trim()) {
      setError("이메일을 입력해 주세요.");
      return;
    }
    if (!form.password.trim()) {
      setError("비밀번호를 입력해 주세요.");
      return;
    }
  }

  setLoading(true);
  try {
    const url = tab === "login"
      ? "http://localhost:8080/api/auth/login"
      : "http://localhost:8080/api/auth/register";

    const body = tab === "login"
      ? { email: form.email, password: form.password }
      : { username: form.username, email: form.email, password: form.password };

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    // 응답 본문이 비어있을 수 있으니 text로 먼저 받기
    const text = await res.text();
    const data = text ? JSON.parse(text) : {};

    if (!res.ok) {
      // 로그인 실패는 원인 무관하게 동일 메시지
      if (tab === "login") {
        throw new Error("이메일 혹은 비밀번호가 맞지 않습니다.");
      }
      // 회원가입 실패는 서버 메시지 그대로
      throw new Error(data.message || "오류가 발생했습니다.");
    }

    login({ username: data.username, email: data.email }, data.token);
    navigate("/");
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-dvh bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 w-full max-w-md p-8">

        {/* 로고 */}
        <h1 className="text-2xl font-bold text-indigo-600 text-center mb-6">🌐 CommuniTy</h1>

        {/* 탭 */}
        <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
          <button
            onClick={() => { setTab("login"); setError(""); setForm({ username: "", email: "", password: "" }); }}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all
              ${tab === "login" ? "bg-white text-indigo-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
          >
            로그인
          </button>
          <button
            onClick={() => { setTab("register"); setError(""); setForm({ username: "", email: "", password: "" }); }}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all
              ${tab === "register" ? "bg-white text-indigo-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
          >
            회원가입
          </button>
        </div>

        {/* 입력 폼 */}
        <div className="space-y-3">
          {tab === "register" && (
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">닉네임</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="닉네임을 입력하세요"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
              />
            </div>
          )}
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">이메일</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="이메일을 입력하세요"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">비밀번호</label>
            <div className="relative">
            <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="비밀번호를 입력하세요"
            autoComplete="off"
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className="w-full px-4 py-2.5 pr-11 rounded-xl border border-gray-200 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
            />
              {/* 비밀번호 보이기 버튼 */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? (
                  // 눈 감기 아이콘
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  // 눈 뜨기 아이콘
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 에러 메시지 */}
        {error && (
          <div className="mt-3 px-4 py-2.5 bg-red-50 border border-red-100 rounded-xl">
            <p className="text-xs text-red-500 text-center">{error}</p>
          </div>
        )}

        {/* 제출 버튼 */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full mt-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white rounded-xl text-sm font-semibold transition-colors"
        >
          {loading ? "처리 중..." : tab === "login" ? "로그인" : "회원가입"}
        </button>

      </div>
    </div>
  );
}