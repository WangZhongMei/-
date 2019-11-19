import VueRouter from "vue-router"

import HomeContainer from "../components/tabbar/HomeContainer.vue"
import MemberContainer from "../components/tabbar/MemberContainer.vue"
import ShopcarContainer from "../components/tabbar/ShopcarContainer.vue"
import SearchContainer from "../components/tabbar/SearchContainer.vue"

import NewsList from "../components/menu/NewsList.vue"
import PhotoList from "../components/menu/PhotoList.vue"
import GoodList from "../components/menu/GoodList.vue"

import NewsInfo from "../components/menu/content/NewsInfo.vue"
import GoodInfo from "../components/menu/content/GoodInfo.vue"
import GoodDesc from "../components/menu/content/GoodDesc.vue"
import GoodComment from "../components/menu/content/GoodComment.vue"
import PhotoInfo from "../components/menu/content/PhotoInfo.vue"


//设置路由规则
var router = new VueRouter({
    routes: [
        { path: "/", redirect: "/home" },
        { path: "/home", component: HomeContainer ,},
        
        { path: "/member", component: MemberContainer },
        { path: "/shopcar", component: ShopcarContainer },
        { path: "/search", component: SearchContainer },
        { path: "/home/newsList", component: NewsList },
        { path: "/home/photoList", component: PhotoList },
        { path: "/home/goodList", component: GoodList },

        { path: "/home/newsinfo/:id", component: NewsInfo },
        { path: "/home/goodinfo/:id", component: GoodInfo },
        { path: "/home/goodDesc/:id", component: GoodDesc },
        { path: "/home/goodComment/:id", component: GoodComment },

        { path: "/home/photoinfo/:id", component: PhotoInfo },

    ],
    linkActiveClass: "mui-active"
})

export default router