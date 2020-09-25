import Vue from 'vue'

const mutations = {
    SET_LOADING_STATE (state, payload) {
        if (!payload) {
            setTimeout(() => state.isLoading = payload, state.loadingDelay)
        } else {
            state.isLoading = payload
        }
    },
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
    }    
}

export default mutations