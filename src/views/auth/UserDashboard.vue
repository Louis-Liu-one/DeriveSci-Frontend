<template>
  <div>
    <div>Welcome, {{ authStore.userInfo?.userName }}</div>
    <n-button type="primary" @click="handleLogout">Logout</n-button>
    <n-button type="primary" @click="handleUnregister">Unregister</n-button>
  </div>
</template>

<script setup lang="ts">
import { NButton } from 'naive-ui'
import { useDialog, useMessage } from 'naive-ui'

import router from '@/router'
import { useAuthStore } from '@/stores/modules/auth'

const message = useMessage()
const dialog = useDialog()
const authStore = useAuthStore()

const handleLogout = async () => {
  await authStore.logout()
  router.push({ name: 'Login' })
}

const handleUnregister = async () => {
  const d = dialog.warning({
    title: '确认注销账户吗？',
    content: '注销后，您的所有数据将被永久删除且无法恢复，请谨慎操作。',
    positiveText: '确认注销',
    negativeText: '取消',
    closable: false,
    maskClosable: false,
    onPositiveClick: () => {
      d.loading = true
      return new Promise((resolve) => {
        setTimeout(async () => {
          try {
            await authStore.unregister()
            router.push({ name: 'Login' })
            resolve(true)
          } catch (error) {
            message.error(`注册失败：${error}`)
            resolve(false)
          }
        }, 1500)
      })
    },
    onNegativeClick: () => {
      message.info('已取消操作')
    },
  })
}
</script>
