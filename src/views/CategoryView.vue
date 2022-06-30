<template>
  <n-row>
    <n-space justify="space-between" style="width:100%">
        <div>查询到20条</div>
        <n-button type="primary" ghost>
            <template #icon>
                <n-icon><add-icon /></n-icon>
            </template>
            新增类别
        </n-button>
    </n-space>
  </n-row>
  <n-row>
    <n-space style="width:100%" vertical>
        <n-card hoverable v-for="item in categories" :key="item.name">
            <n-space justify="space-between">
                <div class="category">
                    <div class="category-title">{{item.name}}</div>
                    <div class="category-num">{{item.amount}}个商品</div>
                </div>
                <n-space class="category">
                    <a>排序值</a>
                    <n-input-number v-model:value="item.priority" clearable/>
                </n-space>
                <n-space>
                    <n-button type="primary">编辑</n-button>
                    <n-button type="error">删除</n-button>
                </n-space>
            </n-space>
        </n-card>
    </n-space>
  </n-row>
</template>

<script>
import { AddCircleOutline as AddIcon } from '@vicons/ionicons5'
import { useCategoryEffect } from '../utils/category'
export default {
  name: 'category',
  components: {
    AddIcon
  },
  setup () {
    const { categories } = useCategoryEffect()

    return { categories }
  }
}
</script>

<style lang="scss" scoped>
.n-row {
    margin-bottom: 20px !important;
}

.category {
    display: flex;
    align-items: center;
    font-weight: bold;
    width: 300px;
    position: relative;
    &-title{
        font-size: 16px;
        margin-right: 48px;
    }
    &-num{
        position: absolute;
        left: 150px;
        color: #ffa931;
    }
}
</style>
