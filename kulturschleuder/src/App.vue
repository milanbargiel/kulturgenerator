<template>
  <div id="app">
    <my-header></my-header>
    <router-view/>
  </div>
</template>

<script>
import MyHeader from './components/Header'

export default {
  name: 'App',
  components: { MyHeader }
}
</script>

<style lang="scss">
@import "styles/App.scss";
</style>
