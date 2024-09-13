import React from "react";
import { useNavigate } from "react-router-dom";
import Bookmark from "../components/Bookmark";
import Profile from "../components/Profile";

const MyPage = () => {
  const navigator = useNavigate();

  return (
    <div>
      <button
        onClick={() => {
          navigator("/");
        }}
      >
        Home
      </button>

      {/* Props 전달 방식에서 -> 유저 정보 확립되면 수정 진행*/}
      <Profile userId="s77772005"></Profile>
      <Bookmark></Bookmark>
    </div>
  );
};

export default MyPage;
