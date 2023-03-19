<template>
  <el-card class="card" v-for="songlist in songsList" :key="songlist.id">
    <div class="image">
      <div class="times">
        <svg-icon icon="play"></svg-icon>
        <span> {{ formateNumber(songlist.playCount || songlist.playcount) }}</span>
      </div>
      <svg-icon icon="playCircle" class="play_icon"></svg-icon>
      <el-image :src="songlist.picUrl || songlist.coverImgUrl" fit="contain"></el-image>
    </div>
    <span style="margin-left: 10px"> {{ songlist.name }}</span>
  </el-card>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { formateNumber } from '@/utils'
defineProps<{
  songsList?: any[]
}>()
</script>

<style scoped lang="scss">
@import '@/assets/mixin.scss';
.card {
  width: 15%;
  margin-bottom: 15px;
  border-radius: 10px;
  .times {
    display: flex;
    position: absolute;
    z-index: 2;
    right: 5px;
    align-items: center;
    color: white;
    opacity: 0.8;
  }
  .image {
    position: relative;
    transition: all 0.5s;
    cursor: pointer;
    .play_icon {
      position: absolute;
      z-index: 2;
      width: 40px;
      height: 40px;
      right: 5px;
      bottom: 15px;
      color: white;
      opacity: 0;
    }
    &:hover {
      transform: scale(1.05);
      .play_icon {
        opacity: 0.8;
      }
    }
  }
}
::v-deep .el-card__body {
  padding: 0;
}
span {
    display: block;
    @include text-hidden();
    margin: 5px auto;
  }
</style>
