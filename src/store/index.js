import { createStore } from 'vuex'
import createPersistedstate from 'vuex-persistedstate'
import user from './modules/user'
import cart from './modules/cart'
import category from './modules/category'

export default createStore({

  plugins: [
    createPersistedstate({
      key: 'E-Commerce-Demo',
      paths: ['user', 'cart', 'category']
      // paths: ['user.userWeight']  只改变某个模块下的某个变量时，使用这种写法
    })
  ],
  modules: { user, cart, category }
})
