<template>
  <div class="cleHeader">
    <img src="../assets/Cleveland-Guardians-icon.svg" />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";

.cleHeader {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  height: $cleHeaderHeight;
  padding: $space-1 0;
  background-color: $cleBlue;

  img {
    max-height: 100%;
  }
}
</style>
