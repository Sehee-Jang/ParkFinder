import React from "react";
import Bookmark from "../../components/Bookmark";
import Profile from "./Profile";

const MyPage = () => {
  return (
    <div className="grid w-screen min-h-screen">
      <Profile></Profile>
      <Bookmark></Bookmark>
    </div>
  );
};

export default MyPage;
