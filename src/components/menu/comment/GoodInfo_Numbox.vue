<template>
  <div data-numbox-min="1" data-numbox-step="1" class="mui-numbox">
      <button type="button" class="mui-btn mui-btn-numbox-minus" disabled="">-</button>
        <input id="test" type="number" value="1" class="mui-input-numbox" @change="countChanged" ref="numbox">
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
      // this.goodlists = JSON.parse(localStorage.getItem("goodlists") || "[]");
      // console.log(this.goodlists);
      this.$emit("getcount",parseInt(this.$refs.numbox.value))
    }
  },
  props: ["max"],
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