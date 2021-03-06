import { createRouter, createWebHashHistory } from 'vue-router'

const mainRoute = [
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/HomeView.vue')
  },
  {
    path: '/table',
    name: 'Table',
    component: () => import(/* webpackChunkName: "table" */ '../views/TableView.vue')
  },
  {
    path: '/sales',
    name: 'Sales',
    component: () => import(/* webpackChunkName: "sales" */ '../views/SalesView.vue')
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import(/* webpackChunkName: "order" */ '../views/OrderView.vue')
  },
  {
    path: '/dish',
    name: 'Dish',
    component: () => import(/* webpackChunkName: "dish" */ '../views/DishView.vue')
  },
  {
    path: '/category',
    name: 'Category',
    component: () => import(/* webpackChunkName: "category" */ '../views/CategoryView.vue')
  },
  {
    path: '/member',
    name: 'Member',
    component: () => import(/* webpackChunkName: "member" */ '../views/MemberView.vue')
  },
  {
    path: '/staff',
    name: 'Staff',
    component: () => import(/* webpackChunkName: "staff" */ '../views/StaffView.vue')
  },
  {
    path: '/kitchen',
    name: 'Kitchen',
    component: () => import(/* webpackChunkName: "kitchen" */ '../views/KitchenView.vue')
  }
]

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import(/* webpackChunkName: "index" */ '../layouts/index.vue'),
    children: [...mainRoute]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const { isLogin } = localStorage
  const { name } = to
  const isLoginPage = (name === 'Login')
  console.log(isLogin === true, isLoginPage === true)
  if (isLoginPage === true) {
    next()
    console.log('isLoginPage')
  } else if (isLogin === 'true') {
    next()
    console.log('isLogin')
  } else {
    next({ name: 'Login' })
    console.log('Login')
  }
})

export default router
