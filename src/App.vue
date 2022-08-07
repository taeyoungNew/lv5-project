<template>
  <v-app id="app">
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
  data: () => ({}),
};
</script>
<style scoped>
#app {
  width: 100%;
  margin: 0 auto;
  height: auto;
}
.v-progress-circular {
  margin: 1rem;
  width: 100%;
}
</style>
