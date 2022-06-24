<template>
  <div>
    <div class="icon-box">
      <div class="address-font">
        <p>{{ sidoName }} {{ stationName }}</p>
      </div>

      <font-awesome-icon
        v-if="gradeValue === '1'"
        class="grade-face"
        icon="fa-regular fa-face-grin-squint"
      />
      <font-awesome-icon
        v-if="gradeValue === '2'"
        class="grade-face"
        icon="fa-regular fa-face-laugh-beam"
      />
      <font-awesome-icon
        v-if="gradeValue === '3'"
        class="grade-face"
        icon="fa-regular fa-face-grin-wide"
      />
      <font-awesome-icon
        v-if="gradeValue === '4'"
        class="grade-face"
        icon="fa-regular fa-face-frown"
      />
      <font-awesome-icon
        v-if="gradeValue === '5'"
        class="grade-face"
        icon="fa-regular fa-face-angry-horns"
      />
    </div>
    <p class="khai-grade">전체 대기질</p>
    <div class="grade-message">
      <p>{{ message }}</p>
    </div>
    <div class="icon-list-box">
      <div v-for="(n, index) in detailDatas" :key="index">
        <div class="data-list">
          <v-card class="mx-auto" style="background-color: #00b4d8" width="300">
            <div class="data-icons">
              <font-awesome-icon
                v-if="n.dataGrade === '1'"
                icon="fa-regular fa-face-grin-squint"
              >
              </font-awesome-icon>
              <font-awesome-icon
                v-if="n.dataGrade === '2'"
                icon="fa-regular fa-face-laugh-beam"
              />
              <font-awesome-icon
                v-if="n.dataGrade === '3'"
                icon="fa-regular fa-face-grin-wide"
              />
              <font-awesome-icon
                v-if="n.dataGrade === '4'"
                icon="fa-regular fa-face-frown"
              />
              <font-awesome-icon
                v-if="gradeValue === '5'"
                class="grade-face"
                icon="fa-regular fa-face-angry-horns"
              />
            </div>
            <p class="grades-message">
              <span v-if="n.dataGrade === '1'">아주 좋음</span>
              <span v-if="n.dataGrade === '2'">좋음</span>
              <span v-if="n.dataGrade === '3'">보통</span>
              <span v-if="n.dataGrade === '4'">나쁨</span>
              <span v-if="n.dataGrade === '4'">아주 나쁨</span>
            </p>
            <v-card-title class="data-titles"> {{ n.name }} </v-card-title>
            <v-card-subtitle class="data-subtitles" style="color: #caf0f8">
              {{ n.dataValue }}
              <span v-if="(n.name === '미세먼지') | (n.name === '초미세먼지')"
                >㎍/㎥</span
              >
              <span v-if="(n.name === '오존') | (n.name === '일산화탄소')"
                >ppm</span
              >
            </v-card-subtitle>
          </v-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      airDustData: this.$store.state.findAreaData,
      sidoName: "",
      stationName: "",
      message: "",
      detailMessage: "",
      gradeValue: "",
      detailDatas: "",
      model: null,
    };
  },
  methods: {
    showInfo() {
      this.gradeValue = this.airDustData.khaiGrade;
      console.log("airDustData = ", this.airDustData);
      this.sidoName = this.airDustData.sidoName;
      this.stationName = this.airDustData.stationName;
      switch (this.gradeValue) {
        case "1":
          this.message = "아주 좋음";
          break;
        case "2":
          this.message = "좋음";
          break;
        case "3":
          this.message = "보통";
          break;
        case "4":
          this.message = "나쁨";
          break;
        case "5":
          this.message = "아주 나쁨";
          break;

        default:
          break;
      }
    },
    detailsInfo() {
      console.log("미세먼지");
      // console.log("airDustData=" + this.airDustData.pm10Value);
      this.detailDatas = [
        {
          dataValue: this.airDustData.pm10Value,
          dataGrade: this.airDustData.pm10Grade,
          name: "미세먼지",
        },
        {
          dataValue: this.airDustData.pm25Value,
          dataGrade: this.airDustData.pm25Grade,
          name: "초미세먼지",
        },
        {
          dataValue: this.airDustData.o3Value,
          dataGrade: this.airDustData.o3Grade,
          name: "오존",
        },
        {
          dataValue: this.airDustData.coValue,
          dataGrade: this.airDustData.coGrade,
          name: "일산화탄소",
        },
      ];
    },
  },
  created() {
    this.showInfo();
    this.detailsInfo();
  },
};
</script>

<style scoped>
.air-icon {
  display: inline-block;
  font-size: 150px;
}
.khai-grade {
  margin: 0 auto;
  color: #caf0f8;
  font-size: 60px;
  font-weight: 800;
  text-align: center;
}
.icon-list-box {
  display: flex;
  justify-content: space-around;
  min-width: 100%;
}
.address-font {
  color: #caf0f8;
  font-size: 35px;
  font-weight: 600;
}
.data-list {
  font-size: 200px;
  border-radius: 10px;
  background-color: #caf0f8;
}
.icon-card {
  background-color: #caf0f8;
}
.data-icons {
  text-align: center;
  color: #caf0f8;
}
.grades-message {
  margin: 0;
  color: #caf0f8;
  font-weight: 700;
  font-size: 40px;
  text-align: center;
}
.data-titles {
  color: #caf0f8;
  font-size: 30px;
  font-weight: 800;
}
.data-subtitles {
  font-size: 25px;
  font-weight: 800;
}
.icon-box {
  display: flex;
  justify-content: center;
  width: 900px;
  height: 800px;
  margin: 0 auto;
  margin-top: 20px;
  border-radius: 15px;
  vertical-align: middle;
  position: relative;
}
.grade-face {
  font-size: 700px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: #caf0f8;
}
.grade-message {
  text-align: center;
  color: #caf0f8;
  font-size: 70px;
  font-weight: 600;
}
.air-ifons {
  display: flex;
}
.detail-data {
  position: absolute;
  font-size: 150px;
  color: #90caf9;
  left: 23%;
  top: 5%;
}
</style>
