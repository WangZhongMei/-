<template>
  <div>
      <comment-box :id="this.id"></comment-box>
  </div>
</template>

<script>
import comment from "../comment/Comment.vue"
export default {
  data() {
    return {
      id: this.$route.params.id,
    };
  },
  created() {
    
  },
  methods: {
    
  },
  components:{
    "comment-box":comment
  }
}
</script>

<style>

</style>