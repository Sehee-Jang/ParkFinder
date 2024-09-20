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
    <div className="flex w-full flex-row items-center gap-[15px]">
      {filteredPlaces.length ? (
        // 데이터가 있는 경우 필터된 장소 리스트 렌더링
        filteredPlaces.map((place) => <PlaceItem key={place.id} place={place} USER_ID={USER_ID} />)
      ) : (
        <>북마크한 장소가 없습니다.</>
      )}
    </div>
  );
};

export default PlaceList;
