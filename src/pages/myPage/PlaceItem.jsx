import React from "react";
import BookmarkButton from "../../components/BookmarkButton";

const PlaceItem = ({ place, USER_ID }) => {
  return (
    <div
      key={place.id}
      className="flex flex-col items-center justify-between w-full h-[230px] gap-[5px] rounded-[8px] border border"
    >
      <div className="h-3/5 bg-teal-100 w-full rounded-t-lg"></div>
      <div className="flex flex-col w-full h-2/5 p-4">
        <div className="flex flex-row items-center w-full justify-between">
          <div className="text-[16px] font-bold">{place.title}</div>
          <BookmarkButton place={place} userId={USER_ID} />
        </div>
        <div className="text-zinc-500 text-[14px]">{place.address_name}</div>
      </div>
    </div>
  );
};

export default PlaceItem;
