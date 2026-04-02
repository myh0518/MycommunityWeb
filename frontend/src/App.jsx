import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/layout/Layout";
import MyPage from "./pages/MyPage";
import LoginPage from "./pages/LoginPage";

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