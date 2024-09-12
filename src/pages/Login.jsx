import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <h1>로그인</h1>
      <p>
        계정이 없으신가요? <Link to="signup">회원가입</Link>
      </p>
    </div>
  );
};

export default Login;
