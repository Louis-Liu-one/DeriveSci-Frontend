<template>
  <n-config-provider
    :locale="zhCN"
    :theme="isDark ? darkTheme : null"
    :theme-overrides="isDark ? darkThemeOverrides : lightThemeOverrides"
  >
    <n-global-style />
    <n-message-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </n-notification-provider>
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  NGlobalStyle,
  NConfigProvider,
  NMessageProvider,
  NDialogProvider,
  NNotificationProvider,
} from 'naive-ui'
import { zhCN } from 'naive-ui'

import { lightThemeOverrides, darkThemeOverrides, darkTheme } from '@/styles/theme'

const isDark = ref(false)

const savedTheme = localStorage.getItem('theme')
if (savedTheme === 'dark') isDark.value = true
else if (savedTheme === 'light') isDark.value = false
else isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
</script>
