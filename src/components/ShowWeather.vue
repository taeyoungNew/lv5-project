<template>
  <v-card>
    <v-list-item>
      <v-list-item-subtitle><date-component /></v-list-item-subtitle>
    </v-list-item>

    <v-card-text>
      <v-row align="center">
        <v-col class="text-center" id="nowWeather">
          <font-awesome-icon
            v-if="false"
            class="weather-icon"
            icon="fa-solid fa-moon"
          >
          </font-awesome-icon>
          <font-awesome-icon
            v-if="weatherIcon == 1 || weatherIcon == 2"
            class="weather-icon"
            icon="fa-solid fa-sun"
          >
          </font-awesome-icon>
          <font-awesome-icon
            v-if="weatherIcon == 3"
            class="weather-icon"
            icon="fa-solid fa-cloud-sun"
          >
          </font-awesome-icon>
          <font-awesome-icon
            v-if="weatherIcon == 4"
            class="weather-icon"
            icon="fa-solid fa-cloud"
          >
          </font-awesome-icon>
          <font-awesome-icon
            v-if="weatherIcon == 5"
            class="weather-icon"
            icon="fa-solid fa-cloud-rain"
          >
          </font-awesome-icon>
        </v-col>

        <font-awesome-icon icon="fa-solid fa-temperature-half " class="fa-3x" />

        <v-col class="text-h2"> {{ currentTemperature }}&deg;C </v-col>
        <v-col cols="12"> </v-col>
      </v-row>
    </v-card-text>

    <v-list-item>
      <v-list-item-icon>
        <font-awesome-icon
          icon="fa-solid fa-wind"
          class="fa-2x"
          style="color: gray"
        />
      </v-list-item-icon>

      <v-list-item-subtitle>{{ windSpeed }} m/s</v-list-item-subtitle>
    </v-list-item>

    <v-list-item>
      <v-list-item-icon>
        <font-awesome-icon
          icon="fa-solid fa-cloud-rain"
          class="fa-2x"
          style="color: gray"
        />
      </v-list-item-icon>
      <v-list-item-subtitle v-if="hourPrecipitation === 0"
        >- &deg;mm</v-list-item-subtitle
      >
      <v-list-item-subtitle v-else
        >{{ hourPrecipitation }} &deg;mm</v-list-item-subtitle
      >
    </v-list-item>
    <v-list-item>
      <v-list-item-icon>
        <font-awesome-icon
          class="fa-2x"
          icon="fa-solid fa-droplet"
          style="color: gray"
        />
      </v-list-item-icon>

      <v-list-item-subtitle>{{ humidityPersent }} &deg;%</v-list-item-subtitle>
    </v-list-item>

    <v-slider
      v-model="time"
      :max="6"
      :tick-labels="labels"
      class="mx-4"
      ticks
    ></v-slider>

    <v-list class="transparent">
      <v-list-item v-for="item in forecast" :key="item.day">
        <v-list-item-title>{{ item.day }}</v-list-item-title>
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-subtitle class="text-right">
          {{ item.temp }}
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <!-- <v-card-actions>
      <v-btn text> Full Report </v-btn>
    </v-card-actions> -->
  </v-card>
</template>

<script>
import DateComponent from "./common/DateComponent.vue";
import { getTimeNow } from "@/api/index";
import localCodes from "@/assets/data/localCodes.json";

export default {
  components: { DateComponent },
  props: {
    sendAddress: {
      type: String,
    },
  },
  data() {
    return {
      days: [],
      getAddress: "",
      localCodes: localCodes,
      weatherIcon: 0,
      labels: ["SU", "MO", "TU", "WED", "TH", "FR", "SA"],
      daysWeek: [
        "Sunday",
        "Monday",
        "Tuseday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      time: 0,
      currentTemperature: "",
      getWeather: "",
      nowWeather: "",
      windSpeed: "",
      humidityPersent: "",
      hourPrecipitation: "",
      shortTermElement: [
        "T1H",
        "RN1",
        "SKY",
        "UUU",
        "VVV",
        "REH",
        "PTY",
        "LGT",
        "VEC",
        "WSD",
      ],
      forecast: [
        // {
        //   day: "Tuesday",
        //   icon: "mdi-white-balance-sunny",
        //   temp: "24\xB0/12\xB0",
        // },
        // {
        //   day: "Wednesday",
        //   icon: "mdi-weather-partly-cloudy",
        //   temp: "22\xB0/14\xB0",
        // },
        // { day: "Thursday", icon: "mdi-cloud", temp: "25\xB0/15\xB0" },
      ],
    };
  },

  methods: {
    getWeatherdata() {
      let getWeather = this.getWeather;
      let nowWeather = [];
      for (const elem in this.shortTermElement) {
        const result = getWeather.findIndex(
          (element) => element.category === this.shortTermElement[elem]
        );
        nowWeather.push(getWeather[result]);
      }

      this.nowWeather = nowWeather;
      this.currentTemperature = this.nowWeather[0].obsrValue;
      this.hourPrecipitation = this.nowWeather[1].obsrValue;
      this.humidityPersent = this.nowWeather[5].obsrValue;
      this.windSpeed = this.nowWeather[9].obsrValue;
    },
    mediumTermForecast() {
      let getAddress = this.getAddress;
      let areaCode = this.localCodes.datas;

      for (let i = 0; i < areaCode.length; i++) {
        console.log(
          getAddress.replace(/(\s*)/g, "").includes(areaCode[i].doName)
        );
      }

      console.log("getAddress = ", this.getAddress);
    },
    showIcon(val) {
      let shortTerm = val;
      let nowTime = getTimeNow().hours;
      let fcstTime = String(Number(nowTime) + 1) + "00";
      if (fcstTime.length === 3) {
        fcstTime = "0" + fcstTime;
      }
      let skyNum = shortTerm.findIndex((val) => val.category === "SKY");
      let skyData = shortTerm[skyNum];
      this.weatherIcon = skyData.fcstValue;
      if (this.hourPrecipitation != 0) {
        this.weatherIcon = 5;
      }
    },
    checkDay() {
      let day = new Date();
      this.time = day.getDay();
      let today = day.getDay();
      let result = 0;
      let index = 0;
      for (let i = 0; i < this.daysWeek.length; i++) {
        result = today + index;
        if (this.daysWeek[result]) {
          this.days.push(this.daysWeek[result]);
        }
        index++;
        if (result > 5) {
          index = 0;
          today = 0;
        }
      }
      // console.log("days = ", this.days);
    },
    get3DaysWeather(param) {
      let getNowTime = getTimeNow();
      let date = getNowTime.date;
      let tomorrow = String(Number(date) + 1);
      let tomAft = String(Number(date) + 2);
      let tomSkyDatas = [];
      let tomTmn = "";
      let tomTmx = "";
      let tomRain = [];
      let dayAftSkyDatas = [];
      let dayAftTmn = "";
      let dayAftTmx = "";
      let dayAftRain = [];
      let datas = param;
      this.forecast = [];
      console.log(tomorrow);
      for (let i = 0; i < datas.length; i++) {
        if (tomorrow === datas[i].fcstDate) {
          if ("SKY" === datas[i].category) {
            tomSkyDatas.push(datas[i].fcstValue);
          } else if ("TMN" === datas[i].category) {
            tomTmn = datas[i].fcstValue;
          } else if ("TMX" === datas[i].category) {
            tomTmx = datas[i].fcstValue;
          } else if ("PCP" === datas[i].category) {
            tomRain.push(datas[i].fcstValue);
          }
        }
      }

      for (let i = 0; i < datas.length; i++) {
        if (tomAft === datas[i].fcstDate) {
          if ("SKY" === datas[i].category) {
            dayAftSkyDatas.push(datas[i].fcstValue);
          } else if ("TMN" === datas[i].category) {
            dayAftTmn = datas[i].fcstValue;
          } else if ("TMX" === datas[i].category) {
            dayAftTmx = datas[i].fcstValue;
          } else if ("PCP" === datas[i].category) {
            dayAftRain.push(datas[i].fcstValue);
          }
        }
      }
      let tomSkyMode = this.getMode(tomSkyDatas);
      let tomRainMode = this.getMode(tomRain);
      let dayAftSky = this.getMode(dayAftSkyDatas);
      let dayAftRainMode = this.getMode(dayAftRain);
      console.log(tomRainMode);
      console.log(dayAftRainMode);

      let tomIcon = "";
      let dayAftIcon = "";

      if (tomSkyMode === "1") {
        tomIcon = "mdi-sun-wireless-outline";
      } else if (tomSkyMode === "2") {
        tomIcon = "mdi-sun-wireless-outline";
      } else if (tomSkyMode === "3") {
        tomIcon = "mdi-weather-partly-cloudy";
      } else if (tomSkyMode === "4") {
        tomIcon = "mdi-cloud";
      }

      if (dayAftSky === "1") {
        dayAftIcon = "mdi-sun-wireless-outline";
      } else if (dayAftSky === "2") {
        dayAftIcon = "mdi-sun-wireless-outline";
      } else if (dayAftSky === "3") {
        dayAftIcon = "mdi-weather-partly-cloudy";
      } else if (dayAftSky === "4") {
        dayAftIcon = "mdi-cloud";
      }

      if (tomRainMode !== "강수없음") {
        tomIcon = "mdi-weather-rainy";
      }
      if (dayAftRainMode !== "강수없음") {
        dayAftIcon = "mdi-weather-rainy";
      }

      let tomWeather = {
        day: this.days[1],
        icon: tomIcon,
        temp: `${tomTmx}\xB0/${tomTmn}\xB0`,
      };

      let dayAftWeather = {
        day: this.days[2],
        icon: dayAftIcon,
        temp: `${dayAftTmx}\xB0/${dayAftTmn}\xB0`,
      };
      // console.log(dayAftWeather, tomWeather);
      this.forecast.push(tomWeather, dayAftWeather);
    },
    getMode(array) {
      // 1. 출연 빈도 구하기
      const counts = array.reduce((pv, cv) => {
        pv[cv] = (pv[cv] || 0) + 1;
        return pv;
      }, {});

      // 2. 최빈값 구하기
      const keys = Object.keys(counts);
      let mode = keys[0];
      keys.forEach((val) => {
        if (counts[val] > counts[mode]) {
          mode = val;
        }
      });

      return mode;
    },
  },
  created() {
    this.checkDay();
  },
  computed: {
    checkAddress() {
      return this.sendAddress;
    },
    checkWeather() {
      return this.$store.state.nowWeatherData;
    },
    checkShortTerm() {
      return this.$store.state.shortTermData;
    },
    checkThreeDaysTerm() {
      console.log("checkThreeDaysTerm");
      return this.$store.state.threeDaysTem;
    },
  },

  watch: {
    checkAddress(val) {
      this.getAddress = val;
      this.mediumTermForecast();
    },
    checkWeather(val) {
      this.getWeather = val;
      this.getWeatherdata();
    },
    checkShortTerm(val) {
      this.showIcon(val);
    },
    checkThreeDaysTerm(val) {
      this.get3DaysWeather(val);
    },
  },
};
</script>

<style scoped>
.weather-icon {
  font-size: 5em;
}
</style>
