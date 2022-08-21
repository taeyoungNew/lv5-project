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
          :items-per-page="15"
          class="elevation-0"
        />
        <v-data-table
          v-if="showShortTem === 'tomorrow'"
          :headers="tomorrowHeaders"
          :items="tomorrowDatas"
          :items-per-page="15"
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
    threeDaysTem: "",
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
    async getWeatherData() {
      this.todayDatas = [];
      this.tomorrowDatas = [];
      // let shortTerm = this.shortTerm;
      // let threeDaysTem = this.threeDaysTem;
      this.dateData = getTimeNow();

      this.time = String(Number(this.dateData.hours));

      for (let num = 1; num < 24; num++) {
        await this.todayProperty(num);
      }

      for (let num = 0; num < 24; num++) {
        await this.tomorrowProperty(num);
      }
    },
    // 오늘 날씨
    todayProperty(num) {
      let saveData = {};
      let category = "";
      let fcstValue = "";
      let time = "";
      let date = this.dateData.date;
      let threeDaysTem = this.threeDaysTem;
      let shortTerm = this.shortTerm;
      time = this.time;
      time = String(Number(this.time) + num) + "00";
      if (time.length < 4) {
        time = "0" + time;
      }

      // let checkData = Object.keys(shortTerm).some((v) => v.fcstTime === time);
      let checkData = shortTerm.find((e) => e.fcstTime === time);
      // console.log(checkData);
      // if (shortTerm.includes(time)) {
      //   console.log("포함됨");
      // } else {
      //   console.log("포함안됨");
      // }
      // 초단기예보 저장
      if (checkData) {
        for (let i = 0; i < shortTerm.length; i++) {
          if (date === shortTerm[i].fcstDate) {
            if (time === shortTerm[i].fcstTime) {
              // console.log("shortTerm[i].fcstTime", shortTerm[i].fcstTime);
              category = shortTerm[i].category;
              fcstValue = shortTerm[i].fcstValue;
              if (category === "T1H") {
                // 기온
                saveData[`TMP`] = fcstValue + "°C";
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
              }

              // console.log("saveData = ", saveData);
              if (Object.keys(saveData).length > 9) {
                saveData["fcstTime"] =
                  shortTerm[i].fcstTime.substring(0, 2) + "시";
                this.todayDatas.push(saveData);
                continue;
              }
            }
          }
        }
      } else if (checkData === undefined) {
        // console.log("단기예보 저장");
        // 초단기예보 저장한 후 단기예보 저장
        for (let i = 0; i < threeDaysTem.length; i++) {
          if (date === threeDaysTem[i].fcstDate) {
            // console.log(
            //   "threeDaysTem[i].fcstTime = ",
            //   threeDaysTem[i].fcstTime
            // );
            // console.log("time = ", time);
            if (time === threeDaysTem[i].fcstTime) {
              category = threeDaysTem[i].category;
              fcstValue = threeDaysTem[i].fcstValue;
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

              if (Object.keys(saveData).length > 11) {
                saveData["fcstTime"] =
                  threeDaysTem[i].fcstTime.substring(0, 2) + "시";

                this.todayDatas.push(saveData);

                if (this.todayDatas.some((val) => val.fcstTime === "23시")) {
                  this.todayDatas = this.todayDatas.filter(
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
                  break;
                }
              }
            }
          }
        }
      }
    },
    // 내일 날씨
    tomorrowProperty(num) {
      let threeDaysTem = this.threeDaysTem;
      let shortTerm = this.shortTerm;
      let saveData = {};
      let category = "";
      let fcstValue = "";
      let fcstTime = "0";
      let time = "";
      let date = Number(this.dateData.date) + 1;
      time = fcstTime;
      time = String(num + Number(fcstTime)) + "00";
      if (time.length < 4) {
        time = "0" + time;
      }

      let checkData = shortTerm.find((e) => e.fcstTime === time);
      if (checkData) {
        for (let i = 0; i < shortTerm.length; i++) {
          if (date === shortTerm[i].fcstDate) {
            if (time === shortTerm[i].fcstTime) {
              category = shortTerm[i].category;
              fcstValue = shortTerm[i].fcstValue;
              if (category === "T1H") {
                // 기온
                saveData[`TMP`] = fcstValue + "°C";
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
              }

              if (Object.keys(saveData).length > 9) {
                saveData["fcstTime"] =
                  shortTerm[i].fcstTime.substring(0, 2) + "시";
                this.todayDatas.push(saveData);
                continue;
              }
            }
          }
        }
      } else if (checkData === undefined) {
        for (let i = 0; i < threeDaysTem.length; i++) {
          if (String(date) === threeDaysTem[i].fcstDate) {
            if (time === threeDaysTem[i].fcstTime) {
              category = threeDaysTem[i].category;
              fcstValue = threeDaysTem[i].fcstValue;
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
              if (Object.keys(saveData).length > 11) {
                saveData["fcstTime"] =
                  threeDaysTem[i].fcstTime.substring(0, 2) + "시";

                this.tomorrowDatas.push(saveData);

                if (this.tomorrowDatas.some((val) => val.fcstTime === "23시")) {
                  break;
                }
              }
            }
          }
        }
      }
    },
  },
  computed: {
    checkWeatherData() {
      let threeDaysTem = this.$store.state.threeDaysTem;
      let shortTem = this.$store.state.shortTermData;
      let payLoad = [];

      payLoad.push(threeDaysTem, shortTem);

      return payLoad;
    },
    // checkshortWeater() {
    //   return this.$store.state.shortTermData;
    // },
  },

  watch: {
    async checkWeatherData(payLoad) {
      this.threeDaysTem = payLoad[0];
      this.shortTerm = payLoad[1];
      if (this.threeDaysTem !== undefined && this.shortTerm !== undefined) {
        await this.getWeatherData();
        bus.$emit("end:spinner");
      }
    },
    // checkthreeDaysTem(val) {
    //   this.threeDaysTem = val;

    // },
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
