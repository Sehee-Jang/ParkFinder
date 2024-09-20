import React, { useState, useEffect } from "react";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";
import Comments from "../pages/detail/Comments";
import BookmarkButton from "./BookmarkButton";
import useAuthStore from "../zustand/authStore";
// import { Link } from "react-router-dom";

const { kakao } = window;

const KakaoMap = () => {
  // 기본 위치
  const [state, setState] = useState({
    center: null,
    errMsg: null,
    isLoading: true
  });
  // 카카오 맵에 접근해 지도 상태 조작하는 상태 변수
  const [map, setMap] = useState(null);
  // 검색에 사용될 키워드를 관리하는 상태 변수
  const [keyword, setKeyword] = useState("");
  // 검색 결과를 담는 상태 변수
  const [search, setSearch] = useState([]);
  // 검색 결과의 페이지네이션 정보를 관리하는 상태 변수
  const [pagination, setPagination] = useState(null);
  // 현재 페이지 번호를 관리하는 상태 변수
  // 페이지네이션 기능과 연동해 어떤 페이지를 보고 있는지 나타냄
  const [currentPage, setCurrentPage] = useState(1);
  // 현재 열려있는 마커의 ID를 관리하는 상태 변수
  const [openMarkerId, setOpenMarkerId] = useState(null);
  // 사이드바의 열림/닫힘 상태를 관리하는 상태 변수
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  // 사이드바 디테일 영역의 열림/닫힘 상태를 관리하는 상태 변수
  const [isSidebarDetailOpen, setIsSidebarDetailOpen] = useState(false);
  // 마지막으로 이동한 지도의 중심 좌표 저장 상태 변수
  const [lastCenter, setLastCenter] = useState(null);

  const { user } = useAuthStore();

  const USER_ID = user?.id;

  console.log(isSidebarDetailOpen);

  // 사용자 현재 위치를 가져오는 함수
  const getUserCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            },
            isLoading: false
          }));
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false
          }));
        }
      );
    } else {
      setState((prev) => ({
        ...prev,
        errMsg: "현재 위치를 가져올 수 없습니다.",
        isLoading: false
      }));
    }
  };

  // 컴포넌트가 처음 로드될 때 사용자 위치를 가져옴
  useEffect(() => {
    getUserCurrentPosition();
  }, []);

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
          console.log(data);
          displayPlaces(data);

          // 검색 결과만을 기준으로 지도 영역을 조정
          const bounds = new kakao.maps.LatLngBounds();
          data.forEach((item) => bounds.extend(new kakao.maps.LatLng(item.y, item.x)));

          // 조정된 지도 영역을 설정하며 줌 레벨을 변경하지 않음
          map.setBounds(bounds);

          setPagination(pagination);
        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
          setIsSidebarOpen(true);
          setSearch(data);
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
    bounds.extend(new kakao.maps.LatLng(state.center.lat, state.center.lng));
    map.setBounds(bounds);
    setSearch(data);
  };

  // 마커의 위치로 지도의 중심 좌표 이동하기
  const moveLatLng = (data) => {
    const newLatLng = new kakao.maps.LatLng(data.y, data.x);
    map.panTo(newLatLng);
  };

  // 클릭한 마커로 중심 좌표 이동 및 검색 수행 함수
  useEffect(() => {
    if (!map || !state.center) return;
    setOpenMarkerId(null);
    searchPlaces(state.center, currentPage);
  }, [map, keyword, currentPage, state.center]);

  // 마커 클릭 시 CustomOverlayMap를 열고 닫는 함수
  useEffect(() => {
    if (!map) return;
    const clickListener = () => {
      setOpenMarkerId(null);
    };
    kakao.maps.event.addListener(map, "click", clickListener);

    return () => {
      kakao.maps.event.removeListener(map, "click", clickListener);
    };
  }, [map]);

  // 현재 위치로 돌아가기
  const handleGoBack = () => {
    const newLatLng = new kakao.maps.LatLng(state.center.lat, state.center.lng);
    map.panTo(newLatLng);
  };

  // 현 지도 내 검색하기
  const handleReSearch = () => {
    if (!map) return;

    // 현재 지도의 중심 좌표를 검색할 위치로 설정
    const centerLatLng = map.getCenter();
    const newCenter = {
      lat: centerLatLng.getLat(),
      lng: centerLatLng.getLng()
    };
    setKeyword(""); // 검색어 초기화
    setCurrentPage(1); // 검색할 페이지를 1페이지로 초기화
    searchPlaces(newCenter, 1); // 검색 실행
    setLastCenter(newCenter); // lastCenter 업데이트
  };

  // 지도 위 마커 클릭 시
  const handleMapMarker = (data) => {
    if (data.id === openMarkerId) {
      setOpenMarkerId(null);
    } else {
      setOpenMarkerId(data.id);
      moveLatLng(data);
    }
  };

  // 검색하기 버튼
  const handleSearch = (e) => {
    e.preventDefault();
    searchPlaces();
    return false;
  };

  if (state.isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="map-container">
        {/* 지도 컴포넌트 */}
        <Map center={state.center} style={{ width: "100vw", height: "100vh" }} level={3} onCreate={setMap}>
          {/* 현재 위치 마커 표시 */}
          <MapMarker
            position={state.center}
            image={{
              src: "https://cdn-icons-png.flaticon.com/128/7124/7124723.png",
              size: { width: 50, height: 50 }
            }}
          />
          {/* 현재 내 위치로 돌아가는 버튼 */}
          <div className="go-back-button" onClick={handleGoBack} />
          {/* 현 지도에서 키워드 재검색 버튼 */}
          <div className="re-search" onClick={handleReSearch}>
            현 지도 내 검색
          </div>

          {/* 검색된 장소 마커 표시 */}
          {search.map((data) => (
            <React.Fragment key={data.id}>
              <MapMarker
                key={data.id}
                position={{ lat: data.y, lng: data.x }}
                image={{
                  src: "https://cdn-icons-png.flaticon.com/128/2098/2098567.png",
                  size: { width: 35, height: 35 }
                }}
                onClick={() => handleMapMarker(data)}
              />
              {/* 해당 마커에 커스텀 오버레이 표시 */}
              {openMarkerId === data.id && (
                <CustomOverlayMap yAnchor={2.1} position={{ lat: data.y, lng: data.x }} clickable>
                  <div className="overlay">
                    <div className="arrow" />
                    <div className="place-name">{data.place_name}</div>
                  </div>
                </CustomOverlayMap>
              )}
            </React.Fragment>
          ))}
        </Map>

        <div className={`sidebar${isSidebarOpen ? "" : " closed"}`}>
          <div className="sidebar-container">
            <form onSubmit={handleSearch}>
              키워드 :{" "}
              <input
                type="text"
                value={keyword}
                placeholder="주차장 앞 키워드만 입력해 주세요."
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button type="submit">검색하기</button>
            </form>
            <ul className="list">
              {/* 검색된 장소들 목록으로 표시 */}
              {search.map((data) => {
                return (
                  <li
                    className={`item ${data.id === openMarkerId ? "selected" : ""}`}
                    key={data.id}
                    onClick={() => {
                      setOpenMarkerId(data.id);
                      moveLatLng(data);
                    }}
                  >
                    {/* 검색된 장소 상세 정보 표시 */}
                    <div className="name">{data.place_name}</div>
                    <div className="address">{data.address_name}</div>
                    <div className="info-container">
                      <div className="distance">
                        {data.distance >= 1000 ? `${(data.distance / 1000).toFixed(1)}km` : `${data.distance}m`}
                      </div>
                      <BookmarkButton place={data} userId={USER_ID} />
                    </div>
                    <button
                      onClick={() => {
                        setIsSidebarDetailOpen(true);
                      }}
                    >
                      상세보기
                    </button>
                  </li>
                );
              })}
            </ul>
            {/* 검색 결과가 없을 경우 표시 */}
            {search.length === 0 && <div className="no-list">검색된 결과가 없습니다.</div>}
            {/* 검색 결과 있고, 페이지가 있는 경우 페이지 번호 표시 */}
            {pagination && search.length > 0 && (
              <div className="pages">
                {Array.from({ length: pagination.last }).map((_, index) => (
                  <button
                    className={`page-btn ${currentPage === index + 1 ? "selected" : ""}`}
                    key={index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
          </div>

          {isSidebarDetailOpen && (
            <div className={`detail-wrap${isSidebarDetailOpen ? " open" : ""}`}>
              <div className="detail-container">
                <button
                  onClick={() => {
                    setIsSidebarDetailOpen(false);
                  }}
                >
                  <span className="material-symbols-rounded">close</span>
                </button>

                {search.map((data) => (
                  <React.Fragment key={data.id}>
                    {/* 해당 마커에 커스텀 오버레이 표시 */}
                    {openMarkerId === data.id && (
                      <>
                        <div className="name">{data.place_name}</div>
                        <div className="address">{data.address_name}</div>
                        <div className="road-address">
                          <img
                            src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_jibun.png"
                            alt="지번"
                          />
                          <p>{data.road_address_name === "" ? "-" : data.road_address_name}</p>
                        </div>
                        {data.phone !== "" && <div>{data.phone}</div>}
                      </>
                    )}
                  </React.Fragment>
                ))}
                {/* 댓글 컴포넌트  */}
                <div>
                  <Comments placeId={openMarkerId} />
                </div>
                {/* 댓글 컴포넌트 */}
              </div>
            </div>
          )}

          <button
            className={`sidebar-open-btn${isSidebarOpen ? "" : " closed"}`}
            onClick={() => setIsSidebarOpen((prev) => !prev)}
          >
            <span className="material-symbols-rounded">chevron_right</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default KakaoMap;
