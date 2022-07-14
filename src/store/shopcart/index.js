import { reqCartList, reqDeleteGoods, reqCheck } from '@/api'

const state = {
  cartList: [],
}
const mutations = {
  GETCARTLIST(state, data) {
    state.cartList = data
  },
}
const actions = {
  async getCartList(context) {
    let res = await reqCartList()
    // console.log(res);
    context.commit('GETCARTLIST', res.data)
  },
  async deleteGoods(context, id) {
    await reqDeleteGoods(id)
  },
  async reqCheck(context, { skuId, isChecked }){
    let res = await reqCheck(skuId, isChecked)
    if(res.code === 200){
      return 'ok'
    }else{
      return Promise.reject(new Error('fail'))
    }
  },
  deleteAllChecked({ getters, dispatch }){
    let promises = []
    getters.cartList.cartInfoList.forEach(item => {
      if(item.isChecked == 1){
        promises.push(dispatch('deleteGoods', item.skuId))
      }
    })
    return Promise.all(promises)
  },
  checkAll({ getters, dispatch }, value){
    console.log(value);
    let promises = []
    getters.cartList.cartInfoList.forEach(item => {
      promises.push(dispatch('reqCheck', { skuId: item.skuId, isChecked: value }))
    })
    return Promise.all(promises)
  }
}
const getters = {
  cartList(state) {
    return state.cartList[0] || {}
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
