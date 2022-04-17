<template>
  <div class="home">
    <span>home{{nameScenic}}</span>
    <span>{{nameScenic}}</span>
  </div>
</template>

<script>
export default {
  name: 'home',
  data(){
    return{
      nameScenic:'上海世纪公园',
    }
  },
  watch: {
    // 监听路由，当路由变化时，执行函数
    $route(){
      this.changeNameScenic();
    }
  },
  mounted () {
  },
  methods: {
    changeNameScenic(){
      // 通过路由跳转时，向跳转后的组件传递参数
      this.nameScenic = this.$route.query.name;
      console.log(this.$route.query.name);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
