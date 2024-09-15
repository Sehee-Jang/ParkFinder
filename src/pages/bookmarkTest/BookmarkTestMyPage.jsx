import React from "react";
import { Link } from "react-router-dom";
import PlaceList from "../../components/PlaceList";

const BookmarkTestMyPage = ({ user }) => {
  return (
    <div className="flex flex-col items-center gap-[20px]">
      <Link to="/bookmarkhome">
        <button className="w-[150px]">뒤로가기</button>
      </Link>
      <PlaceList isMyPage={true} user={user} />
    </div>
  );
};

export default BookmarkTestMyPage;
