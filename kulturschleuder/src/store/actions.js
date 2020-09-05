import axios from 'axios'

const actions = {
    getArtworks (context) {
        axios.get(process.env.VUE_APP_API_BASEURL + '/artworks')
            .then(response => {
                context.commit('SET_ARTWORKS', response.data)

        })
    },
    getArtworkById (context, id) {

        return axios.get(process.env.VUE_APP_API_BASEURL + '/artworks/' + id)
        .then(response => {
            return response.data
        })        
    }
}

export default actions