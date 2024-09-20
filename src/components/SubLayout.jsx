import { Outlet } from "react-router-dom";

const SubLayout = () => {

  return (
    <div className="flex flex-row w-full">
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default SubLayout;
