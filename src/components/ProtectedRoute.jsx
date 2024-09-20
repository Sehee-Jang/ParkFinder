import React, { useLayoutEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "../zustand/authStore";

const ProtectedRoute = ({ children, authOnly }) => {
  const { user } = useAuthStore();
  const location = useLocation();

  // 로그인하지 않은 경우 보호된 페이지에 접근하려고 하면 로그인 페이지로 리디렉션
  if (!user && authOnly) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // 로그인한 사용자는 /login과 /signup 페이지로 접근할 수 없음
  if (user && (location.pathname === "/login" || location.pathname === "/signup")) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
