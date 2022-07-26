<template>
  <v-container>
    <v-card><search-region style="max-height: 70px" /></v-card>
    <v-card>
      <v-container class="grey lighten-3">
        <v-row style="position: relative">
          <v-col>
            <v-card style="width: 120%" outlined>
              <kakao-map />
            </v-card>
          </v-col>
          <v-col>
            <v-card class="pa-3" outlined><show-weather /></v-card>
            <v-card class="pa-3" outlined>
              <air-inpo />
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import KakaoMap from "@/components/KakaoMap.vue";
import AirInpo from "@/components/AirInpo.vue";
import SearchRegion from "@/components/SearchRegion.vue";
import ShowWeather from "@/components/ShowWeather.vue";

export default {
  components: { KakaoMap, AirInpo, SearchRegion, ShowWeather },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$store.dispatch("FETCH_DATAS", this.$store.state.defaultSerch);
    },
  },
};
</script>

<style scoped>
#main {
  position: relative;
}

.search-com {
  margin-top: 25%;
  width: 100%;
  height: 100vh;
}
</style>
