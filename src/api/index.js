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

// 获取验证码
export const reqCode = (phone) => request({ url: `/user/passport/sendCode/${phone}`, method: 'GET' })

// 注册新用户
export const reqRegisterUser = (data) => request({ url: '/user/passport/register', data, method: 'POST' })

// 登录
export const reqLogin = (data) => request({ url: '/user/passport/login', data, method: 'POST' })

// 获取用户信息
export const reqUserInfo = () => request({ url: '/user/passport/auth/getUserInfo', method: 'GET' })

// 退出登录
export const reqLogout = () => request({ url: '/user/passport/logout', method: 'GET' })

// 获取用户地址信息
export const reqUserAddressInfo = () => request({ url: '/user/userAddress/auth/findUserAddressList', method: 'GET' })

// 获取订单交易页
export const reqTrade = () => request({ url: '/order/auth/trade', method: 'GET' })

// 提交订单
export const reqSubmitOrder = (tradeNo, data) => request({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, method: 'POST', data })

// 获取订单支付信息
export const reqPayInfo = (orderId) => request({ url: `/payment/weixin/createNative/${orderId}`, method: 'GET' })

// 查询订单支付状态
export const reqPayStatus = (orderId) => request({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: "GET" })

// 获取我的订单
export const reqMyOrderList = (page, limit) => request({ url: `/order/auth/${page}/${limit}`, method: 'GET' })