import { Link, Outlet, useLocation } from "react-router-dom";

const SubLayout = () => {
  const location = useLocation();
  const isJoin = location.pathname === "/signup" || location.pathname === "/login";

  return (
    <div className={`flex flex-col w-full min-h-screen${isJoin ? " bg-zinc-100" : ""}`}>
      <header className="pt-6 pl-6">
        <Link to="/" className="inline-block">
          <span className="material-symbols-rounded text-teal-500 text-3xl">home</span>
        </Link>
      </header>
      <main className={`grow${isJoin ? " flex" : ""} justify-center`}>
        <Outlet />
      </main>
      <footer className="text-zinc-600 text-sm text-center my-6">© 2024 Park Finder All Rights Reserved</footer>
    </div>
  );
};

export default SubLayout;
