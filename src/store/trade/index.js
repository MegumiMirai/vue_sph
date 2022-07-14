import { reqUserAddressInfo, reqTrade } from '@/api'

const state = {
  userAddressInfo: [],
  trade: {},
}
const mutations = {
  GETUSERADDRESSINFO(state, data) {
    state.userAddressInfo = data
  },
  GETTRADE(state, data) {
    state.trade = data
  },
}
const actions = {
  // 获取用户地址信息
  async getUserAddressInfo(context) {
    let res = await reqUserAddressInfo()
    if (res.code === 200) {
      context.commit('GETUSERADDRESSINFO', res.data)
      return 'ok'
    } else {
      return Promise.reject('fail')
    }
  },
  // 获取订单交易页面内容
  async getTrade(context) {
    let res = await reqTrade()
    if (res.code === 200) {
      context.commit('GETTRADE', res.data)
      return 'ok'
    } else {
      return Promise.reject('fail')
    }
  }
}
const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
