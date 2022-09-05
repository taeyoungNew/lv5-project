import Vue from "vue";
import Vuex from "vuex";
import {
  fetchData,
  getNowTerm,
  getShortTerm,
  threeDaysWeather,
  getTimeNow,
} from "@/api/index";

Vue.use(Vuex);
Vue.config.devtools = true;

export default new Vuex.Store({
  // computed가 state의 값 변경에 오락가락한 이유
  // 초기값을 세팅하지 않아서 였다.
  // 따라서 nowWeatherData 등에 null값을 초기값으로 설정하였더니
  // 잘 감지한다.
  state: {
    address: "",
    defaultSerch: "전국",
    airDatas: [],
    findAreaData: "",
    mapOnWeatherDatas: "",
    nowWeatherData: "초단기실황",
    shortTerm: "초단기예보",
    threeDaysTerm: "단기예보",
    presentTime: "",
    gridX: "",
    gridY: "",
  },
  getters: {
    getNowWeather: (state) => {
      return state.nowWeatherData;
    },
  },
  mutations: {
    SAVE_SEARCH_ADDRESS(state, param) {
      state.address = param;
    },
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
      state.shortTerm = params;
    },
    SAVE_TREEDAYS_DATAS(state, params) {
      state.threeDaysTerm = params;
    },
  },
  actions: {
    GET_ADDRESS(context, param) {
      context.commit("SAVE_SEARCH_ADDRESS", param);
    },
    GET_PRE_TIME(context) {
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
    // INIT_NOW_WEATHER(context) {
    //   context.commit("SAVE_NOW_WEATHER_DATAS", "초단기실황");
    // },
    async GET_GRIDS(context, gridXY) {
      // console.log("gridXY= ", gridXY["gridX"], gridXY["gridY"]);
      context.commit("SAVE_GRIDS", gridXY);
      // 초단기실황 데이터가져오기
      await getNowTerm()
        .then(function (res) {
          // console.log("여기 = ", res);
          context.commit(
            "SAVE_NOW_WEATHER_DATAS",
            res.data.response.body.items.item
          );
        })
        .catch(function (error) {
          console.log(error);
        });
      // 초단기예보 데이터가져오기
      await getShortTerm()
        .then(function (res) {
          context.commit(
            "SAVE_SHORT_WEATER_DATAS",
            res.data.response.body.items.item
          );
        })
        .catch(function (error) {
          console.log(error);
        });
      // 단기예보 데이터 가져오기
      await threeDaysWeather()
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
  // getters: {
  //   getNowWeather: (state) => {
  //     return state.nowWeatherData;
  //   },
  // },
});
