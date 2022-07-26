<template>
  <v-container class="search-container">
    <div class="search-box">
      <v-row>
        <v-col>
          <v-text-field
            label="동면읍 검색"
            hide-details="auto"
            v-model="findArea"
            @input="typingData()"
            class="search-input"
          ></v-text-field>
        </v-col>
        <v-col>
          <button class="search-button search-icon" @click="searchAreaInfo()">
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
          @click="selectArea(n.stationName)"
        >
          {{ n.sidoName }} {{ n.stationName }}
        </v-card>
      </v-col>
    </div>
  </v-container>
</template>

<script>
// import { component } from "vue/types/umd";
// import { fetchData } from "@/api";
import { getCoordinate } from "@/api/index";
export default {
  data() {
    return {
      findArea: "",
      getAddress: "",
    };
  },

  methods: {
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
      this.$store.dispatch("SEARCH_DATA_NUM", dataNum);
      if (this.$store.state.findAreaData) {
        // this.$router.push("weather-page");
        // console.log("주소를 찾았어요");
      } else {
        if (this.findArea === "") {
          alert("주소를 검색해주세요");
        } else if (this.$store.state.findAreaData === undefined) {
          alert("데이터를 찾지 못하였습니다-");
        }
      }
      this.getAddress = "";
    },
    typingData() {
      const airDatas = this.$store.state.airDatas;
      for (let i = 0; i < airDatas.length; i++) {
        airDatas[i].sidoStation =
          airDatas[i].sidoName + airDatas[i].stationName;
      }
      let getAddress = [];

      const searchArea = airDatas.some(
        (val) =>
          val.sidoName.includes(this.findArea.replace(/(\s*)/g, "")) ||
          val.stationName.includes(this.findArea.replace(/(\s*)/g, "")) ||
          val.sidoStation.includes(this.findArea.replace(/(\s*)/g, ""))
      );

      if (searchArea) {
        for (let i = 0; i < airDatas.length; i++) {
          if (
            airDatas[i].sidoName.includes(
              this.findArea.replace(/(\s*)/g, "")
            ) ||
            airDatas[i].stationName.includes(
              this.findArea.replace(/(\s*)/g, "")
            ) ||
            airDatas[i].sidoStation.includes(
              this.findArea.replace(/(\s*)/g, "")
            )
          ) {
            getAddress.push({
              sidoName: airDatas[i].sidoName,
              stationName: airDatas[i].stationName,
              sidoStation: airDatas[i].sidoName + airDatas[i].stationName,
            });
            // console.log("getAddress = ", getAddress);
            this.getAddress = getAddress;
          }
        }
      } else {
        // console.log("데이터가 없습니다ㅜ");
        this.getAddress = "";
      }
      if (this.findArea === "") {
        this.getAddress = "";
      }
    },
    async selectArea(stationName) {
      // console.log(stationName);
      this.findArea = stationName;

      await this.searchAreaInfo();
      this.getAddress = "";
      getCoordinate();
    },
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
