import React from "react";
import { useGetPlaces, useHandleBookMark } from "../hooks/tempMutate";

const BookMark = () => {
  const { data, isLoading, isError } = useGetPlaces();
  const mutatePatchBookMark = useHandleBookMark();

  const USER_ID = 4; // 로그인된 유저 아이디임!

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>데이터 로딩중 에러 발생</div>;

  return (
    <div className="flex flex-col items-center space-y-4">
      {data.map((place) => {
        const bookmarked = place.bookmarks.some(
          (user) => user.userId === USER_ID
        );
        return (
          <div key={place.id}>
            <div>{place.title}</div>
            <div>즐겨찾기 갯수: {place.bookmarks.length}</div>
            <button
              onClick={() =>
                mutatePatchBookMark({
                  id: place.id,
                  userId: USER_ID,
                  bookmarked,
                })
              }
              className={`px-4 py-2 rounded text-white font-semibold focus:outline-none ${
                bookmarked ? "bg-yellow-500" : "bg-gray-500"
              } transition-colors duration-300`}
            >
              {bookmarked ? "즐겨찾기 취소" : "즐겨찾기"}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default BookMark;
