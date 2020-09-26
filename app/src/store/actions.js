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
                context.commit('SET_ARTWORK', response.data)
            })        
    },
    updateArtworkQuantity (context, { id, quantity, currentQuantity }) {
       if (currentQuantity < 1) {
           return
       }
        const newQuantity = currentQuantity - quantity
        return axios({
            method: 'put',
            url: 'http://localhost:1337/artworks/' + id,
            data: {
                quantity: newQuantity
            }})
        .then(response => {
            return response.data.quantity
        })
        .catch(error => {
            return error
        })             
    },
    getShadowMoneypoolBalance (context) {
        return axios.get(process.env.VUE_APP_API_BASEURL + '/moneypool')
            .then(response => {
                context.commit('UPDATE_SHADOW_MONEYPOOL', response.data.currentBalance)
            })
    },
    updateShadowMoneypool (context, balance) {
        console.log('balance', balance)
        axios({
            method: 'put',
            url: process.env.VUE_APP_API_BASEURL + '/moneypool',
            data: {
                currentBalance: context.state.shadowMoneypoolBalance + balance
            }
        })
        .then(response => {
            context.commit('UPDATE_SHADOW_MONEYPOOL', response.data.currentBalance)
        })
    }
}

export default actions