import Vue from 'vue'
import vuex from 'vuex'
// 使用插件
Vue.use(vuex)

import home from './home'
import search from './search'

// 对外暴露Store类的一个实例
export default new vuex.Store({
  modules:{
    home,
    search
  }
})