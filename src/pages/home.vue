<template>
  <div class="home">
    <scroll :listData="listData" :oneDate="oneDate"></scroll>
    <overview :scenicName="nameScenic"></overview>
    <map-all :scenicName="nameScenic"></map-all>
    <predict :scenicName="nameScenic"></predict>
    <chart :scenicName="nameScenic"></chart>
  </div>
</template>

<script>
import { getValidDatas } from "../api/index";
import Chart from "../components/Chart.vue";
import MapAll from "../components/Map.vue";
import Overview from "../components/Overview.vue";
import Predict from "../components/Predict.vue";
import Scroll from "../components/Scroll.vue";

export default {
  name: "home",
  data() {
    return {
      nameScenic: "上海世纪公园",
      myData: [],
      listData:[],
      oneDate:null,
    };
  },
  components: {
    Chart,
    MapAll,
    Overview,
    Predict,
    Scroll,
  },
  watch: {
    // 监听路由，当路由变化时，执行函数
    $route() {
      this.changeNameScenic();
    },
  },
  mounted() {
    this.getValidDatas(this.nameScenic);
  },
  methods: {
    changeNameScenic() {
      // 通过路由跳转时，向跳转后的组件传递参数
      this.nameScenic = this.$route.query.name;
      console.log(this.$route.query.name);
      this.getValidDatas(this.nameScenic);
    },
    getValidDatas(name) {
      getValidDatas(name)
        .then((res) => {
          if (this.myData.length != 0) {
            this.myData = [];
            this.myData = res;
            this.getLastDiff(this.myData);
            console.log("1")
          } else {
            this.myData = res;
            this.getLastDiff(this.myData);
            console.log("2");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getLastDiff(data) {
      let long = data.length;
      let flag = 1;
      let testSumHM=[];
      let testHM =[]
      let oneData=[];
      let oneDate =data[long - 1].time.split(" ")[0];
      for (let i = long - 1; i >= 0; i--) {
        let num = data[i].num;
        let time = data[i].time.split(" ");
        let TempDate = time[0];
        let TempHM = time[1].split(":").splice(0, 2).join(":");
        testSumHM.push(TempHM);
        if(oneDate!=TempDate){
          flag++;
          oneDate = TempDate;
        }
          if(flag == 1){
            oneData.push({num:num,HM:TempHM,diff:-1,change:-1});
          }
          if(flag == 2){
            testHM.push(TempHM);
            for(let k in oneData){
              if(oneData[k].HM == TempHM){
                oneData[k].change = oneData[k].num-num;
                oneData[k].diff =Math.floor(((oneData[k].num-num)/num)*100);
              } 
            }
          }
          if(flag == 3){
            break;
        }
      }
      this.listData =oneData;
      this.oneDate =oneDate;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  display: grid;
  grid-template-columns: 1fr 3.22fr 1.89fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-areas:
    "scroll overview chart"
    "scroll map chart"
    "scroll predict chart";
  grid-gap: 0.2rem;
}
</style>
