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
        </v-col>

        <font-awesome-icon icon="fa-solid fa-temperature-half " class="fa-3x" />

        <v-col class="text-h2" cols="6"> {{ currentTemperature }}&deg;C </v-col>
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

export default {
  components: { DateComponent },
  data() {
    return {
      weatherIcon: 0,
      labels: ["SU", "MO", "TU", "WED", "TH", "FR", "SA"],
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
        {
          day: "Tuesday",
          icon: "mdi-white-balance-sunny",
          temp: "24\xB0/12\xB0",
        },
        {
          day: "Wednesday",
          icon: "mdi-white-balance-sunny",
          temp: "22\xB0/14\xB0",
        },
        { day: "Thursday", icon: "mdi-cloud", temp: "25\xB0/15\xB0" },
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
    showIcon(val) {
      let shortTerm = val;
      let nowTime = getTimeNow().hours;

      for (let i = 0; i < shortTerm.length; i++) {
        if (
          shortTerm[i].fcstTime === "0" + String(Number(nowTime) + 1) + "00" &&
          shortTerm[i].category === "SKY"
        ) {
          this.weatherIcon = shortTerm[i].fcstValue;
          // console.log(shortTerm[i].fcstValue);
        } else if (
          shortTerm[i].fcstTime === String(Number(nowTime) + 1) + "00" &&
          shortTerm[i].category === "SKY"
        ) {
          this.weatherIcon = shortTerm[i].fcstValue;
          // console.log(shortTerm[i].fcstValue);
        }
      }

      // console.log("time=", nowTime);
    },
    checkDay() {
      let day = getTimeNow().day;
      // console.log("day", day);
      this.time = day;
    },
  },
  created() {
    this.checkDay();
  },
  computed: {
    checkWeather() {
      return this.$store.state.nowWeatherData;
    },
    checkShortTerm() {
      return this.$store.state.shortTermData;
    },
  },

  watch: {
    checkWeather(val) {
      this.getWeather = val;
      this.getWeatherdata();
    },
    checkShortTerm(val) {
      // console.log(val.value);
      this.showIcon(val);
    },
  },
};
</script>

<style scoped>
.weather-icon {
  font-size: 5em;
}
</style>
