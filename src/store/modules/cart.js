import { getNewCartGoods } from '@/api/cart'
export default {
  namespaced: true,
  state () {
    return {
      list: []
    }
  },
  getters: {
    // 有效商品列表
    validList (state) {
      // 有效商品：库存大于0  stock  商品有效标识为  true  isEffective
      return state.list.filter((goods) => goods.stock > 0 && goods.isEffective)
    },
    // 有效商品总件数
    validTotal (state, getters) {
      return getters.validList.reduce((p, c) => p + c.count, 0)
    },
    // 有效商品总金额
    validAmount (state, getters) {
      // return (getters.validList.reduce((p, c) => p + c.nowPrice * 100 * c.count, 0) / 100).toFixed(2)
      return getters.validList.reduce((p, c) => p + Math.round(c.nowPrice * 100) * c.count, 0) / 100
    },
    // 无效商品列表
    invalidList (state) {
      return state.list.filter((goods) => goods.stock <= 0 || !goods.isEffective)
    },
    // 已选商品列表
    selectedList (state, getters) {
      return getters.validList.filter((item) => item.selected)
    },
    // 已选商品总件数
    selectedTotal (state, getters) {
      return getters.selectedList.reduce((p, c) => p + c.count, 0)
    },
    // 已选商品总金额
    selectedAmount (state, getters) {
      return getters.selectedList.reduce((p, c) => p + Math.round(c.nowPrice * 100) * c.count, 0) / 100
    },
    // 是否全选
    isCheckAll (state, getters) {
      return getters.validList.length !== 0 && getters.selectedList.length === getters.validList.length
    }
  },
  mutations: {
    inserCart (state, goods) {
      // 先在购物车的list里面找有没有与添加的商品一样，有一样的需要记录下数量、并删除。然后再添加，并保持在第一位
      const sameIndex = state.list.findIndex((item) => item.skuId === goods.skuId)
      if (sameIndex > -1) {
        // 把数量相加
        goods.count = state.list[sameIndex].count + goods.count
        // 删除
        state.list.splice(sameIndex, 1)
      }
      // 在最前面添加上
      state.list.unshift(goods)
    },

    // 修改购物车商品
    updateCart (state, goods) {
      debugger
      // goods中必须有skuId 才能找到对应的商品信息
      const updateGoods = state.list.find((item) => item.skuId === goods.skuId)
      // 对传入的goods的信息要完整
      for (const key in goods) {
        if (goods[key] !== null && goods[key] !== undefined && goods[key !== '']) {
          updateGoods[key] = goods[key]
        }
      }
    },
    deleteCart (state, skuId) {
      const index = state.list.findIndex((item) => item.skuId === skuId)
      state.list.splice(index, 1)
    }
  },
  actions: {
    inserCart (ctx, goods) {
      return new Promise((resolve, reject) => {
        // 在store模块中如何调用其他模块的或当下模块的数据？ 一个个参数可以解构出rootState。从而拿到对应的模块
        if (ctx.rootState.user.token) {
          // 已经登录的TODO
        } else {
          // 未登录的状态
          ctx.commit('inserCart', goods)
          resolve()
        }
      })
    },
    // 获取购物车列表
    findCartList (ctx) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 登录TODO
        } else {
          // 本地
          const promiseArr = ctx.state.list.map((item) => {
            // 返回接口函数的调用
            return getNewCartGoods(item.skuId)
          })
          Promise.all(promiseArr)
            .then((dataArr) => {
              dataArr.forEach((data, i) => {
                ctx.commit('updateCart', { skuId: ctx.state.list[i].skuId, ...data.result })
              })
              resolve()
            })
            .catch((e) => {
              reject(e)
            })
        }
      })
    },
    // 删除商品操作
    deleteCart (ctx, skuId) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 登录 TODO
        } else {
          // 本地
          ctx.commit('deleteCart', skuId)
          resolve()
        }
      })
    },
    // 修改购物车商品
    updateCart (ctx, goods) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 登录 TODO
        } else {
          // 本地
          ctx.commit('updateCart', goods)
          resolve()
        }
      })
    },
    // 做有效商品的全选或反选
    checkAllCart (ctx, selected) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 登录TODO
        } else {
          // 本地
          // 1.获取有效的商品数据，遍历的去调用修改mutations即可
          ctx.getters.validList.forEach((item) => {
            ctx.commit('updateCart', { skuId: item.skuId, selected })
          })
          resolve()
        }
      })
    },
    // 批量删除选中的商品
    batchDeleteCart (ctx, isClear) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // TODO
        } else {
          // 本地
          // 1. 获取选中商品，进行遍历调用deleteCart mutations函数
          ctx.getters[isClear ? 'invalidList' : 'selectedList'].forEach((item) => {
            ctx.commit('deleteCart', item.skuId)
          })
          resolve()
        }
      })
    }
  }
}
