import { ref } from 'vue'
import { post, get } from '../utils/request'
export const useDishEffect = (showModal, options, isAdd, queryName, currentDish) => {
  const dishes = ref([
    {
      dishId: 1,
      dishName: '葱油拌面',
      dishImgUrl: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Y2hpbmVzZSUyMGZvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      dishDesc: 'KK',
      dishTag: ['面', '拌面'],
      dishPrice: 10,
      dishSale: 15,
      dishCategory: 1,
      dishPriority: 2,
      dishState: 0
    },
    {
      dishId: 2,
      dishName: '宫保鸡丁',
      dishImgUrl: 'https://images.unsplash.com/photo-1623689048105-a17b1e1936b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpbmVzZSUyMGZvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      dishDesc: 'KK',
      dishTag: ['面', '拌面'],
      dishPrice: 24,
      dishSale: 10,
      dishCategory: 2,
      dishPriority: 2,
      dishState: 1
    },
    {
      dishId: 3,
      dishName: '春卷',
      dishImgUrl: 'https://images.unsplash.com/photo-1623689043725-743d4aa0d91a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGNoaW5lc2UlMjBmb29kfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      dishDesc: 'KK',
      dishTag: ['面', '拌面'],
      dishPrice: 18,
      dishSale: 76,
      dishCategory: 3,
      dishPriority: 2,
      dishState: 1
    },
    {
      dishId: 4,
      dishName: '小笼包',
      dishImgUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpbmVzZSUyMGZvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      dishDesc: 'KK',
      dishTag: ['面', '拌面'],
      dishPrice: 24,
      dishSale: 77,
      dishCategory: 4,
      dishPriority: 2,
      dishState: 1
    }
  ])

  const mapDishData = (dish) => {
    return {
      foodName: dish.dishName,
      foodTag: dish.dishTag.join(','),
      foodDesc: dish.dishDesc,
      foodNormalPrice: dish.dishPrice,
      foodPromotionPrice: dish.dishSale,
      foodState: dish.dishState ? 1 : 0,
      priority: dish.dishPriority,
      foodCategory: dish.dishCategory
    }
  }

  const updateDish = (data) => {
    window.$message.info('上传')
    const formdata = new FormData()
    console.log(data.file)
    formdata.append('foodImg', data.file.file)
    formdata.append('foodImg0', data.file.file)
    formdata.append('foodStr', JSON.stringify(mapDishData(currentDish.value)))
    formdata.append('foodDesc', '图片描述')
    const url = isAdd.value ? 'food/insertfood' : '/food/updatefood'
    post(url, formdata).then((result) => {
      data.onFinish()
      if (result.code === 200) {
        window.$message.success(result.msg)
      } else {
        window.$message.error(result.msg)
      }
      showModal.value = false
    }).catch((err) => {
      window.$message.info('添加失败')
      data.onError(err.message)
      showModal.value = false
    })
  }

  const deleteDish = async (dish, index) => {
    const result = await post('food/deletefood', {
      foodId: dish.dishId
    })
    if (result.code === 200) {
      window.$message.success(result.msg)
      dishes.value.splice(index, 1)
    } else {
      window.$message.error(result.msg)
    }
  }

  const getCategoriesOptions = async () => {
    const res = await get('/foodcategory/getfoodcategorylist')
    res.data.forEach((item) => {
      options.value.push({
        value: item.foodCategoryId,
        label: item.foodCategoryName
      })
    })
  }

  const getDishList = async (pageIndex, pageSize) => {
    const res = await get('/food/getfoodlist', { pageIndex, pageSize })
    res.data.forEach((item) => {
      dishes.value.push({
        dishName: item.foodName,
        dishImgUrl: 'http://10.236.66.170:8080' + item.foodImg,
        dishPrice: item.foodNormalPrice,
        dishSale: item.foodPromotionPrice,
        dishCategory: item.foodCategory,
        dishId: item.foodId,
        dishTag: item.foodTag.split(','),
        dishDesc: item.foodDesc,
        dishState: item.foodState,
        dishPriority: item.priority
      })
    })
  }

  const queryDish = async () => {
    const res = await get('/food/getfoodlist', {
      pageIndex: 1,
      pageSize: 36,
      foodName: queryName.value
    })
    dishes.value = []
    res.data.forEach((item) => {
      dishes.value.push({
        dishName: item.foodName,
        dishImgUrl: 'http://10.236.66.170:8080' + item.foodImg,
        dishPrice: item.foodNormalPrice,
        dishSale: item.foodPromotionPrice,
        dishCategory: item.foodCategory,
        dishId: item.foodId,
        dishTag: item.foodTag.split(' '),
        dishDesc: item.foodDesc,
        dishState: item.foodState,
        dishPriority: item.priority
      })
    })
  }

  return { dishes, updateDish, deleteDish, queryDish, getCategoriesOptions, getDishList }
}
