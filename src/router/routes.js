// 导入组件
import Home from '@/pages/Home/Home.vue'
import Search from '@/pages/Search/Search.vue'
import Login from '@/pages/Login/Login.vue'
import Register from '@/pages/Register/Register.vue'
import Detail from '@/pages/Detail/Detail.vue'
import AddCartSuccess from '@/pages/AddCartSuccess/AddCartSuccess.vue'
import ShopCart from '@/pages/ShopCart/ShopCart.vue'
// 默认导出路由信息
export default [
  // 路由重定向
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: Home,
    meta:{
      showFooter: true
    }
  },
  {
    name: 'search',
    path: '/search/:keyword?',
    component: Search,
    meta:{
      showFooter: true
    },
    props($route) {
      return {
        keyword: $route.params.keyword,
        k: $route.query.k
      }
    }
  },
  {
    path: '/login',
    component: Login,
    meta:{
      showFooter: false
    }
  },
  {
    path: '/register',
    component: Register,
    meta:{
      showFooter: false
    }
  },
  {
    path: '/detail/:id',
    component: Detail,
    meta:{
      showFooter: true
    }
  },
  {
    path: '/addCartSuccess',
    name: 'addCartSuccess',
    component: AddCartSuccess,
    meta:{
      showFooter: true
    }
  },
  {
    path: '/shopcart',
    name: 'ShopCart',
    component: ShopCart,
    meta:{
      showFooter: true
    }
  }
]