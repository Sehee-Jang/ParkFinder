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
    <button
      onClick={(e) => {
        e.stopPropagation();
        handleClick();
      }}
      className={`button button-2xs button-border px-0 w-8 ${isBookmarked() ? "text-teal-500" : "text-zinc-300"}`}
    >
      {isBookmarked() ? (
        <span className="material-symbols-rounded text-xl material-fill">star</span>
      ) : (
        <span className="material-symbols-rounded text-xl">star</span>
      )}
    </button>
  );
};

export default BookmarkButton;
