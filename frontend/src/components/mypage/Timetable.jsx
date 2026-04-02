const scheduleData = {
  시간: ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"],
  월: ["운영체제", "운영체제", "", "점심", "", "알고리즘", "알고리즘", ""],
  화: ["", "자료구조", "자료구조", "점심", "영어회화", "", "", "프로젝트"],
  수: ["운영체제", "운영체제", "", "점심", "", "알고리즘", "알고리즘", ""],
  목: ["", "자료구조", "자료구조", "점심", "영어회화", "", "", "프로젝트"],
  금: ["캡스톤", "캡스톤", "캡스톤", "점심", "", "", "세미나", ""],
};

const subjectColors = {
  운영체제: "bg-indigo-100 text-indigo-700 border-l-2 border-indigo-400",
  자료구조: "bg-emerald-100 text-emerald-700 border-l-2 border-emerald-400",
  알고리즘: "bg-violet-100 text-violet-700 border-l-2 border-violet-400",
  영어회화: "bg-amber-100 text-amber-700 border-l-2 border-amber-400",
  캡스톤: "bg-rose-100 text-rose-700 border-l-2 border-rose-400",
  프로젝트: "bg-sky-100 text-sky-700 border-l-2 border-sky-400",
  세미나: "bg-orange-100 text-orange-700 border-l-2 border-orange-400",
  점심: "bg-gray-100 text-gray-400",
  "": "",
};

export default function Timetable() {
  const days = ["월", "화", "수", "목", "금"];

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 h-full overflow-auto">
      <h3 className="text-sm font-bold text-gray-800 mb-3">🗓 시간표</h3>
      <div className="grid grid-cols-6 gap-1 text-xs min-w-0">
        {/* 헤더 */}
        <div className="text-center text-gray-400 font-medium py-1"></div>
        {days.map((d) => (
          <div key={d} className="text-center font-bold text-gray-600 py-1 bg-gray-50 rounded-lg">
            {d}
          </div>
        ))}

        {/* 시간별 행 */}
        {scheduleData["시간"].map((time, rowIdx) => (
          <>
            <div key={`time-${rowIdx}`} className="text-center text-gray-400 py-2 font-medium text-xs">
              {time}
            </div>
            {days.map((day) => {
              const subject = scheduleData[day][rowIdx];
              const colorClass = subjectColors[subject] || "";
              return (
                <div
                  key={`${day}-${rowIdx}`}
                  className={`rounded-lg py-2 px-1 text-center text-xs font-medium transition-all
                    ${subject ? colorClass : ""}
                    ${subject && subject !== "점심" ? "hover:opacity-80 cursor-pointer" : ""}
                  `}
                >
                  {subject || ""}
                </div>
              );
            })}
          </>
        ))}
      </div>
    </div>
  );
}