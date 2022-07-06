import { get } from '@/utils/request'
import { reactive } from 'vue'
export const useOrderEffect = () => {
  const orders = reactive([
    {
      orderId: '17219833198391913',
      dishes: [
        {
          dishName: '宫保鸡丁',
          dishImgUrl: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Y2hpbmVzZSUyMGZvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
          dishNum: 1,
          dishPrice: 20
        },
        {
          dishName: '宫保鸡丁',
          dishImgUrl: 'https://images.unsplash.com/photo-1623689048105-a17b1e1936b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpbmVzZSUyMGZvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
          dishNum: 1,
          dishPrice: 20
        },
        {
          dishName: '宫保鸡丁',
          dishImgUrl: 'https://images.unsplash.com/photo-1623689043725-743d4aa0d91a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGNoaW5lc2UlMjBmb29kfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
          dishNum: 1,
          dishPrice: 20
        },
        {
          dishName: '宫保鸡丁',
          dishImgUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpbmVzZSUyMGZvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
          dishNum: 1,
          dishPrice: 20
        }
      ]
    },
    {
      orderId: '17219833198391917',
      dishes: [
        {
          dishName: '宫保鸡丁',
          dishImgUrl: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Y2hpbmVzZSUyMGZvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
          dishNum: 1,
          dishPrice: 20
        },
        {
          dishName: '宫保鸡丁',
          dishImgUrl: 'https://images.unsplash.com/photo-1623689048105-a17b1e1936b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpbmVzZSUyMGZvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
          dishNum: 1,
          dishPrice: 20
        },
        {
          dishName: '宫保鸡丁',
          dishImgUrl: 'https://images.unsplash.com/photo-1623689043725-743d4aa0d91a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGNoaW5lc2UlMjBmb29kfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
          dishNum: 1,
          dishPrice: 20
        },
        {
          dishName: '宫保鸡丁',
          dishImgUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpbmVzZSUyMGZvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
          dishNum: 1,
          dishPrice: 20
        }
      ]
    },
    {
      orderId: '17219833198391914',
      dishes: [
        {
          dishName: '宫保鸡丁',
          dishImgUrl: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Y2hpbmVzZSUyMGZvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
          dishNum: 1,
          dishPrice: 20
        },
        {
          dishName: '宫保鸡丁',
          dishImgUrl: 'https://images.unsplash.com/photo-1623689048105-a17b1e1936b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpbmVzZSUyMGZvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
          dishNum: 1,
          dishPrice: 20
        },
        {
          dishName: '宫保鸡丁',
          dishImgUrl: 'https://images.unsplash.com/photo-1623689043725-743d4aa0d91a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGNoaW5lc2UlMjBmb29kfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
          dishNum: 1,
          dishPrice: 20
        },
        {
          dishName: '宫保鸡丁',
          dishImgUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpbmVzZSUyMGZvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
          dishNum: 1,
          dishPrice: 20
        }
      ]
    }
  ])

  const getTotalPrice = (dishes) => {
    let total = 0
    dishes.forEach(dish => {
      total += dish.dishPrice * dish.dishNum
    })
    return total
  }

  const getTotalNum = (dishes) => {
    let total = 0
    dishes.forEach(dish => {
      total += dish.dishNum
    })
    return total
  }

  const getOrders = async (pageSize, pageIndex) => {
    const res = await get('/order/getorderlist', { pageSize: pageSize, pageIndex: pageIndex })
    if (res.code === 200) {
      res.data.forEach(orderitem => {
        const order = {}
        order.orderId = orderitem.orderId
        order.dishes = []
        orderitem.orderFoodList.forEach(dish => {
          order.dishes.push({
            dishName: dish.foodName,
            dishImgUrl: dish.foodImg,
            dishNum: dish.orderFoodNum,
            dishPrice: dish.foodNormalPrice
          })
        })
        orders.push(order)
      })
    } else {
      window.$message.error(res.msg)
    }
  }

  return { orders, getTotalPrice, getTotalNum, getOrders }
}
