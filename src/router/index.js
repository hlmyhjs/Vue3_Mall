import { createRouter, createWebHashHistory } from 'vue-router'
import { getItem } from '@/utils/storage'

const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    name: 'Home',
    meta: { title: '首页', keepAlive: true },
    component: () => import('views/home/Home')
  },
  {
    path: '/category',
    name: 'Category',
    meta: { title: '分类', keepAlive: true },
    component: () => import('views/category/Category')
  },
  {
    path: '/categoryDetail/:key/:id',
    name: 'categoryDetail',
    component: () => import('views/category/CategoryDetail')
  },
  { path: '/cart', name: 'Cart', meta: { title: '购物车' }, component: () => import('views/cart/Cart') },
  { path: '/account', name: 'Account', meta: { title: '我的' }, component: () => import('views/account/Account') },
  {
    path: '/search',
    name: 'Search',
    component: () => import('views/search'),
    children: [
      { path: '/search', name: 'searchIndex', component: () => import('views/search/Search') },
      { path: 'list', name: 'list', component: () => import('views/search/List') }
    ]
  },
  { path: '/detail', name: 'Detail', component: () => import('views/detail/Detail.vue') },
  {
    path: '/address',
    name: 'index',
    component: () => import('views/address'),
    children: [
      { path: '/address', name: 'Address', component: () => import('views/address/Address') },
      { path: '/edit', name: 'AddressEdit', component: () => import('views/address/Edit') }
    ]
  },
  { path: '/login', name: 'Login', component: () => import('views/login') },
  { path: '/register', name: 'Register', component: () => import('views/login/Register') },
  { path: '/resetPassword', name: 'resetPassword', component: () => import('views/login/ResetPassword') },
  { path: '/order', name: 'Order', component: () => import('views/order/Order') },
  { path: '/myOrder', name: 'MyOrder', component: () => import('views/myOrder/MyOrder') },
  { path: '/payment', name: 'Payment', component: () => import('views/order/Payment') }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  to.meta.title ? (document.title = to.meta.title) : (document.title = '商城')
  const nextRoute = ['Payment', 'Cart', 'Order', 'Address', 'AddressEdit']
  const userInfo = getItem('user_info')
  if (nextRoute.indexOf(to.name) >= 0) {
    if (!userInfo) {
      router.push('/login')
    }
  }
  next()
})

export default router
