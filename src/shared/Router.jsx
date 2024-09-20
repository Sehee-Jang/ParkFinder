import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import BookmarkTestHome from "../pages/bookmarkTest/bookmarkTestHome";
import BookmarkTestMyPage from "../pages/bookmarkTest/bookmarkTestMyPage";
import MyPage from "../pages/MyPage/MyPage";
import Login from "../pages/join/Login";
import Signup from "../pages/join/Signup";
import MainLayout from "../components/MainLayout";
import SubLayout from "../components/SubLayout";
import Home from "../pages/Home";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route
            path="/bookmarkhome"
            element={
              <ProtectedRoute authOnly={true}>
                <BookmarkTestHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookmarkmypage"
            element={
              <ProtectedRoute authOnly={true}>
                <BookmarkTestMyPage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="/" element={<SubLayout />}>
          <Route
            path="/login"
            element={
              <ProtectedRoute>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <ProtectedRoute>
                <Signup />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mypage"
            element={
              <ProtectedRoute authOnly={true}>
                <MyPage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
