<template>

  <div data-v-7ba5bd90="" class="newsinfo-container" >
      <h3 class="title">{{newsinfo.title}}</h3>
      <p class="subtitle">
          <span>发表时间：{{newsinfo.add_time | dateFormat}}</span>
          <span>点击：{{newsinfo.click}}次</span>
      </p>
      <hr>
      <div class="content" v-html="newsinfo.content">

      </div>
      <comment-box :id="this.id"></comment-box>
  </div>

</template>

<script>
import comment from "../comment/Comment.vue"
export default {
  data() {
    return {
      id: this.$route.params.id,
      newsinfo: [],
      comments:[],
      user_name:"匿名用户",
      // add_time:"",
      content:""
    };
  },
  created() {
    var newsid=this.$route.params.id
    this.getNews(newsid)
  },
  methods: {
    getNews(id) {
      this.$http.get('api/getnew/'+id)
        .then(respons => {
          console.log(respons.body);
          this.newsinfo = respons.body.message[0];
      });
    },
  },
  components:{
    "comment-box":comment
  }
};


</script>

<style lang="scss" scoped>
  .newsinfo-container{
    padding-bottom: 50px;
  }
  .title {
    font-size: 16px;
    color: red;
    text-align: center;
    margin: 15px 0;
  }
  .newsinfo-container .subtitle span{
    font-size: 13px;
    color: #226aff;
    font-family: 'Helvetica Neue', Helvetica, sans-serif;
    line-height: 21px;
    display: inline-block;
    &:nth-child(2){
      float: right
    }
  }

 
</style>