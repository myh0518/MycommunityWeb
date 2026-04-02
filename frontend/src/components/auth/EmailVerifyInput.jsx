import { useState } from "react";

export default function EmailVerifyInput({
  email,
  code,
  onChange,
  onSendCode,
  codeSent,
  codeLoading,
  codeTimer,
  formatTime,
  isRegister,
}) {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className="space-y-3">
      {/* 이메일 입력 */}
      <div>
        <label className="text-xs font-medium text-gray-600 mb-1 block">이메일</label>
        <div className="flex gap-2">
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="이메일을 입력하세요"
            autoComplete="off"
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
          />
          {isRegister && (
            <button
              onClick={onSendCode}
              disabled={codeLoading}
              className="px-3 py-2.5 bg-indigo-50 hover:bg-indigo-100 disabled:bg-gray-50 text-indigo-600 disabled:text-gray-400 rounded-xl text-xs font-semibold transition-colors shrink-0"
            >
              {codeLoading
                ? "발송 중..."
                : codeSent
                ? `재전송 ${codeTimer > 0 ? `(${formatTime(codeTimer)})` : ""}`
                : "인증코드 발송"}
            </button>
          )}
        </div>
      </div>

      {/* 인증 코드 입력 (발송 후에만 표시) */}
      {isRegister && codeSent && (
        <div>
          <div className="flex items-center gap-1 mb-1">
            <label className="text-xs font-medium text-gray-600">인증 코드</label>
            {/* 도움말 버튼 */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowHelp(!showHelp)}
                className="w-4 h-4 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-500 text-xs flex items-center justify-center transition-colors"
              >
                ?
              </button>
              {showHelp && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowHelp(false)}
                  />
                  <div className="absolute left-0 top-6 w-56 bg-gray-800 text-white text-xs rounded-xl p-3 z-50 shadow-lg">
                    메일이 보이지 않으면{" "}
                    <span className="text-yellow-300 font-semibold">스팸 메일함</span>을 확인해 주세요!
                    <div className="absolute -top-1.5 left-2 w-3 h-3 bg-gray-800 rotate-45"></div>
                  </div>
                </>
              )}
            </div>
          </div>
          <input
            type="text"
            name="code"
            value={code}
            onChange={onChange}
            placeholder="이메일로 받은 6자리 코드를 입력하세요"
            autoComplete="off"
            maxLength={6}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all tracking-widest"
          />
        </div>
      )}
    </div>
  );
}