import { createRouter, createWebHashHistory } from 'vue-router'
import TopCategory from '@/views/category'
import SubCategory from '@/views/category/sub'
// import Layout from '@/views/Layout.vue'
// import Home from '@/views/home/index'
import LoginCallback from '@/views/login/callback'
const Layout = () => import('@/views/Layout')
const Home = () => import('@/views/home')
const Goods = () => import('@/views/goods')
const XtxCartPage = () => import('@/views/cart')
// const LoginCallback = () => { '@/views/login/callback' }

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', component: Home },
      { path: '/category/:id', component: TopCategory },
      { path: '/category/sub/:id', component: SubCategory },
      { path: '/product/:id', component: Goods },
      { path: '/cart', component: XtxCartPage }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path: '/login/callback',
    component: LoginCallback
  }
]

const router = createRouter({
  history: createWebHashHistory(), // 暂时使用hash方式实现路由
  routes,
  // scrollBehavior: { left: 0, top: 0 }
  scrollBehavior () {
    return { left: 0, top: 0 }
  }
})

export default router
