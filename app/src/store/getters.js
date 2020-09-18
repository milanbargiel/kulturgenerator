const getters = {
    isLoading: state => {
        return state.isLoading
    },
    getRandomizedArtworks: state => {
        return state.artworks
            .map((a) => ({sort: Math.random(), value: a}))
            .sort((a, b) => a.sort - b.sort)
            .map((a) => a.value)
    }
}

export default getters