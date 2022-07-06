import { reactive, ref, h, defineComponent, nextTick } from 'vue'
import { NSelect, NSpace, NButton, NInput } from 'naive-ui'
import { post } from './request'
export const useStaffEffect = (newStaff) => {
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
      sorter: 'default',
      render (row, index) {
        return h(ShowOrEditInput, {
          value: row.name,
          onUpdateValue (v) {
            datas.value[index].phone = v
          }
        })
      }
    },
    {
      title: '员工权限',
      key: 'role',
      sorter: 'default',
      render (row, index) {
        return h(ShowOrEditSelect, {
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
      sorter: 'default',
      render (row, index) {
        return h(ShowOrEditInput, {
          value: row.phone,
          onUpdateValue (v) {
            datas.value[index].phone = v
          }
        })
      }
    },
    {
      title: '操作',
      key: 'actions',
      render (row, index) {
        return h(
          NSpace, {}, [
            h(NButton, {
              type: 'primary',
              size: 'small',
              onClick: () => { staffModify(row) }
            }, '修改'),
            h(NButton, {
              type: 'error',
              size: 'small',
              onClick: () => { staffDelete(row, index) }
            }, '删除')
          ]
        )
      }
    }
  ]

  const datas = ref([...data])

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

  const ShowOrEditSelect = defineComponent({
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

  const ShowOrEditInput = defineComponent({
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
            ? h(NInput, {
              ref: inputRef,
              value: inputValue.value,
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

  const getStaff = async () => {
    const res = await post('/staff/select')
    if (res.code === 200) {
      res.data.forEach((item) => {
        datas.value.push({
          id: item.staffId,
          name: item.staffName,
          role: item.staffPosition,
          phone: item.staffPhone
        })
      })
    } else {
      window.$message.error(res.msg)
    }
  }

  const staffModify = async (row) => {
    const res = await post('/staff/update', {
      staffId: row.id,
      staffName: row.name,
      staffPosition: row.role,
      staffPhone: row.phone
    })
    if (res.code === 200) {
      window.$message.success('修改成功')
    } else {
      window.$message.error(res.msg)
    }
  }

  const staffDelete = async (row, index) => {
    const res = await post('/staff/delete', {
      staffId: row.id
    })
    if (res.code === 200) {
      window.$message.success('删除成功')
      datas.value.splice(index, 1)
    } else {
      window.$message.error(res.msg)
    }
  }

  const addStaff = async () => {
    const res = await post('/staff/insert', {
      staffName: newStaff.value.name,
      staffPosition: newStaff.value.role,
      staffPhone: newStaff.value.phone,
      staffAccount: newStaff.value.username,
      staffPassword: newStaff.value.password
    })
    if (res.code === 200) {
      window.$message.success('添加成功')
      datas.value.push({
        id: res.data.staffId,
        name: newStaff.value.name,
        role: newStaff.value.role,
        phone: newStaff.value.phone
      })
    } else {
      window.$message.error(res.msg)
    }
  }

  return { datas, columns, pagination, roles, getStaff, addStaff }
}
