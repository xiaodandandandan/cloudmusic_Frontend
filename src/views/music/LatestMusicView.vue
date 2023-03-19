<template>
  <div v-if="store.isLogin">
    <h3>每日推荐</h3>
    <div class="wrapper">
      <div class="music_item" v-for="music in daySongs" :key="music.id">
        <div class="left">
          <svg-icon icon="musicPlay" class="musicPlay"></svg-icon>
          <el-image :src="music.al.picUrl" fit="contain"></el-image>
        </div>
        <div class="right">
          <span class="music_title"> {{ music.name }} </span>
          <svg-icon icon="mv" v-if="music.mv"></svg-icon>
          <div class="artist_name">
            <span v-for="artist in music.ar">{{ artist.name }}</span>
            <span style="color: #888">{{ music.reason }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="songList">
    <h3>新歌速递</h3>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane
        :label="tag.lable"
        :name="tag.name"
        v-for="tag in tabOptions"
        :key="tag.name"
      >
        <template class="wrapper">
          <div class="music_item" v-for="song in newSongs" :key="song.id">
            <div class="left">
              <svg-icon icon="musicPlay" class="musicPlay"></svg-icon>
              <el-image :src="song.album.picUrl" fit="contain"></el-image>
            </div>
            <div class="right">
              <span class="music_title"> {{ song.album.name }} </span>
              <svg-icon icon="mv" v-if="song.mvid !== 0"></svg-icon>
              <div class="artist_name">
                <span v-for="artist in song.artists">{{ artist.name }}</span>
              </div>
          </div>
          </div>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getNewSongList, getRecommendSong } from '@/service'
import { useMainStore } from '@/stores';
const daySongs = ref<any[]>()
const newSongs = ref<any[]>()
const activeName = ref(0)
const store = useMainStore()
const tabOptions = [
  {
    lable: '全部',
    name: 0
  },
  {
    lable: '华语',
    name: 7
  },
  {
    lable: '欧美',
    name: 96
  }, {
    lable: '韩国',
    name: 16
  },
  {
    lable: '日本',
    name: 8
  }  
]
const getNewSongs = () => {
  getNewSongList(activeName.value).then((res) => {
    if (res.data.code === 200) {
      newSongs.value = res.data.data
    }
  })
}
const initSongData = () => {
  getRecommendSong().then((res) => {
    if (res.data.code === 200) {
      //console.log(res.data)
      daySongs.value = res.data.data.dailySongs
    }
  })
  getNewSongs()
}
initSongData()

const handleClick = () => {
  getNewSongs()
}
</script>

<style scoped lang="scss">
@import '@/assets/mixin.scss';
.wrapper {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .music_item {
    display: flex;
    padding: 0;
    width: 32%;
    height: 80px;
    align-items: center;
    border-radius: 10px;
    cursor: pointer;
    &:hover {
      background-color: aliceblue;
    }
  }
  .left {
    position: relative;
    display: flex;
    .el-image {
      width: 70px;
      height: 70px;
      border-radius: 10px;
      transition: all 0.5s;
    }
    .musicPlay {
      position: absolute;
      width: 40px;
      height: 40px;
      z-index: 2;
      left: 12px;
      top: 15px;
      color: white;
    }
    &:hover {
      transform: scale(1.1);
    }
  }

  .right {
    flex: 1;
    @include text-hidden();
    .music_title {
      font-size: 18px;
      margin-left: 15px;
    }
    .artist_name {
      margin-left: 15px;
      display: flex;
      font-size: 12px;
      justify-content: flex-start;
      span {
        padding: 3px;
        margin-top: 15px;
      }
    }
    ::v-deep .el-skeleton__item {
      margin: 10px;
      display: block;
    }
  }
}
</style>
