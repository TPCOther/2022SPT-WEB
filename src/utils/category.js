export const useCategoryEffect = () => {
  const categories = [
    {
      name: '副食品类',
      amount: 20,
      priority: 1
    },
    {
      name: '饮料类',
      amount: 10,
      priority: 1
    },
    {
      name: '小吃类',
      amount: 33,
      priority: 2
    },
    {
      name: '面食类',
      amount: 3,
      priority: 4
    }
  ]

  return { categories }
}
