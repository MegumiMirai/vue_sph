import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入路由
import routes from './routes'

import store from '@/store'

// 使用插件
Vue.use(VueRouter)

// 先把VueRouter原型对象的push，先保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

// 重写push和replace
// 第一个参数：告诉原来push方法，往哪里跳（传递哪些参数）
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    // call和apply的区别
    // 相同点，都可以调用函数一次，都可以篡改函数的上下文一次
    // 不同的：call和apply传递参数，call传递参数用逗号隔开，apply方法执行，传递数组
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}

// 配置并暴露路由
let router = new VueRouter({
  routes,
  scrollBehavior() {
    // 始终滚动到顶部
    return { y: 0 }
  },
})

router.beforeEach((to, from, next) => {
  let token = store.state.user.token
  let name = store.state.user.userInfo.name
  // 先判断用户是否已经登录了
  if (token) {
    // 如果已经登陆了但是想去登录页，强制返回home首页
    if (to.path === '/login' || to.path === '/register') {
      next('/home')
    } else {
      // 登录了，去的不是login，并且有用户名，放行
      if (name) {
        next()
      } else {
        // 没有用户信息，派发action获取信息，成功了的话就跳转
        try {
          // 获取用户信息
          store.dispatch('user/getUserInfo')
          next()
        } catch (error) {
          // 获取用户信息失败，清除token，重新登录
          store.dispatch('user/logout')
          next('/login')
        }
      }
    }
  }else{
    next()
  }
})

export default router
