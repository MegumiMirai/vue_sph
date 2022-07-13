import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入路由
import routes from './routes'

// 使用插件
Vue.use(VueRouter)

// 先把VueRouter原型对象的push，先保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

// 重写push和replace
// 第一个参数：告诉原来push方法，往哪里跳（传递哪些参数）
VueRouter.prototype.push = function(location, resolve, reject) {
  if(resolve && reject){
    // call和apply的区别
    // 相同点，都可以调用函数一次，都可以篡改函数的上下文一次
    // 不同的：call和apply传递参数，call传递参数用逗号隔开，apply方法执行，传递数组
    originPush.call(this, location, resolve, reject)
  }else{
    originPush.call(this, location, () => {}, () => {})
  }
}
VueRouter.prototype.replace = function(location, resolve, reject){
  if(resolve && reject){
    originReplace.call(this, location, resolve, reject)
  }else{
    originReplace.call(this, location, () => {}, () => {})
  }
}

// 配置并暴露路由
export default new VueRouter({
  routes,
  scrollBehavior() {
    // 始终滚动到顶部
    return { y: 0 }
  },
})
