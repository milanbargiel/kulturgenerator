<template>
  <div>
    <restaurant-list></restaurant-list>
  </div>
</template>

<script>
// @ is an alias to /src
import RestaurantList from '../components/RestaurantList'

export default {
  name: 'Restaurants',
  components: {
    RestaurantList
  }
}
</script>
