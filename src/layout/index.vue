 <template>
  <div class="common-layout">
    <el-container class="app-wrapper">
      <el-header>
        <Header/>
      </el-header>
      <el-container>
        <el-aside width="200px">
            <Menu/>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
 </template>
 
 <script setup lang="ts">
 import Menu from './components/menu/index.vue'
 import Header from './components/header/index.vue'
 </script>
 
 <style scoped lang="scss">
 .app-wrapper{
    height: 100%;
    width: 100%;
    position: absolute;
    max-width: 1674px;
    .el-header{
        border-bottom: 1px solid gray;
        padding: 0;
    }
    .el-footer{
        background-color: rgb(247, 251, 255);
        padding: 0;
    }
 }
 </style>