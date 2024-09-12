import { useState, useEffect } from "react";

const KakaoMap = () => {
  // 현재위치
  const [map, setMap] = useState(null);

  useEffect(() => {
    // 카카오맵 스크립트를 HTML에 동적으로 추가
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_API_KEY}&autoload=false`;
    document.head.appendChild(script);

    // 스크립트가 로드된 후 실행
    script.onload = () => {
      window.kakao.maps.load(() => {
        var container = document.getElementById("map");
        var options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 4
        };

        var map = new window.kakao.maps.Map(container, options);
        setMap(map);
      });
    };
  }, []);

  return <div id="map" style={{ width: "100vw", height: "100vh" }}></div>;
};

export default KakaoMap;
