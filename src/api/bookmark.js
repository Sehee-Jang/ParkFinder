import axios from "axios";

const API_URL = "https://far-spotty-helicopter.glitch.me/places";

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

const createPlaceAndUpdate = async ({ place, userId }) => {
  // throw new Error("테스트용 에러");

  try {
    const places = await fetchPlaces();

    // places에 인자로 전달받은 place가 존재하는지의 여부
    const existingPlace = places.find((existingPlace) => existingPlace.id === place.id);

    if (existingPlace) {
      return await updateBookmark(existingPlace, userId);
    } else {
      return await createNewPlace(place, userId);
    }
  } catch (error) {
    console.error("장소 확인 중 오류 발생:", error);
  }
};

// 북마크 업데이트 함수
const updateBookmark = async (existingPlace, userId) => {
  try {
    //유저 아이디 여부
    const userBookmarkExists = existingPlace.bookmarks.some((bookmark) => bookmark.userId === userId);

    if (userBookmarkExists) {
      // 유저의 아이디가 다른 것만 반환
      existingPlace.bookmarks = existingPlace.bookmarks.filter((bookmark) => bookmark.userId !== userId);
    } else {
      existingPlace.bookmarks.push({ userId });
    }

    // 조건문에 따른 데이터를 업데이트함
    const response = await axios.patch(`${API_URL}/${existingPlace.id}`, existingPlace);
    return response.data;
  } catch (error) {
    console.error("북마크 업데이트 중 오류 발생:", error);
  }
};

// 새로운 장소 생성 함수
const createNewPlace = async (place, userId) => {
  try {
    const bookmarkData = {
      id: place.id,
      title: place.place_name,
      address_name: place.address_name,
      bookmarks: [{ userId }]
    };

    const response = await axios.post(API_URL, bookmarkData);
    return response.data;
  } catch (error) {
    console.error("새로운 장소 생성 중 오류 발생:", error);
  }
};

const bookmarkApi = {
  fetchPlace,
  fetchPlaces,
  createPlaceAndUpdate
};

export default bookmarkApi;
