import React from "react";
import Bookmark from "./Bookmark";
import Profile from "./Profile";

const MyPage = () => {
  return (
    <div className="grid w-screen min-h-screen gap-10">
      <Profile></Profile>
      <Bookmark></Bookmark>
    </div>
  );
};

export default MyPage;
