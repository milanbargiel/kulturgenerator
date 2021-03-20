import Vue from 'vue'
import axios from 'axios'

export const state = () => ({
  isLoading: true,
  loadingDelay: 700,
  artworks: {},
  shadowMoneypoolBalance: 0,
})

export const mutations = {
  SET_LOADING_STATE(state, payload) {
    if (!payload) {
      setTimeout(() => {
        state.isLoading = payload
      }, state.loadingDelay) // wait a minimum amount of time before setting loading to false
    } else {
      state.isLoading = payload
    }
  },
  SET_ARTWORKS(state, payload) {
    payload.forEach(artwork => {
      Vue.set(state.artworks, [artwork.id], artwork)
    })
  },
  SET_ARTWORK(state, payload) {
    Vue.set(state.artworks, [payload.id], payload)
  },
  UPDATE_ARTWORK_QUANTITY(state, payload) {
    state.artworks[payload.id].quantity = payload.quantity
  },
  UPDATE_SHADOW_MONEYPOOL(state, payload) {
    state.shadowMoneypoolBalance = payload
  },
}

export const actions = {
  getArtworkBySlug(context, slug) {
    return axios
      .get(process.env.baseUrl + '/artworks/' + slug)
      .then(response => {
        context.commit('SET_ARTWORK', response.data)
        return response
      })
  },
  updateArtworkQuantity(context, { id, quantity, currentQuantity }) {
    if (currentQuantity < 1) {
      return
    }

    const newQuantity = currentQuantity - quantity
    return axios({
      method: 'put',
      url: process.env.baseUrl + '/artworks/' + id,
      data: {
        quantity: newQuantity,
      },
    })
      .then(response => {
        return response.data.quantity
      })
      .catch(error => {
        return error
      })
  },
  updateShadowMoneypool(context, balance) {
    axios({
      method: 'put',
      url: process.env.baseUrl + '/moneypool',
      data: {
        currentBalance: context.state.shadowMoneypoolBalance + balance,
      },
    }).then(response => {
      context.commit('UPDATE_SHADOW_MONEYPOOL', response.data.currentBalance)
    })
  },
  sendOrder(context, { artworkId, order, share }) {
    return axios({
      method: 'post',
      url: process.env.baseUrl + '/orders',
      data: {
        artwork: {
          id: artworkId,
          slug: context.state.artworks[artworkId].slug,
        },
        artworkName: order.purchase_units[0].items[0].name,
        orderQuantity: order.purchase_units[0].items[0].quantity,
        orderTotalAmount: order.purchase_units[0].amount.value,
        buyerEmail: order.payer.email_address,
        buyerFullname: order.purchase_units[0].shipping.name.full_name,
        buyerStreet: order.purchase_units[0].shipping.address.address_line_1,
        buyerCity: order.purchase_units[0].shipping.address.admin_area_2,
        buyerState: order.purchase_units[0].shipping.address.admin_area_1,
        buyerZipCode: order.purchase_units[0].shipping.address.postal_code,
        generatorShare: share,
      },
    })
      .then(response => {
        return response
      })
      .catch(error => {
        return error
      })
  },
  submitArtwork(context, artwork) {
    return axios({
      method: 'post',
      url: process.env.baseUrl + '/artworks',
      data: artwork,
    })
      .then(response => {
        return response
      })
      .catch(error => {
        return error
      })
  },
}

export const getters = {
  isLoading: state => {
    return state.isLoading
  },
  getArtworkById: state => id => {
    return state.artworks[id]
  },
  getArtworkBySlug: state => slug => {
    const artworkId = Object.keys(state.artworks).find(key => {
      return state.artworks[key].slug === slug
    })
    return state.artworks[artworkId]
  },
}
