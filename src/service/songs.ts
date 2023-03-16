import request from './request'
// 获取推荐歌单
export const getRecommenedSongList = () => {
    return request.get('/personalized?limit=15')
}

// 推荐新音乐
export function getNewSong() {
    return request.get('/personalized/newsong?limit=21');
}