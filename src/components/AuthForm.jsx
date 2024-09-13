import React from "react";
import { useState } from "react";

const AuthForm = () => {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    nickname: mode === "signup" ? "" : "" // 회원가입일 때만 닉네임 필드 활성화, 빈 문자열로 초기화
  });
  const handleChange = () => {};
  const handleSubmit = () => {};

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="id" value={FormData.id} onChange={handleChange} placeholder="아이디" required />
      <input
        type="password"
        name="password"
        value={FormData.password}
        onChange={handleChange}
        placeholder="비밀번호"
        required
      />
      {/* 회원가입일 경우에만 닉네임 입력 필드 표시 */}
      {mode === "signup" && (
        <Input
          type="text"
          name="nickname"
          value={formData.nickname}
          onChange={handleChange}
          placeholder="닉네임"
          required
          className="w-full p-4 border border-gray-300 rounded-lg"
        />
      )}
      <button type="submit">
        {/* 만약 mode === "login"의 조건이 참이면 "로그인"이 출력, 거짓이면 "회원가입" 출력  */}
        {mode === "login" ? "로그인" : "회원가입"}
      </button>
    </form>
  );
};

export default AuthForm;
