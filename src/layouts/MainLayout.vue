<template>
  <n-layout class="layout">
    <AppHeader />
    <n-layout-content><slot /></n-layout-content>
    <AppFooter />
  </n-layout>
</template>

<script setup lang="ts">
import { NLayout, NLayoutContent } from 'naive-ui'
import AppHeader from '@/components/business/AppHeader.vue'
import AppFooter from '@/components/business/AppFooter.vue'
</script>

<style scoped>
.layout,
.layout:deep(.n-layout-scroll-container) {
  display: flex;
  flex-direction: column;
  overflow: visible;
}

.layout {
  min-height: 100vh;
}

.layout:deep(.n-layout-scroll-container) {
  flex: 1;
}
</style>
