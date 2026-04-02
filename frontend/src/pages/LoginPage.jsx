import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEmailVerification } from "../hooks/useEmailVerification";
import EmailVerifyInput from "../components/auth/EmailVerifyInput";
import PasswordInput from "../components/auth/PasswordInput";

import { passwordRules } from "../constants/passwordRules";

export default function LoginPage() {
  const [tab, setTab] = useState("login");
  const [form, setForm] = useState({ username: "", email: "", password: "", code: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { codeSent, codeLoading, codeTimer, formatTime, sendCode, reset } = useEmailVerification();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSendCode = async () => {
    if (!form.email.trim()) { setError("이메일을 입력해 주세요."); return; }
    const result = await sendCode(form.email);
    if (!result.success) setError(result.message);
    else setForm((prev) => ({ ...prev, code: "" }));
  };

  const handleTabChange = (newTab) => {
    setTab(newTab);
    setError("");
    setForm({ username: "", email: "", password: "", code: "" });
    reset();
  };

  const handleSubmit = async () => {
    setError("");

    if (tab === "login") {
      if (!form.email.trim()) { setError("이메일을 입력해 주세요."); return; }
      if (!form.password.trim()) { setError("비밀번호를 입력해 주세요."); return; }
    }

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

        {/* 상단: 로고 + 홈으로 버튼 */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-indigo-600">🌐 CommuniTy</h1>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1 text-xs text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-xl transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            홈으로
          </button>
        </div>

        {/* 탭 */}
        <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
          <button
            onClick={() => handleTabChange("login")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all
              ${tab === "login" ? "bg-white text-indigo-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
          >
            로그인
          </button>
          <button
            onClick={() => handleTabChange("register")}
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

          {/* 이메일 + 인증코드 */}
          <EmailVerifyInput
            email={form.email}
            code={form.code}
            onChange={handleChange}
            onSendCode={handleSendCode}
            codeSent={codeSent}
            codeLoading={codeLoading}
            codeTimer={codeTimer}
            formatTime={formatTime}
            isRegister={tab === "register"}
          />

          {/* 비밀번호 */}
          <PasswordInput
            value={form.password}
            onChange={handleChange}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            showRules={tab === "register"}
          />
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