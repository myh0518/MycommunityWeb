import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import BottomTabBar from "./components/BottomTabBar";
import MyPage from "./pages/MyPage";
import LoginPage from "./pages/LoginPage";

function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-dvh bg-gray-50 overflow-hidden">
      {/* 사이드바 */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* 메인 영역 */}
      <div className="flex flex-col flex-1 md:ml-64 min-w-0 h-full">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        {/* pt-16 = 네비바 높이, pb-16 = 모바일 하단 탭바 높이 */}
        <main className="flex-1 overflow-y-auto pt-16 pb-16 md:pb-0 px-4 md:px-6">
          {children}
        </main>
      </div>

      {/* 하단 탭바 (모바일만) */}
      <BottomTabBar />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/*" element={
            <Layout>
              <Routes>
                <Route path="/" element={<p className="text-gray-500">홈 페이지</p>} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/board" element={<p className="text-gray-500">게시판 페이지</p>} />
                <Route path="/follow" element={<p className="text-gray-500">팔로우 페이지</p>} />
                <Route path="/likes" element={<p className="text-gray-500">좋아요 페이지</p>} />
                <Route path="/settings" element={<p className="text-gray-500">설정 페이지</p>} />
              </Routes>
            </Layout>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;