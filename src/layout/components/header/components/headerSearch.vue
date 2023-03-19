<template>
  <div class="wrapper">
    <div class="icon">
      <el-icon><ArrowLeft /></el-icon>
    </div>
    <div class="icon">
      <el-icon><ArrowRight /></el-icon>
    </div>
    <el-input
      v-model="mainStore.searchKeyword"
      placeholder="请输入"
      :prefix-icon="Search"
    />
  </div>
</template>

<script setup lang="ts">
import { getSearchDefault } from '@/service'
import { useMainStore } from '@/stores'
import { ArrowLeft, ArrowRight, Search } from '@element-plus/icons-vue'
const mainStore = useMainStore()
// 搜索关键字
const getSearchKeywords = () => {
  getSearchDefault().then((res) => {
    mainStore.searchKeyword = res.data.data.showKeyword
  })
}
getSearchKeywords()
</script>

<style scoped lang="scss">
.wrapper{
    display: flex;
    align-items: center;
}
.icon {
  margin-top: 5px;
  margin:0 10px;
  position: relative;
  cursor: pointer;
}
.icon::after {
  content: '';
  width: 25px;
  height: 25px;
  position: absolute;
  background-color: aliceblue;
  border-radius: 50%;
  top: -3px;
  left: -5px;
  z-index: -1;
}

.el-input {
    margin-left: 5px;
    width: 200px;
    --el-input-text-color:#afb2b9
}
</style>
