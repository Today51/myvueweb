<template>
  <div class="home">
    <scroll :listData="listData" :oneDate="oneDate"></scroll>
    <overview :overviewData="overviewData" :oneDate="oneDate"></overview>
    <map-all :scenicName="nameScenic"></map-all>
    <predict
      :oneNum="oneNum"
      :oneHM="oneHM"
      :oneDate="oneDate"
      :predictData="predictData"
    ></predict>
    <chart :ChartData="ChartData" :ChartTimePartData="ChartTimePartData" :oneDate="oneDate"></chart>
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
      test: 1,
      test2: 2,
      nameScenic: "上海世纪公园",
      myData: [],
      listData: [], //滚动列表所需数据
      overviewData: [
        { title: "景区今日客流量", num: null },
        { title: "景区昨日客流量", num: null },
        { title: "景区本月客流量", num: null },
        { title: "景区今日预测客流量", num: null },
        { title: "景区今日预测峰值", num: null },
        { title: "景区本年客流量", num: null },
      ], //景区概览所需数据
      oneDate: null, //滚动列表所需日期
      oneNum: [], //趋势分析所需今日数据
      oneHM: [], //趋势分析所需今日时间节点
      predictData: [], //趋势分析所需预测的数据
      ChartData:[],//图表模块所需直方图数据
      ChartTimePartData:[]//图表模块所需饼图数据


      // toDaySumNum:0,//景区概览所需今日客流
      // yesterdaySumNum:0,//景区概览所需昨日客流
      // monthSumNum:0,//景区概览所需本月客流
      // yearSumNum:0,//景区概览所需本年客流
      // predictTodaySumNum:0,//景区概览所需预测今日总客流
      // predictTodayMaxNum:0,//景区概览所需预测今日客流峰值
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
          console.log("res",res);
          if (this.myData.length != 0) {
            this.myData = [];
            this.predictData = [];
            this.predictData= this.changeIntNum(res.predictData);
            this.myData = res.data;
            this.getLastDiff(this.myData);
            this.getOverviewData(this.myData);
            this.getChartCategoryData(this.myData);
            this.getChartTimePartData(this.myData);
          } else {
            
            this.predictData = this.changeIntNum(res.predictData);
            this.myData = res.data;
            this.getLastDiff(this.myData);
            this.getOverviewData(this.myData);
            this.getChartCategoryData(this.myData);
            this.getChartTimePartData(this.myData);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 将后台传入的人流数据转换为整数 并求出最大值和总值
    changeIntNum(data){
      let max=0,predictTodayMaxNum=0,predictTodaySumNum = 0,temp=[];
      for(let i=0;i<data.length;i++){
        let IntTemp=parseInt(data[i]);
        if(max<=IntTemp){
          max=IntTemp;
        }
        predictTodaySumNum+=IntTemp;
        temp.push(IntTemp)
      }
      predictTodayMaxNum=max;
      this.overviewData[3].num = this.dealLongNum(predictTodaySumNum);
      this.overviewData[4].num = this.dealLongNum(predictTodayMaxNum);
      return temp;
    },
    getLastDiff(data) {
      let long = data.length;
      let flag = 1;
      let oneData = [];
      let oneDate = data[long - 1].time.split(" ")[0];

      let 
        oneNum = [],
        oneHM = [];
      let toDaySumNum = 0,
        predictTodayMaxNum = 0,
        yesterdaySumNum = 0,
        predictTodaySumNum = 0;
      for (let i = long - 1; i >= 0; i--) {
        let num = data[i].num;
        let time = data[i].time.split(" ");
        let TempDate = time[0];
        let TempHM = time[1].split(":").splice(0, 2).join(":");
        if (oneDate != TempDate) {
          flag++;
          oneDate = TempDate;
        }
        if (flag == 1) {
          // 这里可以计算今日客流总数
          toDaySumNum += num;
          oneData.push({ num: num, HM: TempHM, diff: -1, change: -1 });

          // 这里先简单处理一下趋势分析所需的数据
          oneNum.push(num);
          oneHM.push(TempHM);
          // predictData.push(num + Math.floor(num * Math.random()));

          
          
        }
        if (flag == 2) {
          // 这里可以计算昨日客流总数
          yesterdaySumNum += num;
          for (let k in oneData) {
            if (oneData[k].HM == TempHM) {
              let tempNum = oneData[k].num - num;
              let tempDiff = Math.floor(((oneData[k].num - num) / num) * 100);
              if (tempNum > 0) {
                oneData[k].change = "+" + tempNum;
              } else {
                oneData[k].change = tempNum;
              }
              if (tempDiff > 0) {
                oneData[k].diff = "+" + tempDiff + "%";
              } else {
                oneData[k].diff = tempDiff + "%";
              }
            }
          }
        }
        if (flag == 3) {
          break;
        }
      }
      // 除去根据时间节点找不到昨日数据的点 即diff=-1&&change=-1
      for (let k = oneData.length - 1; k >= 0; k--) {
        if (oneData[k].diff == -1 && oneData[k].change == -1) {
          oneData.splice(k, 1);
        }
      }
      this.listData = oneData;
      this.oneDate = oneDate;
      // 统一格式化
      this.overviewData[0].num = this.dealLongNum(toDaySumNum);
      this.overviewData[1].num = this.dealLongNum(yesterdaySumNum);


      // this.predictData = predictData.reverse();
      this.oneNum = oneNum.reverse();
      this.oneHM = oneHM.reverse();
    },
    getOverviewData(data) {
      // 计算本月客流量，由于数据库数据没有一个整月的数据，所以遍历数据，计算日平均客流量
      // 根据日平均客流量计算年客流量 年以365天
      let sum = 0,
        averageDayNum,
        result,
        curDate,
        monthSumNum = 0,
        yearSumNum = 0;
      for (let i = 0; i < data.length; i++) {
        sum += data[i].num;
      }
      averageDayNum = Math.floor(sum / data.length); //取整
      // 获取当月有多少天
      curDate = new Date();
      if (this.oneDate) {
        curDate.setMonth(parseInt(this.oneDate.split("-")[1]));
      } else {
        curDate.setMonth(curDate.getMonth() + 1);
      }
      result = averageDayNum * curDate.getDate();
      // 格式化本月数据
      monthSumNum = this.dealLongNum(result);
      // 格式化本年客流量
      yearSumNum = this.dealLongNum(averageDayNum * 365);
      // 同一传向子组件的数据
      this.overviewData[2].num = monthSumNum;
      this.overviewData[5].num = yearSumNum;
    },
    // 处理景区概览中数据,每三位加一个逗号
    dealLongNum(data) {
      let arr = String(data).split(""); //转换为字符数组
      let sym = false;
      if (arr.length <= 3) {
        return arr.join("");
      }
      if (arr.length % 3 == 0) {
        sym = true;
      }
      let flag = 0;
      for (let i = arr.length; i >= 0; i--) {
        if (flag == 3) {
          arr.splice(i, 0, ",");
          flag = 0;
        }
        flag++;
      }
      if (sym) {
        return arr.splice(1).join("");
      }
      return arr.join("");
    },
    // 获取图表部分的数据 每日客流总数
    getChartCategoryData(data) {
      let result = [],
        flag = data[0].time.split(" ")[0],
        sum = 0;
      for (let i = 0; i < data.length; i++) {
        let num = data[i].num;
        let time = data[i].time.split(" ");
        let TempDate = time[0];
        sum += num;
        if (flag != TempDate) {
          result.push({ sum: sum, date: flag });
          flag = TempDate;
          sum = 0;
        }
      }
      this.ChartData=result;
    },
    // 获取图表部分的数据  当日 早上 8:00-11:00 中文 11:00-13:00 下午 13:00-17:00 晚上：17:00-18:00
    getChartTimePartData(data) {
      let flag = data[data.length - 1].time.split(" ")[0];
      let result = [];
      let morningData = 0,
        noonData = 0,
        afternoonData = 0,
        eveningData = 0;
      for (let i = data.length - 1; i >= 0; i--) {
        let num = data[i].num;
        let timeData = data[i].time.split(" ");
        let TempDate = timeData[0];
        let time = Number(timeData[1].split(":").splice(0,2).join(""));
        if (flag != TempDate) {
          result = [morningData, noonData, afternoonData, eveningData];
          break;
        }
        if (time < 1100 && time>=800) {
          morningData += num;
        }
        if (time < 1300 && time>=1100 ) {
          noonData += num;
        }
        if (time < 1700&& 1300 <=time ) {
          afternoonData += num;
        }
        if (1700 <= time) {
          eveningData += num;
        }        
      }
      this.ChartTimePartData=result;
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
