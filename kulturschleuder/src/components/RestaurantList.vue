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
    // axios.get('http://localhost:1337/restaurants') // use for local environment TODO: implement .env file locally and on the server
    axios.get('https://xyz.kulturgenerator.de/restaurants') // use for production environment TODO: implement .env file locally and on the server
      .then(response => {
        this.restaurants = response.data
      })
  }
}
</script>
