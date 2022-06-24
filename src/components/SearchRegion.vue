<template>
  <div class="search-box">
    <p class="title-font">오늘의 대기 상태는?</p>
    <br />
    <input
      class="search-box"
      placeholder="동면읍 검색"
      type="text"
      v-model="findArea"
      @input="typingData()"
    />
    <button class="search-button" @click="searchAreaInfo()">
      <span class="material-icons search-icon"> search </span>
    </button>
    <div class="list-box" v-if="findArea">
      <div class="show-list" v-for="(n, index) in getAddress" :key="index">
        <div class="show-list">
          <p class="" @click="selectArea(n.stationName)">
            {{ n.sidoName }} {{ n.stationName }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { fetchData } from "@/api";
export default {
  data() {
    return {
      findArea: "",
      getAddress: "",
    };
  },
  methods: {
    searchAreaInfo() {
      const airDatas = this.$store.state.airDatas;
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
      console.log("dataNum = " + dataNum);
      this.$store.dispatch("SEARCH_DATA_NUM", dataNum);
      if (this.$store.state.findAreaData) {
        this.$router.push("weather-page");
      } else {
        if (this.findArea === "") {
          alert("주소를 검색해주세요");
        } else if (this.$store.state.findAreaData === undefined) {
          alert("데이터를 찾지 못하였습니다-");
        }
      }
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
      // console.log("findArea = " + this.findArea.replace(/(\s*)/g, ""));
      // console.log(searchArea);
      if (searchArea) {
        // console.log("데이터를 찾았어요!");

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
    },
    findData(param) {
      console.log(param.sidoName);
    },
    async selectArea(stationName) {
      this.findArea = stationName;
      // console.log(this.findArea);
      await this.searchAreaInfo();
      this.getAddress = "";
    },
  },
};
</script>

<style scoped>
.list-box {
  /* border-bottom: 1px solid white; */
  display: inline-block;
  width: 85%;
  max-height: 200px;
  background-color: #caf0f8;
  margin: 0 auto;
  overflow: scroll;
  overflow-x: hidden;
  border-radius: 0 0 5px 5px;
}
.show-list {
  text-align: center;
  font-size: 40px;
  font-weight: 500;
  color: #00b4d8;
  vertical-align: middle;
}
.show-list > p {
  margin: 0;
  border-bottom: 1px solid white;
  cursor: pointer;
}
.title-font {
  color: #caf0f8;
  font-size: 50px;
  font-weight: 700;
}
.search-box {
  text-align: center;
}
.search-icon {
  color: #caf0f8;
  font-weight: 800;
}

input {
  border: none;
  width: 80%;
  height: 100px;
  font-size: 70px;
  font-weight: 700;
  text-align: center;
  background-color: #00b4d8;
  border-bottom: 5px solid#caf0f8;
  color: #caf0f8;
}

input:focus {
  outline: none;
}
.material-icons {
  font-size: 70px;
}
.search-button {
  vertical-align: middle;
}
</style>
