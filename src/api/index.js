import axios from "axios";
import store from "@/store/index";
// import { get } from "core-js/core/dict";
// import { getMetadataKeys } from "core-js/fn/reflect";

let getTimeHours = "";
let getTimeMinutes = "";
// console.log(getTimeHours, getTimeMinutes);
let getDate = "";
// const baseTime = [02, 05, 08, 11, 14, 17, 20, 23];
const fetchTimes = [
  "0200",
  "0500",
  "0800",
  "1100",
  "1400",
  "1700",
  "2000",
  "2300",
];

const serviceKey =
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

function findMetStation() {
  return axios.get(
    `http://apis.data.go.kr/B552584/MsrstnInfoInqireSvc/getNearbyMsrstnList?tmX=244148.546388&tmY=412423.75772&returnType=json&serviceKey=${serviceKey}`
  );
}
// getShortTermForecast
// fetchWeatherData
function getNowTerm() {
  return axios.get(
    // 초단기실황
    `/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=${serviceKey}&dataType=json&numOfRows=10&pageNo=1&base_date=${getDate}&base_time=${
      String(getTimeHours) + String(getTimeMinutes)
    }&nx=${store.state.gridX}&ny=${store.state.gridY}`
  );
}

function getShortTerm() {
  // console.log(String(getTimeHours) + String(getTimeMinutes));
  return axios.get(
    // 초단기예보
    `/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?serviceKey=${serviceKey}&dataType=json&numOfRows=100&pageNo=1&base_date=${getDate}&base_time=${
      String(getTimeHours) + String(getTimeMinutes)
    }&nx=${store.state.gridX}&ny=${store.state.gridY}`
  );
}

function treeDaysWeather() {
  // let getTimeHours = getTimeHours;
  let mycurrentDate = new Date();
  let getNow = mycurrentDate.getHours();
  let dataNum = "";
  let near = 0;
  let abs = 0;
  let min = 1000;
  const target = [2, 5, 8, 11, 14, 17, 20, 23];
  // getNow = ;
  if (getNow < 10) {
    getNow = "0" + String(getNow);
  } else {
    getNow = String(getNow);
  }
  console.log("getNow = ", String(getNow) + "00");
  // fetchTimes.findIndex((x) => x === getTimeHours + "00");
  if (fetchTimes.includes(getNow)) {
    console.log("여기냐?");
    return axios.get(
      `/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${serviceKey}&dataType=json&numOfRows=1000&pageNo=1&base_date=${getDate}&base_time=${getNow}&nx=${store.state.gridX}&ny=${store.state.gridY}`
    );
  } else {
    getNow = mycurrentDate.getHours();
    // console.log(0 < 0);
    for (let i = 0; i < fetchTimes.length; i++) {
      abs =
        target[i] - Number(getNow) < 0
          ? -(target[i] - Number(getNow))
          : target[i] - Number(getNow);
      if (abs < min) {
        min = abs;
        near = target[i];
        // console.log(i, "min", min);
        // console.log(i, "near", near);
        if (getNow === 0 || getNow === 1) {
          let date = Number(getDate) - 1;
          return axios.get(
            `/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${serviceKey}&dataType=json&numOfRows=1000&pageNo=1&base_date=${date}&base_time=${"2300"}&nx=${
              store.state.gridX
            }&ny=${store.state.gridY}`
          );
        }
        if (getNow < near && getNow !== 0) {
          return axios.get(
            `/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${serviceKey}&dataType=json&numOfRows=1000&pageNo=1&base_date=${getDate}&base_time=${
              "0" + String(near - 3) + "00"
            }&nx=${store.state.gridX}&ny=${store.state.gridY}`
          );
        }
        // console.log("near = ", String(near));
        return axios.get(
          `/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${serviceKey}&dataType=json&numOfRows=1000&pageNo=1&base_date=${getDate}&base_time=${
            "0" + String(near) + "00"
          }&nx=${store.state.gridX}&ny=${store.state.gridY}`
        );
      }
    }
    // console.log("aaa");
  }
  console.log(dataNum);
}

function getGridXY(getLat, getLng) {
  // console.log("getGridXY= ", getLat, getLng);
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

  // console.log(rs["x"], rs["y"]);

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

      // console.log("검색한 주소의 좌표 = ", coords);
      getGridXY(coords.Ma, coords.La);
    } else {
      console.log("못찾았어요ㅜ ");
    }
  });
  // console.log("getCoordinate = ", serachAddress);
}

function getTimeNow() {
  let mycurrentDate = new Date();
  let date =
    sysPaddingZro(mycurrentDate.getFullYear(), 4) +
    "0" +
    +sysPaddingZro(mycurrentDate.getMonth() + 1, 2) +
    +sysPaddingZro(mycurrentDate.getDate(), 2);
  let hours = "";
  if (mycurrentDate.getHours() < 10) {
    hours = "0" + mycurrentDate.getHours();
  } else {
    hours = mycurrentDate.getHours();
  }

  let minutes = mycurrentDate.getMinutes();
  if (mycurrentDate.getMinutes() < 10) {
    minutes = "0" + mycurrentDate.getMinutes();
  } else {
    minutes = mycurrentDate.getMinutes();
  }

  const nowTime = {
    date: date,
    hours: hours,
    minutes: minutes,
  };
  // console.log(getDate);
  // console.log(String(hours) + String(minutes));
  getTimeHours = nowTime.hours;
  getTimeMinutes = nowTime.minutes;

  if (
    String(getTimeHours) + String(getTimeMinutes) >=
    String(getTimeHours) + "30"
  ) {
    if (getTimeHours < "10") {
      // console.log("30분 갱신후");
      getTimeHours = nowTime.hours;
      getTimeMinutes = nowTime.minutes;
    } else {
      // console.log("30분 갱신후");
      getTimeHours = nowTime.hours;
      getTimeMinutes = "30";
      // console.log("30분 갱신후");
    }

    // console.log("30분에 갱신");
  } else {
    if (getTimeHours < 10) {
      // console.log("30분 갱신전");
      getTimeHours = "0" + String(mycurrentDate.getHours() - 1);
      getTimeMinutes = "50";
      // console.log(String(getTimeHours), String(getTimeMinutes));
      // console.log(String(getTimeHours) + String(getTimeMinutes));
    } else {
      // console.log("30분 갱신전");
      getTimeHours = "0" + String(mycurrentDate.getHours() - 1);
      getTimeMinutes = "30";
      // console.log(String(getTimeHours) + String(getTimeMinutes));
    }
  }

  function sysPaddingZro(lnum, mydpt) {
    let clckzro = "";
    for (let i = 0; i < mydpt; i++) {
      clckzro += "0";
    }
    return (clckzro + lnum).slice(-mydpt);
  }

  getDate = date;
  return nowTime;
}

setInterval(() => {
  getTimeNow();
}, 1000);

export const instance = createInstance();
export {
  getCoordinate,
  getGridXY,
  fetchData,
  findMetStation,
  getTimeNow,
  getNowTerm,
  getShortTerm,
  treeDaysWeather,
};
