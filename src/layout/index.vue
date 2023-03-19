 <template>
  <div class="common-layout">
    <el-container class="app-wrapper">
      <el-header>
        <Header/>
      </el-header>
      <el-container :class="height">
        <el-aside width="200px">
            <Menu/>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
      <el-footer>
        <Footer/>
      </el-footer>
    </el-container>
  </div>
 </template>
 
 <script setup lang="ts">
 import Menu from './components/menu/index.vue'
 import Header from './components/header/index.vue'
 import Footer from './components/footer/index.vue'
 import { useRoute } from 'vue-router';
 const route = useRoute()
 console.log(route)
  const height = route.meta.hidden ?  'footer_hidden' : 'footer_play' 
 </script>
 
 <style scoped lang="scss">
 .app-wrapper{
    width: 100%;
    position: absolute;
    max-width: 100%;
    min-width: 1366px;
    .el-header{
        border-bottom: 1px solid gray;
        padding: 0;
    }
    .el-container{
      min-width: 1366px;
    }
    .footer_hidden{
      height: 818px;
    }
    .footer_play{
      height: 774px;
    }
    .el-footer{
        background-color: rgb(247, 251, 255);
        height: 80px;
    }
 }
 </style>