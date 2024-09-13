import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState, useEffect } from "react";

const Profile = ({ userId }) => {
  // 유저 데이터 가져오는 함수
  const getUser = async () => {
    const response = await axios.get("http://localhost:4000/users");
    return response.data;
  };

  // 유저 데이터 업데이트 함수
  const updateUser = async (updatedUser) => {
    await axios.put(`http://localhost:4000/users/${updatedUser.id}`, updatedUser);
  };

  const {
    data: users,
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUser
  });

  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      alert("수정이 완료되었습니다.");
      refetch(); // 데이터 갱신 후 재요청
    },
    onError: (error) => {
      console.error("수정 중 오류 발생:", error);
      alert("수정 중 오류가 발생했습니다.");
    }
  });

  // 로딩 상태 처리
  if (isLoading) {
    return <div>로딩중입니다...</div>;
  }

  // 에러 상태 처리
  if (isError) {
    return <div>데이터 조회 중 오류가 발생했습니다.</div>;
  }

  // 특정 userId에 해당하는 사용자 찾기
  const user = users.find((user) => user.id === userId);

  // 사용자가 없을 때 처리
  if (!user) {
    return <div>사용자를 찾을 수 없습니다.</div>;
  }

  // 폼 상태 관리
  const [nickname, setNickname] = useState(user.nickname);

  useEffect(() => {
    if (user) {
      setNickname(user.nickname);
    }
  }, [user]);

  // 사용자 정보 업데이트 핸들러
  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedUser = { ...user, nickname };
    mutation.mutate(updatedUser);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold underline">{user.nickname}님, 환영합니다.</h1>
      <p>ID: {user.id}</p>
      <p>닉네임: {user.nickname}</p>

      <form onSubmit={handleUpdate}>
        <div>
          <br></br>
          <p>새 닉네임:</p>
          <input type="text" id="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} />
        </div>
        <button type="submit">수정</button>
      </form>
    </div>
  );
};

export default Profile;
