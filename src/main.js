import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import { library } from "@fortawesome/fontawesome-svg-core";
// import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import {
  faFaceGrinSquint,
  faFaceLaugh,
  faFaceGrinWide,
  faFaceFrown,
  faFaceAngry,
  faMoon,
  faFaceLaughBeam,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import "vuetify/dist/vuetify.min.css";
library.add(
  faFaceGrinSquint,
  faFaceLaugh,
  faFaceGrinWide,
  faFaceFrown,
  faFaceAngry,
  faMoon,
  faFaceLaughBeam
);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
