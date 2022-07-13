// 当前这个模块: API进行统一管理
import request from "./ajax";
import mockRequest from './mockAjax'
// 三级联动接口
// 发请求: axios发请求返回结果Promise对象
export const reqCategoryList = () => request.get('/product/getBaseCategoryList')

// 获取轮播图数据
export const reqBannerList = () => mockRequest.get('/banner')

// 获取floor数据
export const reqFloorList = () => mockRequest.get('/floor')

// 获取搜索数据
export const reqSearchInfo = (params) => request({
  url: '/list',
  method: 'POST',
  data: params
})

// 获取商品详情数据
export const reqGoodsDetail = (skuId) => request({
  url: '/item/' + skuId,
  method: 'GET'
})

// 将商品添加到购物车
export const reqAddOrUpdateShopCat = (skuId, skuNum) => request({
  url: `/cart/addToCart/${ skuId }/${ skuNum }`,
  method: 'POST'
})

// 获取购物车列表
export const reqCartList = () => request({ url: '/cart/cartList', method: 'GET' })

// 删除购物车商品
export const reqDeleteGoods = (skuId) => request({ url: `/cart/deleteCart/${skuId}`, method: 'DELETE' })

// 修改商品选中状态
export const reqCheck = (skuId, isChecked) => request({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'GET' })