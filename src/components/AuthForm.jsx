import React from "react";
import { useState } from "react";

const AuthForm = ({ mode, onSubmit }) => {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    name: "",
    nickname: mode === "signup" ? "" : "" // 회원가입일 때만 닉네임 필드 활성화, 빈 문자열로 초기화
  });

  const [errors, setErrors] = useState({
    id: "",
    password: "",
    name: "",
    nickname: ""
  });

  const validateForm = () => {
    let isValid = true;
    let newErrors = {
      id: "",
      password: "",
      name: "",
      nickname: ""
    };

    // 아이디 유효성 검사: 최소 5자 이상 입력
    if (!formData.id || formData.id.length < 5) {
      newErrors.id = "아이디는 최소 5자 이상이어야 합니다.";
      isValid = false;
    }

    // 비밀번호 유효성 검사: 최소 8자 이상 입력
    if (!formData.password || formData.password.length < 8) {
      newErrors.password = "비밀번호는 최소 8자 이상이어야 합니다.";
      isValid = false;
    }

    // 이름 유효성 검사: signup일때만
    if (mode === "signup" && !formData.name) {
      newErrors.name = "이름을 입력해주세요.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // onChange할 때마다 formData의 값이 업데이트 되야 함
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value // id가 변경되면 id가 인식, password가 변겨오디면 password가 인식 됨
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // 유효성 검사
    if (validateForm()) {
      // 유효성 검사가 통과되면 제출: 로그인 페이지에서 이미 완성된 handleLogin으로 onSubmit으로 줄 로직을 내려보내주고 있기때문에 onSubmit으로 온 것을 그대로 실행만 시켜주면 됨
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6 w-96">
        <input
          type="text"
          name="id"
          value={formData.id}
          onChange={handleChange}
          placeholder="아이디"
          className={`input ${errors.id ? "border-red-500" : ""}`}
          required
        />
        {errors.id && <span className="text-red-500">{errors.id}</span>}
      </div>
      <div className="mb-6 w-96">
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="비밀번호"
          className={`input ${errors.password ? "border-red-500" : ""}`}
          required
        />
        {errors.password && <span className="text-red-500">{errors.password}</span>}
      </div>

      {/* 회원가입일 경우에만 이름, 닉네임 입력 필드 표시 */}
      {mode === "signup" && (
        <div className="mb-6 w-96">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="이름"
            className={`input ${errors.name ? "border-red-500" : ""}`}
            required
          />
          {errors.name && <span className="text-red-500">{errors.name}</span>}
        </div>
      )}
      {mode === "signup" && (
        <div className="mb-6 w-96">
          <input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            placeholder="닉네임"
            className="input"
          />
          {errors.nickname && <span className="text-red-500">{errors.nickname}</span>}
        </div>
      )}

      <button type="submit" className="button w-full">
        {/* 만약 mode === "login"의 조건이 참이면 "로그인"이 출력, 거짓이면 "회원가입" 출력  */}
        {mode === "login" ? "로그인" : "회원가입"}
      </button>
    </form>
  );
};

export default AuthForm;
