<template>
  <div class="the-header">
    <div @click="goHome">
       <span>the-header</span>
    </div>
   
  </div>
</template>
<script>
export default{
  name:'the-header',
  data(){
    return{
      
    }
  },
  create(){

  },
  computed:{

  },
  components: {
    
  },
  mounted () {
    
  },
  methods: {
    goHome(){
      this.$router.push({path:'/'})
    }
  }
}

</script>

<style scoped>

</style>



