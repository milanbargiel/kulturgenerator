<template>
  <div>
    <h3>List of Restaurants:</h3>
    <p>
      <ul>
        <li v-for="restaurant in restaurants" :key="restaurant.id">
          <restaurant-list-item :item="restaurant"></restaurant-list-item>
        </li>
      </ul>
    </p>

  </div>
</template>

<script>
import axios from 'axios'
import RestaurantListItem from './RestaurantListItem.vue'

export default {
  name: 'RestaurantList',
  components: {
      RestaurantListItem
  },
  data () {
    return {
      restaurants: []
    }
  },
  created () {
    axios.get(process.env.VUE_APP_API_BASEURL + '/restaurants')
      .then(response => {
        this.restaurants = response.data
      })
  }
}
</script>
