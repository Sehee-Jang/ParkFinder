import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../zustand/authStore";
import useMapStore from "../zustand/mapStore";
import { useMapActions } from "../hooks/useMapActions";
import BookmarkButton from "./BookmarkButton";
import Comments from "../pages/detail/Comments";

const Sidebar = () => {
  const navigate = useNavigate();
  const {
    location,
    map,
    keyword,
    setKeyword,
    searchValue,
    setSearchValue,
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
  const { user, token, clearAuth } = useAuthStore();
  const USER_ID = user?.id;

  // 클릭한 마커로 중심 좌표 이동 및 검색 수행 함수
  useEffect(() => {
    if (!map || !location.center) return;
    setOpenMarkerId(null);
    searchPlaces(location.center, currentPage);
  }, [map, searchValue, currentPage, location.center]);

  // 검색하기
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchValue(keyword); // 검색 버튼 눌렀을 때 검색어 업데이트
    setIsSidebarDetailOpen(false);
    return false;
  };

  // 로그아웃
  const handleLogout = () => {
    clearAuth();
    navigate("/");
  };

  return (
    <aside className={`sidebar${isSidebarOpen ? "" : " closed"}`}>
      <div className="sidebar-container">
        <div className="bg-teal-500 p-6 h-[152px]">
          <div className="flex items-center justify-between mb-6">
            <div className="text-2xl font-light text-white">
              <span className="font-bold">PARK</span> FINDER
            </div>
            <div className="flex items-center gap-2">
              {token ? (
                <>
                  <Link to="/mypage" className="text-button">
                    마이페이지
                  </Link>
                  <button onClick={handleLogout} className="text-button">
                    로그아웃
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-button">
                    로그인
                  </Link>
                  <Link to="/signup" className="text-button">
                    회원가입
                  </Link>
                </>
              )}
            </div>
          </div>
          <form onSubmit={handleSearch}>
            <div className="search-input">
              <input
                type="text"
                value={keyword}
                placeholder="주차장 앞 키워드만 입력해 주세요"
                className="input"
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button type="submit">
                <span className="material-symbols-rounded text-gray-400">search</span>
              </button>
            </div>
          </form>
        </div>
        <div className="sidebar-contents">
          <ul>
            {/* 검색된 장소들 목록으로 표시 */}
            {searchs.map((data) => (
              <li
                className="relative border-b border-zinc-200 hover:bg-zinc-100 px-6 py-5 cursor-pointer transition-all"
                key={data.id}
                onClick={() => {
                  setOpenMarkerId(data.id);
                  moveLatLng(data);
                }}
              >
                {/* 검색된 장소 상세 정보 표시 */}
                <div className="flex justify-between mb-1">
                  <div className="text-lg font-bold leading-6 text-blue-500">{data.place_name}</div>
                  <BookmarkButton place={data} userId={USER_ID} />
                </div>
                <div className="text-sm text-zinc-400">{data.address_name}</div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">
                    {data.distance >= 1000 ? `${(data.distance / 1000).toFixed(1)}km` : `${data.distance}m`}
                  </span>
                  <div className="flex gap-1">
                    <button
                      className="button button-xs"
                      onClick={() => {
                        setIsSidebarDetailOpen(true);
                      }}
                    >
                      상세보기
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {/* 검색 결과가 없을 경우 표시 */}
          {searchs.length === 0 && <div className="no-list">검색된 결과가 없습니다.</div>}
          {/* 검색 결과 있고, 페이지가 있는 경우 페이지 번호 표시 */}
          {pagination && searchs.length > 0 && (
            <div className="flex justify-center gap-1 my-6">
              {Array.from({ length: pagination.last }).map((_, index) => (
                <button
                  className={`button button-xs button-border ${currentPage === index + 1 ? "bg-teal-500 text-white hover:bg-teal-500 hover:text-white" : ""}`}
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </div>
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
        onClick={() => {setIsSidebarOpen(!isSidebarOpen); setIsSidebarDetailOpen(false);}}
      >
        <span className="material-symbols-rounded text-zinc-500">chevron_left</span>
      </button>
    </aside>
  );
};

export default Sidebar;
