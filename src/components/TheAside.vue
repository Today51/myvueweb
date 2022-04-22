<template>
  <div class="the-aside">
    <ul class="nameList">
      <li class="item" v-for="(item,index) in scenicName" :key="index" :class="{active:item.name==activeName}" @click="changeColor(item.name)">
        <div @click="goHome(index)" style="display: inline; margin-right:10px">{{scenicName[index].name}}</div>
        <div class="mask" @click="goModel()"></div>
      </li>
    </ul>
  </div>
</template>
<script>
export default{
  name:'the-aside',
  data(){
    return{
      // name表示景区名字 dbkey表示对应中数据库表名 11个景区
      scenicName:[
        {name:'上海世纪公园',dbkey:'century'},
        {name:'上海长风公园',dbkey:'changfeng_park'},
        // {name:'上海佘山国家森林公园·东佘山园',dbkey:'dong_she_shan_park'},
        {name:'上海共青森林公园',dbkey:'forest_park'},
        {name:'上海大观园',dbkey:'grand_view_garden'},
        {name:'上海顾村公园景区',dbkey:'gu_cun_park'},
        {name:'上海古猗园',dbkey:'guyi_garden'},
        {name:'黄兴公园',dbkey:'huang_xing_park'},
        {name:'上海鲁迅公园',dbkey:'lu_xun_park'},
        {name:'上海闵行体育公园',dbkey:'minhang_sports_park'},
        // {name:'上海影视乐园',dbkey:'movie_park'},
        // {name:'上海南翔景区',dbkey:'nan_xiang_scenic'},
        // {name:'上海海洋水族馆',dbkey:'oceanarium'},
        // {name:'周浦花海',dbkey:'sea_of_flowers'},
        // {name:'上海方塔园',dbkey:'shanghai_fangta_park'},
        // {name:'上海田子坊景区',dbkey:'tianzifang_scenic_area'},
        {name:'东方明珠广播电视塔',dbkey:'tvtower'},
        // {name:'上海醉白池公园',dbkey:'white_pool_park'},
        // {name:'上海佘山国家森林公园·西佘山园',dbkey:'xi_sheshan_park'},
        // {name:'上海召稼楼景区',dbkey:'zhaojialou_scenic'},
        {name:'朱家角古镇',dbkey:'zhu_jia_jiao'},
        // {name:'上海野生动物园',dbkey:'zoo'}
      ],
     activeName:'上海世纪公园',
    }
  },
  create(){

  },
  computed:{

  },
  components: {
    
  },
  mounted () {
    
  },
  methods: {
    goModel(){
      this.$router.push({path:'/model'});
    },
    goHome(index){
      // 向跳转的组件，传递参数
        this.$router.push({path:'/',query:{name:this.scenicName[index].name}});  
         
    },
    changeColor(name){
      this.activeName =name;
    }
  }
}

</script>

<style scoped>
   .the-aside{
    background: rgb(36,38,45);
    grid-area: side;
    position: relative;
  }
  .nameList{
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-evenly;
    align-items: flex-end;
  }
  ul{
    height: 100%;
    width: 100%;
  }
  ul::before{
    content: "";
    top:0;
    height: 2px;
    width: 100%;
    background: rgb(248, 190, 0);
    position: absolute;
  }
  li{
    color:rgb(197,197,199);
    width: 100%;
    list-style-type: none;
  }
  .active{
    background: rgb(55,121,253);
  }
  .mask{
    width:15px;
    height: 15px;
    background: white;
    mask:url("../assets/img/model.png");
    mask-size: cover;
    display: inline-block;
  }
</style>



