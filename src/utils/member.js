import { reactive } from 'vue'
export const useMemberEffect = () => {
  const data = [
    {
      id: 1,
      name: '张三',
      grade: '一级会员',
      cost: 666,
      points: 1234,
      phone: '1234567890'
    },
    {
      id: 2,
      name: '李四',
      grade: '二级会员',
      cost: 666,
      points: 1234,
      phone: '1234567890'
    },
    {
      id: 3,
      name: '王五',
      grade: '三级会员',
      cost: 666,
      points: 1234,
      phone: '1234567890'
    },
    {
      id: 4,
      name: '赵六',
      grade: '四级会员',
      cost: 666,
      points: 1234,
      phone: '1234567890'
    }
  ]

  const columns = [
    {
      title: '会员号',
      key: 'id',
      sorter: 'default'
    },
    {
      title: '会员姓名',
      key: 'name',
      sorter: 'default'
    },
    {
      title: '会员等级',
      key: 'grade',
      sorter: 'default'
    },
    {
      title: '消费金额',
      key: 'cost',
      sorter: 'default'
    },
    {
      title: '积分',
      key: 'points',
      sorter: 'default'
    },
    {
      title: '手机号',
      key: 'phone',
      sorter: 'default'
    }
  ]

  const datas = [...data, ...data, ...data, ...data, ...data, ...data]

  const pagination = reactive({
    page: 1,
    pageCount: 20,
    pageSize: 10,
    onChange: (page) => {
      pagination.page = page
    },
    onUpdatePageSize: (pageSize) => {
      pagination.pageSize = pageSize
      pagination.page = 1
    }
  })

  return { datas, columns, pagination }
}
