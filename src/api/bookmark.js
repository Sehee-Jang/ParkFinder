import axios from "axios";

const API_URL = "http://localhost:5000/posts";
// const API_URL2 = "http://localhost:5001/posts";

const fetchPlaces = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("fetchPosts 데이터 요청 오류 => ", error);
  }
};

const fetchPlace = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response;
  } catch (error) {
    console.error("fetchPost 데이터 요청 오류 => ", error);
  }
};

const handleBookmarkToggle = async ({ id, userId, bookmarked }) => {
  try {
    const response = await fetchPlace(id);
    // 장소 데이터를 id 값으로  하나만 가져옴

    // 즐겨찾기 상태 업데이트 하는건데 현재 사용자가 해당 게시물에 좋아요를 눌려져 있는 상태에서
    // 해당 함수를 호출한 거라면 그 유저의 ID 값은 빼고 나머지를 bookmarkData에 담음

    // 그게 아니라면 현재 유저의 ID를 포함한 데이터를 bookmarkData에 담음

    const bookmarkData = bookmarked
      ? response.data.bookmarks.filter((bookmark) => bookmark.userId !== userId)
      : [...response.data.bookmarks, { userId }];

    //id값에 해당하는 게시물의 bookmarks(회원 ID 리스트)를 bookmarkData로 업뎃!
    await axios.patch(`${API_URL}/${id}`, { bookmarks: bookmarkData });

    return response;
  } catch (error) {
    console.error("updateBookMark 즐겨찾기 업데이트 오류 => ", error);
  }
};

const bookmarkApi = {
  fetchPlace,
  fetchPlaces,
  handleBookmarkToggle,
};

export default bookmarkApi;
