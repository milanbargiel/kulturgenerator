const getters = {
    isLoading: state => {
        return state.isLoading
    },
    getArtworkById: state => id => {
        return state.artworks[id]
    },
    getRandomizedArtworks: state => {
        return Object.values(state.artworks)
            .map((a) => ({sort: Math.random(), value: a}))
            .sort((a, b) => a.sort - b.sort)
            .map((a) => a.value)
    }
}

export default getters