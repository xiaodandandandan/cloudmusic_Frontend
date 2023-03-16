import request from './request'

//获取轮播
export const getBanner = () =>  {
    return request.get('/banner');
}

export * from './login';
export * from './user';
export * from './search'
export * from './songs'
export * from './mv'