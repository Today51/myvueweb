<template>
  <div class="home">
    <scroll :listData="listData" :oneDate="oneDate"></scroll>
    <overview :overviewData="overviewData" :oneDate="oneDate"></overview>
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
      test:1,
      test2:2,
      nameScenic: "上海世纪公园",
      myData: [],
      listData:[],//滚动列表所需数据
      overviewData:[
        {'title':'景区今日客流量','num':null},
        {'title':'景区昨日客流量','num':null},
        {'title':'景区本月客流量','num':null},
        {'title':'景区今日预测客流量','num':null},
        {'title':'景区今日预测峰值','num':null},
        {'title':'景区本年客流量','num':null}],//景区概览所需数据
      oneDate:null,//滚动列表所需日期

      toDaySumNum:0,//景区概览所需今日客流
      yesterdaySumNum:0,//景区概览所需昨日客流
      monthSumNum:0,//景区概览所需本月客流
      yearSumNum:0,//景区概览所需本年客流
      predictTodaySumNum:0,//景区概览所需预测今日总客流
      predictTodayMaxNum:0,//景区概览所需预测今日客流峰值

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
            this.getOverviewData(this.myData);
          } else {
            this.myData = res;
            this.getLastDiff(this.myData);
            this.getOverviewData(this.myData);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getLastDiff(data) {
      let long = data.length;
      let flag = 1;
      let oneData=[];
      let oneDate =data[long - 1].time.split(" ")[0];
      let toDaySumNum=0,predictTodayMaxNum=0,yesterdaySumNum=0,predictTodaySumNum=0;
      for (let i = long - 1; i >= 0; i--) {
        let num = data[i].num;
        let time = data[i].time.split(" ");
        let TempDate = time[0];
        let TempHM = time[1].split(":").splice(0, 2).join(":");
        if(oneDate!=TempDate){
          flag++;
          oneDate = TempDate;
        }
          if(flag == 1){
            // 这里可以计算今日客流总数
            toDaySumNum+=num;
            oneData.push({num:num,HM:TempHM,diff:-1,change:-1});
            // 简单处理预测值，假定10点为最大值
            if(!this.predictTodayMaxNum){
              if(TempHM=="10:00"){
                predictTodayMaxNum=num;
              }else{
                predictTodayMaxNum=num;
              }
            }
          }
          if(flag == 2){
            // 这里可以计算昨日客流总数
            yesterdaySumNum+=num;
            for(let k in oneData){
              if(oneData[k].HM == TempHM){
                let tempNum = oneData[k].num-num;
                let tempDiff = Math.floor(((oneData[k].num-num)/num)*100);
                if(tempNum>0){
                  oneData[k].change = "+"+tempNum;
                }else{
                  oneData[k].change =tempNum;
                }
                if(tempDiff>0){
                  oneData[k].diff = "+"+tempDiff+"%";
                }
                else{
                  oneData[k].diff = tempDiff+"%";
                }
              } 
            }
          }
          if(flag == 3){
            break;
        }
      }
      // 除去根据时间节点找不到昨日数据的点 即diff=-1&&change=-1
      for(let k =oneData.length-1;k>=0;k--){
        if(oneData[k].diff==-1&& oneData[k].change==-1){
          oneData.splice(k,1);
        }
      }
      this.listData =oneData;
      this.oneDate =oneDate;
      predictTodaySumNum=toDaySumNum+Math.floor(Math.random()*10);
      // 统一格式化
      this.overviewData[0].num=this.dealLongNum(toDaySumNum);
      this.overviewData[1].num=this.dealLongNum(yesterdaySumNum);
      this.overviewData[3].num=this.dealLongNum(predictTodaySumNum);
      this.overviewData[4].num=this.dealLongNum(predictTodayMaxNum);
    },
    getOverviewData(data){
      // 计算本月客流量，由于数据库数据没有一个整月的数据，所以遍历数据，计算日平均客流量
      // 根据日平均客流量计算年客流量 年以365天
      let sum=0,averageDayNum,result,curDate,monthSumNum=0,yearSumNum=0;
      for(let i=0;i<data.length;i++){
        sum+=data[i].num;
      }
      averageDayNum = Math.floor(sum/data.length);//取整
      // 获取当月有多少天
      curDate=new Date();
      if(this.oneDate){
        curDate.setMonth(parseInt(this.oneDate.split("-")[1]))
      }else{
        curDate.setMonth(curDate.getMonth()+1);
      }
      result=averageDayNum*curDate.getDate();
      // 格式化本月数据
      monthSumNum=this.dealLongNum(result);
      // 格式化本年客流量
      yearSumNum=this.dealLongNum(averageDayNum*365);
      // 同一传向子组件的数据
      this.overviewData[2].num=monthSumNum;
      this.overviewData[5].num=yearSumNum;
    },
    // 处理景区概览中数据,每三位加一个逗号
    dealLongNum(data){
      let arr = String(data).split("");//转换为字符数组
      let sym=false;
      if(arr.length<=3){
        return arr.join("");
      }
      if(arr.length%3==0){
        sym=true;
      }
      let flag=0;
      for(let i=arr.length;i>=0;i--){
        if(flag==3){
          arr.splice(i,0,",");
          flag=0;
        }
        flag++;
      }
      if(sym){
        return arr.splice(1).join("");
      }
      return arr.join("");
    },
    // 处理预测值
    dealPredictNum(){
    }
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
