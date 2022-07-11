<template>
  <div id="container">
    <!-- <show-weather /> -->
    <air-info />
  </div>
</template>

<script>
// import showWeather from "@/components/ShowWeather.vue";
import AirInfo from "@/components/AirInpo.vue";
export default {
  components: { AirInfo },
};
</script>

<style scoped>
#container {
  background-color: #00b4d8;
  height: 100vh;
  overflow: hidden;
}
</style>
