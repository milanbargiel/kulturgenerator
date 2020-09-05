<template>
  <div id="app">
    <my-header></my-header>
    <router-view/>
  </div>
</template>

<script>
import MyHeader from './views/Header'

export default {
  name: 'App',
  components: { MyHeader }
}
</script>

<style lang="scss">
@import "styles/App.scss";
</style>
