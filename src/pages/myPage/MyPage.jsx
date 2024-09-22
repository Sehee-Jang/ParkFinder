import React from "react";
import Bookmark from "./Bookmark";
import Profile from "./Profile";

const MyPage = () => {
  return (
    <div className="container mx-auto">
      <Profile></Profile>
      <Bookmark></Bookmark>
    </div>
  );
};

export default MyPage;
