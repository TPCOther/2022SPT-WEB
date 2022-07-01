<template>
  <n-row>
    <n-card title="员工列表" header-style="text-align:left">
        <n-space style="margin-bottom: 20px">
            <n-select v-model:value="value" :options="roles" placeholder="员工权限"/>
            <n-input v-model:value="value" type="text" placeholder="员工名字/手机号" />
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
import { useStaffEffect } from '../utils/staff'
export default {
  name: 'member',
  setup () {
    const { datas, columns, pagination, roles } = useStaffEffect()
    return { datas, columns, pagination, roles }
  }
}
</script>

<style lang="scss" scoped>
.n-select{
    width: 194px;
}

</style>
