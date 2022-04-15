<template>
  <div id="app">
    <the-header class="header"></the-header>
    <router-view class="content"></router-view>
    <the-aside class="aside"></the-aside>
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
*{
  margin: 0;
  padding: 0;
}
  #app {
    background: #ed5909;
    display: grid;
    height: 100vh;
    width: 100%;
    grid-template-rows: 0.1fr 0.9fr;
    grid-template-columns: 0.2fr 0.8fr ;
    grid-template-areas:
    "nav nav"
    "side main";
    grid-gap: 0.2rem;
  } 
  .content{
    background: #3342ea;
    grid-area:main;
  }
</style>
