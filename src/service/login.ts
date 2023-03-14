import request from './request'
// 二维码 key 生成接口
export const getQRcode = () => {
    return request({
        url:'/login/qr/key?timestamp=' + new Date().getTime()
    })
}

//
export const getQRcodeImg = (key:string) => {
    return request({
        url: `/login/qr/create?key=${key}&timestamp=${new Date().getTime()}&qrimg=true`
    })
}

// 二维码检查扫码状态
export function getQrCodeStatus(key:string) {
    return request.get(`/login/qr/check?key=${key}&timestamp=${new Date().getTime()}`);
}
// 退出登录
export function logout() {
    return request.get('/logout?timestamp=' + new Date().getTime());
}