import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import BookmarkTestHome from "../pages/bookmarkTest/bookmarkTestHome";
import BookmarkTestMyPage from "../pages/bookmarkTest/bookmarkTestMyPage";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import MyPage from "../pages/MyPage/MyPage";


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/bookmarkhome"
            element={
              <ProtectedRoute>
                <BookmarkTestHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookmarkmypage"
            element={
              <ProtectedRoute>
                <BookmarkTestMyPage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route
          path="/mypage"
          element={
            <ProtectedRoute>
              <MyPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
