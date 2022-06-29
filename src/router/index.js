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
    component: () => import(/* webpackChunkName: "home" */ '../views/TableView.vue')
  },
  {
    path: '/sales',
    name: 'Sales',
    component: () => import(/* webpackChunkName: "home" */ '../views/SalesView.vue')
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import(/* webpackChunkName: "home" */ '../views/OrderView.vue')
  },
  {
    path: '/dish',
    name: 'Dish',
    component: () => import(/* webpackChunkName: "home" */ '../views/DishView.vue')
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

export default router
