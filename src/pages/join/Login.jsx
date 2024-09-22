import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../../components/AuthForm";
import { getUserProfile, login } from "../../api/auth";
import useAuthStore from "../../zustand/authStore";

const Login = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const handleLogin = async (formData) => {
    try {
      // 로그인 하는 로직
      const loginData = await login(formData);
      // console.log("loginData => ", loginData);

      // 로그인이 되었을 때 결과값 안에 있는 accessToken을 localStorage에 넣어줌

      // 로그인 후 accessToken을 바탕으로 getUserProfile을 호출해서 유저에 대한 정보를 얻어옴
      const userProfile = await getUserProfile(loginData.accessToken);
      // console.log("userProfile => ", userProfile);

      setAuth(userProfile, loginData.accessToken);

      navigate("/"); // 로그인 후 홈으로 이동
    } catch (error) {
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-black mb-10">PARK FINDER</h1>
      <AuthForm mode="login" onSubmit={handleLogin} />
      <p className="text-zinc-600 mt-6">
        계정이 없으신가요?{" "}
        <Link to="/signup" className="text-teal-500 font-semibold pl-1">
          회원가입
        </Link>
      </p>
    </div>
  );
};

export default Login;
