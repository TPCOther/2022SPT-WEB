import { reactive, ref, computed } from 'vue'
import { post, get } from '../utils/request'
export const useTableEffect = (newArea, newTable, showAreaModal, showTableModal) => {
  const areas = reactive([
    {
      label: '全部',
      value: 0
    },
    {
      label: '一楼',
      value: 1
    },
    {
      label: '二楼',
      value: 2
    },
    {
      label: '包间：春暖花开',
      value: 3
    }
  ])

  const tables = reactive([
    {
      id: 1,
      area: '一楼',
      number: '1',
      isfree: 0,
      cost: '560.0'
    },
    {
      id: 2,
      area: '一楼',
      number: '2',
      isfree: 0,
      cost: '224.0'
    },
    {
      id: 3,
      area: '一楼',
      number: '3',
      isfree: 1,
      cost: ''
    },
    {
      id: 4,
      area: '一楼',
      number: '4',
      isfree: 1,
      cost: ''
    },
    {
      id: 5,
      area: '一楼',
      number: '5',
      isfree: 0,
      cost: '312.0'
    },
    {
      id: 6,
      area: '一楼',
      number: '6',
      isfree: 0,
      cost: '780.0'
    },
    {
      id: 7,
      area: '包间：春暖花开',
      number: '1',
      isfree: 0,
      cost: '1180.0'
    }
  ])

  const orderinfo = ref([
    {
      name: '煸炒林间山野菜',
      price: 26,
      amount: 1
    },
    {
      name: '宫保鸡丁',
      price: 22,
      amount: 1
    },
    {
      name: '铁板黑胡椒蒙古肉',
      price: 26,
      amount: 1
    }
  ])

  const total = computed(() => {
    let total = 0
    orderinfo.value.forEach(item => {
      total += item.price * item.amount
    })
    return total
  })

  const getArea = async () => {
    const res = await get('/area/select')
    if (res.code === 200) {
      res.data.forEach(item => {
        areas.push({
          label: item.areaName,
          value: item.areaId
        })
      })
    } else {
      window.$message.error(res.msg)
    }
  }

  const getTable = async () => {
    const res = await post('/table/select')
    if (res.code === 200) {
      res.data.forEach(item => {
        tables.push({
          id: item.dinTableId,
          area: item.areaName,
          number: item.dinTableName,
          isfree: !item.dinTableState,
          cost: item.tbOrderAmount.toFixed(1)
        })
      })
    } else {
      window.$message.error(res.msg)
    }
  }

  const getTableOrder = async (tableId) => {
    const res = await get('/order/getlastorderbydintable', { dinTableId: tableId })
    orderinfo.value = []
    if (res.code === 1111) {
      res.data.orderFoodList.forEach(item => {
        orderinfo.value.push({
          name: item.foodName,
          price: item.foodNormalPrice,
          amount: item.orderFoodNum
        })
      })
    } else {
      window.$message.error(res.msg)
    }
  }

  const addArea = async () => {
    const res = await post('/area/insert', {
      areaName: newArea.value
    })
    if (res.code === 200) {
      areas.push({
        label: newArea.value,
        value: res.data
      })
      window.$message.success('添加成功')
      showAreaModal.value = false
    } else {
      window.$message.error(res.msg)
    }
  }

  const addTable = async () => {
    const res = await post('/table/insert', {
      dinTableName: newTable.value.dinTableName,
      areaId: newTable.value.areaId
    })
    if (res.code === 200) {
      window.$message.success('添加成功')
      tables.push({
        area: res.data.areaName,
        number: res.data.dinTableName,
        isfree: !res.data.dinTableState,
        cost: 0
      })
      showTableModal.value = false
    } else {
      window.$message.error(res.msg)
    }
  }

  const deleteArea = async (area, index) => {
    const res = await post('area/delete', { areaId: area.id })
    if (res.code === 200) {
      window.$message.success('删除成功')
      areas.splice(index, 1)
    } else {
      window.$message.error(res.msg)
    }
  }

  return { areas, tables, orderinfo, total, getArea, getTable, getTableOrder, addArea, addTable, deleteArea }
}
