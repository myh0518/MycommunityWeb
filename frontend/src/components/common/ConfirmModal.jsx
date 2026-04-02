export default function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-80 border border-gray-100">
        <p className="text-sm font-medium text-gray-800 text-center mb-5">{message}</p>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="flex-1 py-2 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors"
          >
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
}