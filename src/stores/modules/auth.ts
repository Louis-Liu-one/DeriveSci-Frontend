// src/stores/modules/auth.ts
import { defineStore } from 'pinia'
import axios from 'axios'

import { request } from '@/api'
import type { User } from '@/api/types'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null,
    userInfo: null as User | null,
    isLoggedIn: false,
    initialized: false,
  }),

  getters: {
    isAdmin(state): boolean {
      return state.userInfo?.isAdmin ?? false
    },
  },

  actions: {
    setAuth(token: string, user: User) {
      this.setAccessToken(token)
      this.userInfo = user
      this.isLoggedIn = true
    },
    setAccessToken(token: string | null) {
      this.token = token
    },
    async initialize() {
      try {
        const meResponse = await request.get('/auth/me')
        this.userInfo = meResponse.data
        this.isLoggedIn = true
      } catch {
        this.clear()
      } finally {
        this.initialized = true
      }
    },
    async logout() {
      try {
        await axios.post(
          '/api/auth/logout',
          {},
          { headers: { Authorization: `Bearer ${this.token}` }, withCredentials: true },
        )
      } finally {
        this.clear()
      }
    },
    clear() {
      this.setAccessToken(null)
      this.userInfo = null
      this.isLoggedIn = false
    },
  },
})
