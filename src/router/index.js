import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login'
import Layout from '../views/layout'
import Search from '../views/search'
import Searchlist from '../views/search/list'
import Prodetail from '../views/prodetail'
import Pay from '../views/pay'
import Myorder from '../views/myorder'
import Home from '../views/layout/home'
import Cart from '../views/layout/cart'
import Category from '../views/layout/category'
import User from '../views/layout/user'
import store from '../store'
import Address from '@/views/address'
import Money from '@/views/money'
import Shouhuo from '@/views/shouhuoaddress'
import Shuju from '@/views/shujuku'
Vue.use(VueRouter)
const router = new VueRouter({
  routes:[
    {path:'/login',component:Login},
    {path:'/shuju',component:Shuju},
    {path:'/shouhuoaddress',component:Shouhuo},
    {path:'/address',component:Address},
    {path:'/money',component:Money},
    {path:'/',
    redirect:'/home',
    component:Layout,
    children:[
      {path:'/home',component:Home},
      {path:'/user',component:User},
      {path:'/cart',component:Cart},
      {path:'category',component:Category}
             ]
    },
    { path:'/search',component:Search},
    { path:'/searchlist',component:Searchlist},
    { path:'/prodetail/:id',component:Prodetail},
    { path:'/pay',component:Pay},
    { path:'/myorder',component:Myorder}
  ]
})
router.beforeEach((to,from,next) => {
  const usersrc = ['/pay','/myorder']
  if (!to.path.includes(usersrc)) {
next()
  }
  const token = store.state.user.userInfo.token
  if (token) {
    next()
  } else {
    next()
  }
})
export default router
