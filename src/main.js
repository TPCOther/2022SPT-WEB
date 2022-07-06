import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ECharts from 'vue-echarts'
import { use } from 'echarts/core'

import {
  CanvasRenderer
} from 'echarts/renderers'
import {
  LineChart,
  BarChart
} from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  GraphicComponent
} from 'echarts/components'

use([
  CanvasRenderer,
  LineChart,
  BarChart,
  GridComponent,
  TooltipComponent,
  GraphicComponent
])

const app = createApp(App).use(store).use(router)
app.component('v-chart', ECharts)
app.mount('#app')
