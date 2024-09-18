import React from "react";
import PlaceList from "./PlaceList";

const Bookmark = () => {
  return (
    <div className="flex items-center my-4 justify-center">
      <PlaceList isMyPage={true} />
    </div>
  );
};

export default Bookmark;
