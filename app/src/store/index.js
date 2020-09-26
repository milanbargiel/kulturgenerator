import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  artworks: {},
  shadowMoneypoolBalance: 0,
  paymentInfo: {
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
