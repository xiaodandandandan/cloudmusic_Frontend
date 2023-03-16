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
        <template v-if="mainStore.isLogin">
          <el-sub-menu v-for="(item,index) in loginMenuOptions" :key="index" :index="item.key">
          <template #title>
            <svg-icon :icon="item.icon"></svg-icon>
            <span>{{ item.label }}</span>
          </template>
          <el-menu-item :index="it.key" v-for="it in item.children" :key="it.id">
            <svg-icon :icon="it.icon"></svg-icon>
            <span>{{ it.label }}</span>
          </el-menu-item>
        </el-sub-menu>
        </template>
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
import { ref,watch } from 'vue'
import { useRouter } from 'vue-router'
import { useMainStore } from '@/stores/index'
import loginModal,{ type LoginModalExpose } from '../loginModal/index.vue'
import {getUserPlaylist} from '@/service'

const router = useRouter()
const mainStore = useMainStore();
const loginRef = ref< LoginModalExpose >()
type MySongsList = { myCreatePlayList: any[], collectPlayList: any[] };

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

interface childrenMenuOptionItem extends MenuOptionItem{
   id:number;
}
type MenuOptionItem = {
  label: string,
  key: string,
  icon?: string,
  children?:childrenMenuOptionItem[]
}
const originOptions = [
{
    label: '我创建的歌单',
    key:'create',
    icon: 'user',
    children: []
  },
  {
    label: '我收藏的歌单',
    key:'collect',
    icon: 'star',
    children: []
  }
]
const loginMenuOptions = ref<MenuOptionItem[]>(originOptions)

const handleLoginModal = () => {
  loginRef.value?.show()
}
watch(()=>mainStore.userProfile,(val)=>{
  let userId = mainStore.userProfile?.profile?.userId
  if(val && userId){
    fetchMyPlayList(userId)
    console.log(loginMenuOptions.value)
  }else{
    loginMenuOptions.value = originOptions
  }
})
// 获取登录后添加的两项菜单列表
const getLoginMenuOption = (myCreatePlayList:any[]=[], collectPlayList:any[]=[]) =>{
  myCreatePlayList.map((item : any, index : number)=>{
      let temp = `/songList/${item.id}`
      loginMenuOptions.value[0].children?.push(
        {
          label: item.name,
          key: temp,
          icon: index ===0 ? 'heart' : 'queueMusic' ,
          id: item.id
        }
    )
  })
  collectPlayList.map((item : any, index : number)=>{
      let temp = `/songList/${item.id}`
      loginMenuOptions.value[1].children?.push(
        {
          label: item.name,
          key: temp,
          icon:'queueMusic' ,
          id: item.id
        }
    )
  })
}
//获取用户歌单信息
const fetchMyPlayList = (userId:number) =>{
  getUserPlaylist(userId).then(res=>{
    if(res.data.code === 200){
      let {myCreatePlayList,collectPlayList} = classifySongsList(userId,res.data.playlist)
      getLoginMenuOption(myCreatePlayList,collectPlayList)
    }
  })
}
// 将用户的歌单分类
const classifySongsList = (userId:number, playList:any[]) => {
  return playList.reduce((prev,currentValue,index)=>{
    if (index === 0) currentValue.name = '我喜欢的音乐';
    if(currentValue.creator.userId === userId){
      prev.myCreatePlayList.push(currentValue)
    }else{
      prev.collectPlayList.push(currentValue)
    }
    return prev
  }
  ,{myCreatePlayList: [], collectPlayList: []}) as MySongsList
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
.el-menu-item{
  span{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>