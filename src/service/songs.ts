import request from './request'
// 获取推荐歌单
export const getRecommenedSongList = () => {
    return request.get('/personalized?limit=18')
}
// 每日推荐歌单 /recommend/resource
export function getDaySongList() {
    return request.get('/recommend/resource');
    // 热门歌单分类 /playlist/hot
    
}
export function getHotSongListCate() {
    return request.get('/playlist/highquality/tags');
}
//获取网友精选碟歌单 /top/playlist?limit=30
export function getHotSongList(cate = '') {
    return request.get('/top/playlist?limit=30&cat='+ cate);
}

// 推荐新音乐
export function getNewSong() {
    return request.get('/personalized/newsong?limit=21');
}
//新歌速递 /top/song 全部:0 华语:7 欧美:96 日本:8 韩国:16
export function getNewSongList(type : number) {
    return request.get('/top/song?type=' + type);
}
// /recommend/songs
export function getRecommendSong() {
    return request.get('/recommend/songs');
}

//获取音乐url /song/url/v1?id=33894312&level=exhigh /song/url/v1?id=405998841,33894312&level=lossless
export function getSongUrl(id:number, level:string) {
    return request.get(`/song/url/v1?id=${id}&level=${level}`);
}



