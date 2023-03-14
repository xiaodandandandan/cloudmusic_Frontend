import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
    {
        path: '/',
        redirect:'/discovery',
        meta: { auth: false }
    },
    //发现
    {
        path: '/discovery',
        name: 'discovery',
        component: () => import('@/views/home/DiscoveryView.vue'),
        meta: { auth: false }
    },
     //最新音乐
    {
        path: '/latestMusic',
        name: 'latestMusic',
        component: () => import('@/views/music/LatestMusicView.vue'),
        meta: { auth: false }
      },
      //最新mv
      {
        path: '/latestMv',
        name: 'latestMv',
        component: () => import('@/views/mv/LatestMvView.vue'),
        meta: { auth: false }
      },
      //mv详情
      {
        path: '/mv/:id',
        name: 'mvDetail',
        component: () => import('@/views/mv/mvDetail.vue'),
        meta: { auth: false , hidden: true}
      },
      //歌单相关
      {
        path: '/songList',
        name: 'songs',
        component: () => import('@/views/songList/RecommendSongListView.vue'),
        meta: { auth: false }
      },
      //歌单详情
      {
        path: '/songList/:id',
        name: 'songListDetail',
        component: () => import('@/views/songList/songListDetail.vue'),
        meta: { auth: false }
      }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
