<template>
  <div id="box">

    <div id="slider" class="mui-slider">
        <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
            <div class="mui-scroll" style="transform: translate3d(0px, 0px, 0px) translateZ(0px);" >
                <!-- <a class="mui-control-item mui-active" @click="getimages">全部</a>
                <span v-for="(item,index) in lunbos" :key=index >
                  <a class="mui-control-item"  @click="point(item.id)">{{item.title}}</a>
                </span> -->
                <!-- <a v-for="item in lunbos" @click="point(item.id)" :key=item.id :class="['mui-control-item',item.id==0?'mui-active':'']">{{item.title}}</a> -->
                <a v-for="item in lunbos" @click="getimages(item.id)" :key=item.id :class="['mui-control-item',item.id==0?'mui-active':'']">{{item.title}}</a>
            </div>
        </div>
    </div>

    
      <ul class="photo-list" >
          <li class=""  v-for="(item, index) in images" :key="index">
            <router-link :to="'/home/photoinfo/'+item.id" class="">
              <!-- <img :src='"http://192.168.3.2:8080"+item.img_url'> -->
              <img v-lazy="rootPath+item.img_url" />
              <div class="info">
                <h1 class="info-title">{{item.title}}</h1>
                <div class="info-body">{{item.zhaiyao}}</div>
              </div>
            </router-link>
          </li>
      </ul>
    

  </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.min.js"
import { Toast } from "mint-ui";
import Vue from 'vue'

export default {
  data() {
    return {
      lunbos: [],
      images:[],
      rootPath: Vue.http.options.root
    };
  },
  created() {
    this.getimgcategory();
    this.getimages(0);
  },
  mounted() {
    mui('.mui-scroll-wrapper').scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    getimages(cateId){
        // console.log("哈哈哈哈",this.lunbos.length);
        // for (let i = 0; i < this.lunbos.length; i++) {
          // console.log(this.lunbos[i].id);
          this.$http.get("api/getimages/"+cateId).then(response => {
            //console.log(response.body);
            if (response.body.status === 0) {
              // this.images =this.images.concat( response.body.message);
              this.images =response.body.message;

              // console.log(this.lunbos[i].id,this.images);
            } else {
              Toast("数据加载失败");
            }
          });

        // }
      
    },
    // point(id){
    //   // console.log(id);
    //   this.$http.get("api/getimages/"+id).then(response => {
    //     //console.log(response.body);
    //     if (response.body.status === 0) {
    //       this.images = response.body.message;
    //       // console.log(this.images);
    //     } else {
    //       Toast("数据加载失败");
    //     }
    //   });
    // },
    getimgcategory() {
      // this.point(0);
      this.$http.get("api/getimgcategory").then(response => {
        //console.log(response.body);
        if (response.body.status === 0) {
          response.body.message.unshift({"title":"全部","id":0});
          this.lunbos = response.body.message;
        } else {
          Toast("数据加载失败");
        }
      });
      
      //  for (let i = 14; i < 25; i++) {
      //     console.log(this.lunbos.length);
      //     this.$http.get("api/getimages/"+i).then(response => {
      //       //console.log(response.body);
      //       if (response.body.status === 0) {
      //         this.images =this.images.concat( response.body.message);
      //         // console.log(this.lunbos[i].id,this.images);
      //       } else {
      //         Toast("数据加载失败");
      //       }
      //     });

      //   } 
    }
    
  }
};


</script>

<style  lang="scss" scoped>
*{
  touch-action: pan-x;
}
.photo-list li img[lazy="loading"] {
  width: 40px;
  height: 300px;
  margin: auto;
}
.photo-list {
  padding:0px 10px 10px 10px;
  margin:0px;
}
.photo-list li{
  text-align: center;
  list-style:none;
  position:relative;
  background-color: #cacaca;
  box-shadow:0px -2px 9px #7c7c7c;
  margin-bottom: 12px;
}
.photo-list img{
  width: 100%;
  // margin-bottom: 10px;
}

.photo-list .info{
  position:absolute;
  bottom:4px;
  color: white;
  text-align: left;
  background-color: rgba(0, 0, 0, 0.4);
  max-height: 84px;
}
.photo-list .info h1{
  font-family: 'Helvetica Neue', Helvetica, sans-serif;
  font-size: 14px;
  // line-height: 21px;
}
.photo-list .info div{
  font-family: 'Helvetica Neue', Helvetica, sans-serif;
  font-size: 12px;
}
</style>