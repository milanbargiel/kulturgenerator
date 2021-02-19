import axios from 'axios'

const actions = {
  getArtworks (context) {
    return axios.get(process.env.VUE_APP_API_BASEURL + '/artworks?status=ZweiteRunde')
      .then(response => {
        context.commit('SET_ARTWORKS', response.data)
        return response
      })
  },
  getArchivedArtworks (context) {
    return axios.get(process.env.VUE_APP_API_BASEURL + '/artworks?status=ErsteRunde&_limit=200')
      .then(response => {
        context.commit('SET_ARTWORKS', response.data)
        return response
      })
  },
  getArtworkBySlug (context, slug) {
    return axios.get(process.env.VUE_APP_API_BASEURL + '/artworks/' + slug)
      .then(response => {
        context.commit('SET_ARTWORK', response.data)
        return response
      })
  },
  updateArtworkQuantity (context, { id, quantity, currentQuantity }) {
    if (currentQuantity < 1) {
      return
    }

    const newQuantity = currentQuantity - quantity
    return axios({
      method: 'put',
      url: process.env.VUE_APP_API_BASEURL + '/artworks/' + id,
      data: {
        quantity: newQuantity
      }
    })
      .then(response => {
        return response.data.quantity
      })
      .catch(error => {
        return error
      })
  },
  getShadowMoneypoolBalance (context) {
    return axios.get(process.env.VUE_APP_API_BASEURL + '/moneypool')
      .then(response => {
        context.commit('UPDATE_SHADOW_MONEYPOOL', response.data.currentBalance)
      })
  },
  updateShadowMoneypool (context, balance) {
    axios({
      method: 'put',
      url: process.env.VUE_APP_API_BASEURL + '/moneypool',
      data: {
        currentBalance: context.state.shadowMoneypoolBalance + balance
      }
    })
      .then(response => {
        context.commit('UPDATE_SHADOW_MONEYPOOL', response.data.currentBalance)
      })
  },
  sendOrder (context, { artworkId, order, share }) {
    return axios({
      method: 'post',
      url: process.env.VUE_APP_API_BASEURL + '/orders',
      data: {
        artwork: { id: artworkId, slug: context.state.artworks[artworkId].slug },
        artworkName: order.purchase_units[0].items[0].name,
        orderQuantity: order.purchase_units[0].items[0].quantity,
        orderTotalAmount: order.purchase_units[0].amount.value,
        buyerEmail: order.payer.email_address,
        buyerFullname: order.purchase_units[0].shipping.name.full_name,
        buyerStreet: order.purchase_units[0].shipping.address.address_line_1,
        buyerCity: order.purchase_units[0].shipping.address.admin_area_2,
        buyerState: order.purchase_units[0].shipping.address.admin_area_1,
        buyerZipCode: order.purchase_units[0].shipping.address.postal_code,
        generatorShare: share
      }
    })
      .then(response => {
        return response
      })
      .catch(error => {
        return error
      })
  },
  submitArtwork (context, artwork) {
    return axios({
      method: 'post',
      url: process.env.VUE_APP_API_BASEURL + '/artworks',
      data: artwork
    })
      .then(response => {
        return response
      })
      .catch(error => {
        return error
      })
  }
}

export default actions
