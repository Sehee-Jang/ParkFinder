import useMapStore from "../zustand/mapStore";

const { kakao } = window;

export const useMapActions = () => {
  const { location, map, keyword, setIsSidebarOpen, setSearchs, setPagination } = useMapStore();

  // 마커의 위치로 지도의 중심 좌표 이동하기
  const moveLatLng = (data) => {
    const newLatLng = new kakao.maps.LatLng(data.y, data.x);
    map.panTo(newLatLng);
  };

  // 키워드로 주변 위치 검색
  const searchPlaces = (center, page) => {
    // Places 서비스 객체 생성
    const ps = new kakao.maps.services.Places();
    const options = {
      // 함수 호출 시에 전달받은 중심 좌표를 사용해 검색을 수행하게 변경
      location: new kakao.maps.LatLng(center.lat, center.lng),
      sort: kakao.maps.services.SortBy.DISTANCE,
      // radius: 5000, // 검색 반경
      page
    };

    // Places 서비스의 keywordSearch 메소드 호출
    ps.keywordSearch(
      `${keyword} 주차장`,
      (data, status, pagination) => {
        if (status === kakao.maps.services.Status.OK) {
          displayPlaces(data);

          // 검색 결과만을 기준으로 지도 영역을 조정
          const bounds = new kakao.maps.LatLngBounds();
          data.forEach((item) => bounds.extend(new kakao.maps.LatLng(item.y, item.x)));

          // 조정된 지도 영역을 설정하며 줌 레벨을 변경하지 않음
          map.setBounds(bounds);

          setPagination(pagination);
        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
          setIsSidebarOpen(true);
          setSearchs(data);
        } else if (status === kakao.maps.services.Status.ERROR) {
          console.error("검색에 실패하였습니다.");
        }
      },
      options
    );
  };

  // 검색된 장소 표시하기
  const displayPlaces = (data) => {
    const bounds = new kakao.maps.LatLngBounds();

    // 검색된 장소 위치와 현재위치 기준으로 지도 범위 재설정
    data.forEach((item) => bounds.extend(new kakao.maps.LatLng(item.y, item.x)));
    bounds.extend(new kakao.maps.LatLng(location.center.lat, location.center.lng));
    map.setBounds(bounds);
    setSearchs(data);
  };

  return { moveLatLng, searchPlaces };
};
