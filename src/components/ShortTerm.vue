<template>
  <v-container>
    <v-data-table
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
    PCP: "",
    POP: "",
    PTY: "",
    REH: "",
    SKY: "",
    SNO: "",
    TMN: "",
    TMP: "",
    TMX: "",
    UUU: "",
    VEC: "",
    VVV: "",
    WAV: "",
    WSD: "",
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
    ],
    dateData: "",
    desserts: [],
    time: "",
    num: 0,
    saveData: {},
  }),
  methods: {
    async getWeatherData() {
      this.desserts = [];
      let getWeather = this.getWeather;
      this.dateData = getTimeNow();

      this.time = Number(this.dateData.hours);

      this.time = "0" + String(this.time);
      for (let num = 0; num < 24; num++) {
        await this.getProperty(num, getWeather);
      }
    },

    getProperty(num, getWeather, num2) {
      let saveData = {};
      let category = "";
      let fcstValue = "";
      console.log("num2", num2);
      // let index = 0;
      for (let i = 0; i < getWeather.length; i++) {
        console.log(Number(this.dateData.date));
        if (this.dateData.date === getWeather[i].fcstDate) {
          // console.log(Number(this.dateData.date) + num2);
          if ("0" + (Number(this.time) + "00") === getWeather[i].fcstTime) {
            console.log(getWeather[i].category, getWeather[i].fcstValue);
            category = getWeather[i].category;
            fcstValue = getWeather[i].fcstValue;
            saveData[`${category}`] = fcstValue;
            console.log(saveData);
            console.log(Object.keys(saveData).length);
            if (Object.keys(saveData).length > 11) {
              console.log("길이가 꽉참");
              console.log(saveData);
              saveData["fcstTime"] = getWeather[i].fcstTime;
              this.desserts.push(saveData);
              break;
            }
          } else if (
            Number(this.time) + num + "00" ===
            getWeather[i].fcstTime
          ) {
            category = getWeather[i].category;
            fcstValue = getWeather[i].fcstValue;
            saveData[`${category}`] = fcstValue;
            console.log(saveData);
            console.log(Object.keys(saveData).length);
            if (Object.keys(saveData).length > 11) {
              console.log("길이가 꽉참");
              console.log(saveData);
              saveData["fcstTime"] =
                getWeather[i].fcstTime.substring(0, 2) + "시";
              this.desserts.push(saveData);
              break;
            }
          }
        }
        // if(this.dateData.date + num2 === )
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
      // console.log(this.getWeather);
      // this.fetchDate();
      await this.getWeatherData();
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
