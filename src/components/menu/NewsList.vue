<template>

<div class="box">
    <ul data-v-13ec68e6="" class="mui-table-view">
        <li data-v-13ec68e6="" class="mui-table-view-cell mui-media"  v-for="(item, index) in lunbos" :key="index">
            <router-link data-v-13ec68e6="" :to="'/home/newsinfo/'+item.id" class="">
                <img data-v-13ec68e6="" :src="item.img_url" alt="" class="mui-media-object mui-pull-left">
                <div data-v-13ec68e6="" class="mui-media-body">
                    <h1 data-v-13ec68e6="">{{item.title}}</h1> 
                    <p data-v-13ec68e6="" class="mui-ellipsis">
                        <span data-v-13ec68e6="">发表时间：{{item.add_time | dateFormat}}</span>
                        <span data-v-13ec68e6="">点击：{{item.click}}次</span>
                    </p>
                </div>
            </router-link>
        </li>
    </ul>
</div>
    
</template>
<script>
export default {
  data() {
    return {
      lunbos: []
    };
  },
  created() {
    this.getNews();
  },
  methods: {
    getNews() {
      this.$http.get("api/getnewslist").then(response => {
        //console.log(response.body);
        if (response.body.status === 0) {
          this.lunbos = response.body.message;
        } else {
          Toast("数据加载失败");
        }
      });
    }
  }
};

</script>

<style  lang="scss" scoped>
.box{
  margin-bottom: 50px;
}
    h1{
        font-size: 14px;
    }
    p span:first-child{
        float: left;
        color: #226aff;
        font-size: 12px;
    }
    p span:last-child{
        float: right;
        color: #226aff;
        font-size: 12px;
    }
</style>