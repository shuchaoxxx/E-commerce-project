import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // 道路路由模块
import store from './store' //

// import { createRouter, createWebHashHistory } from 'vue-router'
// import { createStore } from 'vuex'

createApp(App).use(store).use(router).mount('#app')
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
