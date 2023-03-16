import request from './request'

//获取默认搜索关键词
export const getSearchDefault = () => {
    return request.get('/search/default')
}

//获取热搜列表
export const getSearchHot = () => {
    return request.get('/search/hot')
}

//获取热搜列表详细
export const getSearchHotDetial = () => {
    return request.get('/search/hot/detail')
}