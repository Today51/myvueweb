<template>
  <div id="app">
    <the-header></the-header>
    <router-view class="content"></router-view>
    <the-aside></the-aside>
  </div>
</template>

<script>
import TheHeader from './components/TheHeader.vue'
import TheAside from './components/TheAside.vue'
export default {
  name: 'App',
  components: {
    TheHeader,
    TheAside
  },
  data(){
    return {
    }
  },
  created(){
   
  },
  methods: {
  }
}
</script>

<style>
</style>
