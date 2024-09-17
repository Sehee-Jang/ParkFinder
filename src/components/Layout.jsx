import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../zustand/authStore";

const Layout = ({ children, user, setUser }) => {
  const navigate = useNavigate();
  const { token, clearAuth } = useAuthStore();
  // 로그인 하지 않은 사용자를 login 페이지로 보냄
  useEffect(() => {}, []);

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken"); // localStorage의 accessToken을 지워줌
    setUser(null);
    clearAuth();
    navigate("/"); // 로그아웃한 뒤 홈으로 보내줌
  };

  return (
    <div>
      <header>
        <nav>
          <Link to="/">홈</Link>
          <br></br>
          <Link to="/mypage">myPage</Link>
          <div className="space-x-4">
            {token ? (
              <>
                <button onClick={handleLogout}>로그아웃</button>
              </>
            ) : (
              <Link to="/login">로그인</Link>
            )}
          </div>
          <Link to="/bookmarkhome">북마크로 이동</Link>
        </nav>
      </header>
      <main className="container mx-auto pt-10 main">{children}</main>
    </div>
  );
};

export default Layout;
