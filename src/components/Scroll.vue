<template>
   <!-- 滚动列表 -->
   <div class="scroll">
     <div>{{oneDate}}</div>
     <div>{{listData}}</div>
     
   </div>
</template>



<script>

export default {
  name:'scroll',
  data(){
    return{
      name:this.scenicName
    }
  },
  props:[
    'oneDate',
    'listData'
  ],
   methods:{
    //  getDiffDatas(name){
    //    console.log("xx--",name);
    //  },

  },
  mounted(){
    // this.getDiffDatas(this.scenicName);
  },
  computed:{

    },
  watch:{
    // scenicName(newV,oldV){
    //   this.getDiffDatas(newV);
    // }
  }
}
</script>

<style scoped>
  .scroll{
    background: red;
    grid-area: scroll;
  }
</style>
















