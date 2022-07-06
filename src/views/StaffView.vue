<template>
  <n-row>
    <n-card title="员工列表" header-style="text-align:left">
        <n-space style="margin-bottom: 20px" justify="space-between">
          <n-space>
              <n-select v-model:value="value" :options="roles" placeholder="员工权限"/>
              <n-input v-model:value="value" type="text" placeholder="员工名字/手机号" />
              <n-button type="primary">查询</n-button>
          </n-space>
          <n-button type="primary" quaternary @click="showModal = true">
                <template #icon>
                    <n-icon><add-icon /></n-icon>
                </template>
                添加员工
            </n-button>
          </n-space>
        <n-data-table
        :columns="columns"
        :data="datas"
        :pagination="pagination"
        :bordered="false"
        :row-key="row => row.id"
        />
    </n-card>
  </n-row>
    <n-modal v-model:show="showModal" preset="card" title="新增员工" :bordered="false" :segmented="segmented" style="width: 600px">
    <n-space vertical>
      <div>
      <div style="margin-bottom: 10px; font-weight: bold; font-size: 16px">员工名</div>
      <n-input v-model:value="newStaff.name" type="text" placeholder="" />
      </div>
      <div>
      <div style="margin-bottom: 10px; font-weight: bold; font-size: 16px">员工职位</div>
      <n-select v-model:value="newStaff.role" :options="roles" />
      </div>
      <div>
      <div style="margin-bottom: 10px; font-weight: bold; font-size: 16px">联系电话</div>
      <n-input v-model:value="newStaff.phone" type="text" placeholder="" />
      </div>
      <div>
      <div style="margin-bottom: 10px; font-weight: bold; font-size: 16px">登录账户</div>
      <n-input v-model:value="newStaff.username" type="text" placeholder="" />
      </div>
      <div>
      <div style="margin-bottom: 10px; font-weight: bold; font-size: 16px">登录密码</div>
      <n-input v-model:value="newStaff.password" type="text" placeholder="" />
      </div>
    </n-space>
    <template #footer>
      <n-space>
        <n-button type="primary" @click="addStaff">确认</n-button>
        <n-button type="error" @click="showModal = false">取消</n-button>
      </n-space>
    </template>
  </n-modal>
</template>

<script>
import { useStaffEffect } from '../utils/staff'
import { AddCircleOutline as AddIcon } from '@vicons/ionicons5'
import { onMounted, ref } from 'vue'
export default {
  name: 'member',
  components: {
    AddIcon
  },
  setup () {
    const showModal = ref(false)
    const newStaff = ref({
      name: '',
      role: '',
      phone: '',
      username: '',
      password: ''
    })
    const { datas, columns, pagination, roles, getStaff, addStaff } = useStaffEffect(newStaff)
    onMounted(() => {
      getStaff()
    })
    return { showModal, newStaff, datas, columns, pagination, roles, addStaff }
  }
}
</script>

<style lang="scss" scoped>
.n-select{
    width: 194px;
}

</style>
