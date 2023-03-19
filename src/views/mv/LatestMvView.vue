<template>
  <h2>最新MV</h2>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-change="handleChange">
    <el-tab-pane
      :label="tag.lable"
      :name="tag.name"
      v-for="tag in tabOptions"
      :key="tag.name"
    >
      <template class="wrapper">
        <div class="mv_card" v-for="mv in mvList" :key="mv.id">
          <div class="cover">
            <span class="subTitle">{{ mv.alias }}</span>
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
      </template>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import { getNewMovie } from '@/service'
import { ref, computed } from 'vue'
import { formateNumber } from '@/utils'
const activeName = ref('全部')

const tabOptions = [
  {
    lable: '全部',
    name: '全部'
  },
  {
    lable: '内地',
    name: '内地'
  },
  {
    lable: '港台',
    name: '港台'
  },
  {
    lable: '欧美',
    name: '欧美'
  },
  {
    lable: '韩国',
    name: '韩国'
  },
  {
    lable: '日本',
    name: '日本'
  }
]
const mvList = ref<any[]>()
let area = computed(() => {
  return activeName.value === '全部' ? '' : activeName.value
})

const initMvData = () => {
  getNewMovie(15, area.value).then((res) => {
    if (res.data.code === 200) {
      console.log(res.data.data)
      mvList.value = res.data.data
    }
  })
}
initMvData()

const handleChange = () => {
  console.log(activeName.value)
  initMvData()
}
</script>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .mv_card {
    width: 30%;
    position: relative;
    transition: all 0.5s;
    margin-bottom: 10px;
    h3 {
      margin: 5px 0;
    }
    .cover {
      cursor: pointer;
      .times {
        display: flex;
        position: absolute;
        z-index: 2;
        right: 10px;
        top: 5px;
        align-items: center;
        color: white;
        opacity: 0.8;
      }
      .subTitle {
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
      &:hover {
        .play_icon,
        .subTitle {
          opacity: 0.8;
        }
      }
    }
    .desc {
      display: flex;
      align-items: center;
      span {
        margin-left: 10px;
      }
    }
  }
}
</style>
