import { useState, useRef } from "react";

export function useEmailVerification() {
  const [codeSent, setCodeSent] = useState(false);
  const [codeLoading, setCodeLoading] = useState(false);
  const [codeTimer, setCodeTimer] = useState(0);
  const timerRef = useRef(null); // ← let 대신 useRef 사용 (렌더링해도 유지됨)

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current); // 기존 타이머 제거
    setCodeTimer(300);
    timerRef.current = setInterval(() => {
      setCodeTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
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

  const sendCode = async (email) => {
    setCodeLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/auth/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const text = await res.text();
      const data = text ? JSON.parse(text) : {};
      if (!res.ok) throw new Error(data.message || "발송에 실패했습니다.");
      setCodeSent(true);
      startTimer();
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    } finally {
      setCodeLoading(false);
    }
  };

  const reset = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setCodeSent(false);
    setCodeTimer(0);
  };

  return { codeSent, codeLoading, codeTimer, formatTime, sendCode, reset };
}