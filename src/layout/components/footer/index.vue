<template>
  <div class="wrapper">
    <div class="left">
      <el-image :src="src" style="width: 50px; height: 50px"></el-image>
    </div>
    <div class="play">
      <div class="button">
        <svg-icon icon="randomPlay" class="footer_icon"></svg-icon>
        <svg-icon icon="playback" class="footer_icon"></svg-icon>
        <svg-icon icon="suspend" class="footer_icon_play"></svg-icon>
        <svg-icon icon="playnext" class="footer_icon"></svg-icon>
        <svg-icon icon="singlePlay" class="footer_icon"></svg-icon>
        <audio ref="audioRef" preload="auto" />
      </div>
      <div class="progress">
        <el-progress :percentage="percentage" color="#000" />
      </div>
    </div>
    <div class="right">
        <div class="voice">
            <svg-icon icon="volume" class="footer_icon"></svg-icon>
            <el-slider v-model="volume" />
        </div>
        <svg-icon icon="queryQueue" class="footer_icon"></svg-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getUserRecord } from '@/service'
import { useMainStore } from '@/stores';
const store = useMainStore()
const src =
  'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
const percentage = ref(20)
const volume = ref(0)
const initRecord = () => {
    getUserRecord(store.userProfile.profile.userId).then(res=>{
        console.log('footer',res.data)
    })
}
initRecord()
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  align-items: center;
  .footer_icon {
    width: 30px;
    height: 30px;
    margin: 8px;
    cursor: pointer;
  }
  .footer_icon_play{
    width: 50px;
    height: 50px;
  }
  .left {
    margin-top: 15px;
    flex: 1;
  }
  .play {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 2;
  }
  .progress .el-progress--line {
    width: 700px;
  }
  .right {
    flex: 1;
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    .voice {
        display: flex;
        align-items: center;
        ::v-deep .el-slider__runway{
            width: 100px;
        }
        ::v-deep .el-slider__bar{
            background-color: black;
        }
        ::v-deep .el-slider__button{
            height: 14px;
            width: 14px;
            border: solid 2px #000
        }
    }
  }
}
</style>
