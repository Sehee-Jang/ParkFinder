import React from "react";
import PlaceList from "./PlaceList";

const Bookmark = () => {
  return (
    <div className="flex items-center my-4 justify-center">
      <h1>즐겨찾기 List Space</h1>
      <PlaceList isMyPage={true} />
    </div>
  );
};

export default Bookmark;
