<template>
  <div>
    <div id="map"></div>
  </div>
</template>

<script>
import {
  getGridXY,
  mapWeatherGrids,
  searchDetailAddrFromCoords,
  saveAddress,
} from "@/api/index";
import bus from "@/utils/bus.js";
export default {
  data() {
    return {
      sunIcon:
        "https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_3-128.png",
      cloudyIcon:
        "https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_2-256.png",
      blurIcon:
        "https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_1-256.png",
      rainIcon:
        "https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_6-256.png",

      message: "",
      map: "",
      appkey: "41559690bf91cc5e8d8acc64f8d3a36f",
      sidoCoord: [
        {
          sidoName: "서울",
          sidoCoord: {
            x: 126.97645522472396,
            y: 37.570436777354104,
          },
        },
        {
          sidoName: "광주",
          sidoCoord: {
            x: 126.84984846589778,
            y: 35.16196557717594,
          },
        },
        {
          sidoName: "인천",
          sidoCoord: {
            x: 126.64707979188897,
            y: 37.39457616104988,
          },
        },
        {
          sidoName: "대전",
          sidoCoord: {
            x: 127.38483034470224,
            y: 36.356414570615115,
          },
        },
        {
          sidoName: "부산",
          sidoCoord: {
            x: 129.07086907370464,
            y: 35.17647509098923,
          },
        },
        {
          sidoName: "강릉",
          sidoCoord: {
            x: 128.87763636151897,
            y: 37.749190607364945,
          },
        },
        {
          sidoName: "목포",
          sidoCoord: {
            x: 126.36467027545984,
            y: 34.81178027920182,
          },
        },
        {
          sidoName: "포항",
          sidoCoord: {
            x: 129.39450936981302,
            y: 36.04703568158347,
          },
        },
        {
          sidoName: "대구",
          sidoCoord: {
            x: 128.5899805104158,
            y: 35.87124542120985,
          },
        },
      ],
    };
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src = `http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${this.appkey}&libraries=services,clusterer,drawing`;
      document.head.appendChild(script);
    }
    // 지도를 표시할 div
  },
  methods: {
    initMap() {
      // let changeMapType = "";
      let latlng = "";
      let detailAddr = "";
      let mapContainer = document.getElementById("map"), // 지도를 표시할 div
        mapOption = {
          center: new kakao.maps.LatLng(36.464343, 127.947613), // 지도의 중심좌표
          level: 12, // 지도의 확대 레벨
        };

      this.map = new kakao.maps.Map(mapContainer, mapOption);
      kakao.maps.event.addListener(this.map, "click", function (mouseEvent) {
        // 클릭한 위도, 경도 정보를 가져옵니다
        latlng = mouseEvent.latLng;
        const gridX = latlng.getLng();
        const gridY = latlng.getLat();
        bus.$emit("start:spinner");
        getGridXY(gridX, gridY);

        // 좌표로 주소얻기
        searchDetailAddrFromCoords(
          mouseEvent.latLng,
          function (result, status) {
            if (status === kakao.maps.services.Status.OK) {
              detailAddr = result[0].address.address_name;
            }
            console.log("detailAddr = ", detailAddr);
            saveAddress(detailAddr);
          }
        );
      });
      this.$store.dispatch("GET_ADDRESS", detailAddr);
    },
    sendAreaDatas() {
      mapWeatherGrids(this.sidoCoord);
    },
    createOverlay(params) {
      const map = this.map;
      const getMapWeather = params;
      // console.log("getMapWeather", getMapWeather);
      for (let i = 0; i < getMapWeather.length; i++) {
        // console.log("rain val", Number(getMapWeather[i].rainVal));
        let skyStatus = "";
        if (getMapWeather[i].skyVal === "1") {
          skyStatus = this.sunIcon;
        } else if (getMapWeather[i].skyVal === "2") {
          skyStatus = this.sunIcon;
        } else if (getMapWeather[i].skyVal === "3") {
          skyStatus = this.cloudyIcon;
        } else if (getMapWeather[i].skyVal === "4") {
          skyStatus = this.blurIcon;
        }
        if (getMapWeather[i].rainVal !== "0") {
          skyStatus = this.rainIcon;
        }
        let content = `<div class="icon-box">
                      <h4>${getMapWeather[i].sidoName}</h4>
                      <img src="${skyStatus}"  class="weather-icon" />
                      <p class="temperature-text">${getMapWeather[i].temVal}°C</p>
                    </ div>`;
        let position = new kakao.maps.LatLng(
          getMapWeather[i].coordY,
          getMapWeather[i].coordX
        );
        let customOverlay = new kakao.maps.CustomOverlay({
          content: content,
          position: position,
        });
        customOverlay.setMap(map);
      }
      bus.$emit("end:spinner");
    },
  },
  async created() {
    bus.$emit("start:spinner");
    await this.sendAreaDatas();
  },
  computed: {
    checkmapWeather() {
      return this.$store.state.mapOnWeatherDatas;
    },
  },
  watch: {
    async checkmapWeather(val) {
      await this.createOverlay(val);
    },
  },
};
</script>

<style>
#map {
  width: 100%;
  height: 900px;
  border-radius: 5px;
}

.icon-box {
  display: inline-block;
  background-color: white;
  border-radius: 5px;
  text-align: center;
  padding: 4px;
}
.temperature-text {
  font-size: 20px;
}
.weather-icon {
  width: 70px;
}
.icon-box > p {
  margin-bottom: 0px;
}
</style>
