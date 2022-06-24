import axios from "axios";
import store from "@/store/index";

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
  return axios.get(
    "/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=UkRbyOIUcZ8nSFUYHH4gbSjw2NPG0hjOkLMa8fUlkNpnstI7CbHORuOta%2BI8WusIGFq9AgdYa2vOaCeIYTi%2Bpw%3D%3D&numOfRows=100&dataType=json&pageNo=2&base_date=20220624&base_time=0300&nx=61&ny=128"
  );
  // var xhr = new XMLHttpRequest();
  // var url = "/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst"; /*URL*/
  // var queryParams =
  //   "?" +
  //   encodeURIComponent("serviceKey") +
  //   "=" +
  //   "UkRbyOIUcZ8nSFUYHH4gbSjw2NPG0hjOkLMa8fUlkNpnstI7CbHORuOta%2BI8WusIGFq9AgdYa2vOaCeIYTi%2Bpw%3D%3D"; /*Service Key*/
  // queryParams +=
  //   "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1"); /**/
  // queryParams +=
  //   "&" +
  //   encodeURIComponent("numOfRows") +
  //   "=" +
  //   encodeURIComponent("1000"); /**/
  // queryParams +=
  //   "&" +
  //   encodeURIComponent("dataType") +
  //   "=" +
  //   encodeURIComponent("json"); /**/
  // queryParams +=
  //   "&" +
  //   encodeURIComponent("base_date") +
  //   "=" +
  //   encodeURIComponent("20210624"); /**/
  // queryParams +=
  //   "&" +
  //   encodeURIComponent("base_time") +
  //   "=" +
  //   encodeURIComponent("0000"); /**/
  // queryParams +=
  //   "&" + encodeURIComponent("nx") + "=" + encodeURIComponent("55"); /**/
  // queryParams +=
  //   "&" + encodeURIComponent("ny") + "=" + encodeURIComponent("127"); /**/
  // xhr.open("GET", url + queryParams);
  // console.log(this.readyState);
  // xhr.onreadystatechange = function () {
  //   if (this.readyState == 4) {
  //     alert(
  //       "Status: " +
  //         this.status +
  //         "nHeaders: " +
  //         JSON.stringify(this.getAllResponseHeaders()) +
  //         "nBody: " +
  //         this.responseText
  //     );
  //   }
  // };
  // xhr.send();
}

export const instance = createInstance();
export { fetchData, fetchWeatherData };
