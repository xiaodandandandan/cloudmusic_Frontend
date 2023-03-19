<template>
  <div v-if="store.isLogin">
    <h3>每日推荐</h3>
    <div class="wrapper">
      <SongsList :songsList="dayRecommendList" />
    </div>
  </div>
  <div class="hotList">
    <h3>热门歌单分类</h3>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
        :label="tag.name"
        :name="tag.name"
        v-for="tag in tagsList"
        :key="tag.name"
      >
        <template class="wrapper">
          <SongsList :songsList="cateSongsList" />
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import SongsList from '@/components/SongsList/songList.vue'
import { ref, computed } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import { getDaySongList, getHotSongListCate, getHotSongList } from '@/service'
import { useAsyncState } from '@vueuse/core'
import { useMainStore } from '@/stores';
const activeName = ref('全部')
const store = useMainStore()
const handleClick = (tab: TabsPaneContext, event: Event) => {
  getHotSongList(tab.props.label).then((res) => {
    if (res.data.code === 200) {
      console.log(res.data)
      cateSongsList.value = res.data.playlists
    }
  })
}
const { state: tagsList } = useAsyncState<any[]>(
  getHotSongListCate().then((res) => {
    return [{ name: '全部' }].concat(res.data.tags)
  }),
  []
)

const cateSongsList = ref<any[]>()
const dayRecommendList = ref<any[]>()
const initSongsList = () => {
  getDaySongList().then((res) => {
    if (res.data.code === 200) {
      dayRecommendList.value = res.data.recommend.slice(0,6)
    }
  })
  getHotSongList().then((res) => {
    if (res.data.code === 200) {
      cateSongsList.value = res.data.playlists
    }
  })
}
initSongsList()
</script>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
