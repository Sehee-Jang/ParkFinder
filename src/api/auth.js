import axios from "axios";
import { updateUserComments } from "./comments";

const API_URL = "https://moneyfulpublicpolicy.co.kr";

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
};

export const getUserProfile = async (token) => {
  const response = await axios.get(`${API_URL}/user`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const updateProfile = async (formData, token) => {
  const response = await axios.patch(`${API_URL}/profile`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data"
    }
  });

  // 프로필 업데이트 후 댓글의 프로필 정보도 업데이트
  try {
    await updateUserComments(response.data.id, {
      nickname: response.data.nickname,
      avatar: response.data.avatar
    });
  } catch (error) {
    console.error("댓글 프로필 정보 업데이트 실패:", error);
  }

  return response.data;
};
