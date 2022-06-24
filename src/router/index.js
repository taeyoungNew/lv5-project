import Vue from "vue";
import VueRouter from "vue-router";
// import store from "@/store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("@/views/MainPage.vue"),
  },
  {
    path: "/weather-page",
    component: () => import("@/views/WeatherPage.vue"),
  },
];

// router.beforeEach((to, from, next) => {
//   if (!store.state.findAreaData) {
//     console.log("검색하신 주소가 없습니다 ㅜ");
//     next("/");
//     return;
//   }
//   next();
// });

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
