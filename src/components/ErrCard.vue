<template>
  <v-card class="pa-3" outlined>
    <v-container>
      <v-row no-gutters>
        <v-col cols="1" xl="1.5" align-self="center" align="center">
          <font-awesome-icon
            color="red"
            font-size="32"
            class="magini-glass"
            icon="fa-solid fa-circle-exclamation"
          />
        </v-col>
        <v-col cols="">
          <v-card-title> 대한민국에서 벗어났습니다. </v-card-title>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import bus from "@/utils/bus";
export default {
  data() {
    return {
      val: "",
    };
  },
  computed: {
    checkErr() {
      return this.$store.state.allData.nowTerm;
    },
  },
  watch: {
    checkErr(param) {
      this.val = param;
      bus.$emit("end:spinner");
    },
  },
};
</script>

<style></style>
