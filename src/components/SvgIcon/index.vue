<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'
const props = defineProps({
    icon: {
    type: String,
    required: true
  }
})
const iconName = computed(() => {
  return `#icon-${props.icon}`
})
</script>

<style scoped lang="scss">
.svg-icon{
    width: 24px;
    height: 18px;
    vertical-align: -0.15em;
    fill:currentColor;
    margin-right: 5px;
    overflow: hidden;
}
</style>
