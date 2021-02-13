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
    getArchivedArtworks: state => {
        return Object.values(state.artworks)
            .filter(item => {
                console.log(item);
                return true;
            })
            .sort((a, b) => a.author > b.author ? 1 : -1) // sort alphabetically for author property
    },
    getArtworks: state => {
        return Object.values(state.artworks)
            .map(item => ({ sort: Math.random(), value: item })) // introduce random sort parameter
            .sort((a, b) => a.sort - b.sort) // sort by random sort parameter
            .map(item => {
                item.value.randomWidthBase = Math.random() // introduce random width base for later caluclation
                if (item.value.randomWidthBase < .2) {
                    item.value.randomWidthBase += 4 // bump random width base by 2 for every 6th item
                }
                return item.value // exclude random sort parameter
            })
            .sort(a => a.quantity > 0 ? -1 : 1) // move sold out items to the back
    },
    roundedMoneypoolBalance: state => {
        return Math.round(state.shadowMoneypoolBalance)
    }
}

export default getters
