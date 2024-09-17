import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyPage from "./pages/MyPage";
import ProtectedRoute from "./components/ProtectedRoute";
import BookmarkTestHome from "./pages/bookmarkTest/bookmarkTestHome";
import BookmarkTestMyPage from "./pages/bookmarkTest/bookmarkTestMyPage";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Layout user={user} setUser={setUser}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/mypage"
            element={
              <ProtectedRoute user={user}>
                <MyPage user={user} setUser={setUser} />
              </ProtectedRoute>
            }
          />

          <Route path="/bookmarkhome" element={<BookmarkTestHome />} />
          <Route path="/bookmarkmypage" element={<BookmarkTestMyPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
