<template>
  <div id="container">
    <show-weather />
    <air-info />
  </div>
</template>

<script>
import AirInfo from "@/components/AirInpo.vue";
import showWeather from "@/components/ShowWeather.vue";
export default {
  components: { AirInfo, showWeather },
};
</script>

<style scoped>
#container {
  background-color: #00b4d8;
  height: 100vw;
  overflow: hidden;
}
</style>
