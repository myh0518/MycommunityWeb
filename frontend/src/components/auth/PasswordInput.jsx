import { useState } from "react";
import { passwordRules } from "../../constants/passwordRules";

export default function PasswordInput({ value, onChange, onKeyDown, showRules }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label className="text-xs font-medium text-gray-600 mb-1 block">비밀번호</label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={value}
          onChange={onChange}
          placeholder="비밀번호를 입력하세요"
          autoComplete="off"
          onKeyDown={onKeyDown}
          className="w-full px-4 py-2.5 pr-11 rounded-xl border border-gray-200 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
        />
        {/* 눈 버튼 */}
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

      {/* 비밀번호 조건 (회원가입 + 입력 중일 때만 표시) */}
      {showRules && value.length > 0 && (
        <div className="mt-2 grid grid-cols-2 gap-1">
          {passwordRules.map((rule) => (
            <div
              key={rule.label}
              className={`flex items-center gap-1 text-xs
                ${rule.test(value) ? "text-green-500" : "text-gray-400"}`}
            >
              <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {rule.test(value) ? (
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
  );
}