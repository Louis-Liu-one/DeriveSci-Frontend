// src/router/guards.ts
import type { Router, RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '@/stores/modules/auth'

export function setupRouterGuards(router: Router) {
  router.beforeEach(async (to: RouteLocationNormalized) => {
    const authStore = useAuthStore()
    if (!authStore.initialized) await authStore.initialize()
    const isLoggedIn = authStore.isLoggedIn

    document.title = (to.meta?.title as string) ? `${to.meta.title} - DeriveSci` : 'DeriveSci'

    if (to.meta.requiresAuth && !isLoggedIn)
      return {
        name: 'Login',
        query: { redirect: to.fullPath },
      }

    if (to.meta.requiresGuest && isLoggedIn) return { name: 'Dashboard' }

    return true
  })
}
