import { createRouter, createWebHashHistory } from 'vue-router'
// import Layout from '@/views/Layout.vue'
// import Home from '@/views/home/index'
const Layout = () => import('@/views/Layout')
const Home = () => import('@/views/home')

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        component: Home
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(), // 暂时使用hash方式实现路由
  routes
})

export default router
