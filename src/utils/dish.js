export const useDishEffect = () => {
  const dish = [
    {
      dishName: '葱油拌面',
      dishImgUrl: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Y2hpbmVzZSUyMGZvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      dishPrice: 10,
      dishStock: 15,
      dishCategory: '面食'
    },
    {
      dishName: '宫保鸡丁',
      dishImgUrl: 'https://images.unsplash.com/photo-1623689048105-a17b1e1936b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpbmVzZSUyMGZvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      dishPrice: 24,
      dishStock: 10,
      dishCategory: '鸡肉'
    },
    {
      dishName: '春卷',
      dishImgUrl: 'https://images.unsplash.com/photo-1623689043725-743d4aa0d91a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGNoaW5lc2UlMjBmb29kfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      dishPrice: 18,
      dishStock: 76,
      dishCategory: '炸物'
    },
    {
      dishName: '小笼包',
      dishImgUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpbmVzZSUyMGZvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      dishPrice: 24,
      dishStock: 77,
      dishCategory: '蒸品'
    }
  ]

  const dishes = [...dish, ...dish, ...dish, ...dish, ...dish]

  return { dishes }
}
