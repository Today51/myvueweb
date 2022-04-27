<template>
  <div class="model">
    <div id="model" style="width:100%;height:100%;"></div>
  </div>
</template>
<script>
let THREE = require("three");
let OrbitControls = require('three-orbit-controls')(THREE);
// let ColladaLoader = require("three-collada-loader");
// let ColladaLoader = require("three/examples/jsm/loaders/ColladaLoader.js");
import {ColladaLoader} from 'three/examples/jsm/loaders/ColladaLoader.js'
export default {
  name: "model",
  data() {
    return {
      nameScenic:'上海世纪公园',
      index:{
        '上海世纪公园':'/centuryModel/century.dae',
        '上海长风公园':'/changfengModel/changfeng.dae',
        '上海共青森林公园':'/forestModel/forest.dae',
        '上海大观园':'/grandViewModel/greandView.dae',
        '上海顾村公园景区':'/gucunModel/guncun.dae',
        '上海古猗园':'/guyiModel/guyi.dae',
        '黄兴公园':'/huangxingModel/huangxing.dae',
        '上海鲁迅公园':'/luxunModel/luxun.dae',
        '上海闵行体育公园':'/sportModel/sport.dae',
        '东方明珠广播电视塔':'/tvtowerModel/tvtower.dae',
        '朱家角古镇':'/zhujiaModel/zhujia.dae',
      },
      camera: null,
      scene: null,
      renderer: null,
      draw:null,//节点对象
      mesh: null,
      clock: null,
      elf: null,
      sceneDomElement:null,
    };
  },
  watch: {
    $route(){
      this.changeNameScenic();
    }
  },
  methods: {
    init(index) {
      let myindex = index;
      let that = this;      
      this.sceneDomElement = document.getElementById("model");
      this.sceneDomElement.innHTML='';
      // 创建相机
      if(!this.camera){
        this.camera = new THREE.PerspectiveCamera(45,1,0.1,8000);
      }
      
      // 相机离屏幕的距离y z x
      this.camera.position.set(200,1000,600);
      this.camera.lookAt(0, 0, 0);
      // 创建场景
      if(!this.scene){
        this.scene = new THREE.Scene();
      }
      
      const loader = new ColladaLoader();
        // if(that.mesh){
        //   console.log(that.mesh);
        //   that.clearGroup(that.mesh);
        // }
      loader.load(`/static/model${myindex}`, function (collada) {
        console.log("xx");
        that.scene.remove(that.mesh);
        that.mesh = collada.scene;
        that.scene.add(that.mesh);
        that.renderer.render(that.scene, that.camera);
        that.animate();

      });
     
      // 设置光线
      const ambientLight = new THREE.AmbientLight(0xcccccc, 0.1);
      this.scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
      directionalLight.position.set(1, 1, 0).normalize();
      this.scene.add(directionalLight);

      // 开启渲染器抗锯齿
      if(!this.renderer){
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
      }
      
      this.renderer.setClearColor(0xb9d3ff, 1);
      this.renderer.outputEncoding = THREE.sRGBEncoding;
      this.renderer.setPixelRatio(window.devicePixelRatio);
      // this.renderer.setSize(window.innerWidth, window.innerHeight);
      // 设置渲染大小
      this.renderer.setSize(this.sceneDomElement.getBoundingClientRect().width,this.sceneDomElement.getBoundingClientRect().height);
      this.renderer.render(this.scene, this.camera);
      this.sceneDomElement.appendChild(this.renderer.domElement);
      new OrbitControls(this.camera, this.renderer.domElement);
      // window.addEventListener("resize", this.onWindowResize);
    },
    animate() {
      requestAnimationFrame(this.animate);
      // const delta = this.clock.getDelta();
      // if (this.elf !== null) {
      //   console.log(this.elf);
      // }
      // this.mesh.rotation.z += 0.01;
      // this.mesh.rotation.y+=0.01;
      this.renderer.render(this.scene, this.camera);
    },
    onWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(window.innerWidth, window.innerHeight);
    },
    changeNameScenic(){
      if(this.$route.query.name){
        this.nameScenic = this.$route.query.name;
      }
      this.init(this.index[this.nameScenic]);
    },
    clearGroup(group) {
    const clearCache = (item) => {
      item.geometry.dispose();
      item.material.dispose();
    };
    const removeObj = (obj) => {
      let arr = obj.children.filter((x) => x);
      arr.forEach((item) => {
        if (item.children.length) {
          removeObj(item);
        } else {
          clearCache(item);
          item.clear();
        }
      });
      obj.clear();
      arr = null;
    };
    removeObj(group);
  }

    // clearScene(){
    //   cancelAnimationFrame(this.animate);
    //   this.scene.traverse((child)=>{
    //     if(child.material){
    //       child.material.dispose();
    //     }
    //     if(child.geometry){
    //       child.geometry.dispose();
    //     }
    //     child = null;
    //   });
    //   this.sceneDomElement.innerHTML = '';
    //   this.renderer.forceContextLoss();
    // }
  },
  mounted() {
    this.changeNameScenic();
  },
};
</script>

<style scoped>
#model {
  width: 100%;
  height: 100%;
}
</style>
