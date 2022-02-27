import { topCategory } from '@/api/constants'
import { findAllCategory } from '@/api/category'

export default {
  namespaced: true,
  state () {
    return {
      // 返回一个数组，数组的每一项都是对象，包含一个name属性
      list: topCategory.map(item => ({ name: item }))
    }
  },
  mutations: {
    setList (state, payload) {
      state.list = payload
    },
    // 修改当前一级分类下的open数据为true
    show (state, item) {
      const category = state.list.find(category => category.id === item.id)
      category.open = true
    },
    // 修改当当前一级分类下的open数据为false
    hide (state, item) {
      const category = state.list.find(category => category.id === item.id)
      category.open = false
    }
  },
  actions: {
    async getList ({ commit }) {
      const { result } = await findAllCategory()
      // 可以给请求回来的数据添加属性，用来控制头部二级分类的显示与隐藏
      result.forEach(item => {
        item.open = false
      })
      commit('setList', result)
    }
  }
}
