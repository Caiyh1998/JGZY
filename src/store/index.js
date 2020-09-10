import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const TOKEN = 'token'
const USERINFO = 'userInfo'

const store = new Vuex.Store({
  state() {
    return {
      token: localStorage.getItem(TOKEN) ? localStorage.getItem(TOKEN) : '',
      userInfo: localStorage.getItem(USERINFO) ? localStorage.getItem(USERINFO) : '',
      isLogin: false
    }
  },
  getters: {
    getToken: function (state) {
      if (!state.token) {
        state.token = JSON.parse(localStorage.getItem(TOKEN))
      }
      return state.token
    },
    getUserInfo: function (state) {
      state.userInfo = JSON.parse(localStorage.getItem(USERINFO))
      return state.userInfo
    }
  },
  mutations: {
    setToken(state, value) {
      state.token = value;
      state.isLogin = true;
      localStorage.setItem(TOKEN, value)
      //  localStorage.setItem(TOKEN,JSON.stringify(value))
    },
    delToken(state) {
      state.token = "";
      state.userInfo = "";
      state.isLogin = false;
      localStorage.removeItem(TOKEN)
      localStorage.removeItem(USERINFO)
    },
    setUserInfo(state, value) {
      state.userInfo = value
      // localStorage.setItem(USERINFO, value)
      localStorage.setItem(USERINFO,JSON.stringify(value))
    }
  },
})
export default store
