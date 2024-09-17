import React from "react";
import { useHandleBookMark } from "../hooks/bookmarkMutate";
import BookmarkButton from "./BookmarkButton";

const PlaceItem = ({ place, USER_ID }) => {
  // place에 좋아요를 누른 회원들의 ID값에 현재 로그인된 사용자의 ID 값이 하나라도 있는지 확인하기
  const bookmarked = place.bookmarks.some((user) => user.userId === USER_ID);
 
  const mutatePatchBookMark = useHandleBookMark();

  const handleBookmarkClick = () => {
    mutatePatchBookMark({
      id: place.id,
      userId: USER_ID,
      bookmarked
    });
  };

  return (
    <div
      key={place.id}
      className="flex flex-col items-center justify-between w-1/6 h-[230px] gap-[5px] rounded-[8px] border border"
    >
      <div className="h-3/5 bg-teal-100 w-full rounded-t-lg"></div>
      <div className="flex flex-col w-full h-2/5 p-1.5">
        <div className="flex flex-row items-center w-full justify-between">
          <div className="text-[16px] font-bold">{place.title}</div>
          <BookmarkButton bookmarked={bookmarked} onClick={handleBookmarkClick} />
        </div>
        <div className="text-gray-500 text-[14px]">어쩌구 저쩌구 이런저런 얘기</div>
      </div>
    </div>
  );
};

export default PlaceItem;
