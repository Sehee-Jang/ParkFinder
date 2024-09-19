import React from "react";
import { Link } from "react-router-dom";
import PlaceList from "../../components/PlaceList";
import useAuthStore from "../../zustand/authStore";

const BookmarkTestMyPage = () => {
  return (
    <div className="flex flex-col items-center gap-[20px]">
      <Link to="/bookmarkhome">
        <button className="w-[150px]">뒤로가기</button>
      </Link>
      <PlaceList isMyPage={true} />
    </div>
  );
};

export default BookmarkTestMyPage;
