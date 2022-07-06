<template>
  <n-row>
    <n-card title="区域" header-style="text-align: left" segmented>
        <template #header-extra>
            <n-space>
                <n-button type="primary" quaternary @click="showAreaModal = true">
                    <template #icon>
                        <n-icon><add-icon /></n-icon>
                    </template>
                    添加区域
                </n-button>
                <n-button type="primary" quaternary>
                    <template #icon>
                        <n-icon><setting-icon /></n-icon>
                    </template>
                    管理区域
                </n-button>
            </n-space>
        </template>
        <n-space>
            <n-tag checkable v-model:checked="checked[index]" @click="filterArea(item)"
            v-for="(item, index) in areas" :key="item">{{item.label}}</n-tag>
        </n-space>
    </n-card>
  </n-row>
  <n-row>
    <n-card title="全部" header-style="text-align: left" content-style="text-align: center" segmented>
        <template #header-extra>
            <n-space>
                <n-button type="primary" @click="showTableModal = true" quaternary>
                    <template #icon>
                        <n-icon><add-icon /></n-icon>
                    </template>
                    添加桌台
                </n-button>
                <n-button type="primary" quaternary>
                    <template #icon>
                        <n-icon><setting-icon /></n-icon>
                    </template>
                    编辑桌台
                </n-button>
            </n-space>
        </template>
        <n-grid x-gap="24" y-gap="8" cols="2 1280:6 1000:4 600:3">
            <n-gi v-for="item in currentTable" :key="item">
                <n-card content-style="padding: 0;" class="table" :class="{'active': !item.isfree }" @click="activate(item.id)">
                    <div class="table-header" :class="{'active-header': !item.isfree }">
                        <div class="table-caption">{{item.area}}</div>
                        <div class="table-text" :class="{'active-text': !item.isfree }">({{item.number}}号桌)</div>
                    </div>
                    <div class="table-content">
                        <a class="table-number" v-if="!item.isfree">{{item.cost}}</a>
                        <a class="table-status" v-else>空闲</a>
                    </div>
                </n-card>
            </n-gi>
        </n-grid>
    </n-card>
  </n-row>
  <n-drawer v-model:show="active" width="600" placement="right" content-style="padding: 20px; position: relative;">
    <n-h2>菜品列表</n-h2>
    <n-divider></n-divider>
    <n-space content-style="width: 100%;" vertical :size="24">
      <div class="order" v-for="item in orderinfo" :key="item.name">
        <div>{{item.name}}</div>
        <div class="order-price">￥{{item.price}}</div>
        <div class="order-amount">x{{item.amount}}份</div>
      </div>
    </n-space>
    <n-divider></n-divider>
    <div class="total">
      <div class="total-title">合计</div>
      <div class="total-price">￥{{total}}</div>
    </div>
    <div class="footer">
      <n-button class="footer-btn" type="primary" @click="active = false" block>确认结账</n-button>
    </div>
  </n-drawer>
  <n-modal v-model:show="showAreaModal" preset="card" title="新增区域" :bordered="false" :segmented="segmented" style="width: 600px">
    <div style="margin-bottom: 16px; font-weight: bold; font-size: 16px">新区域名</div>
    <n-input v-model:value="newArea" type="text" placeholder="" />
    <template #footer>
      <n-space>
        <n-button type="primary" @click="addArea">确认</n-button>
        <n-button type="error" @click="showAreaModal = false">取消</n-button>
      </n-space>
    </template>
  </n-modal>
    <n-modal v-model:show="showTableModal" preset="card" title="新增桌台" :bordered="false" :segmented="segmented" style="width: 600px">
    <n-space vertical>
      <div>
      <div style="margin-bottom: 16px; font-weight: bold; font-size: 16px">桌台名</div>
      <n-input v-model:value="newTable.dinTableName" type="text" placeholder="" />
      </div>
      <div>
      <div style="margin-bottom: 16px; font-weight: bold; font-size: 16px">桌台区域</div>
      <n-select v-model:value="newTable.areaId" :options="areas" />
      </div>
    </n-space>
    <template #footer>
      <n-space>
        <n-button type="primary" @click="addTable">确认</n-button>
        <n-button type="error" @click="showTableModal = false">取消</n-button>
      </n-space>
    </template>
  </n-modal>
</template>

<script>
import { useTableEffect } from '@/utils/table'
import { ref, computed, onMounted } from 'vue'
import { AddCircleOutline as AddIcon, SettingsOutline as SettingIcon } from '@vicons/ionicons5'
export default {
  name: 'TableView',
  components: {
    AddIcon,
    SettingIcon
  },
  setup () {
    const showTableModal = ref(false)
    const showAreaModal = ref(false)
    const checked = ref([])
    const currentArea = ref('全部')
    const newArea = ref('')
    const newTable = ref({
      areaId: 0,
      dinTableName: ''
    })
    const { areas, tables, orderinfo, total, getArea, getTable, getTableOrder, addArea, addTable } = useTableEffect(newArea, newTable, showAreaModal, showTableModal)

    const filterArea = (area) => {
      if (currentArea.value === '全部') {
        currentArea.value = area.label
      } else {
        currentArea.value = '全部'
      }
    }

    const currentTable = computed(() => {
      if (currentArea.value === '全部') {
        return tables
      } else {
        return tables.filter(item => item.area === currentArea.value)
      }
    })

    const active = ref(false)

    const activate = async (id) => {
      await getTableOrder(id)
      active.value = true
    }

    onMounted(() => {
      getArea()
      getTable()
    })

    return { showTableModal, showAreaModal, checked, currentArea, newArea, newTable, areas, tables, currentTable, filterArea, active, activate, orderinfo, total, addArea, addTable }
  }
}
</script>

<style lang="scss" scoped>
.n-row {
    margin-bottom: 24px !important;
}

.table {
    min-width: 200px;
    min-height: 200px;
    border-radius: 8px;
    border: 1px solid #bbbbbb;
    background-color: #f5f5f5;
    &-header{
      box-sizing: border-box;
      padding: 8px 0;
      height: 80px;
      border-radius: 8px 8px 0 0;
      border-bottom: 1px solid #bbbbbb;
    }
    &-caption{
      margin-bottom: 4px;
      font-size: 20px;
      font-weight: bold;
    }
    &-text{
      color: #848484;
      font-weight: bold;
    }
    &-content{
        box-sizing: border-box;
        padding: 48px;
    }
    &-status{
        font-size: 32px;
        color: #aa9f9f;
    }
    &-number{
      font-size: 32px;
      color: red;
    }
    &:hover{
        cursor: pointer;
        box-shadow: 0 0 16px #acacac;
    }
}

.active {
    background-color: #ffffff;
    &-header{
        border-color: #3758ff;
        background-color: #3758ff;
        color: #fff;
    }
    &-text{
        color: #fff;
    }
}

.order{
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  font-size: 20px;
  font-weight: bold;
  &-price{
    margin-left: auto;
  }
  &-amount{
    width: 100%;
    margin-top: 4px;
    font-size: 16px;
    color: #848484;
  }
}

.total{
  display: flex;
  align-items: center;
  &-title{
    font-size: 20px;
  }
  &-price{
    margin-left: auto;
    font-size: 24px;
    font-weight: bold;
  }
}

.footer {
  position: absolute;
  bottom: 0;
  width: 93%;
  padding: 24px 0;
}
</style>
