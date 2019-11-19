
//通过这种方式导入的是 运行时版本
import Vue from 'vue'

import Vuex from "vuex"
Vue.use(Vuex)
var car=JSON.parse(localStorage.getItem("car")||'[]');
var store =new Vuex.Store({
    state:{
        car:car
    },
    mutations:{
        addToCar(state,goodinfo){
            var flag=false
            state.car.some(item=>{
                if(item.id==goodinfo.id){
                    item.count+=parseInt(goodinfo.count);
                    flag=true;
                    return true;
                }
            })

            if(!flag){
                state.car.push(goodinfo)
            }

            localStorage.setItem("car",JSON.stringify(state.car));
        },
        updateGoodsInfo(state,goodinfo){
            state.car.some(item=>{
                if(item.id==goodinfo.id){
                    item.count=parseInt(goodinfo.count)
                    return true
                }
            })
            localStorage.setItem("car", JSON.stringify(state.car))
        },
        removeGoodsInfo(state,id){
            state.car.some((item,i)=>{
                if(item.id==id){
                    state.car.splice(i,1)
                    return true
                }
            })
            localStorage.setItem("car", JSON.stringify(state.car))
        },
        setSelected(state,oo){
            state.car.some(item=>{
                if(item.id==oo.id){
                    item.selected=oo.selected
                    return true
                }
            })
            localStorage.setItem("car", JSON.stringify(state.car))
        }
    },
    getters:{
        getAllCount(state){
            var count=0;
            state.car.forEach(item=>{
                count+=item.count;
            })
            return count;
        },
        getGoodCount(state){
            var obj={};
            state.car.forEach(item=>{
                obj[item.id]=item.count;
            })
            return obj;
        },
        changeGoodState(state){
            var o={};
            state.car.forEach(item=>{
                o[item.id]=item.selected;
            })
            return o;
        },
        changeMoney(state){
            var ooo={
                allcount:0,
                allprice:0
            };
            state.car.forEach(item=>{
                if(item.selected==true){
                    ooo.allcount+=item.count;
                    ooo.allprice+=item.price* item.count;
                }
                
            })
            return ooo;
        }
    }
})



//全部导入mint-ui
import Mint from 'mint-ui';
import "mint-ui/lib/style.css"
Vue.use(Mint)

import VueResource from "vue-resource"
Vue.use(VueResource)
Vue.http.options.root="http://192.168.3.2:8080"
Vue.http.options.emulateJSON=true

//预览图片组件
import VuePreview from  "vue-preview"
Vue.use(VuePreview)

//导入mui
import "./lib/mui/css/mui.min.css"
import "./lib/mui/css/icons-extra.css"


import VueRouter from "vue-router"
Vue.use(VueRouter)
import router from "./script/router"

//导入组件
import App from "./App.vue"

//日期处理全局过滤器
import moment from "moment"
Vue.filter("dateFormat",function(dataStr,pattern="YYYY-MM-DD HH:mm:ss"){
    return moment(dataStr).format(pattern)
})

//需要编译器
var vm = new Vue({
    el: "#app",
    data: {
    },
    methods: {
    },
    render: c => c(App),
    router,
    store
})


