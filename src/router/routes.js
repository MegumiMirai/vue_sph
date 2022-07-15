// 导入组件
// import Home from '@/pages/Home/Home.vue'
// import Search from '@/pages/Search/Search.vue'
// import Login from '@/pages/Login/Login.vue'
// import Register from '@/pages/Register/Register.vue'
// import Detail from '@/pages/Detail/Detail.vue'
// import AddCartSuccess from '@/pages/AddCartSuccess/AddCartSuccess.vue'
// import ShopCart from '@/pages/ShopCart/ShopCart.vue'
// import Trade from '@/pages/Trade/Trade.vue'
// import Pay from '@/pages/Pay/Pay.vue'
// import PaySuccess from '@/pages/PaySuccess/PaySuccess'
// import Center from '@/pages/Center/Center'
// import MyOrder from '@/pages/Center/MyOrder/MyOrder'
// import GroupOrder from '@/pages/Center/GroupOrder/GroupOrder'
// 路由懒加载
// 当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效。
// 默认导出路由信息
export default [
  // 路由重定向
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: () => import('@/pages/Home/Home.vue'),
    meta: {
      showFooter: true,
    },
  },
  {
    name: 'search',
    path: '/search/:keyword?',
    component: () => import('@/pages/Search/Search.vue'),
    meta: {
      showFooter: true,
    },
    props($route) {
      return {
        keyword: $route.params.keyword,
        k: $route.query.k,
      }
    },
  },
  {
    path: '/login',
    component: () => import('@/pages/Login/Login.vue'),
    meta: {
      showFooter: false,
    },
  },
  {
    path: '/register',
    component: () => import('@/pages/Register/Register.vue'),
    meta: {
      showFooter: false,
    },
  },
  {
    path: '/detail/:id',
    component: () => import('@/pages/Detail/Detail.vue'),
    meta: {
      showFooter: true,
    },
  },
  {
    path: '/addCartSuccess',
    name: 'addCartSuccess',
    component: () => import('@/pages/AddCartSuccess/AddCartSuccess.vue'),
    meta: {
      showFooter: true,
    },
  },
  {
    path: '/shopcart',
    name: 'ShopCart',
    component: () => import('@/pages/ShopCart/ShopCart.vue'),
    meta: {
      showFooter: true,
    },
  },
  {
    path: '/trade',
    name: 'trade',
    component: () => import('@/pages/Trade/Trade.vue'),
    meta: {
      showFooter: true,
    },
    // 只有从购物车界面才能跳转到交易页面
    beforeEnter: (to, from, next) => {
      if (from.path.indexOf('/shopcart') !== -1) {
        next()
      } else {
        next(false)
      }
    },
  },
  {
    path: '/pay',
    name: 'pay',
    component: () => import('@/pages/Pay/Pay.vue'),
    meta: {
      showFooter: true,
    },
    // 只有从交易页面才能跳转到支付页面
    beforeEnter(to, from, next) {
      if (from.path.indexOf('/trade') !== -1) {
        next()
      } else {
        next(false)
      }
    },
  },
  {
    path: '/paysuccess',
    name: 'paysuccess',
    component: () => import('@/pages/PaySuccess/PaySuccess'),
    meta: {
      showFooter: true,
    }
  },
  {
    path: '/center',
    name: 'center',
    component: () => import('@/pages/Center/Center'),
    meta: {
      showFooter: true,
    },
    children: [
      { path: '/', redirect: 'myorder' },
      { path: 'myorder', component: import('@/pages/Center/MyOrder/MyOrder') },
      { path: 'grouporder', component: import('@/pages/Center/GroupOrder/GroupOrder') },
    ],
  },
]
