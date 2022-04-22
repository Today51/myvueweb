<template>
  <!-- 图表部分 -->
  <div class="chart">
    <div class="one" id="one">{{ ChartData }}</div>
    <div class="two" id="two">{{ ChartTimePartData }}</div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "chart",
  data() {
    return {};
  },
  props: ["ChartData", "ChartTimePartData", "oneDate"],
  methods: {
    getEchartsOne(dataX, dataY) {
      let myChart = echarts.init(document.getElementById("one"));
      myChart.setOption({
        title: {
          text: "客流量统计",
          textStyle: {
            color: "rgb(194, 194, 194)",
            fontSize: 15,
          },
        },
        grid: {
          left: "2%",
          right: "2%",
          bottom: "2%",
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          data: dataX,
          axisTick: {
            alignWithLabel: true,
          },
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgb(87,88,93)",
              type: "dashed",
            },
          },
        },
        series: [
          {
            data: dataY,
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgb(180, 180, 180, 0.2)",
            },
            label: {
              show: true,
              position: "top",
              textStyle: {
                color: "rgb(176,177,179)",
              },
            },
          },
        ],
      });
    },
    getEchartsTwo() {
      let myChart = echarts.init(document.getElementById("two"));
      myChart.setOption({
        title: {
          text: `时段客流统计|${this.oneDate}`,
          textStyle: {
            color: "rgb(194, 194, 194)",
            fontSize: 15,
          },
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "right",
          textStyle: {
            color: "rgb(194, 194, 194)",
            fontSize: 15,
          },
        },
        series: [
          {
            type: "pie",
            radius: ["40%", "70%"],
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                color: "rgb(194, 194, 194)",
                fontSize: 15,
              },
            },
            data: [
              { value: this.ChartTimePartData[0], name: "早上" },
              { value: this.ChartTimePartData[1], name: "中午" },
              { value: this.ChartTimePartData[2], name: "下午" },
              { value: this.ChartTimePartData[3], name: "傍晚" },
            ],
          },
        ],
      });
    },
  },
  watch: {
    // 监听从父组件传来的值
    ChartData: {
      handler: function () {
        let dataX = [],
          dataY = [];
        for (let i = 0; i < this.ChartData.length; i++) {
          dataX.push(this.ChartData[i].date);
          dataY.push(this.ChartData[i].sum);
        }
        this.getEchartsOne(dataX, dataY);
      },
      // immediate: true, //首次加载时执行监听
      deep: true, //值改变时执行监听
    },
    ChartTimePartData: {
      handler: function () {
        this.getEchartsTwo();
      },
      // immediate: true, //首次加载时执行监听
      deep: true, //值改变时执行监听
    },
  },
};
</script>
<style scoped>
.chart {
  background: rgb(36,38,45);
  grid-area: chart;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    "one"
    "two";
  position: relative;
  gap:10px;
}
.chart::before{
  content: "";
  top:0;
  width: 100%;
  height: 2px;
  background: rgb(145,204,117);
  position: absolute;
}
.one {
  margin-top:5px ;
  grid-area: one;
  background: rgb(29,30,36);
}
.two {
  grid-area: two;
  background: rgb(36,38,45);
}
</style>


