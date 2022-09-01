<template>
  <v-container class="containerBox" ref="containerBox">
    <spinner-component v-if="loadingStatus" />
    <v-card
      ><search-region @addressName="getAddressName" style="max-height: 70px"
    /></v-card>
    <v-card>
      <v-container class="lighten-3">
        <v-row style="position: relative overflow:auto">
          <v-col xl="7" lg="12" md="12" sm="12" xs="12">
            <v-card outlined>
              <kakao-map />
            </v-card>
          </v-col>
          <v-col v-if="!!getAddress">
            <v-card class="pa-3" outlined>
              <v-row>
                <v-col>
                  <v-card-text v-if="getAddress" style="font-size: 25px">
                    {{ getAddress }}
                  </v-card-text>
                  <v-card-text v-else style="font-size: 25px">주소</v-card-text>
                </v-col>
              </v-row>
            </v-card>
            <v-card class="pa-3" outlined>
              <show-weather :sendAddress="addressName" />
            </v-card>
            <v-card class="pa-3" outlined>
              <air-inpo />
            </v-card>
          </v-col>
          <v-col v-else>
            <before-seach />
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
import SpinnerComponent from "@/components/common/SpinnerComponent.vue";
import bus from "@/utils/bus.js";
import BeforeSeach from "@/components/BeforeSeach.vue";

export default {
  components: {
    KakaoMap,
    AirInpo,
    SearchRegion,
    ShowWeather,
    ShortTerm,
    SpinnerComponent,
    BeforeSeach,
  },
  data() {
    return {
      getAddress: "",
      addressName: "",
      loadingStatus: false,
    };
  },
  created() {
    bus.$on("start:spinner", this.startSpinner);
    this.fetchData();
    bus.$on("end:spinner", this.endSpinner);
  },
  beforeDestroy() {
    bus.$off("start:spinner", this.startSpinner);
    bus.$off("end:spinner", this.endSpinner);
  },
  methods: {
    startSpinner() {
      this.loadingStatus = true;
    },
    endSpinner() {
      this.loadingStatus = false;
    },
    getAddressName(params) {
      this.addressName = params;
    },
    fetchData() {
      this.$store.dispatch("FETCH_DATAS", this.$store.state.defaultSerch);
    },
  },
  computed: {
    checkAddress() {
      return this.$store.state.address;
    },
    vuetiHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 100;
        case "sm":
          return 200;
        case "md":
          return 300;
        case "lg":
          return 400;
        default:
          return 100;
      }
    },
  },
  watch: {
    checkAddress(val) {
      this.getAddress = val;
    },
  },
};
</script>

<style lang="scss" scoped>
.containerBox {
  height: 100vmin;
  // background-image: url("https://img.freepik.com/free-vector/gorgeous-clouds-background-with-blue-sky-design_1017-25501.jpg?w=1800&t=st=1659817902~exp=1659818502~hmac=1ebf122c1b942c2bb75522604b4473bb622bf0c8b9384d13db8807d663dd2e84");
  // background-size: cover;
}

.container-box {
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  // background: #fff;
}
</style>
scoped>
