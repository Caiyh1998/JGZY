import Vue from 'vue'
import VueRouter from 'vue-router'

import cookie from '../common/cookie';
import store from "../store";

const Home = () => import('../views/home/Home')
const Store = () => import('../views/store/Store')
const ShopCart = () => import('../views/shopcart/ShopCart')
const Record = () => import('../views/record/Record')
const Profile = () => import('../views/profile/Profile')
const Login = () => import('../views/login/Login')
const Game = () => import('../views/game/Game')
const MyGame = () => import('../views/game/MyGame')
const EditInfo = () => import('../views/profile/EditInfo')
const Admin = () => import('../views/admin/Admin')
const AdminLogin = () => import('../views/admin/Login')
const AdminUser = () => import('../views/admin/User')
const AdminRecord = () => import('../views/admin/Record')
const AdminGame = () => import('../views/admin/Game')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    meta:{requiresAuth:false}
  },
  {
    path: '/store',
    component: Store,
    meta:{requiresAuth:false}
  },
  {
    path: '/shopcart',
    component: ShopCart,
    meta:{requiresAuth:true}
  },
  {
    path: '/record',
    component: Record,
    meta:{requiresAuth:true}
  },
  {
    path: '/profile',
    component: Profile,
    meta:{requiresAuth:false}
  },
  {
    path: '/login',
    component: Login,
    meta:{requiresAuth:false}
  },
  {
    path: '/register',
    component: Login,
    meta:{requiresAuth:false}
  },
  {
    path: '/game',
    component: Game,
    meta:{requiresAuth:true}
  },
  {
    path: '/mygame',
    component: MyGame,
    meta:{requiresAuth:true}
  },
  {
    path: '/editinfo',
    component: EditInfo,
    meta:{requiresAuth:true}
  },
  {
    path: '/admin/index',
    component: Admin,
    meta:{requiresAuth:true}
  },
  {
    path: '/admin/login',
    component: AdminLogin,
  },
  {
    path: '/admin/game',
    component: AdminGame,
    meta:{requiresAuth:true}
  },
  {
    path: '/admin/record',
    component: AdminRecord,
    meta:{requiresAuth:true}
  },
  {
    path: '/admin/user',
    component: AdminUser,
    meta:{requiresAuth:true}
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

//路由拦截
if (localStorage.getItem("token")) {
  store.commit("setToken", localStorage.getItem("token"));
}
router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requiresAuth)) {
    if (store.state.token) {
      next();
    } else if (to.fullPath.indexOf('/admin') != -1){
      console.log(to.fullPath);
      next({
        path: '/admin/login'
      });
    } else {
      next({
        path: '/login'
      });
    }
  } else {
    next();
  }
})

export default router
