<template>
  <n-layout class="auth-layout">
    <n-card class="auth-card">
      <n-grid class="auth-card__grid" cols="1 s:24" :x-gap="16" :y-gap="16" responsive="screen">
        <n-grid-item class="auth-card__left" span="1 s:15">
          <n-scrollbar class="auth-card__scrollbar">
            <slot name="left"></slot>
          </n-scrollbar>
        </n-grid-item>
        <n-grid-item class="auth-card__right" span="1 s:9">
          <n-scrollbar class="auth-card__scrollbar">
            <n-avatar round :size="72" object-fit="cover" src="/favicon-inverted.svg"></n-avatar>
            <slot name="right"></slot>
          </n-scrollbar>
        </n-grid-item>
      </n-grid>
    </n-card>
  </n-layout>
</template>

<script setup lang="ts">
import { NLayout, NCard, NGrid, NGridItem, NAvatar, NScrollbar } from 'naive-ui'
</script>

<style scoped>
.auth-layout {
  height: 100vh;
}

.auth-card {
  position: absolute;
  inset: 0;
  margin: auto;
  width: 720px;
  height: 475px;
  border-radius: 45px;
}

.auth-card:deep(.n-card-content) {
  height: 100%;
}

.auth-card__grid {
  height: 100%;
}

.auth-card__left {
  width: 100%;
  height: 100%;
  margin: auto;
  overflow-y: auto;
  border-right: 1px solid var(--n-border-color);
}

.auth-card__right {
  display: flex;
  place-content: center;
  place-items: center;
  width: 90%;
  height: 100%;
  margin: auto;
  overflow-y: auto;
}

:deep(.auth-card__scrollbar) .n-scrollbar-content {
  display: flex;
  flex-direction: column;
  place-content: center;
  place-items: center;
  min-height: 100%;
  padding: 20px;
}

@media (max-width: 768px) {
  .auth-layout {
    overflow-y: auto;
  }

  .auth-card {
    position: static;
    width: 100vw;
    height: fit-content;
    min-height: 100vh;
    border-radius: 0;
  }

  .auth-card__grid {
    min-height: 100%;
  }

  .auth-card__left {
    border: none;
  }
}
</style>
