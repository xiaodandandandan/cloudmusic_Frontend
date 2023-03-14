<template>
    <el-menu
        :default-active="router.currentRoute.value.path"
        class="el-menu-vertical-demo"
        router
      >
        <div class="login" @click="handleLoginModal" v-if="!mainStore.isLogin">
          <svg-icon icon="user"></svg-icon>
          <span>未登录</span>
        </div>
        <el-sub-menu v-if="mainStore.isLogin">
          <template #title>
            <el-icon><location /></el-icon>
            <span>Navigator One</span>
          </template>
          <el-menu-item index="1-1">item one</el-menu-item>
        </el-sub-menu>
        <el-menu-item 
        v-for="(item,index) in menuOptions"
        :index="item.key" 
        :key="index"
        >
          <svg-icon :icon="item.icon"></svg-icon>
          <span>{{ item.label }}</span>
        </el-menu-item>
      </el-menu>
      <loginModal ref ="loginRef"/>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useMainStore } from '@/stores/index'
import loginModal,{ type LoginModalExpose } from '../loginModal/index.vue'

const router = useRouter()
const mainStore = useMainStore();
const loginRef = ref< LoginModalExpose >()

const menuOptions = [
  {
    label: '发现音乐',
    key:'/discovery',
    icon: 'sparklesOutline'
  },
  {
    label: '推荐歌单',
    key:'/songList',
    icon: 'list'
  },
  {
    label: '最新音乐',
    key:'/latestMusic',
    icon: 'music'
  },
  {
    label: '最新mv',
    key:'/latestMv',
    icon: 'VideocamOutline'
  },
]
const loginMenuOptions = [
  {
    
  }
]
const handleLoginModal = () => {
  loginRef.value?.show()
}

</script>

<style scoped lang="scss">
.el-menu{
  height: 100%;
}
.login{
  display: flex;
  align-items: center;
  height: 56px;
  line-height: 56px;
  font-size: 14px;
  padding: 0 20px;
  cursor: pointer;
  position: relative;
  box-sizing: border-box;
}
</style>