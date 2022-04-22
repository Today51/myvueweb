<template>
  <!-- 景区概览 -->
  <div class="overview">
    <div class="title">景区概览|{{ oneDate }}</div>
    <div class="items">
      <div class="item" v-for="(item, index) in overviewData" :key="index">
        <div class="title">{{ item.title }}</div>
        <div class="number">{{ item.num }} <span>人</span></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "overview",
  data() {
    return {};
  },
  props: ["overviewData", "oneDate"],
};
</script>
<style scoped>
.overview {
  grid-area: overview;
  background: rgb(29, 30, 36);
  position: relative;
}
.overview::before {
  content: "";
  top: 0;
  width: 100%;
  height: 2px;
  background: rgb(245,46,90);
  position: absolute;
  z-index: 1000;
}
.overview > .title {
  color: rgb(204, 204, 204);
  font-weight: 500;
  font-size: 15px;
  margin-left: 10px;
}
.items {
  color: white;
  font-size: 15px;
  display: flex;
  flex-flow: row wrap;
  align-content: space-around;
  gap: 10px;
  justify-content: space-around;
}
.item {
  width: 30%;
  height: 80px;
  padding-top: 10px;
}
.item .title {
  margin-left: 10px;
}
.item .number {
  margin-left: 10px;
  font-size: 30px;
  font-weight: bold;
  margin-top: 10px;
}
.item .number span {
  font-weight: 400;
  font-size: 10px;
}
.item:nth-child(1) {
  background: rgb(55, 121, 253);
}
.item:nth-child(2) {
  background: rgb(255, 165, 35);
}
.item:nth-child(3) {
  background: rgb(245, 46, 90);
}
.item:nth-child(4) {
  background: rgb(36, 38, 45);
}
.item:nth-child(4) .number {
  color: rgb(55, 121, 253);
}
.item:nth-child(5) {
  background: rgb(36, 38, 45);
}
.item:nth-child(5) .number {
  color: rgb(255, 165, 35);
}
.item:nth-child(6) {
  background: rgb(36, 38, 45);
}
.item:nth-child(6) .number {
  color: rgb(245, 46, 90);
}
</style>



