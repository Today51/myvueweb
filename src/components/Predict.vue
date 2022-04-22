<template>
  <!--预测折线图部分  -->
  <div class="predict">
    <div id="predictMain"></div>
  </div>
</template>
<script>
import * as echarts from "echarts";
export default {
  name: "predict",
  data() {
    return {
      // oneNum:[],//今日数据
      // oneHM:[],//今日时间节点
    };
  },
  props: ["oneNum", "oneDate", "predictData", "oneHM"],
  methods: {
    getChartLine() {
      let myChart = echarts.init(document.getElementById("predictMain"));
      myChart.setOption({
        title: {
          text: `客流趋势分析${this.oneDate}`,
          textStyle: {
            color: 'rgb(194, 194, 194)',
            fontSize:15,
          },
        },
        grid: {
          // height:100,
          left: "2%",
          right: "2%",
          bottom: "2%",
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          textStyle:{
            color:'rgb(194, 194, 194)'
          },
          icon:'circle',
          data: ["今日趋势", "预测趋势"],
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.oneHM,
        },
        yAxis: {
          type: "value",
          splitLine:{
            lineStyle:{
              color:'rgb(87,88,93)',
              type:'dashed'
            }
          }
        },
        series: [
          {
            name: "今日趋势",
            type: "line",
            tack: "Total",
            smooth: true,
            lineStyle: {
              width: 1,
            },
            showSymbol: true,
            data: this.oneNum,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(84,112,198)",
                },
                {
                  offset: 1,
                  color: "rgb(1, 191, 236)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
          },
          {
            name: "预测趋势",
            type: "line",
            tack: "Total",
            data: this.predictData,
            smooth: true,
            lineStyle: {
              width: 1,
            },
            showSymbol: true,
          },
        ],
      });
    },
  },
  mounted() {},
  watch: {
    // 监听从父组件传来的值
    oneNum: {
      handler: function () {
        this.getChartLine();
      },
      // immediate: true, //首次加载时执行监听
      deep: true, //值改变时执行监听
    },
  },
};
</script>

<style scoped>
.predict {
  background: rgb(29, 30, 36);
  grid-area: predict;
}
#predictMain {
  width: 100%;
  height: 100%;
  background: rgb(36, 38, 45);
}
</style>


