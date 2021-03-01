import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authorcommentId: null,
    authorName: null,
    isnewNav: false,
    navName: 0
  },
  mutations: {
    ModifyAuthorcommentId(state, data){
      state.authorcommentId = data
    },
    ModifyAuthorName(state, data){
      state.authorName = data
    },
    ModifyIsnewNav(state, data){
      state.isnewNav = data
    },
    ModifyNavName(state, data){
      state.navName = data
    }
  },
  actions: {
  },
  modules: {
  }
})
