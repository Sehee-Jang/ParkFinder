import React from "react";
import PlaceList from "./../components/PlaceList";
import { Link } from "react-router-dom";

const MyPage = () => {
  return (
    <div className="flex flex-col items-center gap-[20px]">
      <Link to="/">
        <button className="w-[150px]">뒤로가기</button>
      </Link>
      <PlaceList isMyPage={true} />
    </div>
  );
};

export default MyPage;
