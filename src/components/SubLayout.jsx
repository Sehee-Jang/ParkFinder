import { Outlet, useNavigate } from "react-router-dom";
import useAuthStore from "../zustand/authStore";

const SubLayout = () => {
  const navigate = useNavigate();

  const { clearAuth } = useAuthStore();

  const handleLogout = () => {
    clearAuth();
    navigate("/");
  };

  return (
    <div className="flex flex-row w-full">
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default SubLayout;
