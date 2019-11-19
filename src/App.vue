<template>
  <div class="container">

    <mt-header title="Vue.js实战开发"  class="mint-header is-fixed">
      <router-link to slot="left">
        <mt-button icon="back" @click="$router.back(-1)" id="backto">返回</mt-button>
      </router-link>
      <!-- <mt-button icon="more" slot="right"></mt-button> -->
    </mt-header>

    <transition>
      <router-view></router-view>
    </transition>

    <nav class="mui-bar mui-bar-tab">
      <router-link  to="/home" class="mui-tab-item-llb" >
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link  to="/member" class="mui-tab-item-llb">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link  to="/shopcar" class="mui-tab-item-llb">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge" id="badge">{{$store.getters.getAllCount}}</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link to="/search" class="mui-tab-item-llb">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
  </div>
  
</template>

<script>

export default {
  data() {
    return {
      msg: ""
    };
  },
  mounted(){
    if(this.$route.path=="/home"){
      // $("#backto").style.css("display","none");
      document.getElementById("backto").style.display="none";
    }
  },
  updated() {
    if(this.$route.path=="/home"){
      document.getElementById("backto").style.display="none";
    }else{
      document.getElementById("backto").style.display="block";
    }
  },
};
</script>

<style lang="scss" scoped>
  .container {
    padding-top: 40px;
    overflow-x: hidden;
    padding-bottom: 50px;
  }

  .v-enter{
    opacity: 0;
    transform: translateX(100%);
  }
  .v-leave-to{
    opacity: 0;
    transform: translateX(-100%);
    position: absolute;
  }
  
  .v-enter-active,
  .v-leave-active{
    transition: all 0.5s ease;
  }

.mui-bar-tab .mui-tab-item-llb.mui-active {
    color: #007aff;
}
.mui-bar-tab .mui-tab-item-llb {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
.mui-bar-tab .mui-tab-item-llb .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item-llb .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}

</style>