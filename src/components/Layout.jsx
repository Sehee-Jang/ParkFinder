import { Outlet, useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../zustand/authStore";
import Sidebar from "./SideBar";

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearAuth } = useAuthStore();

  const handleLogout = () => {
    clearAuth();
    navigate("/");
  };

  // 로그인 및 회원가입 페이지의 경로를 확인하여 사이드바 노출 여부 결정
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className="flex flex-row w-[1920px]">
      {!isAuthPage && <Sidebar handleLogout={handleLogout} />}
      {/* <Sidebar handleLogout={handleLogout} /> */}
      {/* <main className="flex-1"> */}
     <main className={`flex-1 ${isAuthPage ? ' justify-center' : ''}`}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
