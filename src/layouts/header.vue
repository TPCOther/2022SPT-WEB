<template>
  <n-layout-header bordered>
    <n-button text style="font-size: 20px">
      <n-icon :depth="2">
        <home-icon />
      </n-icon>
    </n-button>
    <n-breadcrumb>
      <n-breadcrumb-item>Dashboard</n-breadcrumb-item>
      <n-breadcrumb-item>Home</n-breadcrumb-item>
    </n-breadcrumb>
    <n-space :size="spacesize">
      <n-button text style="font-size: 20px">
        <n-badge dot processing>
          <n-icon :depth="2"><noti-icon /></n-icon>
        </n-badge>
      </n-button>
      <n-dropdown trigger="hover" :options="options">
        <n-avatar src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1443&q=80"/>
      </n-dropdown>
    </n-space>
  </n-layout-header>
</template>

<script>
import { HomeOutline as HomeIcon, NotificationsOutline as NotiIcon } from '@vicons/ionicons5'
export default {
  name: 'Header',
  components: {
    HomeIcon,
    NotiIcon
  },
  setup () {
    const spacesize = 24
    const options = [
      { key: 'me', label: 'Hey, Master' },
      { key: 'divider', type: 'divider' },
      { key: 'profile', label: 'Profile' },
      { key: 'settings', label: 'Settings' },
      { key: 'divider', type: 'divider' },
      { key: 'logout', label: 'Logout' }
    ]

    return { options, spacesize }
  }
}
</script>

<style lang="scss" scoped>
.n-layout-header {
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  padding: 9px 24px;
}

.n-breadcrumb{
  padding: 8px;
  margin-left: 8px;
}

.n-space{
  display: flex;
  align-items: center;
  margin-left: auto;
}
</style>
