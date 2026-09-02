<template>
  <AuthLayout>
    <template #left>
      <n-form ref="formRef" :model="formData" :rules="rules">
        <n-form-item label="用户名" path="userName">
          <n-input
            type="text"
            :input-props="{ autocomplete: 'username' }"
            v-model:value="formData.userName"
          />
        </n-form-item>
        <n-form-item label="密码" path="password">
          <n-input
            type="password"
            :input-props="{ autocomplete: 'current-password' }"
            v-model:value="formData.password"
          />
        </n-form-item>
        <n-form-item :show-feedback="false">
          <n-button type="primary" @click="handleSubmit" block>登录</n-button>
        </n-form-item>
      </n-form>
    </template>
    <template #right>
      <h3>没有账号？</h3>
      <n-button @click="handleJumpToRegister">立即注册</n-button>
      <h3>不想登录或注册？</h3>
      <n-button>开始探索</n-button>
    </template>
  </AuthLayout>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'
import { NButton, NForm, NFormItem, NInput } from 'naive-ui'
import type { FormInst, FormRules } from 'naive-ui'

import AuthLayout from '@/layouts/AuthLayout.vue'
import { useAuthStore } from '@/stores/modules/auth'
import { login } from '@/api/modules/auth'
import type { ApiResponse } from '@/api/types'

const message = useMessage()
const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const redirect = route.query.redirect as string

const formRef = ref<FormInst | null>(null)

const formData = reactive({
  userName: '',
  password: '',
})

const rules: FormRules = {
  userName: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  password: [{ required: true, message: '必须输入密码', trigger: 'blur' }],
}

const handleSubmit = async () => {
  try {
    await formRef.value?.validate()
  } catch {
    return
  }
  try {
    const response = await login({
      userName: formData.userName,
      password: formData.password,
    })
    authStore.setAuth(response.data.token, response.data.user)
    message.success('登录成功')
    router.push(redirect || '/')
  } catch (error: unknown) {
    message.error((error as ApiResponse).msg || '网络错误，请稍后重试')
  }
}

const handleJumpToRegister = () => {
  router.push({ name: 'Register', query: { redirect } })
}
</script>
