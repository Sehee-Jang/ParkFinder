import { Outlet, useNavigate } from "react-router-dom";
import useAuthStore from "../zustand/authStore";
import Sidebar from "./SideBar";

const Layout = () => {
  const { clearAuth } = useAuthStore();

  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    navigate("/");
  };

  return (
    <div className="flex flex-row w-[1920px]">
      <Sidebar handleLogout={handleLogout} />
      <main className="flex-1 w-3/4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
