import React, { useState } from "react";
import PlaceItem from "./PlaceItem";
import { useGetPlaces } from "../hooks/tempMutate";

const PlaceList = ({ isMyPage }) => {
  //테스트용 상태
  // const USER_ID = 14;
  const [USER_ID, setUSER_ID] = useState(10);
  const [isClicked, setIsClicked] = useState(false);

  //얘는 테스트 아님!
  const { data, isLoading, isError } = useGetPlaces();

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>데이터 로딩 중 에러 발생</div>;

  /// 데이터가 다 들어오기 전에 data를 사용하려고 하면 null값이어서 오류남요
  // 그래서 로딩과 에러처리가 끝나고 나서 밑에서 필터처리고고!

  const filteredPlaces = data.filter((place) =>
    place.bookmarks.some((bookmark) => bookmark.userId === USER_ID)
  );

  return (
    <div className="flex flex-col items-center gap-[15px]  h-screen w-[400px]">
      {/* 로그인 구현되기 전 임시로 유저 아이디값 바꿔주는 겁니다!! */}
      <div className="flex flex-col items-center">
        <p className="text-sm font-bold text-green-600">유저 ID : {USER_ID}</p>
        <div className="flex gap-[5px]">
          <button
            className="border-black"
            onClick={() => setUSER_ID(USER_ID + 1)}
          >
            +
          </button>
          <button
            className="border-black"
            onClick={() => setUSER_ID(USER_ID - 1)}
          >
            -
          </button>
        </div>
      </div>

      {isMyPage ? (
        // 마이페이지이면 필터된 장소리스트를 뿌려주기
        <>
          {filteredPlaces.length ? (
            // 데이터 값 있는지 없는지 판단 후 렌더링
            <>
              {filteredPlaces.map((place) => (
                <PlaceItem key={place.id} place={place} USER_ID={USER_ID} />
              ))}
            </>
          ) : (
            <>북마크한 장소가 없습니다.</>
          )}
        </>
      ) : (
        // 마이페이지가 아니면 그냥 모든 리스트 뿌려주기
        <>
          {data.map((place) => (
            <PlaceItem key={place.id} place={place} USER_ID={USER_ID} />
          ))}
        </>
      )}
    </div>
  );
};

export default PlaceList;
