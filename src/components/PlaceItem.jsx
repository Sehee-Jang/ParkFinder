import React from "react";
import { useHandleBookMark } from "../hooks/tempMutate";

const PlaceItem = ({ place, USER_ID }) => {
  //place에 좋아요를 누른 회원들의 ID값에 현재 로그인된 사용자의 ID 값이 하나라도 있는지 확인하기
  const bookmarked = place.bookmarks.some((user) => user.userId === USER_ID);

  const mutatePatchBookMark = useHandleBookMark();

  return (
    <div key={place.id} className="flex flex-col items-center gap-[5px]">
      <div className="text-base font-bold">{place.title}</div>
      <div className="text-sm">즐겨찾기 갯수: {place.bookmarks.length}</div>
      <button
        onClick={() =>
          mutatePatchBookMark({
            id: place.id,
            userId: USER_ID,
            bookmarked,
          })
        }
        className={`px-4 py-2 rounded text-white font-semibold focus:outline-none w-[150px] ${
          bookmarked ? "bg-yellow-500" : "bg-gray-500"
          
          // transition-colors: 색상 변경에 애니메이션 효과를 추가
          // duration-300: 애니메이션의 지속 시간을 300밀리초로 설정
        } transition-colors duration-300`}
      >
        {bookmarked ? "즐겨찾기 취소" : "즐겨찾기"}
      </button>
    </div>
  );
};

export default PlaceItem;
