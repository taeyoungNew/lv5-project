import axios from "axios";
import store from "@/store/index";

const weatherDatasKey =
  "UkRbyOIUcZ8nSFUYHH4gbSjw2NPG0hjOkLMa8fUlkNpnstI7CbHORuOta%2BI8WusIGFq9AgdYa2vOaCeIYTi%2Bpw%3D%3D";
function createInstance() {
  return axios.create({
    baseURL: process.env.VUE_APP_API_URL,
  });
}

function fetchData(param) {
  if (param === undefined) {
    return axios.get(
      `/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?sidoName=${store.state.defaultSerch}&pageNo=1&numOfRows=622&returnType=json&serviceKey=UkRbyOIUcZ8nSFUYHH4gbSjw2NPG0hjOkLMa8fUlkNpnstI7CbHORuOta%2BI8WusIGFq9AgdYa2vOaCeIYTi%2Bpw%3D%3D&ver=1.0`
    );
  } else {
    return axios.get(
      `/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?sidoName=${param}&pageNo=1&numOfRows=100&returnType=json&serviceKey=UkRbyOIUcZ8nSFUYHH4gbSjw2NPG0hjOkLMa8fUlkNpnstI7CbHORuOta%2BI8WusIGFq9AgdYa2vOaCeIYTi%2Bpw%3D%3D&ver=1.0`
    );
  }
}
function fetchWeatherData() {
  console.log(store.state.gridX);
  return axios.get(
    `/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?serviceKey=${weatherDatasKey}&dataType=json&numOfRows=100&pageNo=1&base_date=20220711&base_time=0000&nx=${store.state.gridX}&ny=${store.state.gridY}`
    // `/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?serviceKey=${weatherDatasKey}&numOfRows=10&pageNo=1&dataType=json&base_date=20220710&base_time=2300&nx=${store.state.gridX}&ny=${store.state.gridY}`
  );
}

// function fetchWeather() {
//   return axios.get(
//     "http://www.kma.go.kr/weather/forecast/mid-term-rss3.jsp?stnId=108"
//   );
// }

function getGridXY(getLat, getLng) {
  console.log("getGridXY= ", getLat, getLng);
  let RE = 6371.00877; // 지구 반경(km)
  let GRID = 5.0; // 격자 간격(km)
  let SLAT1 = 30.0; // 투영 위도1(degree)
  let SLAT2 = 60.0; // 투영 위도2(degree)
  let OLON = 126.0; // 기준점 경도(degree)
  let OLAT = 38.0; // 기준점 위도(degree)
  let XO = 43; // 기준점 X좌표(GRID)
  let YO = 136; // 기1준점 Y좌표(GRID)

  let DEGRAD = Math.PI / 180.0;
  // let RADDEG = 180.0 / Math.PI;

  let re = RE / GRID;
  let slat1 = SLAT1 * DEGRAD;
  let slat2 = SLAT2 * DEGRAD;
  let olon = OLON * DEGRAD;
  let olat = OLAT * DEGRAD;
  let sn =
    Math.tan(Math.PI * 0.25 + slat2 * 0.5) /
    Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
  let sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sf = (Math.pow(sf, sn) * Math.cos(slat1)) / sn;
  let ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
  ro = (re * sf) / Math.pow(ro, sn);
  let rs = {};

  rs["lat"] = getLat;
  rs["lng"] = getLng;
  var ra = Math.tan(Math.PI * 0.25 + getLat * DEGRAD * 0.5);
  ra = (re * sf) / Math.pow(ra, sn);
  var theta = getLng * DEGRAD - olon;
  if (theta > Math.PI) theta -= 2.0 * Math.PI;
  if (theta < -Math.PI) theta += 2.0 * Math.PI;
  theta *= sn;
  rs["x"] = Math.floor(ra * Math.sin(theta) + XO + 0.5);
  rs["y"] = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);

  console.log(rs["x"], rs["y"]);

  const grids = {
    gridX: rs["x"],
    gridY: rs["y"],
  };

  store.dispatch("GET_GRIDS", grids);
}

function getCoordinate() {
  /* global kakao */
  const geocoder = new kakao.maps.services.Geocoder();
  const serachAddress = store.state.findAreaData.sidoStation;

  geocoder.addressSearch(serachAddress, function (result, status) {
    if (status === kakao.maps.services.Status.OK) {
      const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

      console.log("검색한 주소의 좌표 = ", coords);
      getGridXY(coords.Ma, coords.La);
    } else {
      console.log("못찾았어요ㅜ ");
    }
  });
  console.log("getCoordinate = ", serachAddress);
}

export const instance = createInstance();
export { getCoordinate, getGridXY, fetchData, fetchWeatherData };
