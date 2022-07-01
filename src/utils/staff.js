import { reactive, ref, h, defineComponent, nextTick } from 'vue'
import { NSelect, NSpace, NButton } from 'naive-ui'
export const useStaffEffect = () => {
  const data = [
    {
      id: 1,
      name: '张三',
      role: '管理员',
      phone: '1234567890'
    },
    {
      id: 2,
      name: '李四',
      role: '后厨',
      phone: '1234567890'
    },
    {
      id: 3,
      name: '王五',
      role: '前台接待',
      phone: '1234567890'
    },
    {
      id: 4,
      name: '赵六',
      role: '前台接待',
      phone: '1234567890'
    }
  ]

  const columns = [
    {
      title: '员工编号',
      key: 'id',
      sorter: 'default'
    },
    {
      title: '员工姓名',
      key: 'name',
      sorter: 'default'
    },
    {
      title: '员工权限',
      key: 'role',
      sorter: 'default',
      render (row, index) {
        return h(ShowOrEdit, {
          value: row.role,
          onUpdateValue (v) {
            datas.value[index].role = v
          }
        })
      }
    },
    {
      title: '手机号',
      key: 'phone',
      sorter: 'default'
    },
    {
      title: '操作',
      key: 'actions',
      render (row) {
        return h(
          NSpace, {}, [
            h(NButton, {
              type: 'primary',
              size: 'small',
              onClick: () => { console.log(row) }
            }, '修改'),
            h(NButton, {
              type: 'error',
              size: 'small',
              onClick: () => { console.log(row) }
            }, '删除')
          ]
        )
      }
    }
  ]

  const datas = ref([...data, ...data, ...data, ...data, ...data, ...data])

  const roles = [
    {
      label: '管理员',
      value: '管理员'
    },
    {
      label: '后厨',
      value: '后厨'
    },
    {
      label: '前台接待',
      value: '前台接待'
    }
  ]

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

  const ShowOrEdit = defineComponent({
    props: {
      value: [String, Number],
      onUpdateValue: [Function, Array]
    },
    setup (props) {
      const isEdit = ref(false)
      const inputRef = ref(null)
      const inputValue = ref(props.value)
      function handleOnClick () {
        isEdit.value = true
        nextTick(() => {
          inputRef.value.focus()
        })
      }
      function handleChange () {
        props.onUpdateValue(inputValue.value)
        isEdit.value = false
      }
      return () =>
        h(
          'div',
          {
            onClick: handleOnClick
          },
          isEdit.value
            ? h(NSelect, {
              ref: inputRef,
              value: inputValue.value,
              options: roles,
              onUpdateValue: (v) => {
                inputValue.value = v
              },
              onChange: handleChange,
              onBlur: handleChange
            })
            : props.value
        )
    }
  })

  return { datas, columns, pagination, roles }
}
