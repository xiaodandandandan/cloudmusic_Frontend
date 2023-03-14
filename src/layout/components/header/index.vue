<template>
  <div class="header">
    <div class="left">
      <span class="wrapper">CloudMusic</span>
      <div class="icon first">
        <el-icon><ArrowLeft /></el-icon>
      </div>
      <div class="icon">
        <el-icon><ArrowRight /></el-icon>
      </div>
    </div>
    <div class="middle">
      <el-input
        v-model="keywords"
        placeholder="谁 最近很火哦~"
        :prefix-icon="Search"
      />
    </div>
    <div class="right">
      <el-dropdown v-show="mainStore.isLogin">
        <span class="el-dropdown-link userInfo">
          <el-avatar :size="35" :src="circleUrl" />
          <span>{{ nickName }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="userLogout"> 退出账号</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <n-switch v-model:value="active" size="large">
        <template #checked-icon>
          <svg-icon icon="moon"></svg-icon>
        </template>
        <template #unchecked-icon>
          <svg-icon icon="sun"></svg-icon>
        </template>
      </n-switch>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft, ArrowRight, Search } from '@element-plus/icons-vue'
import { getUserInfo, getUserDetail } from '@/service/user'
import { logout } from '@/service/login'
import { ref, watch , computed} from 'vue'
import { useMainStore } from '@/stores'
type AnyObject = {
  [key: string]: any
}
const mainStore = useMainStore()
const keywords = ref('')
const userDetail = ref<AnyObject>()
const changeTheme = ref(false)
const active = ref(false)
const circleUrl = computed(()=>{
  return mainStore.userProfile.profile.avatarUrl
})
watch(
  () => mainStore.isLogin,
  (val) => {
    if (val) {
      getUserpProfile()
    }
  }
)

const getUserpProfile = () => {
  if (mainStore.userProfile?.userId) {
    getUserDetailInfo(mainStore.userProfile.profile.userId)
  } else {
    getUserInfo().then((res) => {
      getUserDetailInfo(res.data.profile.userId)
    })
  }
}
//获取用户详情数据
const getUserDetailInfo = (uid: string) => {
  getUserDetail(uid).then((res) => {
    if(res?.data?.code === 200){
      mainStore.userProfile = res.data
      localStorage.userProfile = JSON.stringify(res.data)
      userDetail.value = res.data
    }
  })
}

const userLogout = () => {
  logout().then((res) => {
    if (res.data.code === 200) {
      localStorage.isLogin = false
      mainStore.isLogin = false
      mainStore.userProfile = {}
      localStorage.clear()
    }
  })
}
if(mainStore.isLogin){
  getUserpProfile()
  console.log(mainStore.userProfile.profile)
}
const nickName = computed(()=>{
  return mainStore.userProfile.profile.nickname
})

</script>

<style scoped lang="scss">
.header {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  .left {
    width: 200px;
    display: flex;
    align-items: center;
    .wrapper {
      margin-left: 25px;
    }
    .icon {
      margin-top: 5px;
      margin-left: 20px;
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
    .first {
      margin-left: 15px;
    }
  }
  .middle {
    flex: 1;
    .el-input {
      width: 200px;
    }
  }
  .n-switch.n-switch--active .n-switch__rail {
    background-color: aliceblue;
  }
  .n-switch:focus .n-switch__rail {
    box-shadow: rgb(189, 216, 239);
  }
  .right {
    display: flex;
    align-items: center;
    justify-content: center;
    .userInfo {
      display: flex;
      height: 35px;
      margin-right: 10px;
      align-items: center;
      font-size: 12px;
      .el-avatar {
        margin-right: 5px;
      }
    }
  }
  ::v-deep .el-input__wrapper {
    border-radius: 30px;
  }
}
</style>
