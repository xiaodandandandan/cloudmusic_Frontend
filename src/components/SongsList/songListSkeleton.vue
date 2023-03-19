<template>
  <el-card class="card" v-for="item in times">
    <el-skeleton animated :throttle="500">
      <template #template>
        <el-skeleton-item
          variant="image"
          style="width: 232.46px; height: 232.46px; margin-bottom: 10px"
        />
        <el-skeleton-item variant="p" />
      </template>
    </el-skeleton>
  </el-card>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
defineProps<{
  times?: number
}>()
</script>

<style scoped>
.card {
  width: 19%;
  margin-bottom: 10px;
  border-radius: 10px;
}
</style>
