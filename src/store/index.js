import { createStore } from 'vuex'
import createPersistedstate from 'vuex-persistedstate'
import user from './modules/user'
import cart from './modules/cart'
import category from './modules/category'

export default createStore({
  modules: { user, cart, category },
  state: {
    username: '1111'
  },
  plugins: [
    createPersistedstate({
      key: 'E-Commerce-Demo',
      paths: ['user', 'cart']
      // paths: ['user.userWeight']  只改变某个模块下的某个变量时，使用这种写法
    })
  ],
  getters: {
    newName (state) {
      return state.username + '000000000'
    }
  },
  mutations: {
    updateName (state, payload) {
      state.username = payload
    }
  },
  actions: {
    updateName (context) {
      setTimeout(() => {
        context.commit('updateName', 9999999)
      }, 2000)
    }
  }
})
