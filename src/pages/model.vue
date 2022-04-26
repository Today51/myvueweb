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
      camera: null,
      scene: null,
      renderer: null,
      draw:null,//节点对象
      mesh: null,
      clock: null,
      elf: null,

    };
  },
  methods: {
    init() {
      let that = this;
      let container = document.getElementById("model");
      // 创建相机
      this.camera = new THREE.PerspectiveCamera(45,1,0.1,8000);
      // 相机离屏幕的距离y z x
      this.camera.position.set(200,1000,600);
      this.camera.lookAt(0, 0, 0);
      // 创建场景
      this.scene = new THREE.Scene();
      // this.clock = new THREE.Clock();
      // const loadingManager = new THREE.LoadingManager(function () {
      //   this.scene.add(this.mesh);
      // });
      const loader = new ColladaLoader();
        console.log("yy",loader)
      loader.load("/static/model/grandViewModel/greandView.dae", function (collada) {
        console.log("xx");
        that.mesh = collada.scene;
        that.scene.add(that.mesh);
        that.renderer.render(that.scene, that.camera);
        that.animate();

      });
     
      // 设置光线
      const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
      this.scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(1, 1, 0).normalize();
      this.scene.add(directionalLight);

      // 开启渲染器抗锯齿
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setClearColor(0xb9d3ff, 1);
      // this.renderer.outputEncoding = THREE.sRGBEncoding;
      // this.renderer.setPixelRatio(window.devicePixelRatio);
      // this.renderer.setSize(window.innerWidth, window.innerHeight);
      // 设置渲染大小
      console.log("wd",container.getBoundingClientRect().width,container.getBoundingClientRect().height);
      this.renderer.setSize(container.getBoundingClientRect().width,container.getBoundingClientRect().height);
      this.renderer.render(this.scene, this.camera);
      container.appendChild(this.renderer.domElement);
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
  },
  mounted() {
    this.init();
    // this.animate();
  },
};
</script>

<style scoped>
#model {
  width: 100%;
  height: 100%;
}
</style>
