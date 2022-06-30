<template>
  <n-layout-sider bordered
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :collapsed="collapsed"
        show-trigger
        @collapse="collapsed = true"
        @expand="collapsed = false"
      >
    <div class="header">
      <div class="header-caption">SPT点餐管理后台</div>
    </div>
    <n-menu :options="menuOptions" style="text-align: left"
          :collapsed="collapsed"
          :collapsed-width="64"
          :collapsed-icon-size="22"></n-menu>
  </n-layout-sider>
</template>

<script>
import { h, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { NIcon } from 'naive-ui'
import {
  LogInOutline, HomeOutline, GridOutline,
  ClipboardOutline, StorefrontOutline, RestaurantOutline,
  LayersOutline, PeopleOutline
} from '@vicons/ionicons5'

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
        label: renderLink('Sales', '销售管理'),
        key: 'Sales',
        icon: renderIcon(StorefrontOutline)
      },
      {
        label: renderLink('Order', '订单管理'),
        key: 'Order',
        icon: renderIcon(ClipboardOutline)
      },
      {
        label: renderLink('Dish', '菜品管理'),
        key: 'Dish',
        icon: renderIcon(RestaurantOutline),
        children: [
          {
            label: renderLink('Category', '菜品分类'),
            key: 'Category',
            icon: renderIcon(LayersOutline)
          }
        ]
      },
      {
        label: renderLink('Member', '会员管理'),
        key: 'Member',
        icon: renderIcon(PeopleOutline)
      },
      {
        label: renderLink('Login', '登录'),
        key: 'Login',
        icon: renderIcon(LogInOutline)
      }
    ]

    const collapsed = ref(false)

    return { menuOptions, collapsed }
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

@media screen and (max-width: 240px){
  .header{
    display: none;
  }
}
</style>
