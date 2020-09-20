import Vue from 'vue'

const mutations = {
    SET_ARTWORKS (state, payload) {
        payload.forEach((artwork) => {
            Vue.set(state.artworks, [artwork.id], artwork)
        })
    },
    SET_ARTWORK (state, payload) {
        Vue.set(state.artworks, [payload.id], payload)
    }
}

export default mutations