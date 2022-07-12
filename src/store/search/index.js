import { reqSearchInfo } from '@/api/index'

// state:仓库存储数据的地方
const state = {
  searchInfo: {}
}
// mutations:修改state的唯一手段
const mutations = {
  GETSEARCHINFO(state, data){
    state.searchInfo = data
  }
}
// actions：处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
  async getSearchInfo(context, params = {}){
    let res = await reqSearchInfo(params)
    if(res.code === 200){
      context.commit('GETSEARCHINFO', res.data)
    }else{
      console.log(res.message);
    }
  }
}
// getters：理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {
  goodsList(state){
    // 在网络状态差或者没有网络情况下，state.searchInfo.goodsList可能返回的是undefined
    return state.searchInfo.goodsList || []
  },
  attrsList(state){
    return state.searchInfo.attrsList || []
  },
  trademarkList(state){
    return state.searchInfo.trademarkList || []
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}