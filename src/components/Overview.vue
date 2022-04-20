<template>
  <!-- 景区概览 -->
  <div class="overview">
    <div class="title">景区概览{{oneDate}}</div>
    <div class="items">
      <div class="item" v-for="(item,index) in overviewData" :key="index">
        <div class="title">---{{item.title}}</div>
        <div class="number">---{{item.num}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    name:'overview',
    data(){
      return{

      }
    },
    props: ["overviewData","oneDate"]
  }
</script>
<style scoped>
  .overview{
    grid-area: overview;
    background: blueviolet;
  }
</style>



