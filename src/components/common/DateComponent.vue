<template>
  <div>
    <p class="pakatime">
      {{ date }} {{ hours | toHuman }} : {{ minutes | toHuman }} :
      {{ seconds | toHuman }}
    </p>
  </div>
</template>

<script>
export default {
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
p {
  margin: 0;
}
</style>
