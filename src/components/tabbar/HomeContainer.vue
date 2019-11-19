<template>
  <div id="box"> 
        <!-- <mt-swipe>
          <mt-swipe-item v-for="(item, index) in lunbos" :key="index">
            <img :src="item.img" alt="">
          </mt-swipe-item>
        </mt-swipe> -->
        <swiper :lunbos="lunbos"></swiper>

        <ul data-v-4fcacc3e="" class="mui-table-view mui-grid-view mui-grid-9">
          <li data-v-4fcacc3e="" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
            <router-link to="/home/newsList" data-v-4fcacc3e="" class="">
              <img data-v-4fcacc3e="" src="http://localhost:4000/images/15200d52-menu1.png" alt=""> 
              <div data-v-4fcacc3e="" class="mui-media-body">新闻资讯</div>
            </router-link>
          </li> 
          
          <li data-v-4fcacc3e="" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
            <router-link  to="/home/photoList" data-v-4fcacc3e="" class="">
              <img data-v-4fcacc3e="" src="http://localhost:4000/images/64e2fbce-menu2.png" alt=""> 
              <div data-v-4fcacc3e="" class="mui-media-body">图片分享</div>
            </router-link>
          </li> 
          <li data-v-4fcacc3e="" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
            <router-link to="/home/goodList" data-v-4fcacc3e="" class="">
              <img data-v-4fcacc3e="" src="http://localhost:4000/images/a99e8466-menu3.png" alt=""> 
              <div data-v-4fcacc3e="" class="mui-media-body">商品购买</div>
            </router-link>
          </li> 
          <li data-v-4fcacc3e="" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
            <a data-v-4fcacc3e="" href="#">
              <img data-v-4fcacc3e="" src="http://localhost:4000/images/64d2fcb9-menu4.png" alt=""> 
              <div data-v-4fcacc3e="" class="mui-media-body">留言反馈</div>
            </a>
          </li> 
          <li data-v-4fcacc3e="" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
            <a data-v-4fcacc3e="" href="#">
              <img data-v-4fcacc3e="" src="http://localhost:4000/images/28fc050c-menu5.png" alt=""> 
              <div data-v-4fcacc3e="" class="mui-media-body">视频专区</div>
            </a>
          </li> 
          <li data-v-4fcacc3e="" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
            <a data-v-4fcacc3e="" href="#">
              <img data-v-4fcacc3e="" src="http://localhost:4000/images/19ace747-menu6.png" alt=""> 
              <div data-v-4fcacc3e="" class="mui-media-body">联系我们</div>
            </a>
          </li>
        </ul>

    </div>
</template>

<script>
// import mui from "../../lib/mui/js/mui.js"
// $(function(){
//   //获得slider插件对象
//   var gallery = mui('.mui-slider');
//   gallery.slider({
//     interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
//   });
// })

import { Toast } from "mint-ui";
import swiper from"../menu/comment/Swiper.vue"

export default {
  data() {
    return {
      lunbos: []
    };
  },
  created() {
    this.getLunbo();
  },
  methods: {
    getLunbo() {
      this.$http.get("http://192.168.3.2:8080/api/getlunbo").then(response => {
        //console.log(response.body);
        if (response.body.status === 0) {
          this.lunbos = response.body.message;
        } else {
          Toast("数据加载失败");
        }
      });
    }
  },
  components:{
    swiper
  }
};

</script>

<style  lang="scss" scoped>
  #box ul{
    background-color: white;
  }
  #box ul li{
    border: 0px;
  }
  ul li img{
    width: 60px;
    height: 60px;
  }
  .mint-swipe {
    height: 200px;
    img{
      width:100%;
    }
  }

</style>