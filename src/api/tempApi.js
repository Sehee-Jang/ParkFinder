import axios from "axios";
const API_URL = "http://localhost:5000/posts";

export const fetchPlaces = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("fetchPosts 데이터 요청 오류 => ", error);
  }
};

export const fetchPlace = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response;
  } catch (error) {
    console.error("fetchPost 데이터 요청 오류 => ", error);
  }
};

export const updateBookMark = async ({ id, userId, bookmarked }) => {
  try {
    const response = await fetchPlace(id);

    const bookmarkData = bookmarked
      ? response.data.bookmarks.filter((bookmark) => bookmark.userId !== userId)
      : [...response.data.bookmarks, { userId }];

    await axios.patch(`${API_URL}/${id}`, { bookmarks: bookmarkData });

    return response;
  } catch (error) {
    console.error("updateBookMark 즐겨찾기 업데이트 오류 => ", error);
  }
};
