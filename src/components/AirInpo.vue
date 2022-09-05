<template>
  <v-container>
    <v-row>
      <v-row v-if="detailDatas === null" no-gutters>
        <v-col>
          <v-card class="pa-3" outlined> 지역을 검색해주세요 </v-card>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col class="data-box" v-for="(n, index) in detailDatas" :key="index">
          <v-card class="pt-3" outlined>
            <font-awesome-icon
              class="grade-icon"
              color="#bdc3c7"
              v-if="n.dataGrade === '1' && n.dataValue !== '-'"
              icon="fa-regular fa-face-grin-squint"
            >
            </font-awesome-icon>
            <font-awesome-icon
              class="grade-icon"
              color="#bdc3c7"
              v-if="n.dataGrade === '2' && n.dataValue !== '-'"
              icon="fa-regular fa-face-laugh-beam"
            />
            <font-awesome-icon
              class="grade-icon"
              color="#bdc3c7"
              v-if="n.dataGrade === '3' && n.dataValue !== '-'"
              icon="fa-regular fa-face-grin-wide"
            />
            <font-awesome-icon
              class="grade-icon"
              color="#bdc3c7"
              v-if="n.dataGrade === '4' && n.dataValue !== '-'"
              icon="fa-regular fa-face-frown"
            />
            <font-awesome-icon
              class="grade-icon"
              color="#bdc3c7"
              v-if="n.dataGrade === '5' && n.dataValue !== '-'"
              icon="fa-regular fa-face-angry-horns"
            />
            <font-awesome-icon
              class="grade-icon"
              color="#bdc3c7"
              v-if="n.dataGrade === null || n.dataValue === '-'"
              icon="fa-regular fa-face-meh"
            />

            <p class="grades-message">
              <span v-if="n.dataGrade === '1' && n.dataValue !== '-'"
                >아주 좋음</span
              >
              <span v-if="n.dataGrade === '2' && n.dataValue !== '-'"
                >좋음</span
              >
              <span v-if="n.dataGrade === '3' && n.dataValue !== '-'"
                >보통</span
              >
              <span v-if="n.dataGrade === '4' && n.dataValue !== '-'"
                >나쁨</span
              >
              <span v-if="n.dataGrade === '5' && n.dataValue !== '-'"
                >아주 나쁨</span
              >
              <span v-if="n.dataGrade === null || n.dataValue === '-'"
                >자료 이상</span
              >
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
    detailsInfo(params) {
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
      return this.$store.state.findAreaData;
    },
  },
  watch: {
    async checkAirData(val) {
      try {
        await this.detailsInfo(val);
      } catch (error) {
        console.log(error);
      }
    },
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
.grades-message {
  padding-top: 10px;
  margin-bottom: 0;
}
</style>
