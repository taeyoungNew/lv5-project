<template>
  <div class="layerPopup">
    <div class="spinner">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.v-progress-circular {
  margin: 3rem;
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
