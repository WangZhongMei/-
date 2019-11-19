<template>
  <div class="newsinfo-container">
      <!-- src="http://192.168.3.2:8080/upload/201504/20/thumb_201504200046589514.jpg" -->
        <!-- <mt-swipe>
          <mt-swipe-item v-for="(item, index) in lunbos" :key="index">
            <img :src='"http://192.168.3.2:8080"+item.src' alt="">
          </mt-swipe-item>
        </mt-swipe> -->
        <div class="mui-card">
          <div class="mui-card-content">
            <div class="mui-card-content-inner">
              <swiper :lunbos="lunbotu"></swiper>
            </div>
          </div>
        </div>
        
        <div class="mui-card">
            <div class="mui-card-header">{{getgoods.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">市场价：
                        <del>￥{{getgoods.market_price}}</del>&nbsp;&nbsp;销售价：
                        <span class="now_price">￥{{getgoods.sell_price}}</span>
                    </p>

                    <span>购买数量：</span>

                    <!-- numbox -->
                    <numbox @getcount="getSelectedCount" :max="getgoods.stock_quantity"></numbox>

                    <p>
                        <button class="mint-button mint-button--primary mint-button--small">
                        <label class="mint-button-text">立即购买</label></button>
                        <button class="mint-button mint-button--danger mint-button--small" v-on:click="increase">
                          <label class="mint-button-text">加入购物车</label>
                        </button>
                        
                    </p>
                </div>
            </div>
        </div>
        <!-- 小球 -->
        <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
          <div class="ball" v-show="flag" ref="ball"></div>
        </transition>

        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                <p>商品货号：{{getgoods.goods_no}}</p>
                <p>库存情况：{{getgoods.stock_quantity}}件</p>
                <p>上架时间：{{getgoods.add_time}}</p></div>
            </div>
            <div class="mui-card-footer">
                <router-link :to="'/home/goodDesc/'+getgoods.id" class="">
                    <button class="mint-button mint-button--primary mint-button--large is-plain">
                        <label class="mint-button-text">图文介绍</label>
                    </button>
                </router-link>
                <router-link :to="'/home/goodComment/'+getgoods.id" class="">
                  <button class="mint-button mint-button--danger mint-button--large is-plain">
                      <label class="mint-button-text">商品评论</label>
                  </button>
                </router-link>
            </div>
        </div>



  </div>
</template>

<script>
import { Toast } from "mint-ui";
import swiper from"../comment/Swiper.vue"
import Vue from "vue";
import numbox from "../comment/GoodInfo_Numbox.vue"
export default {

  data() {
    return {
      id:this.$route.params.id,
      getgoods:[],
      lunbotu: [],
      rootPath: Vue.http.options.root,
      selectedCount: 1,
      flag: false,
      // count:0,
    };
  },
  created() {
    this.getGoods()
    this.getLunbo();
  },
  methods: {
      getLunbo() {
      this.$http.get("api/getthumimages/"+this.id).then(response => {
        //console.log(response.body);
        if (response.body.status === 0) {
          response.body.message.forEach(item => {
            item.src = this.rootPath + item.src;
            item.img = item.src;
          });
          this.lunbotu = response.body.message;
        } else {
          Toast("数据加载失败");
        }
      });
    },
    getGoods() {
        this.$http.get('api/goods/getinfo/'+this.id).then(respons => {
            console.log("-------------------------------");
            this.getgoods = respons.body.message[0];
            // console.log(this.getgoods);
        });
      
    },
    getSelectedCount(count) {
      this.selectedCount = count;
      console.log("子组件中传递过来的数据" + this.selectedCount);
    },
    beforeEnter(el) {
        el.style.transform = "translate(0,0)"
    },
    enter(el, done) {
        el.offsetTop;

        var ballPosition = this.$refs.ball.getBoundingClientRect();
        var badgePosition = document.getElementById("badge").getBoundingClientRect();

        var xDist = badgePosition.left - ballPosition.left;
        var yDist = badgePosition.top - ballPosition.top;

        // el.style.transform = "translate(467px,195px)"
        el.style.transform = `translate(${xDist}px,${yDist}px)`;
        el.style.transition = "all 0.5s ease-out";

        //触发afterEnter函数的执行
        done()
    },
    afterEnter(el) {
        // console.log("afterEnter is called")
        this.flag=!this.flag
    },
    // [{id: "88", count: 6, price: 5780, selected: true}]
    increase(){
      this.flag=!this.flag;
      var goodinfo = {
        id: this.id,
        count: this.selectedCount,
        price: this.getgoods.sell_price,
        selected: true
      };
       this.$store.commit("addToCar",goodinfo);
    //   console.log($("#test").val());
    //   this.value=$("#test").val();
    //   this.count+=Number(this.value);
    //   // var comment = { user: this.user, content: this.content }
    //   var goodobj={"id":this.id,"count":this.count}
    //   //取出原先localstorage中的数据
    //   let goodlists = JSON.parse(localStorage.getItem("goodlists") || "[]")
    //   //将评论的数据放入到comments数组中
    //   goodlists.unshift(goodobj);
    //   // goodlists=goodlists.concat(goodlists);
    //   let hash = {};
    //     goodlists =goodlists.reduce((preVal, curVal) => {
    //       hash[curVal.id] ? '' : hash[curVal.id] = true && preVal.push(curVal);
    //       return preVal
    //     }, [])
      
    //   //将内存中的comments 保存到localStorage
    //   localStorage.setItem("goodlists", JSON.stringify(goodlists))


    }
  },
  components: {
    swiper,
    numbox
  }
};


</script>

<style lang="scss" scoped>
.ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    z-index: 5000;
    top:342px;
    left: 151px;
}

.newsinfo-container{
    position: relative;
    margin-bottom: 50px;
    
}
.mint-swipe {
    height: 200px;
    text-align: center;
    img{
      height:100%;
      
    }
  }
  .mui-numbox{
      margin-bottom: 10px;
  }
  .now_price{
      color: red;
      font-size: 16px;
      font-weight: bold;
  }
  .mui-card-footer{
    display: block;
    color: #6d6d72;
    border-radius: 0 0 2px 2px;
    position: relative;
    min-height: 44px;
    padding: 10px 15px;
  }
  .mui-card-footer button{
      margin: 15px 0;
  }
  .mint-button ::after{
    background-color: #000;
    content: " ";
    opacity: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    position: absolute;
}
</style>