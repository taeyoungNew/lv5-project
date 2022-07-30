import Vue from "vue";
import Vuex from "vuex";
import {
  fetchData,
  getNowTerm,
  getShortTerm,
  treeDaysWeather,
  getTimeNow,
} from "@/api/index";

Vue.use(Vuex);
Vue.config.devtools = true;

export default new Vuex.Store({
  state: {
    defaultSerch: "전국",
    airDatas: [],
    findAreaData: "",
    mapOnWeatherDatas: "",
    nowWeatherData: "",
    shortTermData: "",
    threeDaysTem: "",
    presentTime: "",
    gridX: "",
    gridY: "",
  },
  mutations: {
    SAVE_PRE_TIME(state, param) {
      state.presentTime = param;
    },
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
    SAVE_MAP_ON_WEATHER_DATAS(state, params) {
      state.mapOnWeatherDatas = params;
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
    getPreTime(context) {
      let preTime = getTimeNow();
      context.commit("SAVE_PRE_TIME", preTime);
    },
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
      // console.log("gridXY= ", gridXY["gridX"], gridXY["gridY"]);
      context.commit("SAVE_GRIDS", gridXY);
      getNowTerm()
        .then(function (res) {
          console.log("여기 = ", res);
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
          context.commit(
            "SAVE_SHORT_WEATER_DATAS",
            res.data.response.body.items.item
          );
        })
        .catch(function (error) {
          console.log(error);
        });

      treeDaysWeather()
        .then(function (res) {
          context.commit(
            "SAVE_TREEDAYS_DATAS",
            res.data.response.body.items.item
          );
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    WEATHER_ON_MAP(context, payLoad) {
      context.commit("SAVE_MAP_ON_WEATHER_DATAS", payLoad);
    },
  },
  modules: {},
});
