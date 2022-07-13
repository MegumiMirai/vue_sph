import { reqGoodsDetail, reqAddOrUpdateShopCat } from '@/api/index'
import { getUUIDToken } from '@/util/uuid_token'
let state = {
  goodsDetail: {},
  uuid_token: getUUIDToken()
}
let mutations = {
  GETGOODSDETAIL(state, data){
    state.goodsDetail = data
  }
}
let actions = {
   async getGoodsDetail(context, id){
    let res = await reqGoodsDetail(id)
    if(res.code === 200){
      context.commit('GETGOODSDETAIL', res.data)
    }else{
      alert(res.message)
    }
  },
  // 添加商品到购物车
  async addOrUpdateShopCat(_, { skuId, skuNum }){
    let res = await reqAddOrUpdateShopCat(skuId, skuNum)
    if(res.code == 200){
      return 'ok'
    }else{
      return Promise.reject(new Error('添加商品到购物车失败！！'))
    }
    
    // .then(() => {
    //   return 'ok'
    // }, () => {
    //   return Promise.reject(new Error('添加商品到购物车失败！！'))
    // })
  }
}
let getters = {
  // 简化获取目录数据
  categoryView(state){
    // state.goodsDetail初始状态为空对象，空对象的categoryView属性值为undefined
    // 如果是undefined就返回一个空对象，防止假报错消息
    return state.goodsDetail.categoryView || {}
  },
  // 简化获取商品详情数据
  skuInfo(state){
    return state.goodsDetail.skuInfo || {}
  },
  skuSaleAttrValueList(state){
    return state.goodsDetail.skuSaleAttrValueList || []
  }
}

export default{
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}