import Vue from 'vue'

const mutations = {
    SET_ARTWORKS (state, payload) {
        payload.forEach((artwork) => {
            Vue.set(state.artworks, [artwork.id], artwork)
        })
    },
    SET_ARTWORK (state, payload) {
        Vue.set(state.artworks, [payload.id], payload)
    },
    UPDATE_ARTWORK_QUANTITY (state, payload) {
        state.artworks[payload.id].quantity = payload.quantity
    },
    SET_PAYMENT_INFO (state, payload) {
        state.paymentInfo = payload
    },
    UPDATE_SHADOW_MONEYPOOL (state, payload) {
        state.shadowMoneypoolBalance += payload
    }    
}

export default mutations