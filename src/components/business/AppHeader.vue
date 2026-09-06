<template>
  <n-layout-header class="header" bordered>
    <n-flex class="header__container" align="center" justify="space-between">
      <n-flex align="center">
        <n-avatar round :size="36" object-fit="cover" src="/favicon-inverted.svg"></n-avatar>
        <n-text strong>DeriveSci</n-text>
      </n-flex>
      <n-flex align="center">
        <n-menu
          v-if="!mobile"
          :options="menuOptions"
          @update:value="handleMenu"
          class="header__menu"
          mode="horizontal"
        />
        <n-button v-if="mobile" quaternary circle @click="showMenu = true">
          <n-icon :size="18"><MenuOutline /></n-icon>
        </n-button>
        <n-dropdown v-if="authStore.isLoggedIn">
          <n-flex align="center" :size="8">
            <n-avatar round size="medium" :src="authStore.userInfo?.avatar || undefined" />
            <n-text>{{ authStore.userInfo?.userName }}</n-text>
          </n-flex>
        </n-dropdown>
        <n-button v-else type="primary" ghost>登录 / 注册</n-button>
      </n-flex>
    </n-flex>
  </n-layout-header>
  <n-drawer v-model:show="showMenu" :trap-focus="false" placement="top">
    <n-drawer-content title="菜单">
      <n-menu :options="menuOptions" @update:value="handleMobileMenu" />
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import { h, ref } from 'vue'
import type { Component } from 'vue'
import { useRouter } from 'vue-router'
import {
  NLayoutHeader,
  NFlex,
  NMenu,
  NDrawer,
  NDrawerContent,
  NAvatar,
  NIcon,
  NDropdown,
  NButton,
  NText,
} from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import { MenuOutline, LayersOutline, ChatbubbleEllipsesOutline } from '@vicons/ionicons5'

import { useAuthStore } from '@/stores/modules/auth'
import { useResponsive } from '@/composables/useResponsive'

const authStore = useAuthStore()
const router = useRouter()
const { mobile } = useResponsive()

const renderIcon = (icon: Component) => {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions: MenuOption[] = [
  {
    label: '题集',
    key: 'Collection',
    icon: renderIcon(LayersOutline),
  },
  {
    label: '私信',
    key: 'Chat',
    icon: renderIcon(ChatbubbleEllipsesOutline),
  },
]

const showMenu = ref(false)

function handleMenu(key: string) {
  router.push({ name: key })
}

function handleMobileMenu(key: string) {
  showMenu.value = false
  router.push({ name: key })
}
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 1000;
  height: 50px;
}

.header__container {
  height: 100%;
  padding: 0 10px;
}

.header__menu {
  width: max-content;
}
</style>
