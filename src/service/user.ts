import request from './request'

// 获取账号信息
export const getUserInfo = () => request({
    url:'/user/account'
})

//获取用户详情
export const getUserDetail = (uid:string) => request({
    url:'/user/detail?uid='+uid
})