<template>
    <div>
        <span>
            Title: {{ item.Title }}, Available Seats: {{ item.seats }}
        </span>
        <router-link :to="{ name: 'detail', params: { id: item.id }}">show details</router-link>
    </div>
</template>

<script>
export default {
    name: 'RestaurantListItem',
    props: ['item']
}
</script>