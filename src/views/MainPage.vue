<template>
  <v-container>
    <v-card><search-region style="max-height: 70px" /></v-card>
    <v-card>
      <v-container class="grey lighten-3">
        <v-row style="position: relative">
          <v-col xl="7" lg="12" md="12" sm="12" xm="12">
            <v-card outlined>
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
    <v-card outlined>
      <v-container>
        <v-card class="pa-0" outlined>
          <short-term />
        </v-card>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import KakaoMap from "@/components/KakaoMap.vue";
import AirInpo from "@/components/AirInpo.vue";
import SearchRegion from "@/components/SearchRegion.vue";
import ShowWeather from "@/components/ShowWeather.vue";
import ShortTerm from "@/components/ShortTerm.vue";

export default {
  components: { KakaoMap, AirInpo, SearchRegion, ShowWeather, ShortTerm },

  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$store.dispatch("FETCH_DATAS", this.$store.state.defaultSerch);
    },
  },
  watch: {
    loader() {
      const load = this.loader;
      this[load] = !this[load];

      setTimeout(() => (this[load] = false), 3000);

      this.loader = null;
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
