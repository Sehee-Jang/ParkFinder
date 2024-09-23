import React from "react";
import Bookmark from "./Bookmark";
import Profile from "./Profile";

const MyPage = () => {
  return (
    <div className="container mx-auto xl:max-w-[1280px]">
      <Profile></Profile>
      <Bookmark></Bookmark>
    </div>
  );
};

export default MyPage;
