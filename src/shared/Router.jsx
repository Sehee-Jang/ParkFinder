import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import Home from "../pages/main/Home";
import Login from "../pages/join/Login";
import Signup from "../pages/join/Signup";
import MyPage from "../pages/myPage/MyPage";
import MainLayout from "../components/MainLayout";
import SubLayout from "../components/SubLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Router = () => {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={1000} closeOnClick draggable transition:Bounce />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
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
