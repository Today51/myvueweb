<template>
  <div class="the-header">
    <div class="left">
      <div class="logo">
        <div class="mask"></div>
      </div>
      <div class="title">上海景区人流量监测平台</div>
    </div>
    <div class="right">
      <div class="date">
        <div>{{timeDate1}}</div>
        <div>{{timeDate2}}</div>
      </div>
      <div class="weather">
        <!-- 天气状态九个 xue、lei、shachen、wu、bingbao、yun、yu、yin、qing -->

        <img class="icon" :src="imgArr[weatherImg]">
        <div class="state">{{this.weatherState}}</div>
        <div class="temp">{{this.weatherTemp2}}-{{this.weatherTemp1}} °C</div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default{
  name:'the-header',
  data(){
    return{
      timer:"",
      timeDate1:"",
      timeDate2:"",
      weatherState:'',
      weatherTemp1:'',
      weatherTemp2:'',
      weatherImg:'',
      imgArr:{
        xue:require("../assets/img/xue.png"),
        lei:require("../assets/img/lei.png"),
        shachen:require("../assets/img/shachen.png"),
        wu:require("../assets/img/wu.png"),
       bingbao:require("../assets/img/bingbao.png"),
        yun:require("../assets/img/yun.png"),
        yu:require("../assets/img/yu.png"),
        yin:require("../assets/img/yin.png"),
        qing:require("../assets/img/qing.png"),
      }
    }
  },
  created(){
    let vm = this;
    vm.timer = setInterval(()=>{
      this.getDate();
    },1000);
    this.getWeather();
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
    },
    getDate(){
      let year,month,day,hours,minutes,seconds;
      year = new Date().getFullYear();
      month = this.dealTime(new Date().getMonth()+1);
      day =this.dealTime(new Date().getDate()) ;
      hours = this.dealTime(new Date().getHours());
      minutes =this.dealTime(new Date().getMinutes()) ;
      seconds =this.dealTime(new Date().getSeconds()) ;
      this.timeDate1 = year+"-"+month+"-"+day;
      this.timeDate2 = hours+":"+minutes+":"+seconds;
    },
    dealTime(date){
      if(date<10){
        return "0"+date;
      } else{
        return date;
      }
    },
    // 获取天气api
    getWeather(){
      axios({
        url:'https://v0.yiketianqi.com/api?unescape=1&version=v61&appid=29794662&appsecret=ZeLCH78l&city=%E4%B8%8A%E6%B5%B7',
        method:"get"
      }).then(res=>{
          this.weatherImg=res.data.wea_img;
          // this.imgIndex = this.imgArr[this.weatherImg];
          this.weatherState= res.data.wea;
          this.weatherTemp1= res.data.tem1;
          this.weatherTemp2=res.data.tem2;
      })
    },
    getUrl(){
      return this.test;
    }

  },
  beforeDestroy () {
    if(this.timer){
      clearInterval(this.timer)//vue实例消耗前清空定时器
    }
  }
}

</script>

<style scoped>
  .the-header{
    background: rgb(36,38,45);
    grid-area:nav;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
  }
  .left,.right{
    display: flex;
    flex-flow: row nowrap;
    align-items: baseline;
    justify-content: flex-start;
  }
  .left .title{
    font-weight: bold;
    font-size: 35px;
    color:white;
    align-self: center;
  }
  .right .weather::before{
    content: "";
    width: 1px;
    height:50px;
    background:white;
    position: absolute;
    top:10px;
  }
  .logo .mask{
    /* object-fit:cover; */
    width:50px;
    height: 50px;
    background: white;
    mask:url("../assets/img/logo.png");
    mask-size: cover;
  }
  .right{
    gap:10px;
  }
  .right .date{
    width:80px;
    color:white;
  }
  .date:first-child{
    font-size: 10px;
    text-align: center;
    margin: 0 auto;
  }
  .date :last-child{
    font-size: 20px;
  }
  .right .weather{
    width: 120px;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: center;
    align-content: stretch;
  }
  .weather .icon{
    width: 30px;
    height:30px;
  }
  .state{
    margin-left: 5px;
    width: 80px;
    color:white;
    font-size: 15px;
  }
  .temp{
    color:white;
    font-size: 22px;
  }
  .icon{
    /* background: red; */
    right:100vw;
    /* display: inline-block; */
    filter: drop-shadow(100vw 0px 0 rgb(255, 255, 255));
    position: relative;
  }

</style>



