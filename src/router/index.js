import { createRouter, createWebHashHistory } from 'vue-router'

const routes = []

const router = createRouter({
  history: createWebHashHistory(), // 暂时使用hash方式实现路由
  routes
})

export default router
