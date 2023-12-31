import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "@/store/index";
import vuetify from "./plugins/vuetify";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSun,
  faCloudSun,
  faCloud,
  faCloudBolt,
  faCloudRain,
  faCloudShowersHeavy,
  faMoon,
  faWind,
  faTemperatureHalf,
  faDroplet,
  faLocationDot,
  faMagnifyingGlass,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFaceGrinSquint,
  faFaceLaugh,
  faFaceGrinWide,
  faFaceFrown,
  faFaceAngry,
  faFaceLaughBeam,
  faFaceMeh,
  faCircleQuestion,
} from "@fortawesome/free-regular-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import "vuetify/dist/vuetify.min.css";
library.add(
  faFaceGrinSquint,
  faFaceLaugh,
  faFaceGrinWide,
  faFaceFrown,
  faFaceAngry,
  faFaceLaughBeam,
  faFaceMeh,
  faSun,
  faCloudSun,
  faCloud,
  faCloudBolt,
  faCloudRain,
  faCloudShowersHeavy,
  faMoon,
  faWind,
  faTemperatureHalf,
  faDroplet,
  faLocationDot,
  faMagnifyingGlass,
  faCircleQuestion,
  faCircleExclamation
);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
