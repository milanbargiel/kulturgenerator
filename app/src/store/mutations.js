import Vue from 'vue'

const mutations = {
    SET_LOADING_STATE (state, payload) {
        if (!payload) {
            setTimeout(() => state.isLoading = payload, state.loadingDelay) // wait a minimum amount of time before setting loading to false
        } else {
            state.isLoading = payload
        }
    },
    SET_MENU_ITEMS (state, payload) {
        state.menuItems.push(...payload.menuItems)
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
    },
    UPDATE_SHADOW_MONEYPOOL (state, payload) {
        state.shadowMoneypoolBalance = payload
    }    
}

export default mutations