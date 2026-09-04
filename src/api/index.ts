import axios from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'

import { useAuthStore } from '@/stores/modules/auth'

export const request: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 10000,
  withCredentials: true,
  xsrfCookieName: 'csrf_refresh_token',
  xsrfHeaderName: 'X-CSRF-TOKEN',
  headers: {
    'Content-Type': 'application/json',
  },
})

const refreshRequest = axios.create({
  baseURL: '/api',
  timeout: 10000,
  withCredentials: true,
  xsrfCookieName: 'csrf_refresh_token',
  xsrfHeaderName: 'X-CSRF-TOKEN',
})

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}

let refreshPromise: Promise<string | null> | null = null

async function refreshToken(): Promise<string | null> {
  const authStore = useAuthStore()
  try {
    const response = await refreshRequest.post('/auth/refresh')
    const newToken = response.data.data.token
    authStore.setAccessToken(newToken)
    return newToken
  } catch {
    authStore.clear()
    return null
  }
}

request.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    const token = authStore.token
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error),
)

request.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const response = error.response
    const config = error.config as CustomAxiosRequestConfig
    const code = response.data?.code || 'TOKEN_EXPIRED'
    if (!response || response.status != 401 || code !== 'TOKEN_EXPIRED' || config._retry)
      return Promise.reject(error.response?.data || { msg: '请求失败' })
    config._retry = true
    if (!refreshPromise) {
      refreshPromise = refreshToken()
      refreshPromise.finally(() => {
        refreshPromise = null
      })
    }
    const newToken = await refreshPromise
    if (!newToken) return Promise.reject({ msg: '登录已过期' })
    config.headers.Authorization = `Bearer ${newToken}`
    return request(config)
  },
)

export default request
