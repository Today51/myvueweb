<template>
  <!-- 地图部分 -->
  <div class="map" id="map"></div>
</template>
<script>
import * as echarts from "echarts";

import axios from "axios";
export default {
  name: "map-all",
  data() {
    return {
      points: [
        { value: [121.558979, 31.222046], itemStyle: { color: "#4ab2e5" } ,name:'上海世纪公园'},
        { value: [121.403703, 31.230279], itemStyle: { color: "#4fb6d2" } ,name:'上海长风公园'},
        { value: [121.55837, 31.325265], itemStyle: { color: "#52b9c7" } ,name:'上海共青森林公园'},
        { value: [120.916603, 31.079491], itemStyle: { color: "#5abead" } ,name:'上海大观园'},
        { value: [121.376489, 31.34461], itemStyle: { color: "#f34e2b" } ,name:'上海顾村公园景区'},
        { value: [121.3229, 31.297989], itemStyle: { color: "#f56321" } ,name:'上海古猗园'},
        { value: [121.536425, 31.299442], itemStyle: { color: "#f56f1c" } ,name:'黄兴公园'},
        { value: [121.490155, 31.277476], itemStyle: { color: "#f58414" } ,name:'上海鲁迅公园'},
        { value: [121.377542, 31.149117], itemStyle: { color: "#f58f0e" } ,name:'上海闵行体育公园'},
        { value: [121.506379, 31.245414], itemStyle: { color: "#f5a305" } ,name:'东方明珠广播电视塔'},
        { value: [121.060838, 31.11664], itemStyle: { color: "#e7ab0b" } ,name:'朱家角古镇'},
      ],
      indexMap: [
        { name: "上海世纪公园", coordinate: [121.558979, 31.222046] },
        { name: "上海长风公园", coordinate: [121.403703, 31.230279] },
        { name: "上海共青森林公园", coordinate: [121.55837, 31.325265] },
        { name: "上海大观园", coordinate: [120.916603, 31.079491] },
        { name: "上海顾村公园景区", coordinate: [121.376489, 31.34461] },

        { name: "上海古猗园", coordinate: [121.3229, 31.297989] },
        { name: "黄兴公园", coordinate: [121.536425, 31.299442] },
        { name: "上海鲁迅公园", coordinate: [121.490155, 31.277476] },
        { name: "上海闵行体育公园", coordinate: [121.377542, 31.149117] },
        { name: "东方明珠广播电视塔", coordinate: [121.506379, 31.245414] },
        { name: "朱家角古镇", coordinate: [121.060838, 31.11664] },
      ],
      centre: "上海世纪公园",
      coordinate: [121.558979, 31.222046],
    };
  },
  props: ["scenicName"],
  methods: {
    getMap() {
      axios({
        method: "get",
        baseURL: "http://localhost:8080/",
        url: "map.json",
      }).then((res) => {
        console.log(res.data);
        let myChart = echarts.init(document.getElementById("map"));
        myChart.showLoading();
        let index = -1;
        echarts.registerMap("map", res.data);
        myChart.hideLoading();
        myChart.setOption({
          backgroundColor: "#013954",
          geo: {
            map: "map",
            aspectScale: 0.75, //长宽比
            center: this.coordinate,
            zoom: 5,
            roam: true,
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: "#1DE9B6",
                },
              },
              emphasis: {
                textStyle: {
                  color: "rgb(183,184,14)",
                },
              },
            },
            itemStyle: {
              normal: {
                areaColor: {
                  type: "radial", //径向渐变色
                  x: 0.5,
                  y: 0.5,
                  r: 0.8,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#09132c", //0%的颜色
                    },
                    {
                      offset: 1,
                      color: "#274d68", //100%颜色
                    },
                  ],
                  globalCoord: true, //使用全球经纬坐标
                },
              },
              emphasis: {
                areaColor: "#2AB8FF",
                borderWidth: 0,
                color: "green",
                label: {
                  show: true,
                  textStyle: {
                    color: "#ffff",
                  },
                },
              },
            },
            regions: [],
          },
          series: [
            {
              type: "effectScatter",
              coordinateSystem: "geo",
              showEffectOn: "render",
              zlevel: 1,
              rippleEffect: {
                period: 5,
                scale: 4,
                brushType: "fill",
              },
              hoverAnimation: true,
              label: {
                normal: {
                  formatter: function(params){
                    return params.name;
                  },
                  position: "right",
                  offset: [10, 0],
                  color: "#ffff",
                  show: true,
                },
              },
              itemStyle: {
                normal: {
                  color: "#1DE9B6",
                  // shadowBlur: 10,
                  // shadowColor: "#333",
                },
              },
              symbolSize: 10,
              data: this.points,
            },
            // 地图线
            {
              type: "lines",
              zlevel: 2,
              effect: {
                show: true,
                period: 2, //箭头指向速度，值越小速度越快
                trailLength: 0.1, //特效尾迹长度[0,1]值越大，尾迹越长重
                symbol: "arrow", //箭头图标
                symbolSize: 5, //图标大小
              },
              lineStyle: {
                normal: {
                  color: "#1DE9B6",
                  width: 0.5, //线条宽度
                  opacity: 0.3, //尾迹线条透明度
                  curveness: 0.1, //尾迹线条曲直度
                },
              },
              data: [
                {
                  coords: [[121.558979, 31.222046], this.coordinate],
                  lineStyle: { color: "#4ab2e5" },
                },
                {
                  coords: [[121.403703, 31.230279], this.coordinate],
                  lineStyle: { color: "#4fb6d2" },
                },
                {
                  coords: [[121.55837, 31.325265], this.coordinate],
                  lineStyle: { color: "#52b9c7" },
                },
                {
                  coords: [[120.916603, 31.079491], this.coordinate],
                  lineStyle: { color: "#5abead" },
                },
                {
                  coords: [[121.376489, 31.34461], this.coordinate],
                  lineStyle: { color: "#f34e2b" },
                },
                {
                  coords: [[121.3229, 31.297989], this.coordinate],
                  lineStyle: { color: "#f56321" },
                },
                {
                  coords: [[121.536425, 31.299442], this.coordinate],
                  lineStyle: { color: "#f56f1c" },
                },
                {
                  coords: [[121.490155, 31.277476], this.coordinate],
                  lineStyle: { color: "#f58414" },
                },
                {
                  coords: [[121.377542, 31.149117], this.coordinate],
                  lineStyle: { color: "#f58f0e" },
                },
                {
                  coords: [[121.506379, 31.245414], this.coordinate],
                  lineStyle: { color: "#f5a305" },
                },
                {
                  coords: [[121.060838, 31.11664], this.coordinate],
                  lineStyle: { color: "#e7ab0b" },
                },
              ],
            },
          ],
        });
      });
    },
    getCentre() {
      for (let i = 0; i < this.indexMap.length; i++) {
        if (this.indexMap[i].name === this.centre) {
          this.coordinate = this.indexMap[i].coordinate;
          return;
        }
      }
    },
  },
  mounted() {
    this.getMap();
    this.getCentre();
  },
  watch: {
    scenicName:{
       handler: function (newV) {
         this.centre=newV;
        this.getCentre();
        this.getMap();
      },
      // immediate: true, //首次加载时执行监听
      deep: true, //值改变时执行监听
    }
  },
};
</script>

<style scoped>
.map {
  grid-area: map;
  background: rgb(14, 145, 246);
}
</style>

