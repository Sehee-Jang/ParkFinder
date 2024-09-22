import React, { useEffect } from "react";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";
import useMapStore from "../../zustand/mapStore";
import { useMapActions } from "../../hooks/useMapActions";
import pinMarker from "../../assets/images/pin-marker@2x.png";
import myLocation from "../../assets/images/my-location@2x.png";

const { kakao } = window;

const KakaoMap = () => {
  const {
    location,
    setLastCenter,
    map,
    setMap,
    setKeyword,
    openMarkerId,
    setOpenMarkerId,
    searchs,
    setCurrentPage,
    isSidebarOpen,
    getUserCurrentPosition
  } = useMapStore();
  const { moveLatLng, searchPlaces } = useMapActions();

  // 컴포넌트가 처음 로드될 때 사용자 위치를 가져옴
  useEffect(() => {
    getUserCurrentPosition();
  }, []);

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

  useEffect(() => {}, [isSidebarOpen]);

  // 현재 위치로 돌아가기
  const handleGoBack = () => {
    const newLatLng = new kakao.maps.LatLng(location.center.lat, location.center.lng);
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

  if (location.isLoading) return <div>로딩중...</div>;

  return (
    <>
      <div className="relative">
        {/* 지도 컴포넌트 */}
        <Map center={location.center} style={{ width: "100%", height: "100vh" }} level={3} onCreate={setMap}>
          {/* 현재 위치 마커 표시 */}
          <MapMarker
            position={location.center}
            image={{
              src: myLocation,
              size: { width: 42, height: 42 }
            }}
          />
          {/* 현 지도에서 키워드 재검색 버튼 */}
          <button className="button button-sm re-search" onClick={handleReSearch}>
            현 지도 내 검색
          </button>
          {/* 현재 위치 버튼 */}
          <button className="my-location-button" onClick={handleGoBack} />

          {/* 검색된 장소 마커 표시 */}
          {searchs.map((data) => (
            <React.Fragment key={data.id}>
              <MapMarker
                key={data.id}
                position={{ lat: data.y, lng: data.x }}
                image={{
                  src: pinMarker,
                  size: { width: 32, height: 48 }
                }}
                onClick={() => handleMapMarker(data)}
              />
              {/* 해당 마커에 커스텀 오버레이 표시 */}
              {openMarkerId === data.id && (
                <CustomOverlayMap yAnchor={2.6} position={{ lat: data.y, lng: data.x }} clickable>
                  <div className="overlay-map">
                    <span>{data.place_name}</span>
                    <span className="arrow" />
                  </div>
                </CustomOverlayMap>
              )}
            </React.Fragment>
          ))}
        </Map>
      </div>
    </>
  );
};

export default KakaoMap;
