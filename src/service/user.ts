import request from './request'

// 获取账号信息
export const getUserInfo = () => request({
    url:'/user/account'
})

//获取用户详情
export const getUserDetail = (uid:string) => request({
    url:'/user/detail?uid='+uid
})

//获取用户歌单
export const getUserPlaylist = (uid:number) => {
    return request.get('/user/playlist?uid='+ uid);
}