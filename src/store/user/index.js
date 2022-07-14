// 登录和注册模块
import { reqCode, reqRegisterUser, reqLogin, reqUserInfo, reqLogout } from "@/api"
import { setToken, getToken, removeToken } from "@/util/token"

const state = {
  code: '',
  token: getToken(),
  userInfo: {}
}
const mutations = {
  GETCODE(state, code){
    state.code = code
  },
  LOGIN(state, token){
    state.token = token
  },
  GETUSERINFO(state, data){
    state.userInfo = data
  },
  CLEAR(state){
    // 清除state中的数据
    state.token = ''
    state.userInfo = {}
    // 清除本地存储中的数据
    removeToken()
  }
}
const actions = {
  async getCode(context, phone){
    let res = await reqCode(phone)
    if(res.code === 200){
      context.commit('GETCODE',res.data)
      return 'ok'
    }else{
      return Promise.reject('fail')
    }
  },
  async registerUser(context, data){
    let res = await reqRegisterUser(data)
    if(res.code === 200){
      return 'ok'
    }else{
      return Promise.reject(new Error('fail'))
    }
  },
  // 登录
  async login(context, data){
    let res = await reqLogin(data)
    if(res.code === 200){
      context.commit('LOGIN', res.data.token)
      setToken(res.data.token)
      return 'ok'
    }else{
      return Promise.reject('fail')
    }
  },
  // 获取用户信息
  async getUserInfo(context) {
    let res = await reqUserInfo()
    if(res.code === 200){
      context.commit('GETUSERINFO', res.data)
      return 'ok'
    }else{
      return Promise.reject('fail')
    }
  },
  // 退出登录
  async logout(context){
    let res = await reqLogout()
    if(res.code === 200){
      context.commit('CLEAR')
      return 'ok'
    }else{
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
  getters
}