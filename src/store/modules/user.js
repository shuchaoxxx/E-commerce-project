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
      },
      redirectUrl: ''
    }
  },
  getters: {},
  mutations: {
    setUser (state, payload) {
      state.profile = payload
    },
    logout (state, payload) {
      state.profile = {}
    },
    setRedirectUrl (state, url) {
      state.redirectUrl = url
    }
  },
  actions: {
  }
}
