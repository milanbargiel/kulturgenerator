const mutations = {
    SET_LOADING_STATE (state, payload) {
        if (!payload) {
            setTimeout(() => state.isLoading = payload, state.loadingDelay)
        } else {
            state.isLoading = payload
        }
    },
    SET_ARTWORKS (state, payload) {
        state.artworks = payload
    }
}

export default mutations