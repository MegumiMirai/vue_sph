// home小仓库

import { reqCategoryList, reqBannerList, reqFloorList } from '@/api'

// state:仓库存储数据的地方
const state = {
  // 三级联动数组
  categoryList: [],
  // 轮播图数据
  bannerList: [],
  floorList: []
}
// mutations:修改state的唯一手段
const mutations = {
  GETCATEGORYLIST(state, data){
    state.categoryList = data
  },
  GETBANNERLIST(state, data){
    state.bannerList = data
  },
  GETFLOORLIST(state, data){
    state.floorList = data
  }
}
// actions：处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
  // 获取三级联动数据
  async getCategoryList(context){
    let res = await reqCategoryList()
    if(res.code === 200){
      context.commit('GETCATEGORYLIST', res.data)
    }else{
      console.log(res.message);
    }
  },
  // 获取轮播图数据
  async getBannerList(context){
    let res = await reqBannerList()
    if(res.code === 200){
      context.commit('GETBANNERLIST', res.data)
    }else{
      console.log(res.message);
    }
  },
  // 获取floor数据
  async getFloorList(context){
    let res = await reqFloorList()
    if(res.code === 200){
      context.commit('GETFLOORLIST', res.data)
    }else{
      console.log(res.message);
    }
  }
}
// getters：理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {}

export default {
  namespaced:true,
  state,
  mutations,
  actions,
  getters
}