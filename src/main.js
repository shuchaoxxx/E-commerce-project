import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // 道路路由模块
import store from './store' //
import 'normalize.css' // 导入重置样式并直接使用
import '@/assets/styles/common.less' // 导出公共样式并直接使用

import UI from './components/library'

// import { createRouter, createWebHashHistory } from 'vue-router'
// import { createStore } from 'vuex'

createApp(App).use(store).use(router).use(UI).mount('#app')
// createApp(App)
//   .use(
//     createStore({
//       state: {},
//       mutations: {},
//       actions: {},
//       modules: {},
//       getters: {}
//     })
//   )
//   .use(
//     createRouter({
//       routes: [],
//       history: createWebHashHistory
//     })
//   )
//   .mount('#app')
