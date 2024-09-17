import { Outlet, useNavigate } from "react-router-dom";
import useAuthStore from "../zustand/authStore";
import Sidebar from "./SideBar";

const Layout = ({ setUser }) => {
  const navigate = useNavigate();
  const { clearAuth } = useAuthStore();

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    setUser(null);
    clearAuth();
    navigate("/");
  };

  return (
    <div className="flex flex-row w-[1900px]">
      <Sidebar handleLogout={handleLogout} />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
