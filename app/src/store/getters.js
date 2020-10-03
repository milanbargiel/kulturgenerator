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
        const active = []; // artworks that can be bought
        const archive = []; // already sold artworks
        
        // randomize
        Object.values(state.artworks)
            .map((a) => ({sort: Math.random(), value: a}))
            .sort((a, b) => a.sort - b.sort)
            .map((a) => {
                if (a.value.quantity < 1) { // sold
                    archive.push(a.value)
                } else {
                    active.push(a.value)
                }
            });

        // display sold artworks last
        return active.concat(archive)
    }
}

export default getters