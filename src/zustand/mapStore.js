import { create } from "zustand";

const useMapStore = create((set) => ({
  // 기본 위치
  location: {
    center: null,
    errMsg: null,
    isLoading: true
  },
  // 마지막으로 이동한 지도의 중심 좌표 저장 상태 변수
  lastCenter: null,
  setLastCenter: (state) => set({ lastCenter: state }),
  // 현재 열려있는 마커의 ID
  openMarkerId: null,
  setOpenMarkerId: (state) => set({ openMarkerId: state }),
  // 사이드바의 열림/닫힘 상태
  isSidebarOpen: true,
  setIsSidebarOpen: (state) => set({ isSidebarOpen: state }),
  // 사이드바 디테일 영역의 열림/닫힘 상태
  isSidebarDetailOpen: false,
  setIsSidebarDetailOpen: (state) => set({ isSidebarDetailOpen: state }),
  // 카카오 맵에 접근해 지도 상태 조작
  map: null,
  setMap: (state) => set({ map: state }),
  // 검색에 사용될 키워드
  keyword: "",
  setKeyword: (state) => set({ keyword: state }),
  // 실제 검색 시 사용되는 값
  searchValue: "",
  setSearchValue: (state) => set({ searchValue: state }),
  // 검색 결과
  searchs: [],
  setSearchs: (newSearchs) => set({ searchs: newSearchs }),
  // 검색 결과의 페이지네이션
  pagination: null,
  setPagination: (state) => set({ pagination: state }),
  // 페이지네이션 기능과 연동해 어떤 페이지를 보고 있는지
  currentPage: 1,
  setCurrentPage: (state) => set({ currentPage: state }),

  // 사용자 현재 위치를 가져오는 함수
  getUserCurrentPosition: () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          set((state) => ({
            location: {
              ...state.location, // 기존 값 유지
              center: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              },
              isLoading: false
            }
          }));
        },
        (err) => {
          set((state) => ({
            location: {
              ...state.location, // 기존 값 유지
              errMsg: err.message,
              isLoading: false
            }
          }));
        }
      );
    } else {
      set((state) => ({
        location: {
          ...state.location, // 기존 값 유지
          errMsg: "현재 위치를 가져올 수 없습니다.",
          isLoading: false
        }
      }));
    }
  }
}));

export default useMapStore;
