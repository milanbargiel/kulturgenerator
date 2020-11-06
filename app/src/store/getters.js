const getters = {
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
    getRandomizedArtworks: state => {
        return Object.values(state.artworks)
            .map(item => ({ sort: Math.random(), value: item })) // introduce random sort parameter
            .sort((a, b) => a.sort - b.sort) // sort by random sort parameter
            .map(item => item.value) // exclude random sort parameter
            .sort(a => a.quantity > 0 ? -1 : 1) // move sold out items to the back
    },
    roundedMoneypoolBalance: state => {
        return Math.round(state.shadowMoneypoolBalance)
    }
}

export default getters
