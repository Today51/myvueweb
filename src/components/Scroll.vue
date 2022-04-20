<template>
  <!-- 滚动列表 -->
  <div class="scroll">
    <div class="title">景区客流量分析|{{oneDate}}</div>
    <div class="list-title">
      <span>时间</span><span>景区客流量</span><span>对比昨日</span><span>同比</span>
    </div>
    <div class="list-body" ref="box" id="box">
      <ul :class="{'move':animateUp}" ref="con1" id="con1" @mouseenter="mEnter"  @mouseleave="mLeave">
        <li v-for="(item,index) in listData" :key="index">
          <span>{{item.HM}}</span>
          <span>{{item.num}}</span>
          <span>{{item.change}}</span>
          <span :class="{'greed':item.diff[0]==='-'}">{{item.diff}}</span>
        </li>
      </ul>
      <ul id="con2" ref="con2"></ul>
    </div>
  </div>
</template>



<script>
export default {
  name: "scroll",
  data() {
    return {
      animateUp:false,
      box:null,
      con1:null,
      con2:null,
      diff:null,
    };
  },
  props: ["oneDate", "listData"],
  methods: {
    autoLoop(){
      let that = this;
        if(!that.con2.innerHTML){
          that.con2.innerHTML=that.con1.innerHTML;
        }
        if(that.box.scrollTop>=that.con1.scrollHeight){
          that.box.scrollTop=0;
        }
        else{
          that.box.scrollTop++;
        }

    },
    mEnter(){
      clearInterval(this.timer);
    },
    mLeave(){
      this.timer = setInterval(this.autoLoop,25);
    },
    changeDiffColor(){
      // let that = this;
      // that.diff.
    }
  },
  mounted() {
    this.box = document.getElementById("box");
    this.con1 = document.getElementById("con1");
    this.con2 = document.getElementById("con2");
    this.diff = document.getElementsByClassName("diff");
    this.timer=setInterval(this.autoLoop,25);
  },
  computed: {},
  watch: {
  },
  beforeDestroy () {
    if(this.timer){
      clearInterval(this.timer);
    }
  }
};
</script>

<style scoped>
.scroll {
  color:white;
  background: rgb(29,30,36);
  font-size: 10px;
  grid-area: scroll;
}
.title{
  width:100%;
  position: relative;
}
.title::before{
  content: "";
  top:0;
  width: 100%;
  height: 2px;
  background: rgb(55,121,253);
  position: absolute;

}
.scroll .list-title{
  display: flex;
  flex-flow: row nowrap;
  align-items: baseline;
  justify-content: space-evenly;
}
.list-body{
  width: 100%;
  height:600px;
  /* margin: 0;  */
  overflow: hidden; 
}

.list-body ul{
  overflow: hidden;
  list-style: none;
  margin: 0;
  padding: 0;
}
.list-body ul li{
  height:30px;
  line-height: 30px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  /* gap:30px; */
}
.list-body ul li span{
  font-size:8px;
  /* overflow: hidden; */
}
.list-body ul li span:nth-child(4){
  color:red;
}
.list-body ul li:nth-child(even){
  background: rgb(35,37,43);
}
.greed {
  color:green !important;
}
</style>
















