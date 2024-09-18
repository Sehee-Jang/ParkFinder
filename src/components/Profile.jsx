import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { getUserProfile, updateProfile } from "../api/auth";

const Profile = () => {
  //로컬 스토리지에서 userAccessToken 가져옴 => 추후 세션 스토리지 방식으로 변경 시 세션 스토리지 방식으로 변경 필요
  const localAccessToken = localStorage.getItem("accessToken");
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
    queryFn: () => getUserProfile(localAccessToken)
  });

  // TanStack Query mutate
  const { mutate } = useMutation({
    mutationFn: (formData) => updateProfile(formData),
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
      setIsEdit(false);
    },
    onError: () => {
      alert("프로필 변경 중 오류가 발생했습니다.");
    }
  });

  if (isPending) {
    return "";
  }

  if (isError) {
    return alert("사용자 정보를 불러오는 중 오류가 발생했습니다.");
  }
  return (
    <div className="flex items-center my-4 justify-center">
      <img src={user.avatar} className="rounded-full mt-2 border border-gray-400 ... size-60" />
      <div className="mx-10">
        <h1>
          <span className="text-teal-500 font-bold">{user.nickname}님,</span>
          환영합니다.
        </h1>
        <h2 className="text-2xl my-2 font-bold">
          <span className="text-teal-500">ID : </span>
          {user.id}
        </h2>

        <div className="my-2 flex items-center">
          <h2 className="text-2xl ">
            <span className="text-teal-500">닉네임 : </span>
            {isEdit ? (
              <input
                className="rounded-md border border-gray-300 ..."
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
            className="mx-2 text-teal-500 cursor-pointer underline font-bold"
            onClick={() => {
              if (!isEdit) {
                setNickname(user.nickname);
                setImgSrc(user.avatar);
                setIsEdit(true);
              }
            }}
          >
            {isEdit ? null : "수정"}
          </div>
        </div>

        {isEdit ? (
          <div className="my-2 flex items-center">
            <h2 className="text-2xl">
              <input
                type="file"
                className="rounded-md border border-gray-300 ..."
                maxLength="12em"
                onChange={(e) => {
                  // console.log(e.target.files[0]);
                  setImgSrc(e.target.files[0]);
                }}
              ></input>
            </h2>
            <div
              className="mx-2 text-teal-500 cursor-pointer underline font-bold"
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
