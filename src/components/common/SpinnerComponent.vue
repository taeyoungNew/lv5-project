<template>
  <div class="layerPopup">
    <div class="spinner">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
  </div>
</template>

<script>
export default {
  // mounted() {
  //   this.getHeight();
  // },
  // methods: {
  //   getHeight() {
  //     let height = this.$refs.containerBox;
  //     console.log("height = ", height);
  //   },
  // },
};
</script>

<style scoped>
.v-progress-circular {
  margin: 1rem;
}
.layerPopup {
  position: fixed;
  z-index: 100;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  line-height: 95vmin;
  background: rgba(255, 255, 255, 0.5);
  text-align: center;
}
</style>
