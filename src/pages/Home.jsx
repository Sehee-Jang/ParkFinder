import React from "react";
import PlaceList from "../components/PlaceList";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="flex flex-col items-center gap-[20px]">
      <Link to="/mypage">
        <button className="w-[150px]">마이페이지</button>
      </Link>
      <PlaceList isMyPage={false} />
    </div>
  );
};

export default Home;
