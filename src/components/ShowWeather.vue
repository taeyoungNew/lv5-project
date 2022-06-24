<template>
  <div>
    <h1>날씨</h1>
    <div class="container">
      <div class="icon-box">
        <font-awesome-icon class="weather-icon" icon="fa-regular fa-moon" />
        °C
      </div>
    </div>
  </div>
</template>

<script>
import { fetchWeatherData } from "@/api/index";
export default {
  data() {
    return {};
  },
  created() {
    this.getWeatherdata();
  },
  methods: {
    getWeatherdata() {
      console.log("dddshowWeatherPage");
      fetchWeatherData()
        .then(function (res) {
          console.log(res);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },

  mounted() {},
};
</script>

<style scoped>
.icon-box {
  background-color: rgb(163, 160, 160);
  width: 900px;
  height: 800px;
  border-radius: 15px;
  margin: 0 auto;
  position: relative;
}
.weather-icon {
  font-size: 350px;
  position: absolute;
  left: 15%;
  top: 25px;
}
</style>
