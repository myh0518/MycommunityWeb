import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [tab, setTab] = useState("login");
  const [form, setForm] = useState({ username: "", email: "", password: "", code: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);       // 코드 발송 여부
  const [codeLoading, setCodeLoading] = useState(false); // 코드 발송 중
  const [codeTimer, setCodeTimer] = useState(0);         // 남은 시간 (초)
  const { login } = useAuth();
  const navigate = useNavigate();

  // 비밀번호 조건 체크
  const passwordRules = [
    { label: "8자 이상", test: (p) => p.length >= 8 },
    { label: "영문 포함", test: (p) => /[a-zA-Z]/.test(p) },
    { label: "숫자 포함", test: (p) => /[0-9]/.test(p) },
    { label: "특수문자 포함", test: (p) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(p) },
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  // 타이머 시작 (5분)
  const startTimer = () => {
    setCodeTimer(300);
    const interval = setInterval(() => {
      setCodeTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  // 인증 코드 발송
  const handleSendCode = async () => {
    if (!form.email.trim()) {
      setError("이메일을 입력해 주세요.");
      return;
    }
    setCodeLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:8080/api/auth/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email }),
      });
      const text = await res.text();
      const data = text ? JSON.parse(text) : {};
      if (!res.ok) throw new Error(data.message || "발송에 실패했습니다.");
      setCodeSent(true);
      startTimer();
    } catch (err) {
      setError(err.message);
    } finally {
      setCodeLoading(false);
    }
  };

  const handleSubmit = async () => {
    setError("");

    // 로그인 빈 칸 체크
    if (tab === "login") {
      if (!form.email.trim()) { setError("이메일을 입력해 주세요."); return; }
      if (!form.password.trim()) { setError("비밀번호를 입력해 주세요."); return; }
    }

    // 회원가입 빈 칸 체크
    if (tab === "register") {
      if (!form.username.trim()) { setError("닉네임을 입력해 주세요."); return; }
      if (!form.email.trim()) { setError("이메일을 입력해 주세요."); return; }
      if (!form.password.trim()) { setError("비밀번호를 입력해 주세요."); return; }
      if (!passwordRules.every((r) => r.test(form.password))) {
        setError("비밀번호 조건을 모두 충족해 주세요."); return;
      }
      if (!codeSent) { setError("이메일 인증 코드를 발송해 주세요."); return; }
      if (!form.code.trim()) { setError("인증 코드를 입력해 주세요."); return; }
      if (codeTimer === 0) { setError("인증 코드가 만료되었습니다. 다시 발송해 주세요."); return; }
    }

    setLoading(true);
    try {
      const url = tab === "login"
        ? "http://localhost:8080/api/auth/login"
        : "http://localhost:8080/api/auth/register";

      const body = tab === "login"
        ? { email: form.email, password: form.password }
        : { username: form.username, email: form.email, password: form.password, code: form.code };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const text = await res.text();
      const data = text ? JSON.parse(text) : {};

      if (!res.ok) {
        if (tab === "login") throw new Error("이메일 혹은 비밀번호가 맞지 않습니다.");
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
            onClick={() => { setTab("login"); setError(""); setForm({ username: "", email: "", password: "", code: "" }); setCodeSent(false); }}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all
              ${tab === "login" ? "bg-white text-indigo-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
          >
            로그인
          </button>
          <button
            onClick={() => { setTab("register"); setError(""); setForm({ username: "", email: "", password: "", code: "" }); setCodeSent(false); }}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all
              ${tab === "register" ? "bg-white text-indigo-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
          >
            회원가입
          </button>
        </div>

        {/* 입력 폼 */}
        <div className="space-y-3">

          {/* 닉네임 (회원가입만) */}
          {tab === "register" && (
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">닉네임</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="닉네임을 입력하세요"
                autoComplete="off"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
              />
            </div>
          )}

          {/* 이메일 */}
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">이메일</label>
            <div className="flex gap-2">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="이메일을 입력하세요"
                autoComplete="off"
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
              />
              {/* 인증 코드 발송 버튼 (회원가입만) */}
              {tab === "register" && (
                <button
                  onClick={handleSendCode}
                  disabled={codeLoading || (codeSent && codeTimer > 0)}
                  className="px-3 py-2.5 bg-indigo-50 hover:bg-indigo-100 disabled:bg-gray-50 text-indigo-600 disabled:text-gray-400 rounded-xl text-xs font-semibold transition-colors shrink-0"
                >
                  {codeLoading ? "발송 중..." : codeSent && codeTimer > 0 ? formatTime(codeTimer) : "인증코드 발송"}
                </button>
              )}
            </div>
          </div>

          {/* 인증 코드 입력 (회원가입 + 코드 발송 후) */}
          {tab === "register" && codeSent && (
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">인증 코드</label>
              <input
                type="text"
                name="code"
                value={form.code}
                onChange={handleChange}
                placeholder="이메일로 받은 6자리 코드를 입력하세요"
                autoComplete="off"
                maxLength={6}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all tracking-widest"
              />
            </div>
          )}

          {/* 비밀번호 */}
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
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>

            {/* 비밀번호 조건 표시 (회원가입만) */}
            {tab === "register" && form.password.length > 0 && (
              <div className="mt-2 grid grid-cols-2 gap-1">
                {passwordRules.map((rule) => (
                  <div key={rule.label} className={`flex items-center gap-1 text-xs
                    ${rule.test(form.password) ? "text-green-500" : "text-gray-400"}`}
                  >
                    <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {rule.test(form.password) ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                      )}
                    </svg>
                    {rule.label}
                  </div>
                ))}
              </div>
            )}
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