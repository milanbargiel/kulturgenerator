const mutations = {
    SET_TEST_INDEX (state, payload) {
        state.testIndex += payload
    },
    SET_ARTWORKS (state, payload) {
        state.artworks = payload
    }
}

export default mutations