import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/auth/login',
    name: 'Login',
    component: () => import('@/views/auth/UserLogin.vue'),
    meta: { title: '登录', requiresGuest: true },
  },
  {
    path: '/auth/register',
    name: 'Register',
    component: () => import('@/views/auth/UserRegister.vue'),
    meta: { title: '注册', requiresGuest: true },
  },
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('@/views/auth/UserDashboard.vue'),
    meta: { title: '主页', requiresAuth: true },
  },
]
