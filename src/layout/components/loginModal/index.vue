<template>
  <el-dialog
    v-model="dialogVisible"
    width="300px"
    title="扫码登录"
    center
    :before-close="handleClose"
  >
    <div v-if="status !== 802" v-laoding="isLoadingQrCodeImg">
        <el-card v-loading="isLoadingQrCodeImg">
            <img
              v-show="!isLoadingQrCodeImg"
              width="200" height="200"
              :src="qrCodeImg"
            >
            <!-- 图片加载时占位符 -->
            <div v-show="isLoadingQrCodeImg" style="width:200px;height:200px" />
            <!-- 二维码过期蒙层 -->
            <div v-if="status === 800" class="mask">
                <div class="refresh" @click="handleRefreshClick">
                    <img width="60" height="60" src="@/assets/reload-2.png">
                </div>
            </div>
        </el-card>
        <p class="mt-6">
          <span>使用</span>
          <span class="text-color">网易云音乐APP</span>
          <span>扫码登录</span>
        </p>
    </div>
    <!-- 扫码待确认登录 -->
    <div v-if="status === 802" class="mt-20">
        <n-result
          size="small" status="success" title="扫码成功"
          description="请在手机上确认登录"
        />
      </div>
  </el-dialog>
</template>

<script setup lang="ts" >
import { ref, watch,onUnmounted } from 'vue'
import { getQRcode,getQRcodeImg,getQrCodeStatus } from '@/service/login'
import { ElMessage } from 'element-plus'
import { useMainStore } from '@/stores';
export interface LoginModalExpose{
  show:() => void;
  close:() => void;
}
const mainStore = useMainStore()
const dialogVisible = ref(false)
let qrCodeKey = ''
const qrCodeImg = ref('')
const isLoadingQrCodeImg = ref(true);
let timer : any;
type qrCodeStatus = 800 | 801 | 802 | 803;
const status = ref<qrCodeStatus | ''> ()
defineExpose({
    show(){
        dialogVisible.value = true
    },
    close(){
        dialogVisible.value = false
    }
})

const handleClose = () =>{
    dialogVisible.value = false
}
const getQRcodekeys = async ()=>{
    isLoadingQrCodeImg.value = true
    let res = await getQRcode()
    qrCodeKey = res.data.data.unikey
    getQRcodePic(qrCodeKey)
}
const getQRcodePic = async (key : string) => {
    let res = await getQRcodeImg(key)
    if(res.data.code === 200 ){
        qrCodeImg.value = res.data.data.qrimg
        isLoadingQrCodeImg.value = false
    }
    loopGetQrCodeStatus()
}
const loopGetQrCodeStatus = () => {
    timer = setInterval( async ()=>{
        let res = await getQrCodeStatus(qrCodeKey)
        // 避免当定时器清空时,多余的回调执行
        if (timer === undefined) return;
        status.value = res.data.code
        console.log(res)
        if(status.value === 803){
            clearInterval(timer)
            ElMessage.success('授权登录成功！')
            dialogVisible.value = false
            mainStore.isLogin = true
            localStorage.isLogin = true
            status.value = ''
            timer = undefined
            return
        }
        if(res.data.code === 800){
            clearInterval(timer)
            ElMessage.warning('二维码已过期，请重新获取')
            timer = undefined
        }
    },1000)
}
const handleRefreshClick = ()=>{
    qrCodeImg.value = '';
    status.value = '';
    getQRcodekeys();
}
watch(dialogVisible,(val)=>{
    if(val){    
        getQRcodekeys()
    }else{
        clearInterval(timer);
    }
});

onUnmounted(() => {
    clearInterval(timer);
});

</script>

<style scoped lang="scss">
.mt-6{
    margin-top: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
}
.text-color{
    color:rgb(255,0,0)
}
::v-deep .el-card__body{
    position: relative;
}
.mask{
    position: absolute;
    width: 200px;
    height: 200px;
    background-color: rgb(178, 182, 186);
    opacity: 0.8;
    top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    .refresh{
        height: 60px;
        width: 60px;
        cursor: pointer;
    }
}
</style>