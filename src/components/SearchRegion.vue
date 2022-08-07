<template>
  <v-container class="search-container">
    <div class="search-box">
      <v-row>
        <v-col>
          <v-text-field
            id="keyword"
            v-model="findArea"
            label="주소 검색"
            hide-details="auto"
            class="search-input"
            @keyup.enter="searchPlase()"
          ></v-text-field>
        </v-col>
        <v-col>
          <button class="search-button search-icon" @click="searchPlase()">
            <span class="material-icons search-icon"> search </span>
          </button>
        </v-col>
      </v-row>

      <v-col cols="100%" class="list-box">
        <v-card
          class="pa-3 list-card"
          v-for="(n, index) in getAddress"
          :key="index"
          outlined
          @click="selectArea(n)"
        >
          {{ n }}
        </v-card>
      </v-col>
      <v-col>
        <v-card id="pagination"> </v-card>
      </v-col>
    </div>
  </v-container>
</template>

<script>
import { getCoordinate } from "@/api/index";

export default {
  emits: ["stationName"],
  data() {
    return {
      findArea: "",
      getAddress: [],
      map: "",
      ps: "",
    };
  },
  methods: {
    searchPlase() {
      this.getAddress = [];
      /* global kakao */
      let ps = new kakao.maps.services.Places();
      let keyword = document.getElementById("keyword").value;

      if (!keyword.replace(/^\s+|\s+$/g, "")) {
        alert("키워드를 입력해주세요!");
        return false;
      }
      ps.keywordSearch(keyword, this.placesSearchCB);
      this.findArea = "";
    },

    placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        this.displayPlaces(data);
        // 중복되는 주소를 없애기
      }
      console.log("pagination = ", pagination);
    },
    displayPlaces(places) {
      let getAddress = [];
      for (let i = 0; i < places.length; i++) {
        this.getAddress.push(places[i].address_name);
      }
      getAddress = this.getAddress.filter((el, index) => {
        return this.getAddress.indexOf(el) === index;
      });

      this.getAddress = getAddress;
    },
    selectArea(addressName) {
      this.getAddress = [];
      this.$emit("addressName", addressName);
      getCoordinate(addressName);
    },

    searchAreaInfo() {
      let airDatas = this.$store.state.airDatas;
      for (let i = 0; i < airDatas.length; i++) {
        airDatas[i].sidoStation =
          airDatas[i].sidoName + airDatas[i].stationName;
      }

      const dataNum = airDatas.findIndex(
        (x) =>
          x.sidoName === this.findArea.replace(/(\s*)/g, "") ||
          x.stationName === this.findArea.replace(/(\s*)/g, "") ||
          x.sidoStation === this.findArea.replace(/(\s*)/g, "")
      );
      console.log("주소찾기");
      this.$store.dispatch("SEARCH_DATA_NUM", dataNum);
      if (this.$store.state.findAreaData) {
        // this.$router.push("weather-page");
        console.log("주소를 찾았어요");
      } else {
        if (this.findArea === "") {
          alert("주소를 검색해주세요");
        } else if (this.$store.state.findAreaData === undefined) {
          alert("데이터를 찾지 못하였습니다-");
        }
      }
    },
    typingData() {
      // const airDatas = this.$store.state.airDatas;
      // for (let i = 0; i < airDatas.length; i++) {
      //   airDatas[i].sidoStation =
      //     airDatas[i].sidoName + airDatas[i].stationName;
      // }
      // let getAddress = [];
      // const searchArea = airDatas.some(
      //   (val) =>
      //     val.sidoName.includes(this.findArea.replace(/(\s*)/g, "")) ||
      //     val.stationName.includes(this.findArea.replace(/(\s*)/g, "")) ||
      //     val.sidoStation.includes(this.findArea.replace(/(\s*)/g, ""))
      // );
      // if (searchArea) {
      //   for (let i = 0; i < airDatas.length; i++) {
      //     if (
      //       airDatas[i].sidoName.includes(
      //         this.findArea.replace(/(\s*)/g, "")
      //       ) ||
      //       airDatas[i].stationName.includes(
      //         this.findArea.replace(/(\s*)/g, "")
      //       ) ||
      //       airDatas[i].sidoStation.includes(
      //         this.findArea.replace(/(\s*)/g, "")
      //       )
      //     ) {
      //       getAddress.push({
      //         sidoName: airDatas[i].sidoName,
      //         stationName: airDatas[i].stationName,
      //         sidoStation: airDatas[i].sidoName + airDatas[i].stationName,
      //       });
      //       // console.log("getAddress = ", getAddress);
      //       this.getAddress = getAddress;
      //     }
      //   }
      // } else {
      //   // console.log("데이터가 없습니다ㅜ");
      //   this.getAddress = "";
      // }
      // if (this.findArea === "") {
      //   this.getAddress = "";
      // }
    },
    // computed: {
    //   checkTextBox() {
    //     return this.getAddress;
    //   },
    // },
    // watch: {
    //   checkTextBox(val) {
    //     console.log(val);
    //   },
    // },
  },
};
</script>

<style scoped>
.search-input {
  flex-grow: 1;
}
.search-icon {
  flex-grow: 0;
}
.list-card {
  z-index: 100;
}
.list-box {
  max-height: 200px;
  /* border-radius: 0 0 5px 5px; */
  overflow: scroll;
}
.list-box::-webkit-scrollbar {
  display: none;
}

.search-icon {
  color: #caf0f8;
  font-weight: 400;
}

/* input {
  border: none;
  border-radius: 10px;
  width: 300px;
  height: 40px;
  font-size: 30px;
  font-weight: 700;
  text-align: center;
  background-color: #00b4d8;
  color: #caf0f8;
}

input:focus {
  outline: none;
} */
.material-icons {
  font-size: 40px;
}
.search-button {
  vertical-align: middle;
}
</style>
