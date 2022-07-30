import axios from "axios";
import store from "@/store/index";

let getTimeHours = "";
let getTimeMinutes = "";
let getDate = "";
let rainVal = "";
let temVal = "";
let skyVal = "";

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
const restApiKey = "db3b40e1abc54e54f8831b2258beeba4";
const tmServiceKey =
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
  // 초단기실황
  let hour = getTimeHours;
  let minutes = getTimeMinutes;
  let resultTime = "";
  // console.log("getNowTerm", String(hour) + String(minutes));
  if (minutes < 30) {
    minutes = 30;
    resultTime = String(hour - 1) + String(minutes);
  } else {
    minutes = 30;
    resultTime = String(hour) + String(minutes);
  }

  if (resultTime.length == 3) {
    resultTime = "0" + resultTime;
  }

  return axios.get(
    `/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=${serviceKey}&numOfRows=10&dataType=json&pageNo=1&base_date=${getDate}&base_time=${resultTime}
    &nx=${store.state.gridX}&ny=${store.state.gridY}`
  );
}

async function getShortTerm(params) {
  getTimeNow();
  let hour = getTimeHours;
  let minutes = getTimeMinutes;
  let resultTime = "";
  let gridX = "";
  let gridY = "";
  if (minutes < 30) {
    minutes = 30;
    resultTime = String(hour - 1) + String(minutes);
  } else if (minutes > 30) {
    minutes = 30;
    resultTime = String(hour) + String(minutes);
  }
  if (resultTime.length == 3) {
    resultTime = "0" + resultTime;
  }

  if (params) {
    let gridXY = params;
    let dataList = [];
    let rainDataNum = "";
    let tDataNum = "";

    let skyDataNum = "";
    // let selectList = [];
    let srtTemNcst = "";
    let srtTemFcst = "";
    for (let i = 0; i < gridXY.length; i++) {
      // 초단기실황
      await axios
        .get(
          `/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=${serviceKey}&numOfRows=10&dataType=json&pageNo=1&base_date=${getDate}&base_time=${resultTime}
        &nx=${gridXY[i].gridX}&ny=${gridXY[i].gridY}`
        )
        .then(function (res) {
          srtTemNcst = res.data.response.body.items.item;
          tDataNum = srtTemNcst.findIndex((x) => x.category === "T1H");
          temVal = srtTemNcst[tDataNum].obsrValue;
        })
        .catch(function (error) {
          console.log(error);
        });

      // 초단기예보
      await axios
        .get(
          `/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?serviceKey=${tmServiceKey}&dataType=json&numOfRows=36&pageNo=1&base_date=${getDate}&base_time=${resultTime}&nx=${gridXY[i].gridX}&ny=${gridXY[i].gridY}`
        )
        .then(function (res) {
          srtTemFcst = res.data.response.body.items.item;
          skyDataNum = srtTemFcst.findIndex((x) => x.category === "SKY");
          rainDataNum = srtTemNcst.findIndex((x) => x.category === "RN1");
          skyVal = srtTemFcst[skyDataNum].fcstValue;
          rainVal = srtTemFcst[rainDataNum].fcstValue;
          // console.log("skyVal", skyVal);
          // console.log("rainVal", rainVal);
        })
        .catch(function (error) {
          console.log(error);
        });
      dataList[i] = {
        sidoName: gridXY[i].sidoName,
        coordX: gridXY[i].coordX,
        coordY: gridXY[i].coordY,
        temVal: temVal,
        skyVal: skyVal,
        rainVal: rainVal,
      };
      console.log("dataList ", dataList);
      // selectList = {
      //   sidoName: gridXY[i].sidoName,
      //   temVal: temVals[i],
      //   skyVal: skyVals[i],
      //   rainVal: rainVals[i],
      //   coordX: gridXY[i].coordX,
      //   coordY: gridXY[i].coordY,
      // };

      // dataList.push(selectList);
    }
    // console.log("selectList", selectList[i]);
    store.dispatch("WEATHER_ON_MAP", dataList);
  } else {
    gridX = store.state.gridX;
    gridY = store.state.gridY;
    return axios.get(
      `/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?serviceKey=${tmServiceKey}&dataType=json&numOfRows=100&pageNo=1&base_date=${getDate}&base_time=${resultTime}&nx=${gridX}&ny=${gridY}`
    );
  }
}

function treeDaysWeather() {
  // let getTimeHours = getTimeHours;
  let mycurrentDate = new Date();
  let getNow = mycurrentDate.getHours();
  // let dataNum = "";
  let near = 0;
  let abs = 0;
  let min = 1000;
  const target = [2, 5, 8, 11, 14, 17, 20, 23];
  // getNow = ;
  if (getNow < 10) {
    getNow = String(getNow);
  } else {
    getNow = String(getNow);
  }
  console.log("getNow", getNow);

  if (fetchTimes.includes(getNow)) {
    return axios.get(
      `/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${tmServiceKey}&dataType=json&numOfRows=1000&pageNo=1&base_date=${getDate}&base_time=${getNow}&nx=${store.state.gridX}&ny=${store.state.gridY}`
    );
  } else {
    getNow = mycurrentDate.getHours();

    for (let i = 0; i < fetchTimes.length; i++) {
      abs =
        target[i] - Number(getNow) < 0
          ? -(target[i] - Number(getNow))
          : target[i] - Number(getNow);
      if (abs < min) {
        min = abs;
        near = target[i];

        if (getNow == 0 || getNow == 1) {
          let date = Number(getDate) - 1;
          return axios.get(
            `/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${tmServiceKey}&dataType=json&numOfRows=1000&pageNo=1&base_date=${date}&base_time=${"2300"}&nx=${
              store.state.gridX
            }&ny=${store.state.gridY}`
          );
        }
        if (getNow < near && getNow !== 0) {
          return axios.get(
            `/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${tmServiceKey}&dataType=json&numOfRows=1000&pageNo=1&base_date=${getDate}&base_time=${
              "0" + String(near - 3) + "00"
            }&nx=${store.state.gridX}&ny=${store.state.gridY}`
          );
        }

        return axios.get(
          `/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${tmServiceKey}&dataType=json&numOfRows=1000&pageNo=1&base_date=${getDate}&base_time=${
            "0" + String(near) + "00"
          }&nx=${store.state.gridX}&ny=${store.state.gridY}`
        );
      }
    }
  }
  // console.log(dataNum);
}

function getGridXY(getLng, getLat) {
  // console.log("getGridXY= ", getLat, getLng);
  changeTmCoord(getLng, getLat);
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

  rs["lng"] = getLng;
  rs["lat"] = getLat;
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

function mapWeatherGrids(payLoad) {
  const payload = [];
  const grids = [];
  // console.log("payLoad", payLoad);
  for (let i = 0; i < payLoad.length; i++) {
    payload.push("payLoad", payLoad[i]);
  }

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
  for (let i = 0; i < payLoad.length; i++) {
    // console.log(payLoad[i].sidoCoord.y);
    rs["lng"] = payLoad[i].sidoCoord.y;
    rs["lat"] = payLoad[i].sidoCoord.x;
    var ra = Math.tan(Math.PI * 0.25 + payLoad[i].sidoCoord.y * DEGRAD * 0.5);
    ra = (re * sf) / Math.pow(ra, sn);
    var theta = payLoad[i].sidoCoord.x * DEGRAD - olon;
    if (theta > Math.PI) theta -= 2.0 * Math.PI;
    if (theta < -Math.PI) theta += 2.0 * Math.PI;
    theta *= sn;
    rs["x"] = Math.floor(ra * Math.sin(theta) + XO + 0.5);
    rs["y"] = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);
    const grid = {
      sidoName: payLoad[i].sidoName,
      gridX: rs["x"],
      gridY: rs["y"],
      coordX: payLoad[i].sidoCoord.x,
      coordY: payLoad[i].sidoCoord.y,
    };
    grids.push(grid);
  }
  // console.log(grids);
  getShortTerm(grids);
}

function changeTmCoord(x, y) {
  console.log("x", x, "y", y);
  axios
    .get(
      `https://dapi.kakao.com/v2/local/geo/transcoord.json?x=${x}&y=${y}&input_coord=WGS84&output_coord=TM`,
      {
        headers: {
          Authorization: `KakaoAK ${restApiKey}`,
        },
      }
    )
    .then(function (res) {
      findMeasuring(res.data.documents[0]);
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function findMeasuring(getTmXY) {
  let airDatas = store.state.airDatas;
  let measuringDatas = [];
  let tmDatas = [];
  let measuringData = "";
  await axios
    .get(
      `/B552584/MsrstnInfoInqireSvc/getNearbyMsrstnList?tmX=${getTmXY.x}&tmY=${getTmXY.y}&returnType=json&serviceKey=${tmServiceKey}`
    )
    .then(function (res) {
      // console.log(res.data.response.body.items);
      measuringDatas = res.data.response.body.items;
    })
    .catch(function (res) {
      console.log(res);
    });

  // console.log("measuringDatas = ", measuringDatas);

  for (let i = 0; i < measuringDatas.length; i++) {
    measuringDatas[i].tm;
    tmDatas.push(measuringDatas[i].tm);
    if (measuringDatas[i].tm === Math.min(...tmDatas)) {
      measuringData = measuringDatas[i];
      // console.log("measuringData = ", measuringData.stationName);
    }
  }

  let airData = airDatas.find(
    (x) => x.stationName === measuringData.stationName
  );
  // console.log(airData);
  store.state.findAreaData = airData;
}

function getCoordinate(params) {
  /* global kakao */
  const geocoder = new kakao.maps.services.Geocoder();
  const serachAddress = params;
  // const serachAddress = store.state.findAreaData.sidoStation;

  geocoder.addressSearch(serachAddress, function (result, status) {
    if (status === kakao.maps.services.Status.OK) {
      const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

      // console.log("검색한 주소의 좌표 = ", coords);
      getGridXY(coords.La, coords.Ma);
    } else {
      alert("못찾았어요ㅜ ");
    }
  });
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

  let day = mycurrentDate.getDay();

  const nowTime = {
    date: date,
    day: day,
    hours: hours,
    minutes: minutes,
  };

  getTimeHours = nowTime.hours;
  getTimeMinutes = nowTime.minutes;
  getDate = nowTime.date;

  return nowTime;
}

function sysPaddingZro(lnum, mydpt) {
  let clckzro = "";
  for (let i = 0; i < mydpt; i++) {
    clckzro += "0";
  }
  return (clckzro + lnum).slice(-mydpt);
}
setInterval(() => {
  getTimeNow();
}, 1000);

export const instance = createInstance();
export {
  findMeasuring,
  getCoordinate,
  changeTmCoord,
  getGridXY,
  mapWeatherGrids,
  fetchData,
  findMetStation,
  getTimeNow,
  getNowTerm,
  getShortTerm,
  treeDaysWeather,
};
