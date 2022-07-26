<template>
  <div>
    <v-app-bar color="deep-purple accent-4" dense dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>today`s weather</v-toolbar-title>
      <date-component />
      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="n in 5" :key="n" @click="() => {}">
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
import DateComponent from "./DateComponent.vue";
export default {
  components: { DateComponent },
  data() {
    return {
      hours: "--",
      minutes: "--",
      seconds: "--",
      date: "",
      customDate: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
    };
  },
  methods: {
    activeUpdateDateTime() {
      let mycurrentDate = new Date();
      this.hours = mycurrentDate.getHours();
      this.minutes = mycurrentDate.getMinutes();
      this.seconds = mycurrentDate.getSeconds();
      this.date =
        this.sysPaddingZro(mycurrentDate.getFullYear(), 4) +
        "-" +
        this.sysPaddingZro(mycurrentDate.getMonth() + 1, 2) +
        "-" +
        this.sysPaddingZro(mycurrentDate.getDate(), 2) +
        " " +
        this.customDate[mycurrentDate.getDay()];
    },
    sysPaddingZro(lnum, mydpt) {
      let clckzro = "";
      for (let i = 0; i < mydpt; i++) {
        clckzro += "0";
      }
      return (clckzro + lnum).slice(-mydpt);
    },
  },
  created() {
    this.activeUpdateDateTime();
  },
  mounted() {
    setInterval(() => {
      this.activeUpdateDateTime();
    }, 1000);
  },
  filters: {
    toHuman: (f) => f.toString().padStart(2, "0"),
  },
};
</script>

<style scoped>
.today-date {
  position: relative;
  color: #caf0f8;
  background-color: #08a3ff;
  margin-top: 0;
  height: 100px;
  vertical-align: middle;
}
p {
  margin: 0;
  display: inline-block;
}
.date {
  font-size: 30px;
}
.pakatime {
  font-size: 3rem;
}
.title-font {
  font-size: 1.5rem;
  margin: 0 auto;
}
.search-box {
  display: inline-block;
  /* position: absolute; */
}
</style>
