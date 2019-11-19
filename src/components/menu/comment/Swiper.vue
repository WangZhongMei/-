<template>
  <div>
    <mt-swipe>
      <mt-swipe-item v-for="(item, index) in lunbos" :key="index">
        <img :src="item.img" :class="{'full':isfull}" />
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
  props: ["lunbos", "isfull"]
};
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 200px;
  /*.mint-swipe-item {
    &:nth-child(1) {
      background-color: red;
    }
    &:nth-child(2) {
      background-color: yellow;
    }
    &:nth-child(3) {
      background-color: blue;
    }
  }*/
  text-align: center;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>