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
        <n-form-item label="性别" path="gender">
          <GenderSelect v-model:value="formData.gender" />
        </n-form-item>
        <n-form-item label="密码" path="password">
          <n-input
            type="password"
            :input-props="{ autocomplete: 'new-password' }"
            v-model:value="formData.password"
          />
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
import { NButton, NForm, NFormItem, NInput } from 'naive-ui'
import type { FormInst, FormRules } from 'naive-ui'

import AuthLayout from '@/layouts/AuthLayout.vue'
import GenderSelect from '@/components/forms/GenderSelect.vue'

const message = useMessage()
const route = useRoute()
const router = useRouter()

const redirect = route.query.redirect as string

const formRef = ref<FormInst | null>(null)

const formData = reactive({
  userName: '',
  gender: null,
  password: '',
})

const rules: FormRules = {
  userName: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  password: [{ required: true, message: '必须设置密码', trigger: 'blur' }],
}

const handleSubmit = () => {
  formRef.value?.validate().then(() => {
    message.success('提交：' + String(formData))
  })
}

const handleJumpToLogin = () => {
  router.push({ name: 'Login', query: { redirect } })
}
</script>
