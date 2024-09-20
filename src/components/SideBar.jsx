import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../zustand/authStore";
import useMapStore from "../zustand/mapStore";
import { useMapActions } from "../hooks/useMapActions";
import BookmarkButton from "./BookmarkButton";
import Comments from "../pages/detail/Comments";

const Sidebar = () => {
  const { token } = useAuthStore();
  const {
    location,
    map,
    keyword,
    setKeyword,
    openMarkerId,
    setOpenMarkerId,
    searchs,
    pagination,
    currentPage,
    setCurrentPage,
    isSidebarOpen,
    setIsSidebarOpen,
    isSidebarDetailOpen,
    setIsSidebarDetailOpen
  } = useMapStore();
  const { moveLatLng, searchPlaces } = useMapActions();
  const { user } = useAuthStore();
  const USER_ID = user?.id;

  // 클릭한 마커로 중심 좌표 이동 및 검색 수행 함수
  useEffect(() => {
    if (!map || !location.center) return;
    setOpenMarkerId(null);
    searchPlaces(location.center, currentPage);
  }, [map, keyword, currentPage, location.center]);

  // 검색하기
  const handleSearch = (e) => {
    e.preventDefault();
    searchPlaces();
    return false;
  };

  return (
    <aside className={`sidebar${isSidebarOpen ? "" : " closed"}`}>
      <nav>
        <div className="flex flex-col gap-[15px] bg-teal-500 p-6">
          {token ? (
            <div className="flex flex-row items-center justify-between">
              <Link to="/" className="flex flex-row py-2 hover:bg-blue-500 text-white">
                <p className="font-normal text-[24px]">
                  <span className="font-bold">PARK</span> FINDER
                </p>
              </Link>
              <div className="flex flex-row gap-[10px] text-[14px]">
                <Link to="/mypage" className="py-2 hover:bg-blue-500 text-white">
                  마이페이지
                </Link>
                <Link className="py-2 hover:bg-blue-500 text-white">로그아웃</Link>
              </div>
            </div>
          ) : (
            <div className="flex flex-row items-center justify-between">
              <Link to="/" className="flex flex-row py-2 hover:bg-blue-500 text-white">
                <p className="font-normal text-[24px]">
                  <span className="font-bold">PARK</span> FINDER
                </p>
              </Link>
              <div className="flex flex-row gap-[10px] text-[14px]">
                <Link to="/login" className="py-2 hover:bg-blue-500 text-white text-center block rounded">
                  로그인
                </Link>
                <Link to="/signup" className="py-2 hover:bg-blue-500 text-white text-center block rounded">
                  회원가입
                </Link>
              </div>
            </div>
          )}
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={keyword}
              placeholder="주차장 앞 키워드만 입력해 주세요."
              onChange={(e) => setKeyword(e.target.value)}
            />
            {/* <button type="submit">검색하기</button> */}
          </form>
          {/* <Link to="/bookmarkhome" className="mb-4 hover:text-gray-400">
              북마크 테스트
            </Link> */}
        </div>
        <div className="sidebar-container">
          <ul className="list">
            {/* 검색된 장소들 목록으로 표시 */}
            {searchs.map((data) => (
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
                </div>
                <button
                  onClick={() => {
                    setIsSidebarDetailOpen(true);
                  }}
                >
                  상세보기
                </button>
                <BookmarkButton place={data} userId={USER_ID} />
              </li>
            ))}
          </ul>
          {/* 검색 결과가 없을 경우 표시 */}
          {searchs.length === 0 && <div className="no-list">검색된 결과가 없습니다.</div>}
          {/* 검색 결과 있고, 페이지가 있는 경우 페이지 번호 표시 */}
          {pagination && searchs.length > 0 && (
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
      </nav>

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

            {searchs.map((data) => (
              <React.Fragment key={data.id}>
                {/* 해당 마커에 커스텀 오버레이 표시 */}
                {openMarkerId === data.id && (
                  <>
                    <div className="name">{data.place_name}</div>
                    <div className="address">{data.address_name}</div>
                    <div className="road-address">
                      <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_jibun.png" alt="지번" />
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
          </div>
        </div>
      )}

      <button
        className={`sidebar-open-btn${isSidebarOpen ? "" : " closed"}`}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <span className="material-symbols-rounded">chevron_right</span>
      </button>
    </aside>
  );
};

export default Sidebar;
