<template>
  <n-grid :cols="2" x-gap="24" y-gap="24">
    <n-gi v-for="order in orders" :key="order.orderId">
        <n-card content-style="padding: 8px;">
            <n-collapse>
                <n-collapse-item :name="order.orderId">
                <template #header><div class="order-caption">订单号{{order.orderId}}</div></template>
                <template #header-extra><div class="order-caption">{{order.createTime}}</div></template>
                <n-space vertical v-for="dish in order.dishes" :key="dish.name" :class="{done: dish.done}">
                    <n-space justify="space-between" class="order-item">
                    <div class="order-item-caption">{{dish.name}}</div>
                    <a class="order-item-amount">x{{dish.amount}}</a>
                    <n-checkbox v-model:checked="dish.done">
                    制作完成
                    </n-checkbox>
                    </n-space>
                </n-space>
                </n-collapse-item>
            </n-collapse>
        </n-card>
    </n-gi>
  </n-grid>
</template>

<script>
import { reactive } from 'vue'
export default {
  name: 'kitchen',
  setup () {
    const orders = reactive([
      {
        orderId: '114514',
        createTime: '19:00',
        dishes: [
          {
            name: '宫保鸡丁',
            amount: 2,
            done: false
          },
          {
            name: '葱油拌面',
            amount: 1,
            done: false
          },
          {
            name: '日式豆腐煲',
            amount: 1,
            done: false
          }
        ]
      },
      {
        orderId: '114515',
        createTime: '18:00',
        dishes: [
          {
            name: '宫保鸡丁',
            amount: 2,
            done: false
          },
          {
            name: '葱油拌面',
            amount: 1,
            done: false
          },
          {
            name: '日式豆腐煲',
            amount: 1,
            done: false
          }
        ]
      },
      {
        orderId: '114516',
        createTime: '18:00',
        dishes: [
          {
            name: '宫保鸡丁',
            amount: 2,
            done: false
          },
          {
            name: '葱油拌面',
            amount: 1,
            done: false
          },
          {
            name: '日式豆腐煲',
            amount: 1,
            done: false
          }
        ]
      }
    ])

    return { orders }
  }
}
</script>

<style lang="scss" scoped>
.n-card {
  box-shadow: 0px 0px 3px #dddddd;
}

.order{
    &-caption{
        font-size: 18px;
        font-weight: bold;
    }
    &-item{
        position: relative;
        padding: 8px;
        &-caption{
            font-size: 16px;
            font-weight: bold;
            color: #18a058;
        }
        &-amount{
            position: absolute;
            left: 250px;
            font-size: 16px;
            font-weight: bold;
            color: #999;
        }
    }
}

.done {
    text-decoration: line-through;
}
</style>
