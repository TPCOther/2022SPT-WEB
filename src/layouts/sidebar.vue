<template>
  <n-layout-sider bordered>
    <div class="header">
      <div class="header-caption">SPT点餐管理后台</div>
    </div>
    <n-menu :options="menuOptions"></n-menu>
  </n-layout-sider>
</template>

<script>
import { h } from 'vue'
import { RouterLink } from 'vue-router'
import { NIcon } from 'naive-ui'
import { LogInOutline, HomeOutline, GridOutline } from '@vicons/ionicons5'

function renderIcon (icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

function renderLink (link, name) {
  return () => h(RouterLink, {
    to: {
      name: link
    }
  }, { default: () => name })
}

export default {
  name: 'Sidebar',
  setup () {
    const menuOptions = [
      {
        label: renderLink('Home', '首页'),
        key: 'Home',
        icon: renderIcon(HomeOutline)
      },
      {
        label: renderLink('Table', '餐桌管理'),
        key: 'Table',
        icon: renderIcon(GridOutline)
      },
      {
        label: renderLink('Login', '登录'),
        key: 'Login',
        icon: renderIcon(LogInOutline)
      }
    ]

    return { menuOptions }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  height: 10vh;
  padding: 0 8px;
  justify-content: center;
  align-items: center;
  &-caption {
    color: #18a058;
    font-weight: bold;
    font-size: 24px;
  }
}
</style>
