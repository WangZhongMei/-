<template>
  <div  class="box">
<!-- +item.img_url+item.title+item.add_time+item.market_price+item.sell_price+item.stock_quantity -->
    <div class="goods-item"  v-for="(item, index) in getgoods" :key="index">
        <router-link data-v-13ec68e6="" :to="'/home/goodinfo/'+item.id" class="">
          <img :src="item.img_url" alt="">
          <h1 class="title">{{item.title}}</h1>
          <div class="info">
              <p class="price">
                  <span class="now">￥{{item.market_price}}</span>
                  <span class="old">￥{{item.market_price}}</span>
              </p>
              <p class="sell">
                  <span>热卖中</span>
                  <span>剩{{item.stock_quantity}}件</span>
              </p>
          </div>
        </router-link>
    </div>
    <button class="mint-button mint-button--danger mint-button--large" @click="getMore">
      <label class="mint-button-text">加载更多</label>
    </button>

  </div>
</template>

<script>
export default {
  data() {
    return {
      pageIndex: 1,
      getgoods: [],
    };
  },
  created() {
    this.getNews()
  },
  methods: {
    getNews() {
      this.$http.get('api/getgoods?pageindex='+this.pageIndex)
        .then(respons => {
        console.log("-------------------------------");
          console.log(respons.body);
          this.getgoods = this.getgoods.concat(respons.body.message);
          console.log(this.getgoods);
      });
      
    }, 
    getMore(){
        this.pageIndex++;
        this.getNews();
    },
  }
}
</script>

<style   lang="scss" scoped>
.box{
  margin-bottom:51px;
}
.goods-item{
    float: left;
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 4px 0;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 293px;
    box-sizing: border-box;
}
.goods-item img{
    width: 100%;
}
.goods-item .title{
    font-weight: bold;
    font-size: 15px;
}
.price{
  line-height: 21px;
  margin-bottom: 0px;
  padding: 5px;
}
.price span{
    &:first-child{
        color: red;
        font-weight: bold;
        font-size: 16px;
    }
    &:last-child{
        text-decoration: line-through;
        font-size: 12px;
        margin-left: 10px;
    }
}
.sell{
    margin-bottom: 0px;
    padding: 5px;
    line-height: 21px;
    font-size: 13px;
    display: flex;
    justify-content: space-between;
}

</style>