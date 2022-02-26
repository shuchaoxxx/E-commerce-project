export default {
  namespaced: true,
  state () {
    return {
      profile: {
        id: '',
        avatar: '',
        nickname: '',
        account: '',
        mobileL: '',
        token: ''
      }
    }
  },
  getters: {},
  mutations: {
    setUser (state, payload) {
      state.profile = payload
    }
  },
  actions: {
  }
}
