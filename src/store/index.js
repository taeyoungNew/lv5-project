import Vue from "vue";
import Vuex from "vuex";
import {
  fetchData,
  getNowTerm,
  getShortTerm,
  treeDaysWeather,
} from "@/api/index";

Vue.use(Vuex);
Vue.config.devtools = true;

export default new Vuex.Store({
  state: {
    defaultSerch: "전국",
    airDatas: [],
    nowWeatherData: "",
    shortTermData: "",
    threeDaysTem: "",
    findAreaData: "",
    serviceKey: "",
    gridX: "",
    gridY: "",
  },
  mutations: {
    SAVE_DATAS(state, param) {
      state.airDatas = param;
    },
    SEARCH_AREA(state, param) {
      state.findAreaData = state.airDatas[param];
    },
    SAVE_GRIDS(state, gridXY) {
      state.gridX = gridXY["gridX"];
      state.gridY = gridXY["gridY"];
    },
    SAVE_NOW_WEATHER_DATAS(state, params) {
      state.nowWeatherData = params;
    },
    SAVE_SHORT_WEATER_DATAS(state, params) {
      state.shortTermData = params;
    },
    SAVE_TREEDAYS_DATAS(state, params) {
      state.threeDaysTem = params;
    },
  },
  actions: {
    FETCH_DATAS(context) {
      fetchData()
        .then(function (res) {
          const payLoad = res.data.response.body.items;

          context.commit("SAVE_DATAS", payLoad);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    SEARCH_DATA_NUM(context, param) {
      context.commit("SEARCH_AREA", param);
    },

    GET_GRIDS(context, gridXY) {
      console.log("gridXY= ", gridXY["gridX"], gridXY["gridY"]);
      context.commit("SAVE_GRIDS", gridXY);
      getNowTerm()
        .then(function (res) {
          // console.log(res);
          context.commit(
            "SAVE_NOW_WEATHER_DATAS",
            res.data.response.body.items.item
          );
        })
        .catch(function (error) {
          console.log(error);
        });

      getShortTerm()
        .then(function (res) {
          console.log(res);
        })
        .catch(function (error) {
          console.log(error);
        });

      treeDaysWeather()
        .then(function (res) {
          // console.log("treeDaysWeather", res.data.response.body.items.item);
          context.commit(
            "SAVE_TREEDAYS_DATAS",
            res.data.response.body.items.item
          );
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  modules: {},
});
