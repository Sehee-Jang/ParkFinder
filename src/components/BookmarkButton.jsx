import React from "react";
import { useCreatePlaceAndUpdate } from "../hooks/useCreatePlaceAndUpdate";
import { useGetPlaces } from "../hooks/useGetPlaces";

const BookmarkButton = ({ place, userId }) => {
  const { mutate: createBookmark } = useCreatePlaceAndUpdate();
  const { data: places } = useGetPlaces();

  const isBookmarked = () => {
    if (!places) return false;

    const existingPlace = places.find((p) => p.id === place.id);

    return existingPlace ? existingPlace.bookmarks.some((b) => b.userId === userId) : false;
  };

  const handleClick = () => {
    if (!userId) {
      return alert("로그인 유저만 가능합니다.");
    }
    createBookmark({ place, userId });
  };

  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleClick();
        }}
        className={`rounded-lg text-white font-semibold focus:outline-none ${
          isBookmarked() ? "bg-teal-500" : "bg-teal-100"
        } transition-colors duration-300`}
      >
        {isBookmarked() ? "★" : "☆"}
      </button>
    </>
  );
};

export default BookmarkButton;
