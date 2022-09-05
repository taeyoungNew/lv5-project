<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn class="ma-2" :color="btnOneColor" @click="shortTemBtn(1)">
          오늘 날씨
        </v-btn>
        <v-btn class="ma-2" :color="btnTowColor" @click="shortTemBtn(2)">
          내일 날씨
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table
          v-if="showShortTem === 'today'"
          :headers="todayHeaders"
          :items="todayDatas"
          :items-per-page="10"
          class="elevation-0"
        />
        <v-data-table
          v-if="showShortTem === 'tomorrow'"
          :headers="tomorrowHeaders"
          :items="tomorrowDatas"
          :items-per-page="10"
          class="elevation-0"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getTimeNow } from "@/api/index";
import bus from "@/utils/bus.js";
export default {
  data: () => ({
    btnOneColor: "primary",
    btnTowColor: "secondary",
    showShortTem: "today",
    value: [1, 4, 2, 5, 6, 10],
    shortTerm: "",
    threeDaysTerm: "",
    skyStatus: "",
    currentTemperature: "",
    todayHeaders: [
      {
        text: "시간",
        align: "start",
        sortable: false,
        value: "fcstTime",
      },
      { text: "날씨", value: "SKY" },
      { text: "기온 °C", value: "TMP" },
      { text: "강수량 °mm", value: "PCP" },
      { text: "습도 %", value: "REH" },
      { text: "풍속 m/s", value: "WSD" },
    ],
    todayDatas: [],
    payLoad: [],
    tomorrowHeaders: [
      {
        text: "시간",
        align: "start",
        sortable: false,
        value: "fcstTime",
      },
      { text: "날씨", value: "SKY" },
      { text: "기온 °C", value: "TMP" },
      { text: "강수량 °mm", value: "PCP" },
      { text: "습도 %", value: "REH" },
      { text: "풍속 m/s", value: "WSD" },
    ],
    tomorrowDatas: [],
    dateData: "",
    time: "",
    num: 0,
    saveData: {},
    // loadingStatus: false,
  }),
  methods: {
    // 날씨 버튼
    shortTemBtn(param) {
      if (param == 1) {
        this.btnOneColor = "primary";
        this.btnTowColor = "secondary";
        this.showShortTem = "today";
      } else if (param == 2) {
        this.btnOneColor = "secondary";
        this.btnTowColor = "primary";
        this.showShortTem = "tomorrow";
      }
    },

    // isLoading() {
    //   this.loadingStatus = !this.loadingStatus;
    // },
    getWeatherData() {
      console.log("getWeatherData");
      this.todayDatas = [];
      this.tomorrowDatas = [];
      // let shortTerm = this.shortTerm;
      // let threeDaysTerm = this.threeDaysTerm;
      this.dateData = getTimeNow();

      this.time = String(Number(this.dateData.hours));

      for (let num = 1; num < 24; num++) {
        this.todayProperty(num);
      }

      for (let num = 0; num < 24; num++) {
        this.tomorrowProperty(num);
      }
    },
    // 오늘 날씨
    todayProperty(num) {
      let saveData = {};
      let category = "";
      let fcstValue = "";
      let time = "";
      let date = String(Number(this.dateData.date));
      let threeDaysTerm = this.threeDaysTerm;
      let shortTerm = this.shortTerm;
      time = this.time;
      time = String(Number(this.time) + num) + "00";
      if (time.length < 4) {
        time = "0" + time;
      }

      // 초단기예보의 현재시간부터 6시간 이후까지의 데이터 찾기
      let checkData = shortTerm.find((e) => {
        e.fcstDate === date && e.fcstTime === time;
      });

      // 초단기예보 저장
      if (checkData) {
        // map을 활용한 초단기예보 저장방법
        shortTerm.map((x) => {
          // console.log("date = ", date);
          if (x.fcstDate === date) {
            if (x.fcstTime === time) {
              // console.log("x = ", x.fcstDate);
              category = x.category;
              fcstValue = x.fcstValue;
              if (category === "T1H") {
                // 기온
                saveData[`TMP`] = fcstValue + "°C";
                // console.log("saveData[`TMP`]", saveData[`TMP`]);
              } else if (category === "REH") {
                // 습도
                saveData[`${category}`] = fcstValue + "%";
              } else if (category === "WSD") {
                // 풍속
                saveData[`${category}`] = fcstValue + "m/s";
              } else if (category === "SKY") {
                // 하늘상태
                if (fcstValue == 1) {
                  saveData[`${category}`] = "맑음";
                } else if (fcstValue == 2) {
                  saveData[`${category}`] = "맑음";
                } else if (fcstValue == 3) {
                  saveData[`${category}`] = "구름 많음";
                } else if (fcstValue == 4) {
                  saveData[`${category}`] = "흐림";
                }
              } else if (category === "RN1") {
                if (fcstValue === "강수없음") {
                  saveData[`PCP`] = fcstValue;
                } else {
                  saveData[`PCP`] = fcstValue + "mm";
                }
              } else {
                // 그 외의 데이터
                saveData[`${category}`] = fcstValue;
                saveData["fcstTime"] = x.fcstTime.substring(0, 2) + "시";
              }
              // console.log("saveData = ", saveData);
              this.todayDatas.push(saveData);
            }
          }
          // 중복데이터 제거
          this.todayDatas = this.todayDatas.filter((character, idx, arr) => {
            return (
              arr.findIndex(
                (item) =>
                  item.PCP === character.PCP &&
                  item.PTY === character.PTY &&
                  item.REH === character.REH &&
                  item.SKY === character.SKY &&
                  item.TMP === character.TMP &&
                  item.UUU === character.UUU &&
                  item.VEC === character.VEC &&
                  item.VVV === character.VVV &&
                  item.WSD === character.WSD &&
                  item.fcstTime === character.fcstTime
              ) === idx
            );
          });
        });
      } else if (checkData === undefined) {
        // map으로 단기예보 저장
        threeDaysTerm.map((x) => {
          if (x.fcstDate === date) {
            if (x.fcstTime === time) {
              category = x.category;
              fcstValue = x.fcstValue;
              if (category === "TMP") {
                saveData[`${category}`] = fcstValue + "°C";
              } else if (category === "REH") {
                saveData[`${category}`] = fcstValue + "%";
              } else if (category === "WSD") {
                saveData[`${category}`] = fcstValue + "m/s";
              } else if (category === "SKY") {
                if (fcstValue == 1) {
                  saveData[`${category}`] = "맑음";
                } else if (fcstValue == 2) {
                  saveData[`${category}`] = "맑음";
                } else if (fcstValue == 3) {
                  saveData[`${category}`] = "구름 많음";
                } else if (fcstValue == 4) {
                  saveData[`${category}`] = "흐림";
                }
              } else {
                saveData[`${category}`] = fcstValue;
              }
              saveData["fcstTime"] = x.fcstTime.substring(0, 2) + "시";
              this.todayDatas.push(saveData);
            }
          }
          this.todayDatas = this.todayDatas.filter((character, idx, arr) => {
            return (
              arr.findIndex(
                (item) =>
                  item.PCP === character.PCP &&
                  item.POP === character.POP &&
                  item.PTY === character.PTY &&
                  item.REH === character.REH &&
                  item.SKY === character.SKY &&
                  item.SNO === character.SNO &&
                  item.TMN === character.TMN &&
                  item.TMP === character.TMP &&
                  item.UUU === character.UUU &&
                  item.VEC === character.VEC &&
                  item.VVV === character.VVV &&
                  item.WAV === character.WAV &&
                  item.WSD === character.WSD &&
                  item.fcstTime === character.fcstTime
              ) === idx
            );
          });
        });
      }
    },
    // 내일 날씨
    tomorrowProperty(num) {
      let threeDaysTerm = this.threeDaysTerm;
      let shortTerm = this.shortTerm;
      let saveData = {};
      let category = "";
      let fcstValue = "";
      let fcstTime = "0";
      let time = "";
      let date = getTimeNow();
      let tomorrow = date.tmDate;

      time = fcstTime;
      time = String(num) + "00";
      if (time.length < 4) {
        time = "0" + time;
      }

      // 초단기예보가 현재시점부터 다음날까지 이어져있으면 내일날씨에 초단기예보를 저장한다
      let checkData = shortTerm.find((e) => {
        e.fcstDate === tomorrow && e.fcstTime === time;
      });
      // map안에서 함수를 쓰려면 {}로 안을 감싸야한다.
      if (checkData) {
        shortTerm.map((x) => {
          // console.log("date = ", date);
          if (x.fcstDate === tomorrow) {
            if (x.fcstTime === time) {
              // console.log("x = ", x.fcstDate);
              category = x.category;
              fcstValue = x.fcstValue;
              if (category === "T1H") {
                // 기온
                saveData[`TMP`] = fcstValue + "°C";
                // console.log("saveData[`TMP`]", saveData[`TMP`]);
              } else if (category === "REH") {
                // 습도
                saveData[`${category}`] = fcstValue + "%";
              } else if (category === "WSD") {
                // 풍속
                saveData[`${category}`] = fcstValue + "m/s";
              } else if (category === "SKY") {
                // 하늘상태
                if (fcstValue == 1) {
                  saveData[`${category}`] = "맑음";
                } else if (fcstValue == 2) {
                  saveData[`${category}`] = "맑음";
                } else if (fcstValue == 3) {
                  saveData[`${category}`] = "구름 많음";
                } else if (fcstValue == 4) {
                  saveData[`${category}`] = "흐림";
                }
              } else if (category === "RN1") {
                if (fcstValue === "강수없음") {
                  saveData[`PCP`] = fcstValue;
                } else {
                  saveData[`PCP`] = fcstValue + "mm";
                }
              } else {
                // 그 외의 데이터
                saveData[`${category}`] = fcstValue;
                saveData["fcstTime"] = x.fcstTime.substring(0, 2) + "시";
              }
              // console.log("saveData = ", saveData);
              this.tomorrowDatas.push(saveData);
            }
          }
          // 중복데이터 제거
          this.tomorrowDatas = this.tomorrowDatas.filter(
            (character, idx, arr) => {
              return (
                arr.findIndex(
                  (item) =>
                    item.PCP === character.PCP &&
                    item.PTY === character.PTY &&
                    item.REH === character.REH &&
                    item.SKY === character.SKY &&
                    item.TMP === character.TMP &&
                    item.UUU === character.UUU &&
                    item.VEC === character.VEC &&
                    item.VVV === character.VVV &&
                    item.WSD === character.WSD &&
                    item.fcstTime === character.fcstTime
                ) === idx
              );
            }
          );
        });
      } else if (checkData === undefined) {
        // console.log("내일단기예보 저장");
        // map으로 단기예보 저장
        threeDaysTerm.map((x) => {
          // console.log(x.fcstDate);
          // console.log(date);
          if (x.fcstDate === tomorrow) {
            // console.log("x.fcstDate === ", date);
            // console.log(x.category);
            if (x.fcstTime === time) {
              category = x.category;
              fcstValue = x.fcstValue;
              if (category === "TMP") {
                saveData[`${category}`] = fcstValue + "°C";
              } else if (category === "REH") {
                saveData[`${category}`] = fcstValue + "%";
              } else if (category === "WSD") {
                saveData[`${category}`] = fcstValue + "m/s";
              } else if (category === "SKY") {
                if (fcstValue == 1) {
                  saveData[`${category}`] = "맑음";
                } else if (fcstValue == 2) {
                  saveData[`${category}`] = "맑음";
                } else if (fcstValue == 3) {
                  saveData[`${category}`] = "구름 많음";
                } else if (fcstValue == 4) {
                  saveData[`${category}`] = "흐림";
                }
              } else {
                saveData[`${category}`] = fcstValue;
              }
              saveData["fcstTime"] = x.fcstTime.substring(0, 2) + "시";
              this.tomorrowDatas.push(saveData);
            }
          }
          this.tomorrowDatas = this.tomorrowDatas.filter(
            (character, idx, arr) => {
              return (
                arr.findIndex(
                  (item) =>
                    item.PCP === character.PCP &&
                    item.POP === character.POP &&
                    item.PTY === character.PTY &&
                    item.REH === character.REH &&
                    item.SKY === character.SKY &&
                    item.SNO === character.SNO &&
                    item.TMN === character.TMN &&
                    item.TMP === character.TMP &&
                    item.UUU === character.UUU &&
                    item.VEC === character.VEC &&
                    item.VVV === character.VVV &&
                    item.WAV === character.WAV &&
                    item.WSD === character.WSD &&
                    item.fcstTime === character.fcstTime
                ) === idx
              );
            }
          );
          bus.$emit("end:spinner");
          // 이벤트버스 닫기
        });
      }
    },
  },
  computed: {
    checkShortTerm() {
      return this.$store.state.shortTerm;
    },
    check3DaysTerm() {
      return this.$store.state.threeDaysTerm;
    },
  },

  watch: {
    checkShortTerm(val) {
      this.shortTerm = val;
    },
    check3DaysTerm(val) {
      this.threeDaysTerm = val;
      if (this.threeDaysTerm) {
        this.getWeatherData();
      }
    },
  },
};
</script>

<style scoped>
.test {
  color: black;
  overflow: scroll;
  max-width: 400;
}
.text-size {
  font-size: 20;
}
</style>
