<template>
  <div>
    <h3>List of Restaurants:</h3>
    <p>
      <ul>
        <li v-for="restaurant in restaurants" :key="restaurant.id">
          Title: {{ restaurant.Title }}, Available Seats: {{ restaurant.seats }}
        </li>
      </ul>
    </p>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'RestaurantList',
  data () {
    return {
      restaurants: []
    }
  },
  created () {
    axios.get('http://localhost:1337/restaurants')
      .then(response => {
        this.restaurants = response.data
      })
  }
}
</script>
