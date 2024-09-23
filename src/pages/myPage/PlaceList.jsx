import React from "react";
import PlaceItem from "./PlaceItem";
import { useGetPlaces } from "../../hooks/useGetPlaces";
import useAuthStore from "../../zustand/authStore";

const PlaceList = () => {
  const { user } = useAuthStore();
  const USER_ID = user.id;
  const { data, isLoading, isError } = useGetPlaces();

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>데이터 로딩 중 에러 발생</div>;

  // 북마크한 장소만 필터링
  const filteredPlaces = data.filter((place) => place.bookmarks.some((bookmark) => bookmark.userId === USER_ID));

  return (
    <>
      {filteredPlaces.length === 0 ? (
        <div className="no-list mt-10">북마크한 장소가 없습니다.</div>
      ) : (
        <div className="grid grid-cols-4 gap-6 justify-items-center mt-[70px]">
          {filteredPlaces.map((place) => (
            <PlaceItem key={place.id} place={place} USER_ID={USER_ID} />
          ))}
        </div>
      )}
    </>
  );
};

export default PlaceList;
