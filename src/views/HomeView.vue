<template>
    <n-row>
      <n-card class="shopinfo" content-style="display: flex; align-items: center;">
        <n-avatar round :size="112" src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"/>
        <n-space class="shopinfo-text" vertical>
          <div class="shopinfo-text-caption">XXXX餐饮管理有限公司</div>
          <n-space size="small">
            <n-icon :component="CallOutline" size="16" :depth="3" />
            <a>100-820-8820</a>
          </n-space>
          <n-space size="small">
            <n-icon :component="LocationOutline" size="16" :depth="3" />
            <a>重庆市沙坪坝区大学城南路444号</a>
          </n-space>
        </n-space>
      </n-card>
    </n-row>
    <n-row gutter="24">
      <n-col span="12">
        <n-card class="shopinfo" content-style="display: flex; align-items: center;">
          <n-space class="shopinfo-text" vertical>
            <p class="shopinfo-text-caption">今日营业额（元）</p>
            <p>更新于5分钟前</p>
          </n-space>
          <div class="shopinfo-number red-text">
           <n-number-animation  :from="0" :to="incomeToday.toFixed(2)" :precision="2" />
          </div>
        </n-card>
      </n-col>
      <n-col span="12">
        <n-card class="shopinfo" content-style="display: flex; align-items: center;">
          <n-space class="shopinfo-text" vertical>
            <p class="shopinfo-text-caption">有效订单数</p>
            <p>更新于5分钟前</p>
          </n-space>
          <div class="shopinfo-number red-text">
           <n-number-animation  :from="0" :to="effectiveOrder" />
          </div>
        </n-card>
      </n-col>
    </n-row>
    <n-row>
      <n-card class="chart">
        <div style="font-size: 24px; font-weight: bold;">一周营业额度曲线图</div>
        <v-chart autoresize :option="chartData"></v-chart>
      </n-card>
    </n-row>
    <n-row gutter="12">
      <n-col span="6" v-for="item in cardData" :key="item.title">
        <n-card>
          <div class="shopinfo-number">{{item.value}}</div>
          <div style="font-weight: bold">{{item.title}}</div>
        </n-card>
      </n-col>
    </n-row>
</template>

<script>
import { ref, onMounted } from 'vue'
import { get } from '@/utils/request'
import { LocationOutline, CallOutline } from '@vicons/ionicons5'
import dayjs from 'dayjs'
export default {
  name: 'HomeView',
  setup () {
    const effectiveOrder = ref(0)
    const incomeToday = ref(0)
    const cardData = ref([
      {
        title: '商品种类',
        value: '12'
      },
      {
        title: '商品数量',
        value: '147'
      },
      {
        title: '会员数量',
        value: '27'
      },
      {
        title: '供应商数量',
        value: '3'
      }
    ])

    const chartData = ref({
      xAxis: {
        type: 'category',
        data: []
      },
      yAxis: {
        type: 'value'
      },
      tooltip: {
        trigger: 'axis'
      },
      series: [
        {
          data: [0, 230, 224, 218, 135, 147, 260],
          type: 'line',
          smooth: true,
          areaStyle: {}
        }
      ]
    })

    const getStatistics = async () => {
      for (let i = 6; i >= 0; i--) {
        const date = dayjs().subtract(i, 'day').format('MM-DD')
        chartData.value.xAxis.data.push(date)
      }
      const res = await get('/order/statisticsorder')
      if (res.code === 200) {
        cardData.value[1].value = res.data.foodCategoryCount
        cardData.value[2].value = res.data.foodCount
        cardData.value[3].value = res.data.VIPCount
        chartData.value.series[0].data = res.data.revenueDay
        effectiveOrder.value = res.data.effectiveOrder
        incomeToday.value = res.data.revenueDay[res.data.revenueDay.length - 1]
      } else {
        window.$message.error(res.msg)
      }
    }

    onMounted(() => {
      getStatistics()
    })
    return { LocationOutline, CallOutline, chartData, cardData, effectiveOrder, incomeToday }
  }
}
</script>

<style lang="scss" scoped>
.n-row {
  margin-bottom: 24px !important;
}

.n-card {
  box-shadow: 0px 0px 3px #dddddd;
}

.shopinfo {
  justify-content: center;
  &-text{
    text-align: left;
    margin-left: 24px;
    max-width: 500px;
    &-caption{
      margin: 0px;
      font-size: 24px;
      font-weight: bold;
    }
  }
  &-number{
    font-size: 64px;
    font-weight: bold;
    margin-left: auto;
  }
}

.chart{
  height: 400px;
}

.red-text {
  color: red;
}

</style>
