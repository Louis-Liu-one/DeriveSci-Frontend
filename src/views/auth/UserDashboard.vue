<template>
  <div>
    <div>Welcome, {{ authStore.userInfo?.userName }}</div>
    <n-button type="primary" @click="handleLogout">Logout</n-button>
  </div>
</template>

<script setup lang="ts">
import { NButton } from 'naive-ui'

import router from '@/router'
import { useAuthStore } from '@/stores/modules/auth'

const authStore = useAuthStore()

const handleLogout = async () => {
  await authStore.logout()
  router.push({ name: 'Login' })
}
</script>
