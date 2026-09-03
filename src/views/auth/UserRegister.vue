<template>
  <AuthLayout>
    <template #left>
      <n-h2>欢迎加入 DeriveSci</n-h2>
      <n-form ref="formRef" :model="formData" :rules="rules">
        <n-form-item label="用户名" path="userName">
          <n-input
            type="text"
            :input-props="{ autocomplete: 'username' }"
            v-model:value="formData.userName"
          />
        </n-form-item>
        <n-form-item label="性别" path="gender">
          <GenderSelect v-model:value="formData.gender" />
        </n-form-item>
        <n-form-item label="密码" path="password">
          <n-input
            type="password"
            :input-props="{ autocomplete: 'new-password' }"
            v-model:value="formData.password"
            placeholder="请设置密码"
          />
        </n-form-item>
        <n-form-item label="确认密码" path="confirmPassword">
          <n-input
            type="password"
            :input-props="{ autocomplete: 'new-password' }"
            v-model:value="formData.confirmPassword"
            placeholder="再次输入密码"
          />
        </n-form-item>
        <n-form-item label="头像" path="avatar">
          <n-upload
            :default-upload="false"
            list-type="image-card"
            :max="1"
            accept="image/*"
            @change="handleAvatarChange"
          >
            点击上传
          </n-upload>
        </n-form-item>
        <n-form-item :show-feedback="false">
          <n-button type="primary" @click="handleSubmit" block>注册</n-button>
        </n-form-item>
      </n-form>
    </template>
    <template #right>
      <h3>已有账号？</h3>
      <n-button @click="handleJumpToLogin">登录</n-button>
      <h3>不想登录或注册？</h3>
      <n-button>开始探索</n-button>
    </template>
  </AuthLayout>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'
import { NH2, NButton, NForm, NFormItem, NInput, NUpload } from 'naive-ui'
import type { FormInst, FormRules, UploadFileInfo } from 'naive-ui'

import { useAuthStore } from '@/stores/modules/auth'
import { register } from '@/api/modules/auth'
import type { ApiResponse } from '@/api/types'
import AuthLayout from '@/layouts/AuthLayout.vue'
import GenderSelect from '@/components/forms/GenderSelect.vue'

const message = useMessage()
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const redirect = route.query.redirect as string

const formRef = ref<FormInst | null>(null)

const formData = reactive({
  userName: '',
  gender: null as number | null,
  password: '',
  confirmPassword: '',
  avatar: null as File | null,
})

const rules: FormRules = {
  userName: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  password: [{ required: true, message: '必须设置密码', trigger: 'blur' }],
  confirmPassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    {
      validator: (_rule, value) => {
        return value === formData.password
      },
      message: '两次输入的密码不一致',
      trigger: ['blur', 'input'],
    },
  ],
}

const handleAvatarChange = (options: { file: UploadFileInfo }) => {
  const file = options.file.file
  if (file) formData.avatar = file
}

const handleSubmit = async () => {
  try {
    await formRef.value?.validate()
  } catch {
    return
  }
  try {
    const response = await register({
      userName: formData.userName,
      gender: formData.gender,
      password: formData.password,
      avatar: formData.avatar,
    })
    authStore.setAuth(response.data.token, response.data.user)
    message.success('注册成功')
    router.push(redirect || { name: 'Dashboard' })
  } catch (error: unknown) {
    message.error((error as ApiResponse).msg || '网络错误，请稍后重试')
  }
}

const handleJumpToLogin = () => {
  router.push({ name: 'Login', query: { redirect } })
}
</script>
