<template>
  <v-container>
    <v-row>
      <v-col v-if="detailDatas === null">
        <v-card class="pa-3"> 지역을 검색해주세요 </v-card>
      </v-col>
      <v-row v-else no-gutters>
        <v-col class="data-box" v-for="(n, index) in detailDatas" :key="index">
          <v-card>
            <font-awesome-icon
              class="grade-icon"
              v-if="n.dataGrade === '1'"
              icon="fa-regular fa-face-grin-squint"
            >
            </font-awesome-icon>
            <font-awesome-icon
              class="grade-icon"
              v-if="n.dataGrade === '2'"
              icon="fa-regular fa-face-laugh-beam"
            />
            <font-awesome-icon
              class="grade-icon"
              v-if="n.dataGrade === '3'"
              icon="fa-regular fa-face-grin-wide"
            />
            <font-awesome-icon
              class="grade-icon"
              v-if="n.dataGrade === '4'"
              icon="fa-regular fa-face-frown"
            />
            <font-awesome-icon
              class="grade-icon"
              v-if="n.dataGrade === '5'"
              icon="fa-regular fa-face-angry-horns"
            />
            <font-awesome-icon
              class="grade-icon"
              v-if="n.dataGrade === null || n.dataGrade === ''"
              icon="fa-regular fa-face-meh"
            />

            <p class="grades-message">
              <span v-if="n.dataGrade === '1'">아주 좋음</span>
              <span v-if="n.dataGrade === '2'">좋음</span>
              <span v-if="n.dataGrade === '3'">보통</span>
              <span v-if="n.dataGrade === '4'">나쁨</span>
              <span v-if="n.dataGrade === '5'">아주 나쁨</span>
              <span v-if="n.dataGrade === null">자료 이상</span>
            </p>
            <v-card-title class="data-titles"> {{ n.name }} </v-card-title>
            <v-card-subtitle class="data-subtitles">
              {{ n.dataValue }}
              <span v-if="(n.name === '미세먼지') | (n.name === '초미세먼지')"
                >㎍/㎥</span
              >
              <span v-if="(n.name === '오존') | (n.name === '일산화탄소')"
                >ppm</span
              >
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      airDustData: null,
      sidoName: "",
      stationName: "",
      message: "",
      detailMessage: "",
      gradeValue: "",
      detailDatas: null,
      model: null,
    };
  },
  methods: {
    // showInfo() {
    //   this.gradeValue = this.airDustData.khaiGrade;
    //   console.log("airDustData = ", this.airDustData);
    //   this.sidoName = this.airDustData.sidoName;
    //   this.stationName = this.airDustData.stationName;
    //   switch (this.gradeValue) {
    //     case "1":
    //       this.message = "아주 좋음";
    //       break;
    //     case "2":
    //       this.message = "좋음";
    //       break;
    //     case "3":
    //       this.message = "보통";
    //       break;
    //     case "4":
    //       this.message = "나쁨";
    //       break;
    //     case "5":
    //       this.message = "아주 나쁨";
    //       break;
    //     case null:
    //       this.message = "자료 이상";
    //       break;
    //     default:
    //       break;
    //   }
    // },
    detailsInfo(params) {
      console.log("검색한 미세먼지: ", params);

      if (params !== "" || null) {
        this.detailDatas = [
          {
            dataValue: params.pm10Value,
            dataGrade: params.pm10Grade,
            name: "미세먼지",
          },
          {
            dataValue: params.pm25Value,
            dataGrade: params.pm25Grade,
            name: "초미세먼지",
          },
          {
            dataValue: params.o3Value,
            dataGrade: params.o3Grade,
            name: "오존",
          },
          {
            dataValue: params.coValue,
            dataGrade: params.coGrade,
            name: "일산화탄소",
          },
        ];
      }
    },
  },
  computed: {
    checkAirData() {
      console.log("val", this.$store.state.findAreaData);
      return this.$store.state.findAreaData;
    },
  },
  watch: {
    checkAirData(val) {
      this.airDustData = val;
      this.detailsInfo(val);
    },
  },
  created() {
    // this.showInfo();
    // this.detailsInfo();
  },
};
</script>

<style scoped>
.data-box {
  text-align: center;
}
.grade-icon {
  font-size: 60px;
  justify-content: center;
}
.data-titles {
  text-align: center;
  display: inline-block;
}
</style>
