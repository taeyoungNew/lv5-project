<template>
  <div id="main">
    <div>
      <search-region class="search-com" />
    </div>
  </div>
</template>

<script>
import SearchRegion from "@/components/SearchRegion.vue";

export default {
  components: {
    SearchRegion,
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$store.dispatch("FETCH_DATAS", this.$store.state.defaultSerch);
    },
  },
};
</script>

<style scoped>
#main {
  position: relative;
}

.search-com {
  margin-top: 25%;
  width: 100%;
  height: 50vh;
}
</style>
