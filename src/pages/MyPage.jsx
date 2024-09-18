import React from "react";
import { useNavigate } from "react-router-dom";
import Bookmark from "../components/Bookmark";
import Profile from "../components/Profile";

const MyPage = () => {
  const navigator = useNavigate();

  return (
    <div className="grid w-screen">
      <Profile className="w-screen"></Profile>
      <Bookmark />
    </div>
  );
};

export default MyPage;
