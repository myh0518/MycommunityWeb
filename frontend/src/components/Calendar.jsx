import { useState } from "react";

export default function Calendar() {
  const today = new Date();
  const [current, setCurrent] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const year = current.getFullYear();
  const month = current.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  const isToday = (d) =>
    d === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  const prevMonth = () => setCurrent(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrent(new Date(year, month + 1, 1));

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 h-full">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-3">
        <button onClick={prevMonth} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-sm font-bold text-gray-800">
          {year}년 {month + 1}월
        </span>
        <button onClick={nextMonth} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* 요일 */}
      <div className="grid grid-cols-7 mb-1">
        {["일", "월", "화", "수", "목", "금", "토"].map((d, i) => (
          <div
            key={d}
            className={`text-center text-xs font-semibold py-1
              ${i === 0 ? "text-rose-400" : i === 6 ? "text-indigo-400" : "text-gray-400"}`}
          >
            {d}
          </div>
        ))}
      </div>

      {/* 날짜 */}
      <div className="grid grid-cols-7 gap-y-1">
        {days.map((d, i) => (
          <div key={i} className="flex items-center justify-center h-8">
            {d && (
              <button
                className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-medium transition-all
                  ${isToday(d)
                    ? "bg-indigo-500 text-white font-bold"
                    : i % 7 === 0
                    ? "text-rose-400 hover:bg-rose-50"
                    : i % 7 === 6
                    ? "text-indigo-400 hover:bg-indigo-50"
                    : "text-gray-700 hover:bg-gray-100"
                  }`}
              >
                {d}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}