<template>
  <div class="the-aside">
    <div @click="goModel">
      <span>the-aside</span>
    </div>
    
  </div>
</template>
<script>
export default{
  name:'the-aside',
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
    goModel(){
      this.$router.push({path:'/model'})
    }
  }
}

</script>

<style scoped>
   .the-aside{
    background: #015e48;
    grid-area: side;
  }
</style>



