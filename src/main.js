import Vue from 'vue'
import App from './App.vue'

// 三级联动组件——全局组件
import TypeNav from '@/components/TypeNav/TypeNav.vue'
import Carousel from '@/components/Carousel/Carousel.vue'
import Pagination from '@/components/Pagination/pagination.vue'
// 导入 vuex
import store from '@/store'
Vue.use(store)

Vue.config.productionTip = false

// 将TypeNav定义为全局组件
// 第一个参数是全局组件的名字，第二个参数指定是哪个参数
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)

// 引入路由
import router from '@/router/index'

// 引入Mockserver.js --- mock数据
import '@/mock/mockServer'

// 导入swiper的样式
import 'swiper/css/swiper.css'

// 导入api中的所有方法，挂载到Vue身上
import * as API from '@/api'

// 按需引入element-UI组件库
import { MessageBox } from 'element-ui';

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 导入懒加载
import VueLazyload from 'vue-lazyload'
import atm from './assets/1.gif'
Vue.use(VueLazyload, {
  loading: atm
})

// 引入表单验证规则
import '@/plugins/validate'

new Vue({
  render: h => h(App),
  beforeCreate(){
    // 配置全局事件总线
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  // 注册路由
  router,
  // 注册仓库: 组件实例的身上会多个属性$store属性
  store
}).$mount('#app')
