<template>
    <div class="photoinfo-container">
        <h3 >{{getimageInfo.title}}</h3>
        <p class="subtitle">
            <span >发表时间：{{getimageInfo.add_timee | dateFormat}}</span>
            <span >点击：{{getimageInfo.click}}次</span>
        </p>
        <hr >

        <!-- <div class="my-gallery" data-pswp-uid="1" v-for="(item, index) in getthumimages" :key="index">
            <a href="javascript:void(0)">
                <img  class="image" :src='"http://192.168.3.2:8080"+item.src'>
            </a>
        </div> -->
        
        <!-- 缩略图区域 -->
        <div class="thumbs">
            <vue-preview :slides="getthumimages" class="imgprev"></vue-preview>
        </div>

        <div class="content" v-html="getimageInfo.content"></div>
        <!-- 评论组件 -->
        <comment-box :id="this.id"></comment-box>

    </div>

</template>

<script>
// import viewer from "../../../script/viewer.min.js"
// import "../../../css/viewer.min.css"
import comment from "../comment/Comment.vue"
import Vue from "vue";
// $(function(){
//      $('.image').viewer({
//     navbar: 0
//   });
// })
export default {

  data() {
    return {
        id: this.$route.params.id,
        getthumimages:[],
        getimageInfo:[],
        rootPath: Vue.http.options.root
    };
  },
  created() {
    // var id=this.$route.params.id
    this.photoinfo();
    this.getthumbs();
  },
  methods: {
      photoinfo() {
        // console.log(id);
        this.$http.get("api/getimageInfo/"+this.id).then(response => {
            if (response.body.status === 0) {
            this.getimageInfo = response.body.message[0];
            console.log("哈哈哈哈",this.getimageInfo)
            } else {
            Toast("数据加载失败");
            }
        });
    },
    getthumbs(){
        console.log("============================")
        this.$http.get("api/getthumimages/"+this.id).then(response => {
            if (response.body.status === 0) {
                response.body.message.forEach(item => {
                item.src = this.rootPath + item.src;
                item.msrc = item.src;
                item.w = 600;
                item.h = 400;
            });
            this.getthumimages = response.body.message;
            console.log(this.getthumimages);
            } else {
                Toast("数据加载失败");
            }
        });
    }
  },
    components: {
        "comment-box": comment
    }
};
</script>

<style lang="scss" scoped>
.photoinfo-container{
    margin-bottom: 50px;
}
.photoinfo-container h3{
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
}
.subtitle{
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    margin-top: 0;
    margin-bottom: 10px;
    color: #8f8f94;
}
// .my-gallery a img{
//     margin: 10px;
//     box-shadow: 0 0 8px #999;
//     width: 100px;
//     float: left;
// }
.photoinfo-container .content{
    font-size: 13px;
    line-height: 30px;
    display: inline-block;
}

</style>
<style lang="scss">
.thumbs {
  .imgprev {
    .my-gallery {
      figure {
        display: inline-block;
        margin: 10px;
      }
      img {
        width: 95px;
        // height: 70px;
        box-shadow: 0 0 8px #999;
      }
    }
  }
}
</style>