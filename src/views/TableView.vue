<template>
  <n-row>
    <n-card title="区域" header-style="text-align: left" segmented>
        <template #header-extra>
            <n-space>
                <n-button type="primary" quaternary>
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
            <n-tag checkable v-for="item in areas" :key="item">{{item}}</n-tag>
        </n-space>
    </n-card>
  </n-row>
  <n-row>
    <n-card title="全部" header-style="text-align: left" content-style="text-align: center" segmented>
        <template #header-extra>
            <n-space>
                <n-button type="primary" quaternary>
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
        <n-grid x-gap="24" y-gap="8" cols="6">
            <n-gi v-for="item in tables" :key="item">
                <n-card content-style="padding: 0;" class="table" :class="{'active': !item.isfree }" @click="activate()">
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
  <n-drawer v-model:show="active" width="600" placement="right">
    123
  </n-drawer>
</template>

<script>
import { reactive, ref } from 'vue'
import { AddCircleOutline as AddIcon, SettingsOutline as SettingIcon } from '@vicons/ionicons5'
export default {
  name: 'TableView',
  components: {
    AddIcon,
    SettingIcon
  },
  setup () {
    const areas = reactive(['全部', '一楼', '二楼', '三楼', '包间：春暖花开', '包间：桃红柳绿', '包间：凌霜傲雪', '春兰', '夏荷', '秋棠', '冬梅', '吉祥厅', '如意厅', '福禄厅', '亨通厅'])

    const tables = reactive([
      {
        area: '一楼',
        number: '1',
        isfree: 0,
        cost: '560.0'
      },
      {
        area: '一楼',
        number: '2',
        isfree: 0,
        cost: '224.0'
      },
      {
        area: '一楼',
        number: '3',
        isfree: 1,
        cost: ''
      },
      {
        area: '一楼',
        number: '4',
        isfree: 1,
        cost: ''
      },
      {
        area: '一楼',
        number: '5',
        isfree: 0,
        cost: '312.0'
      },
      {
        area: '一楼',
        number: '6',
        isfree: 0,
        cost: '780.0'
      },
      {
        area: '包间：春暖花开',
        number: '1',
        isfree: 0,
        cost: '1180.0'
      }
    ])

    const active = ref(false)

    const activate = () => {
      active.value = true
    }
    return { areas, tables, active, activate }
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
</style>
