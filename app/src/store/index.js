import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  isLoading: true,
  menuItems: [
    { label: 'moneypool-balance', viewName: 'about', id: 100 },
    { label: 'back-button', viewName: 'artworkList', id: 200 }
  ],
  loadingDelay: 700,
  artworks: {},
  shadowMoneypoolBalance: 0,
  paymentFeedback: {
    show: false,
    state: 'hidden'
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
