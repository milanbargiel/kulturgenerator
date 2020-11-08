import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  isLoading: true,
  menuItems: [],
  loadingDelay: 700,
  artworks: {},
  shadowMoneypoolBalance: 0
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
