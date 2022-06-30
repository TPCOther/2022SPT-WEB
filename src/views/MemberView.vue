<template>
  <n-row>
    <n-card title="会员列表" header-style="text-align:left">
        <n-space style="margin-bottom: 20px">
            <n-select v-model:value="value" :options="options" placeholder="会员等级"/>
            <n-input v-model:value="value" type="text" placeholder="基本的 Input" />
            <n-button type="primary">查询</n-button>
        </n-space>
        <n-data-table
        :columns="columns"
        :data="datas"
        :pagination="pagination"
        :bordered="false"
        />
    </n-card>
  </n-row>
</template>

<script>
import { useMemberEffect } from '../utils/member'
export default {
  name: 'member',
  setup () {
    const { datas, columns, pagination } = useMemberEffect()
    return { datas, columns, pagination }
  }
}
</script>

<style lang="scss" scoped>
.n-select{
    width: 194px;
}

</style>
