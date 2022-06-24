import Vue from "vue";
import Vuex from "vuex";
import { fetchData } from "@/api/index";

Vue.use(Vuex);
Vue.config.devtools = true;

export default new Vuex.Store({
  state: {
    defaultSerch: "전국",
    airDatas: [],
    findAreaData: "",
    serviceKey: "",
  },
  mutations: {
    SAVE_DATAS(state, param) {
      state.airDatas = param;
    },
    SEARCH_AREA(state, param) {
      state.findAreaData = state.airDatas[param];
    },
  },
  actions: {
    FETCH_DATAS(context) {
      fetchData()
        .then(function (res) {
          console.log(res);
          const payLoad = res.data.response.body.items;
          console.log(payLoad);
          context.commit("SAVE_DATAS", payLoad);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    SEARCH_DATA_NUM(context, param) {
      context.commit("SEARCH_AREA", param);
    },
  },
  modules: {},
});
