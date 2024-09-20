import { Link } from "react-router-dom";
import useAuthStore from "../zustand/authStore";

const Sidebar = ({ handleLogout }) => {
  const { token } = useAuthStore();

  return (
    <aside className="w-1/4 h-screen text-white">
      <nav className="flex flex-col">
        <div className="flex flex-col gap-[15px] bg-teal-500 p-4 pl-[25px] pr-[25px]">
          {token ? (
            <div className="flex flex-row items-center justify-between">
              <Link to="/" className="flex flex-row py-2 hover:bg-blue-500 text-white">
                <p className="font-normal text-[24px]">
                  <span className="font-bold">PARK</span> FINDER
                </p>
              </Link>
              <div className="flex flex-row gap-[10px] text-[14px]">
                <Link to="/mypage" className="py-2 hover:bg-blue-500 text-white">
                  마이페이지
                </Link>
                <Link onClick={handleLogout} className="py-2 hover:bg-blue-500 text-white">
                  로그아웃
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex flex-row items-center justify-between">
              <Link to="/" className="flex flex-row py-2 hover:bg-blue-500 text-white">
                <p className="font-normal text-[24px]">
                  <span className="font-bold">PARK</span> FINDER
                </p>
              </Link>
              <div className="flex flex-row gap-[10px] text-[14px]">
                <Link to="/login" className="py-2 hover:bg-blue-500 text-white text-center block rounded">
                  로그인
                </Link>
                <Link to="/signup" className="py-2 hover:bg-blue-500 text-white text-center block rounded">
                  회원가입
                </Link>
              </div>
            </div>
          )}
          <div>
            <input className="w-full h-[40px] rounded-[8px] pl-4" placeholder="주차장" />
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
