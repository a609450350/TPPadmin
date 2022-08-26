import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:'',
    userId:''
  },
  getters: {
  },
  mutations: {
    user(state,x){
      state.user=x
      localStorage.setItem('user',JSON.stringify(x))
    },
    userId(state,x){
      state.userId=x
      localStorage.setItem('userId',JSON.stringify(x))
    },
  },
  actions: {
    userData({commit},data){
      commit('user',data)
    },
    userData1({commit},data){
      commit('userId',data)
    }
  },
  modules: {
  }
})
