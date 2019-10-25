import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'
import CategoryEdit from './views/CategoryEdit.vue'
import CategoryList from './views/CategoryList.vue'

import ItemEdit from './views/ItemEdit.vue'
import ItemList from './views/ItemList.vue'

import UserList from './views/UserList.vue'
import UserEdit from './views/UserEdit.vue'

import PrintList from './views/PrintList.vue'
import systemEdit from './views/systemEdit.vue'
import HeroList from './views/HeroList.vue'
import HeroEdit from './views/HeroEdit.vue'
// 景院裹裹
import GuoSystem from './views/GuoGuo/SystemEdit'
import OrderList from './views/GuoGuo/OrderList'
import OrderEdit from './views/GuoGuo/OrderEdit'
import PostermanList from './views/GuoGuo/PostermanList'
import PostermanEdit from './views/GuoGuo/PostermanEdit'
import PostIncEdit from './views/GuoGuo/PostIncEdit'
import PostIncList from './views/GuoGuo/PostIncList'
import AdvertiseEdit from './views/GuoGuo/AdvertiseEdit'
import AdvertiseList from './views/GuoGuo/AdvertiseList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [
        { path: '/categories/create', component: CategoryEdit },
        { path: '/categories/edit/:id', component: CategoryEdit, props: true },
        { path: '/categories/list', component: CategoryList },
        { path: '/items/create', component: ItemEdit },
        { path: '/items/edit/:id', component: ItemEdit, props: true },
        { path: '/items/list', component: ItemList },
        { path: '/heroes/create', component: HeroEdit },
        { path: '/heroes/list', component: HeroList },
        { path: '/heroes/edit/:id', component: HeroEdit, props: true },

        { path: '/users', component: UserList },
        { path: '/users/edit/:id', component: UserEdit, props: true },

        { path: '/prints', component: PrintList },
        { path: '/systems/edit', component: systemEdit },
        // 景院裹裹
        // 系统设置
        { path: '/guosystems/edit', component: GuoSystem },
        // 裹派列表
        { path: '/guomans/list', component: PostermanList },
        { path: '/guomans/edit/:id', component: PostermanEdit, props: true },
        { path: '/guomans/edit/', component: PostermanEdit },
        // 快递公司
        { path: '/guopostincs/edit/:id', component: PostIncEdit, props: true },
        { path: '/guopostincs/edit/', component: PostIncEdit },
        { path: '/guopostincs/list', component: PostIncList },
        // 裹裹订单
        { path: '/guoorders/list', component: OrderList },
        { path: '/guoorders/edit/:id', component: OrderEdit, props: true },
        { path: '/guoorders/edit/', component: OrderEdit },
        // 裹裹广告管理
        { path: '/guoadvertises/list', component: AdvertiseList },
        { path: '/guoadvertises/edit/:id', component: AdvertiseEdit, props: true },
        { path: '/guoadvertises/edit/', component: AdvertiseEdit }
      ]
    }
  ]
})
