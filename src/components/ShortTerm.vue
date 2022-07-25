<template>
  <v-container>
    <v-data-table
      v-if="loadingStatus"
      item-key="name"
      class="elevation-1"
      loading
      loading-text="Loading... Please wait"
    ></v-data-table>
    <v-data-table
      v-else
      :headers="headers"
      :items="desserts"
      :items-per-page="15"
      class="elevation-0"
    />
  </v-container>
</template>

<script>
import { getTimeNow } from "@/api/index";
export default {
  data: () => ({
    value: [1, 4, 2, 5, 6, 10],
    getWeather: "",
    skyStatus: "",
    currentTemperature: "",
    headers: [
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
      // { text: "아이콘", value: "icon" },
    ],
    dateData: "",
    desserts: [],
    time: "",
    num: 0,
    saveData: {},
    loadingStatus: false,
  }),
  methods: {
    isLoading() {
      this.loadingStatus = !this.loadingStatus;
    },
    async getWeatherData() {
      this.isLoading();
      this.desserts = [];
      let getWeather = this.getWeather;
      this.dateData = getTimeNow();

      this.time = Number(this.dateData.hours);

      this.time = "0" + String(this.time);
      for (let num = 0; num < 24; num++) {
        await this.getProperty(num, getWeather);
      }
      this.isLoading();
    },

    getProperty(num, getWeather) {
      let saveData = {};
      let category = "";
      let fcstValue = "";

      for (let i = 0; i < getWeather.length; i++) {
        if (this.dateData.date === getWeather[i].fcstDate) {
          if (
            "0" + (Number(this.time) + num + "00") ===
            getWeather[i].fcstTime
          ) {
            // console.log("0" + (Number(this.time) + num + "00"));
            category = getWeather[i].category;
            fcstValue = getWeather[i].fcstValue;

            if (category === "TMP") {
              saveData[`${category}`] = fcstValue + "°C";
            } else if (category === "REH") {
              saveData[`${category}`] = fcstValue + "%";
            } else if (category === "WSD") {
              saveData[`${category}`] = fcstValue + "m/s";
            } else if (category === "SKY") {
              if (fcstValue === 1 || fcstValue === 2) {
                saveData[`${category}`] = "맑음";
              } else if (fcstValue === 3) {
                saveData[`${category}`] = "구름 많음";
              } else {
                saveData[`${category}`] = "흐림";
              }
            } else {
              saveData[`${category}`] = fcstValue;
            }

            if (Object.keys(saveData).length > 11) {
              saveData["fcstTime"] =
                getWeather[i].fcstTime.substring(0, 2) + "시";
              this.desserts.push(saveData);
              break;
            }
          } else if (
            Number(this.time) + num + "00" ===
            getWeather[i].fcstTime
          ) {
            // console.log("time", Number(this.time) + num + "00");
            category = getWeather[i].category;
            fcstValue = getWeather[i].fcstValue;

            if (category === "TMP") {
              saveData[`${category}`] = fcstValue + "°C";
            } else if (category === "REH") {
              saveData[`${category}`] = fcstValue + "%";
            } else if (category === "WSD") {
              saveData[`${category}`] = fcstValue + "m/s";
            } else if (category === "SKY") {
              if (fcstValue === 1 || fcstValue === 2) {
                saveData[`${category}`] = "맑음";
              } else if (fcstValue === 3) {
                saveData[`${category}`] = "구름 많음";
              } else {
                saveData[`${category}`] = "흐림";
              }
            } else {
              saveData[`${category}`] = fcstValue;
            }

            if (Object.keys(saveData).length > 11) {
              saveData["fcstTime"] =
                getWeather[i].fcstTime.substring(0, 2) + "시";
              this.desserts.push(saveData);
              break;
            }
          }
        }
      }
    },
  },
  computed: {
    checkWeather() {
      return this.$store.state.threeDaysTem;
    },
  },

  watch: {
    async checkWeather(val) {
      this.getWeather = val;

      this.getWeatherData();
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
