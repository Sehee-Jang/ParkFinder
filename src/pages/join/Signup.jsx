import React from "react";
import AuthForm from "../../components/AuthForm";
import { register } from "../../api/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = async (formData) => {
    try {
      await register(formData);
      toast.success("회원가입이 완료되었습니다. 로그인해주세요.");
      navigate("/login");
    } catch (error) {
      toast.error("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-zinc-100">
 
      <div className="absolute top-4 left-4">
        {/* <Link to="/">
          <span className="material-symbols-rounded">home</span>
        </Link> */}
      </div>
      <h1 className="text-4xl font-bold text-black mb-10">PARK FINDER</h1>
      <AuthForm mode="signup" onSubmit={handleSignup} />
      <p className="text-zinc-600 mt-6">
        이미 계정이 있으신가요?{" "}
        <Link to="/login" className="text-teal-500 font-semibold pl-1">
          로그인
        </Link>
      </p>
    </div>
  );
};

export default Signup;
