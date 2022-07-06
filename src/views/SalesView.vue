<template>
  <n-row>
    <n-space style="align-items: center;">
    <a>统计范围</a>
    <n-date-picker v-model:value="range" type="daterange" clearable />
    <n-button type="primary" @click="getSalesData">
      查询
    </n-button>
    </n-space>
  </n-row>
  <n-row>
    <n-card title="营业额统计" header-style="text-align: left" segmented>
        <n-space vertical :size="24">
            <div class="income">
                <div>
                    <a class="income-num" style="color: #ff9502;">{{total.toFixed(2)}}</a>
                    <a class="income-text">合计收款</a>
                </div>
                <div>
                    <a class="income-num" style="color: #3758ff">{{(total - category[0].value - category[1].value - category[2].value).toFixed(2)}}</a>
                    <a class="income-text">实际收款</a>
                </div>
            </div>
            <n-grid cols="4" y-gap="8" style="text-align: left;">
                <n-gi v-for="item in category" :key="item.name">
                    <a class="category-num">{{item.value.toFixed(2)}}</a>
                    <p class="category-text">{{item.name}}</p>
                </n-gi>
            </n-grid>
            <div style="height: 40px;"><v-chart autoresize :option="incomeData" /></div>
        </n-space>
    </n-card>
  </n-row>
  <n-row>
    <n-card title="菜品销售统计" header-style="text-align: left" segmented>
        <n-grid cols="3" x-gap="24">
            <n-gi class="rank first">
                <div class="rank-num">1</div>
                <div class="rank-data">
                    <p class="rank-amout">{{sortedDishes[0].amount}}份</p>
                    <p class="rank-text">{{sortedDishes[0].name}}</p>
                </div>
            </n-gi>
            <n-gi class="rank second">
                <div class="rank-num">2</div>
                <div class="rank-data">
                    <p class="rank-amout">{{sortedDishes[1].amount}}份</p>
                    <p class="rank-text">{{sortedDishes[1].name}}</p>
                </div>
            </n-gi>
            <n-gi class="rank third">
                <div class="rank-num">3</div>
                <div class="rank-data">
                    <p class="rank-amout">{{sortedDishes[2].amount}}份</p>
                    <p class="rank-text">{{sortedDishes[2].name}}</p>
                </div>
            </n-gi>
        </n-grid>
        <div style="height: 400px;"><v-chart autoresize :option="dishData" /></div>
    </n-card>
  </n-row>
</template>

<script>
import { ref, reactive, computed } from 'vue'
import { post } from '@/utils/request'
export default {
  name: 'sales',
  setup () {
    const range = ref([Date.now(), Date.now()])

    const category = ref([
      {
        name: '积分消费',
        value: 460.00
      },
      {
        name: '优惠券',
        value: 20.00
      },
      {
        name: '优惠折扣',
        value: 350.00
      },
      {
        name: 'POS刷卡',
        value: 555.00
      },
      {
        name: '现金收款',
        value: 1089.00
      },
      {
        name: '银行转账',
        value: 0.00
      },
      {
        name: '微信',
        value: 670.00
      },
      {
        name: '支付宝',
        value: 999.00
      }
    ])

    const total = computed(() => {
      let total = 0
      category.value.forEach(item => { total += item.value })
      return total
    })

    const incomeData = reactive({
      xAxis: {
        type: 'value',
        show: false
      },
      yAxis: {
        type: 'category',
        data: ['占比'],
        show: false
      },
      grid: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      },
      tooltip: {
        trigger: 'item'
      },
      series: category.value.map(item => {
        return {
          name: item.name,
          data: [(item.value / total.value * 100).toFixed(2)],
          type: 'bar',
          stack: 'total'
        }
      })
    })

    const dishes = reactive([
      {
        name: '宫保鸡丁',
        amount: 10
      },
      {
        name: '蒜泥白肉',
        amount: 22
      },
      {
        name: '鱼香肉丝',
        amount: 33
      },
      {
        name: '水煮鱼',
        amount: 8
      },
      {
        name: '青椒肉丝',
        amount: 44
      }
    ])

    const sortedDishes = computed(() => {
      return dishes.slice(0).sort((a, b) => {
        return b.amount - a.amount
      })
    })

    const dishData = ref({
      xAxis: {
        type: 'category',
        data: ['宫保鸡丁', '蒜泥白肉', '鱼香肉丝', '水煮鱼', '青椒肉丝']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [10, 22, 33, 8, 24]
        }
      ]
    })

    const getSalesData = async () => {
      const res = await post('/order/getsalesitu', {
        btime: range.value[0],
        etime: range.value[1]
      })
      if (res.code === 200) {
        category.value[4].value = (res.data.saleData?.Else || 0)
        category.value[6].value = (res.data.saleData?.Wechat || 0)
        category.value[7].value = (res.data.saleData?.Alipay || 0)
        dishData.value.series[0].data = []
        dishData.value.xAxis.data = []
        res.data.dishData.forEach(item => {
          dishes.push({
            name: item[0],
            amount: item[1]
          })
          dishData.value.xAxis.data.push(item[0])
          dishData.value.series[0].data.push(item[1])
        })
        console.log(sortedDishes, dishData)
      }
    }

    return { range, category, total, incomeData, sortedDishes, dishData, getSalesData }
  }
}
</script>

<style lang="scss" scoped>
.n-row {
  align-items: center;
  margin-bottom: 20px !important;
}

.income{
    display: flex;
    justify-content: space-between;
    &-num{
        font-size: 28px;
        font-weight: bold;
        margin-right: 8px;
    }
    &-text{
        font-size: 16px;
        color: #999;
        margin-right: 200px;
    }
}

.category{
    &-num{
        font-size: 20px;
        font-weight: bold;
    }
    &-text{
        margin-top: 8px;
        color: #999;
    }
}

.rank{
  display: flex;
  align-items: center;
  border-radius: 8px;
  padding: 0 48px;
  &-data{
    margin-left: auto;
  }
  &-num{
    color: #fff;
    font-size: 48px;
    font-weight: bold;
  }
  &-amout{
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 0;
  }
  &-text{
    margin-top: 8px;
  }
}

.first{
    background: linear-gradient(to bottom, #EDCE29, #ffffff);
}

.second{
    background: linear-gradient(to bottom, #ACACAC, #ffffff);
}

.third{
    background: linear-gradient(to bottom, #CA6D2C, #ffffff);
}

</style>
