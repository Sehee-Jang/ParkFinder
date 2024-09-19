import { useState, useEffect } from "react";

const KakaoMap = () => {
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState(null);
  const [ps, setPs] = useState(null);
  const [infowindow, setInfowindow] = useState(null);
  const [keyword, setKeyword] = useState("주차장");
  const [places, setPlaces] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationData, setPaginationData] = useState({ last: 1 });

  // 사용자 현재 위치
  const getUserCurrentPositon = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  const getKakaoMap = () => {
    // 카카오맵 스크립트를 HTML에 동적으로 추가
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
      import.meta.env.VITE_KAKAO_MAP_API_KEY
    }&autoload=false&libraries=services`;
    document.head.appendChild(script);

    // 스크립트가 로드된 후 실행
    script.onload = () => {
      window.kakao.maps.load(async () => {
        try {
          let position = await getUserCurrentPositon(); // 사용자 현재위치
          let latitude = position.coords.latitude;
          let longitude = position.coords.longitude;

          let mapContainer = document.getElementById("map"); // 지도를 표시할 div
          let mapOption = {
            center: new window.kakao.maps.LatLng(latitude, longitude), // 지도의 중심좌표
            level: 4 // 지도의 확대 레벨
          };
          // 지도를 생성합니다
          let map = new window.kakao.maps.Map(mapContainer, mapOption);
          setMap(map);
          // 장소 검색 객체를 생성합니다
          let ps = new window.kakao.maps.services.Places();
          setPs(ps);
          // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
          let infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });
          setInfowindow(infowindow);
        } catch (error) {
          console.error(error);
        }
      });
    };
  };

  useEffect(() => {
    getKakaoMap();
  }, []);

  useEffect(() => {
    // 키워드로 장소를 검색합니다
    if (ps) {
      searchPlaces();
    }
  }, [ps]); // ps가 설정된 후에만 searchPlaces 실행

  // 키워드 검색을 요청하는 함수입니다
  const searchPlaces = async () => {
    let position = await getUserCurrentPositon(); // 사용자 현재위치
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let options = {
      location: new window.kakao.maps.LatLng(latitude, longitude),
      radius: 10000,
      sort: window.kakao.maps.services.SortBy.DISTANCE
    };

    if (!keyword) {
      alert("키워드를 입력해주세요.");
      return false;
    }

    // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
    ps.keywordSearch(keyword, placesSearchCB, options);
  };

  // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
  const placesSearchCB = (data, status, pagination) => {
    if (status === window.kakao.maps.services.Status.OK) {
      // 정상적으로 검색이 완료됐으면
      // 검색 목록과 마커를 표출합니다
      displayPlaces(data);

      // 페이지 번호를 표출합니다
      displayPagination(pagination);
    } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
      alert("검색 결과가 존재하지 않습니다.");
      return;
    } else if (status === window.kakao.maps.services.Status.ERROR) {
      alert("검색 결과 중 오류가 발생했습니다.");
      return;
    }
  };

  // 검색 결과 목록과 마커를 표출하는 함수입니다
  const displayPlaces = (places) => {
    const bounds = new window.kakao.maps.LatLngBounds();
    const newMarkers = [];

    // 검색 결과 목록에 추가된 항목들을 제거합니다
    removePlaces();
    // 지도에 표시되고 있는 마커를 제거합니다
    removeMarker();

    // 검색 결과 항목을 생성합니다
    setPlaces(places);

    places.forEach((place, index) => {
      // 마커를 생성하고 지도에 표시합니다
      const placePosition = new window.kakao.maps.LatLng(place.y, place.x);
      const marker = addMarker(placePosition, index);
      marker.setMap(map);
      newMarkers.push(marker);
      // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
      // LatLngBounds 객체에 좌표를 추가합니다
      bounds.extend(placePosition);

      // 마커와 검색결과 항목에 mouseover 했을때
      // 해당 장소에 인포윈도우에 장소명을 표시합니다
      // mouseout 했을 때는 인포윈도우를 닫습니다
      window.kakao.maps.event.addListener(marker, "mouseover", function () {
        displayInfowindow(marker, place.place_name);
      });

      window.kakao.maps.event.addListener(marker, "mouseout", function () {
        infowindow.close();
      });

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
      map.setBounds(bounds);
      setMarkers(newMarkers); // 마커 상태 업데이트
    });
  };

  // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
  const addMarker = (position, index) => {
    let imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png"; // 마커 이미지 url, 스프라이트 이미지를 씁니다
    let imageSize = new window.kakao.maps.Size(36, 37); // 마커 이미지의 크기
    let imgOptions = {
      spriteSize: new window.kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
      spriteOrigin: new window.kakao.maps.Point(0, index * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
      offset: new window.kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
    };
    let markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions);
    let marker = new window.kakao.maps.Marker({
      position: position, // 마커의 위치
      image: markerImage
    });

    marker.setMap(map); // 지도 위에 마커를 표출합니다
    setMarkers([...markers, marker]); // 배열에 생성된 마커를 추가합니다

    return marker;
  };

  // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
  const displayPagination = (pagination) => {
    setPaginationData(pagination); // 새로운 페이지네이션 데이터 업데이트
    setCurrentPage(pagination.current); // 현재 페이지 설정
  };

  const handlePage = (page) => {
    setCurrentPage(page); // 페이지 상태 업데이트
    paginationData.gotoPage(page); // 페이지 이동
  };

  // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
  // 인포윈도우에 장소명을 표시합니다
  const displayInfowindow = (marker, title) => {
    let content = '<div style="padding:5px;z-index:1;">' + title + "</div>";

    infowindow.setContent(content);
    infowindow.open(map, marker);
  };

  // 검색결과 목록을 제거하는 함수입니다
  const removePlaces = () => {
    setPlaces([]);
  };

  // 지도 위에 표시되고 있는 마커를 모두 제거합니다
  const removeMarker = () => {
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    setMarkers([]);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchPlaces();
    return false;
  };

  return (
    <div className="map-wrap">
      <div id="map" style={{ width: "100vw", height: "100vh", position: "relative", overflow: "hidden" }}></div>

      <div className="menu-wrap">
        <div className="option">
          <div>
            <form onSubmit={handleSearch}>
              키워드 : <input type="text" value={keyword} id="keyword" onChange={(e) => setKeyword(e.target.value)} />
              <button type="submit">검색하기</button>
            </form>
          </div>
        </div>
        <hr />
        <ul className="places-list">
          {places.map((place, index) => {
            return (
              <li key={place.id} className="item">
                <span className={`markerbg marker${index + 1}`}>{index + 1}</span>
                <div className="info">
                  <h5>{place.place_name}</h5>
                  {place.road_address_name ? (
                    <>
                      <span>{place.road_address_name}</span>
                      <span className="jibun gray">{place.address_name}</span>
                    </>
                  ) : (
                    <span>{place.address_name}</span>
                  )}
                  <span className="tel">{place.phone}</span>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="pagination">
          {Array.from({ length: paginationData.last }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={page === currentPage ? "on" : ""}
              onClick={(e) => {
                e.preventDefault();
                handlePage(page); // 페이지 클릭 시 핸들러 실행
              }}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KakaoMap;
