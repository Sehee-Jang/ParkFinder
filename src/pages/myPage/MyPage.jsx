import React from "react";
import Bookmark from "./Bookmark";
import Profile from "./Profile";
import { Link } from "react-router-dom";

const MyPage = () => {
  return (
    <div className="grid w-screen min-h-screen">
      <div className="absolute top-4 left-4">
        <Link to="/">
          <span className="material-symbols-rounded">home</span>
        </Link>
      </div>
      <Profile></Profile>
      <Bookmark></Bookmark>
    </div>
  );
};

export default MyPage;
