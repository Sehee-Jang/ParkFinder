import React from "react";

const BookmarkButton = ({ bookmarked, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg text-white font-semibold focus:outline-none ${
        bookmarked ? "bg-teal-500" : "bg-teal-100"
      } transition-colors duration-300`}
    >
      {bookmarked ? "★" : "☆"}
    </button>
  );
};

export default BookmarkButton;
