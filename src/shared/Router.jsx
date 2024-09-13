import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import MyPage from "../pages/MyPage";
import BookmarkTestHome from "../pages/bookmarkTest/bookmarkTestHome";
import BookmarkTestMyPage from "../pages/bookmarkTest/bookmarkTestMyPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mypage" element={<MyPage />} />

        <Route path="/bookmarkhome" element={<BookmarkTestHome />} />
        <Route path="/bookmarkmypage" element={<BookmarkTestMyPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
