<template>
  <div data-numbox-min="1" data-numbox-step="1" class="mui-numbox">
      <button type="button" class="mui-btn mui-btn-numbox-minus" disabled="">-</button>
      <!-- <span v-for="(item, index) in goodlists" :key="index"> -->
        <input id="test" type="number" :value="initcount" class="mui-input-numbox" @change="countChanged" ref="numbox">
      <!-- </span> -->
      <button type="button" class="mui-btn mui-btn-numbox-plus">+</button>
  </div>
</template>

<script>
import mui from "../../../lib/mui/js/mui.min.js"
export default {
    data() {
    return {
      
    };
  },
  created() {
    
  },
  mounted() {
    mui('.mui-numbox').numbox()
  },
  methods: {
    countChanged(){
      this.$store.commit("updateGoodsInfo",{
        id:this.goodid,
        count:this.$refs.numbox.value
      })
    }
  },
  props: ["max","initcount","goodid"],
  watch: {
    max: function(newVal, oldVal) {
      mui(".mui-numbox")
        .numbox()
        .setOption("max", newVal);
    }
  }
}
</script>

<style>

</style>