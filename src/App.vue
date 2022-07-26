<template>
  <v-app id="app">
    <app-header />
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppHeader from "./components/common/AppHeader.vue";

// import AppHeader from "./components/common/AppHeader.vue";
export default {
  name: "App",
  components: { AppHeader },
  data: () => ({}),
};
</script>
<style scoped>
#app {
  width: 100%;
  margin: 0 auto;
  height: auto;
}
</style>
