import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { getUserProfile, updateProfile } from "../../api/auth";
import useAuthStore from "../../zustand/authStore";
import defaultImage from "../../assets/images/default_img.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  // 로컬 스토리지에서 userAccessToken 가져옴 => 추후 세션 스토리지 방식으로 변경 시 세션 스토리지 방식으로 변경 필요
  // const localAccessToken = localStorage.getItem("accessToken");
  const { token } = useAuthStore();

  const [isEdit, setIsEdit] = useState(false);
  const [nickname, setNickname] = useState();
  const [imgSrc, setImgSrc] = useState();
  // TanStack Query 중 invalidateQueries를 위한 변수
  const queryClient = useQueryClient();
  // input 수정 버튼 클릭시 input창에 포커스 되도록 하기 위한 변수
  const inputRef = useRef(null);

  // "수정" 시 유저 닉네임 input창에 focus
  useEffect(() => {
    if (isEdit) {
      inputRef.current?.focus();
    }
  }, [isEdit]);

  // TanStack Query
  const {
    data: user,
    isPending,
    isError
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserProfile(token)
  });

  // TanStack Query mutate
  const { mutate } = useMutation({
    mutationFn: (formData) => updateProfile(formData, token),
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
      setIsEdit(false);
      toast.success("프로필 변경이 완료되었습니다.");
    },
    onError: () => {
      toast.error("프로필 변경 중 오류가 발생했습니다.");
    }
  });

  if (isPending) {
    return "";
  }

  if (isError) {
    return alert("사용자 정보를 불러오는 중 오류가 발생했습니다.");
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const objectUrl = URL.createObjectURL(file); // 파일을 URL로 변환
      document.getElementById("imgPrev").src = objectUrl;
      setImgSrc(file);
    }
  };

  return (
    <div className="flex items-center my-4 justify-center">
      <img
        id="imgPrev"
        src={user.avatar || defaultImage}
        className="rounded-full mt-2 border border-zinc-400 ... size-60"
      />
      <div className="ml-10">
        <h1 className="text-5xl mb-5">
          <span className="text-teal-500 font-bold">{user.nickname}님,</span>
          환영합니다.
        </h1>
        <h2 className="text-2xl my-2">
          <span className="text-teal-500 font-bold">ID : </span>
          {user.id}
        </h2>

        <div className="my-2 flex items-center">
          <h2 className="text-2xl">
            <span className="text-teal-500 font-bold">닉네임 : </span>
            {isEdit ? (
              <input
                className="input w-auto ..."
                maxLength="12em"
                ref={inputRef}
                onChange={(e) => {
                  setNickname(e.target.value);
                }}
                value={nickname}
              ></input>
            ) : (
              user.nickname
            )}
          </h2>
          <div
            className="mx-2"
            onClick={() => {
              if (!isEdit) {
                setNickname(user.nickname);
                setImgSrc(user.avatar);
                setIsEdit(true);
              }
            }}
          >
            {isEdit ? null : (
              <span className="button button-2xs ml-1">수정</span>
            )}
          </div>
        </div>

        {isEdit ? (
          <div className="my-2 flex items-center">
            <h2 className="text-2xl">
              <input
                type="file"
                className="input ..."
                maxLength="12em"
                onChange={(e) => {
                  handleImageChange(e);
                }}
              ></input>
            </h2>
            <div
              className="mx-2 button"
              onClick={() => {
                if (isEdit) {
                  // 저장 모드 일 때 저장 버튼 클릭 시..
                  const formData = new FormData();
                  formData.append("avatar", imgSrc);
                  formData.append("nickname", nickname);
                  mutate(formData);
                }
              }}
            >
              {isEdit ? "저장" : null}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Profile;
