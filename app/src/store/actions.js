import axios from 'axios'

const actions = {
    getMenuItems (context) {
        // axios.get(process.env.VUE_APP_API_BASEURL + '/navigation')
        //     .then(response => {
        //         context.commit('SET_MENU_ITEMS', response.data)
        //     })
        const fakeResponse = {"id":1,"created_at":"2020-11-03T10:08:05.251Z","updated_at":"2021-01-30T17:07:33.684Z","menuItems":[{"__component":"navigation.custom-menu-item","id":5,"name":null,"label":"Vielen Dank!","viewName":null,"activeBackgroundColor":"blue","type":"thank-you-message","speed":4,"activeFontColor":"none"},{"__component":"navigation.moneypool-balance","id":1,"name":"moneypool-balance","themeColor":"","type":"moneypool-balance","viewName":"about","speed":0},{"__component":"navigation.custom-menu-item","id":2,"name":"Generator","label":"KULTUR GENERATOR","viewName":"about","activeBackgroundColor":"none","type":"custom-menu-item","speed":0,"activeFontColor":"blue"},{"__component":"navigation.custom-menu-item","id":7,"name":"Archiv","label":"ARCHIV","viewName":"archive","activeBackgroundColor":"none","type":"custom-menu-item","speed":0,"activeFontColor":"blue"},{"__component":"navigation.custom-menu-item","id":3,"name":"Impressum","label":"IMPRESSUM","viewName":"impressum","activeBackgroundColor":"none","type":"custom-menu-item","speed":0,"activeFontColor":"blue"},{"__component":"navigation.back-button","id":1,"name":"backButton","label":"←","type":"back-button","speed":6}]}
        context.commit('SET_MENU_ITEMS', fakeResponse)
    },
    getArtworks (context) {
        return axios.get(process.env.VUE_APP_API_BASEURL + '/artworks')
            .then(response => {
                context.commit('SET_ARTWORKS', response.data)
                return response
        })
    },
    getArtworkBySlug (context, slug) {
        return axios.get(process.env.VUE_APP_API_BASEURL + '/artworks/' + slug)
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
    sendOrder (context, { artworkId, order, share }) {
        return axios({
            method: 'post',
            url: process.env.VUE_APP_API_BASEURL + '/orders',
            data: {
                artwork: { id: artworkId, slug: context.state.artworks[artworkId].slug },
                artworkName: order.purchase_units[0].items[0].name,
                orderQuantity: order.purchase_units[0].items[0].quantity,
                orderTotalAmount: order.purchase_units[0].amount.value,
                buyerEmail: order.payer.email_address,
                buyerFullname: order.purchase_units[0].shipping.name.full_name,
                buyerStreet: order.purchase_units[0].shipping.address.address_line_1,
                buyerCity: order.purchase_units[0].shipping.address.admin_area_2,
                buyerState: order.purchase_units[0].shipping.address.admin_area_1,
                buyerZipCode: order.purchase_units[0].shipping.address.postal_code,
                generatorShare: share
            }
        })
        .then(response => {
            return response
        })
        .catch(error => {
            return error
        })
    },
    submitArtwork (context, artwork ) {
        return axios({
            method: 'post',
            url: process.env.VUE_APP_API_BASEURL + '/artworks',
            data: artwork
        })
        .then(response => {
            return response
        })
        .catch(error => {
            return error
        })
    }
}

export default actions