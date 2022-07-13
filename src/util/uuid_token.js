import { v4 as uuidv4 } from 'uuid'

export const getUUIDToken = () => {
  // 先从本地存储获取
  let uuid_token = localStorage.getItem('UUIDTOKEN')
  if(!uuid_token){
    // 如果本地没有
    // 创建一个新的
    uuid_token = uuidv4()
    // 保存在本地
    localStorage.setItem('UUIDTOKEN', uuid_token)
  }
  return uuid_token
}