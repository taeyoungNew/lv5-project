<template>
  <div>
    <div id="map"></div>
  </div>
</template>

<script>
import { getGridXY } from "@/api/index";
// import cord from "@/assets/data/localCoordinates.json";
export default {
  data() {
    return {
      message: "",
    };
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=41559690bf91cc5e8d8acc64f8d3a36f&libraries=services";
      document.head.appendChild(script);
    }
    // 지도를 표시할 div

    /////////////////////////////////////////////////////// 지도를 생성합니다

    // 지도에 클릭 이벤트를 등록합니다
    // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
  },
  methods: {
    initMap() {
      // console.log("cord = ", cord);
      let mapContainer = document.getElementById("map"), // 지도를 표시할 div
        mapOption = {
          center: new kakao.maps.LatLng(36.464343, 127.947613), // 지도의 중심좌표
          level: 12, // 지도의 확대 레벨
        };

      let map = new kakao.maps.Map(mapContainer, mapOption);
      // map.addOverlayMapTypeId(mapType);

      let positions = [
        {
          nama: "인천",
          LatLng: new kakao.maps.LatLng(37.39663113911868, 126.6533944362663),
        },
        {
          nama: "서울",
          LatLng: new kakao.maps.LatLng(37.56356944444444, 126.98000833333333),
        },
        {
          nama: "부산",
          LatLng: new kakao.maps.LatLng(35.17701944444444, 129.07695277777776),
        },
        {
          nama: "대구",
          LatLng: new kakao.maps.LatLng(35.868541666666665, 128.60355277777776),
        },
        {
          nama: "광주",
          LatLng: new kakao.maps.LatLng(35.156974999999996, 126.85336388888888),
        },
        {
          nama: "대전",
          LatLng: new kakao.maps.LatLng(36.347119444444445, 127.38656666666667),
        },
        {
          nama: "대전",
          LatLng: new kakao.maps.LatLng(36.347119444444445, 127.38656666666667),
        },
        {
          nama: "울산",
          LatLng: new kakao.maps.LatLng(35.53540833333333, 129.3136888888889),
        },
      ];
      // 좌표얻기
      kakao.maps.event.addListener(map, "click", function (mouseEvent) {
        // 클릭한 위도, 경도 정보를 가져옵니다
        var latlng = mouseEvent.latLng;
        // getGridXY(latlng.getLat(), latlng.getLng());
        const gridX = latlng.getLat();
        const gridY = latlng.getLng();
        getGridXY(gridX, gridY);
        // console.log(gridX, gridY);

        // const payLoad = {
        //   gridX: gridX,
        //   gridY: gridY,
        // };
        // this.$store.dispatch("GET_GRIDS", payLoad);
      });
      // let mapType = kakao.maps.MapTypeId.USE_DESTRICT;

      positions.forEach(function (pos) {
        let marker = new kakao.maps.Marker({
          position: pos.LatLng,
        });
        marker.setMap(map);
      });
    },
  },
};
</script>

<style scoped>
#map {
  width: 100%;
  height: 900px;
}
</style>
