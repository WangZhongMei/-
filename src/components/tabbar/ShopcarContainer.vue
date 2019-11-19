<template>
  <div class="box">
      
    <div class="goods-list">
      <div class="mui-card">
        <div class="mui-card-content" >
          <div class="mui-card-content-inner" v-for="(item, index) in shopcarlist" :key="index">
            <!-- switch -->
            <div class="switch" @change="changestate(item.id,$store.getters.changeGoodState[item.id])" >
              <mt-switch v-model="$store.getters.changeGoodState[item.id]"></mt-switch>
            </div>

            <img :src='rootPath+item.thumb_path'>
            <div class="info">
              <h1>{{item.title}}</h1>
              <div>
                <span class="price">￥{{item.sell_price}}</span>
                
                <!-- numbox -->
                <numbox :initcount="$store.getters.getGoodCount[item.id]" :goodid="item.id"></numbox>

                <a href="javascript:void(0)" @click="del(item.id,item.index)">删除</a></div>
            </div>
          </div>
        </div>
      </div>
    </div>



      <div class="mui-card mui-card-content mui-card-content-inner jiesuan">
          <div class="left">
            <p>总计1000</p>
            <p>已勾选商品
              <span class="red">{{$store.getters.changeMoney.allcount}}</span>件，总价
              <span class="red">￥{{$store.getters.changeMoney.allprice}}</span>
            </p>
          </div>
          <div class="right"> 
              <button class="mint-button mint-button--danger mint-button--normal">
                <label class="mint-button-text">去结算</label>
              </button>
          </div>
          
      </div>
  </div>
</template>

<script>
import Vue from 'vue'
import mui from "../../lib/mui/js/mui.min.js"
import numbox from "../menu/comment/Shopcar_Numbox.vue"
export default {
  data() {
    return {
      shopcarlist:[],
      rootPath: Vue.http.options.root,
      
    };
  },
  created() {
    this.getshopcarlist()
  },
  mounted() {
    mui('.mui-switch')['switch']();
  },
  methods: {
    getshopcarlist() {
      let goodlists = JSON.parse(localStorage.getItem("car") || "[]");
      // console.log(goodlists);
      var str="";
      for (var key in goodlists) {
        str+=goodlists[key].id+",";
      }
      var str=str.slice(0,str.length-1);
      // console.log(str);
      // api/goods/getshopcarlist/87,88,89
      this.$http.get("api/goods/getshopcarlist/"+str).then(response => {
        //console.log(response.body);
        if (response.body.status === 0) {
          this.shopcarlist = response.body.message;
          // console.log(this.shopcarlist);
        } else {
          console.log("数据加载失败");
        }
      });
    },
    del(id,index){
      this.shopcarlist.splice(index,1);
      this.$store.commit("removeGoodsInfo",id);
    },
    changestate(id,bool){
      this.$store.commit("setSelected",{id,selected:bool});
    }
  },
  components: {
    numbox
  }
}
</script>

<style lang="scss" scoped>
.jiesuan{
  margin-top: 15px;
}


.box div{
  &:nth-child(1) div{
    // display: inline-block;
    .switch{
      float: left;
      // display: inline;
      width: 55px;
      margin-right: 10px;
    }
    .mui-card-content-inner img{
        width: 60px;
    }
    .info{
      display: inline-block;
      h1{
        font-size: 13px;
        line-height: 1;
        margin-top: 5px;
        margin-bottom: 5px;
      }
      div{
        font-size: 16px;
        span{
          color: red;
          font-weight: bold;
        }
        a{
          color: #007aff;
        }
      }

    }
  
  }

  &:nth-child(2){
  .left{
    height: 50px;
    width: 60%;
    float: left;
    .red{
      color: red;
      font-weight: bold;
      font-size: 16px;
    }
  }
  .right{
    height: 50px;
    width: 40%;
    float: left;
      button{
        margin-top: 2%;
        float: right;
      }
  }
  
}
}

</style>