<template>
  <n-row>
    <n-card title="筛选条件" header-style="text-align:left;" segmented>
        <n-grid cols="3" x-gap="48" y-gap="24">
            <n-gi class="option">
                <n-icon class="option-icon"><logo-wechat/></n-icon>
                <n-select v-model:value="value" :options="options" placeholder="支付方式"/>
            </n-gi>
            <n-gi class="option">
                <n-icon class="option-icon"><status-icon/></n-icon>
                <n-select v-model:value="value" :options="options" placeholder="订单状态"/>
            </n-gi>
            <n-gi></n-gi>
            <n-gi class="option">
                <n-icon class="option-icon"><calendar-icon/></n-icon>
                <n-date-picker v-model:value="range" type="daterange" clearable placeholder="时间范围">
                <template #date-icon>&nbsp;</template>
                </n-date-picker>
            </n-gi>
            <n-gi class="option">
                <n-icon class="option-icon"><cash-icon/></n-icon>
                <n-input-number v-model:value="value" placeholder="金额" :show-button="false" clearable>
                <template #suffix>￥</template>
                </n-input-number>
                <a class="option-text">至</a>
                <n-input-number v-model:value="value" placeholder="金额" :show-button="false" clearable>
                <template #suffix>￥</template>
                </n-input-number>
            </n-gi>
        </n-grid>
    </n-card>
  </n-row>
  <n-row>
    <div class="option" style="width: 30%">
        <n-input v-model:value="value" type="text" placeholder="订单号，顾客用户名/手机号"/>
        <n-button type="primary" style="width: 60px" block>
            <template #icon><n-icon><search-icon /></n-icon></template>
        </n-button>
    </div>
    <n-space class="sort">
    <n-button quaternary>
      下单时间
      <template #icon><n-icon><arrow-icon /></n-icon></template>
    </n-button>
    <n-button quaternary>
      订单金额
      <template #icon><n-icon><arrow-icon /></n-icon></template>
    </n-button>
    </n-space>
  </n-row>
  <n-row>
    <n-card title="订单列表" header-style="text-align:left;" segmented>
        <n-collapse class="order">
            <n-collapse-item v-for="item in orders" :key="item.orderId" :name="item.orderId">
            <template #header><a class="order-caption">订单号{{item.orderId}}</a></template>
            <template #header-extra><div class="order-item-title">2021-02-01 15:00:01</div></template>
            <n-space vertical>
                <div class="order-item" v-for="dish in item.dishes" :key="dish.dishName">
                    <img :src="dish.dishImgUrl" class="order-item-img">
                    <div class="order-item-title">{{dish.dishName}}</div>
                    <div class="order-item-data">
                        <a class="order-item-amount">x{{dish.dishNum}}</a>
                        <a class="order-item-price">￥{{dish.dishPrice}}</a>
                    </div>
                </div>
                <div class="order-footer">
                    <div class="order-footer-info">
                    共<a class="order-bold"> {{item.dishes.length}} </a>种，共<a class="order-bold"> {{getTotalNum(item.dishes)}} </a>个商品，总计：
                    <a class="order-total">￥{{getTotalPrice(item.dishes)}}</a>
                    </div>
                </div>
                <div style="display: flex; margin-top: 10px;">
                    <n-space>
                    <n-tag>订单未支付</n-tag>
                    <n-tag>上菜完成</n-tag>
                    </n-space>
                    <n-space style="margin-left: auto;">
                    <n-button type="error" block ghost>删除订单</n-button>
                    <n-button type="primary" block ghost>修改订单</n-button>
                    </n-space>
                </div>
            </n-space>
            </n-collapse-item>
        </n-collapse>
        <n-divider></n-divider>
        <n-pagination v-model:page="page" :page-count="100"/>
    </n-card>
  </n-row>
</template>

<script>
import {
  CheckboxOutline as StatusIcon,
  CalendarOutline as CalendarIcon,
  CashOutline as CashIcon,
  Search as SearchIcon,
  ArrowDownOutline as ArrowIcon,
  LogoWechat
} from '@vicons/ionicons5'
import { useOrderEffect } from '../utils/order'
import { onMounted } from 'vue'
export default {
  name: 'order',
  components: {
    StatusIcon,
    CalendarIcon,
    CashIcon,
    SearchIcon,
    ArrowIcon,
    LogoWechat
  },
  setup () {
    const { orders, getTotalPrice, getTotalNum, getOrders } = useOrderEffect()

    onMounted(() => {
      getOrders(10, 1)
    })

    return { orders, getTotalPrice, getTotalNum }
  }
}
</script>

<style lang="scss" scoped>
.n-row {
    margin-bottom: 24px !important;
}

.option {
  display: flex;
  align-items: center;
  &-icon {
    color: #fff;
    background-color: #18a058;
    font-size: 24px;
    padding: 5px;
  }
  &-text{
    display: block;
    margin: 0 12px;
  }
}

.sort{
    margin-left: auto;
}

.order{
    min-height: 400px;
    &-caption{
        font-size: 18px;
        font-weight: bold;
    }
    &-item{
        display: flex;
        align-items: center;
        font-weight: bold;
        padding-bottom: 8px;
        border-bottom: 1px dotted #c2c2c2;
        &-img{
            width: 32px;
            height: 32px;
            margin-right: 36px;
            border: 1px solid #bbbbbb;
        }
        &-data{
            margin-left: auto;
        }
        &-title{
            font-size: 16px;
        }
        &-amount{
            font-size: 20px;
            margin-right: 48px;
            color: #999;
        }
        &-price{
            font-size: 20px;
            color: #18a058;
        }
    }
    &-footer{
        margin-top: 10px;
        text-align: right;
        align-items: center;
        font-size: 16px;
        box-sizing: border-box;
        padding-bottom: 20px;
        border-bottom: 1px dotted #c2c2c2;
        &-info{
            margin-left: auto;
            font-size: 16px;
        }
    }
    &-bold {
        font-weight: bold;
    }
    &-total {
       font-size: 20px;
       color: red;
    }
}

.divider{
    border: 1px solid #bbbbbb;
    margin-bottom: 10px;
}
</style>
