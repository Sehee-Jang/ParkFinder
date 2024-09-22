import { Outlet, useNavigate } from "react-router-dom";
import useAuthStore from "../zustand/authStore";
import Sidebar from "./SideBar";

const MainLayout = () => {
  const navigate = useNavigate();
  const { clearAuth } = useAuthStore();

  const handleLogout = () => {
    clearAuth();
    navigate("/");
  };

  return (
    <div id="contents">
      <Sidebar handleLogout={handleLogout} />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
