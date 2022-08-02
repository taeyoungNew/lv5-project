<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn class="ma-2" :color="btnOneColor" @click="shortTemBtn(1)">
          오늘
        </v-btn>
        <v-btn class="ma-2" :color="btnTowColor" @click="shortTemBtn(2)">
          내일
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
export default {
  data: () => ({
    btnOneColor: "primary",
    btnTowColor: "secondary",
    showShortTem: "today",
    value: [1, 4, 2, 5, 6, 10],
    getWeather: "",
    shortTermData: "",
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
    loadingStatus: false,
  }),
  methods: {
    shortTemBtn(param) {
      console.log("param = ", param);
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
    isLoading() {
      this.loadingStatus = !this.loadingStatus;
    },
    async getWeatherData() {
      this.isLoading();
      this.todayDatas = [];
      this.tomorrowDatas = [];
      let getWeather = this.getWeather;
      this.dateData = getTimeNow();

      this.time = String(Number(this.dateData.hours));

      for (let num = 0; num < 24; num++) {
        await this.todayProperty(getWeather, num);
      }

      for (let num = 0; num < 24; num++) {
        await this.tomorrowProperty(getWeather, num);
      }
      this.isLoading();
    },

    todayProperty(getWeather, num) {
      let saveData = {};
      let category = "";
      let fcstValue = "";
      let time = "";
      let date = this.dateData.date;
      time = this.time;
      // console.log("time = ", time);
      for (let i = 0; i < getWeather.length; i++) {
        if (date === getWeather[i].fcstDate) {
          // console.log("num = ", num);
          time = String(Number(this.time) + num) + "00";
          if (time.length < 4) {
            time = "0" + time;
          }
          if (time === getWeather[i].fcstTime) {
            category = getWeather[i].category;
            fcstValue = getWeather[i].fcstValue;

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
            // console.log("saveData = ", saveData);

            if (Object.keys(saveData).length > 11) {
              saveData["fcstTime"] =
                getWeather[i].fcstTime.substring(0, 2) + "시";

              this.todayDatas.push(saveData);

              if (this.todayDatas.some((val) => val.fcstTime === "23시")) {
                console.log("하루 데이터 끝");

                break;
              }
            }
          }
        }
      }
    },
    tomorrowProperty(getWeather, num) {
      let saveData = {};
      let category = "";
      let fcstValue = "";
      let fcstTime = "0";
      let time = "";
      let date = Number(this.dateData.date) + 1;
      time = fcstTime;
      for (let i = 0; i < getWeather.length; i++) {
        time = String(num + Number(fcstTime)) + "00";
        if (time.length < 4) {
          time = "0" + time;
        }

        if (String(date) === getWeather[i].fcstDate) {
          if (time === getWeather[i].fcstTime) {
            category = getWeather[i].category;
            fcstValue = getWeather[i].fcstValue;

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
                getWeather[i].fcstTime.substring(0, 2) + "시";

              this.tomorrowDatas.push(saveData);

              if (this.tomorrowDatas.some((val) => val.fcstTime === "23시")) {
                console.log("하루 데이터 끝");
                break;
              }
            }
          }
        }
      }
    },
  },
  computed: {
    checkWeather() {
      console.log("threeDaysTem 바뀜");
      return this.$store.state.threeDaysTem;
    },
    checkshortWeater() {
      return this.$store.state.shortTermData;
    },
  },

  watch: {
    async checkWeather(val) {
      this.getWeather = val;

      this.getWeatherData();
    },
    checkshortWeater(val) {
      this.shortTermData = val;
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
