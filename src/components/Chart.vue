<template>
  <!-- 图表部分 -->
  <div class="chart">
    <div class="one">{{ChartData}}</div>
    <div class="two">{{ChartTimePartData}}</div>
  </div>
</template>

<script>
export default {
  name:'chart',
  data(){
    return{

    }
  },
  props:["ChartData","ChartTimePartData","oneDate"],
  methods: {
    
  },
  watch: {
    // 监听从父组件传来的值
    ChartTimePartData: {
      handler: function () {
        // this.getChartLine();
      },
      // immediate: true, //首次加载时执行监听
      deep: true, //值改变时执行监听
    },
  }
}
</script>
<style scoped>
  .chart{
    background: rgb(77, 68, 244);
    grid-area: chart;
  }
</style>


