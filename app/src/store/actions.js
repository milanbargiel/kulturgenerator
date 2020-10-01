import axios from 'axios'

const actions = {
    getArtworks (context) {
        return axios.get(process.env.VUE_APP_API_BASEURL + '/artworks')
            .then(response => {
                context.commit('SET_ARTWORKS', response.data)
                return response
        })
    },
    getArtworkById (context, id) {
        return axios.get(process.env.VUE_APP_API_BASEURL + '/artworks/' + id)
            .then(response => {
                context.commit('SET_ARTWORK', response.data)
                return response
            })        
    },
    updateArtworkQuantity (context, { id, quantity, currentQuantity }) {
       if (currentQuantity < 1) {
           return
       }
        const newQuantity = currentQuantity - quantity
        return axios({
            method: 'put',
            url: process.env.VUE_APP_API_BASEURL + '/artworks/' + id,
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
    },
    sendOrder (context, { artwork, orderQuantity, buyerEmail, buyerFullname, buyerStreet, buyerCity, buyerState, buyerZipCode }) {
        axios({
            method: 'post',
            url: process.env.VUE_APP_API_BASEURL + '/order',
            data: {
                artwork,
                orderQuantity,
                buyerEmail,
                buyerFullname,
                buyerStreet,
                buyerCity,
                buyerState,
                buyerZipCode
            }
        })
        .then(response => {
            return response
        })
        .catch(error => {
            return error
        })
    },
}

export default actions