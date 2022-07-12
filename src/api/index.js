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