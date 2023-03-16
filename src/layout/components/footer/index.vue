<template>
  <div class="wrapper">
    <div class="left">
        <el-image :src="src" style="width: 50px; height: 50px"></el-image>
    </div>
    <div class="play">
        <div class="button">
            <svg-icon icon="randomPlay" class="footer_icon"></svg-icon>
            <svg-icon icon="playback" class="footer_icon"></svg-icon>
            <svg-icon icon="suspend" class="footer_icon"></svg-icon>
            <svg-icon icon="playnext" class="footer_icon"></svg-icon>
            <svg-icon icon="singlePlay" class="footer_icon"></svg-icon>
        </div>
        <div class="progress"></div>
    </div>
    <div class="right">
        <svg-icon icon="queryQueue" class="footer_icon"></svg-icon>
        <svg-icon icon="volume" class="footer_icon"></svg-icon>
    </div>
  </div>
</template>

<script setup lang='ts' >
const src =  'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
</script>

<style scoped lang="scss">
.wrapper{
    display: flex;
    align-items: center;
    .footer_icon{
        width: 30px;
        height: 30px;
        margin: 8px;
        cursor: pointer;
    }
    .left{
        margin-top: 5px;
    }
    .play{
        display: flex;
        justify-content: center;
        flex: 1;
    }
}

</style>