<template>
  <div class="banner">
    <!-- 骨架屏 -->
    <el-carousel
      v-if="isBannerLoading"
      :interval="6000"
      type="card"
      trigger="click"
    >
      <el-carousel-item v-for="item in 6">
        <el-skeleton style="width: 100%; height: 100%" animated :throttle="500">
          <template #template>
            <el-skeleton-item variant="image" class="banner_skeleton" />
          </template>
        </el-skeleton>
      </el-carousel-item>
    </el-carousel>
    <el-carousel
      :interval="6000"
      type="card"
      trigger="click"
      v-if="!isBannerLoading"
    >
      <el-carousel-item v-for="(item, index) in bannerList" :key="index">
        <el-image :src="item.imageUrl" fit="fit"></el-image>
      </el-carousel-item>
    </el-carousel>
  </div>
  <!--推荐歌单-->
  <div class="songlist">
    <div class="title">推荐歌单</div>
    <div class="wrapper">
      <!--骨架屏-->
      <SongListSkeleton v-if="isSongsListLoading" :times="18"/>
      <SongList :songsList="reSongList" v-else />
    </div>
  </div>
  <!--最新音乐-->
  <div class="newMusic">
    <div class="title">最新音乐</div>
    <div class="wrapper">
      <!--骨架屏-->
      <template v-if="isMusicListLoading">
        <el-skeleton
          animated
          :throttle="500"
          class="music_item"
          v-for="item in 21"
        >
          <template #template>
            <div class="left">
              <el-skeleton-item
                variant="image"
                style="width: 70px; height: 70px"
              />
            </div>
            <div class="right" style="height: 70px">
              <el-skeleton-item variant="h3" />
              <el-skeleton-item variant="h3" />
            </div>
          </template>
        </el-skeleton>
      </template>
      <div class="music_item" v-for="music in newMusicList" :key="music.id">
        <div class="left">
          <svg-icon icon="musicPlay" class="musicPlay"></svg-icon>
          <el-image :src="music.picUrl" fit="contain"></el-image>
        </div>
        <div class="right">
          <span class="music_title"> {{ music.name }} </span>
          <div class="artist_name">
            <span v-for="artist in music.song.artists">{{ artist.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="newMv">
    <div class="title">最新Mv</div>
    <div class="wrapper">
      <div class="mv_card" v-for="mv in newMvList" :key="mv.id">
        <div class="cover">
          <span class="subTitle">{{  mv.alias }}</span>
          <div class="times">
            <svg-icon icon="play"></svg-icon>
            <span> {{ formateNumber(mv.playCount) }}</span>
          </div>
          <svg-icon icon="playCircle" class="play_icon"></svg-icon>
          <el-image :src="mv.cover" fit="fill"> </el-image>
        </div>
        <div class="desc">
          <h3>{{ mv.name }}</h3>
          <span> {{ mv.artistName }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SongList from '@/components/SongsList/songList.vue'
import SongListSkeleton from '@/components/SongsList/songListSkeleton.vue'
import {
  getBanner,
  getRecommenedSongList,
  getNewSong,
  getNewMovie
} from '@/service'
import { formateNumber } from '@/utils'

const isBannerLoading = ref(true)
const isSongsListLoading = ref(true)
const isMusicListLoading = ref(true)
const bannerList = ref<any[]>()
const reSongList = ref<any[]>()
const newMusicList = ref<any[]>()
const newMvList = ref<any[]>()
const initList = () => {
  getBanner().then((res) => {
    if (res.data.code === 200) {
      bannerList.value = res.data.banners
      isBannerLoading.value = false
    }
  })
  getRecommenedSongList().then((res) => {
    if (res.data.code === 200) {
      console.log(res.data.result)
      reSongList.value = res.data.result
      isSongsListLoading.value = false
    }
  })
  getNewSong().then((res) => {
    if (res.data.code === 200) {
      newMusicList.value = res.data.result
      isMusicListLoading.value = false
    }
  })
  getNewMovie().then((res) => {
    if (res.data.code === 200) {
      newMvList.value = res.data.data
    }
  })
}
initList()
</script>

<style scoped lang="scss">
@import '@/assets/mixin.scss';
.banner_skeleton {
  width: 100%;
  height: 100%;
}
.title {
  font-size: 24px;
  padding: 10px 0;
}
.times {
  display: flex;
  position: absolute;
  z-index: 2;
  right: 5px;
  align-items: center;
  color: white;
  opacity: 0.8;
}
.songlist .wrapper {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.newMusic .wrapper {
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

.newMv .wrapper {
  width: 100%;
  display: flex;
  justify-content: space-between;
  .mv_card {
    width: 30%;
    position: relative;
    transition: all 0.5s;
    h3 {
        margin: 5px 0;
      }
    .cover {
      cursor: pointer;
      .subTitle{
        position: absolute;
        z-index: 2;
        color: white;
        opacity: 0;
        top: 5px;
        left: 20px;
      }
      .play_icon {
        position: absolute;
        z-index: 2;
        width: 50px;
        height: 50px;
        top: 32%;
        left: 45%;
        color: white;
        opacity: 0;
      }
      .el-image {
        width: 100%;
        height: 260px;
        border-radius: 20px;
        transition: all 0.5s;
        &:hover {
          transform: scale(1.05);
        }
      }
      .times {
        right: 10px;
        top: 5px;
      }
      &:hover {
        .play_icon , .subTitle{
          opacity: 0.8;
        }
      }
    }
  }
}
</style>
