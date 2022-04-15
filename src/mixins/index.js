/* eslint-disable */
// 存放常用的公共方法
export const mixin={
  methods:{
    dealDate(date){
      if(date<10){
        return "0"+date;
      }else{
        return date;
      }
    }
  }
}