<template>
  <v-app id="app">
    <app-header class="app-header" />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import AppHeader from "./components/common/AppHeader.vue";
export default {
  name: "App",
  components: {
    AppHeader,
  },
  data: () => ({}),
};
</script>
<style scoped>
#app {
  width: 1280px;
  margin: 0 auto;
  background-color: #00b4d8;
  height: 100vw;
}
.app-header {
  margin-top: 40px;
}
</style>
