import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import "material-design-icons-iconfont/dist/material-design-icons.css"; // Ensure you are using css-loader
import "@mdi/font/css/materialdesignicons.css";

Vue.use(Vuetify);

export default new Vuetify({
  // icon의 종류
  icons: {
    iconfont: "mdi", // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
  },
  // break point의 각 사이즈의 크기를 정한다.
  breakpoint: {
    thresholds: {
      xs: 450,
    },
  },
  mobileBreakpoint: "xs",
});
