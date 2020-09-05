import axios from 'axios'

const actions = {
    getArtworks (context) {
        axios.get(process.env.VUE_APP_API_BASEURL + '/artworks')
            .then(response => {
                context.commit('SET_ARTWORKS', response.data)

        })
    }
}

export default actions