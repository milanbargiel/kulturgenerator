<template>
    <div>
        <span>
            Title: {{ item.Title }}, Available Seats: {{ item.seats }}
        </span>
        <router-link :to="{ name: 'detail', params: { author: item.author, title: item.title }}">show artwork details</router-link>
    </div>
</template>

<script>
export default {
    name: 'ArtworkListItem',
    props: ['item']
}
</script>