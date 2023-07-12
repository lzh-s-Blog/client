//入口文件
import "../mock" //把模拟规则定下来了
import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import showMessage from "./utils/showMessage";
import "./styles/global.less"
import "./eventBus.js"
import store from "./store";
store.dispatch("setting/fetchSetting");
Vue.prototype.$showMessage = showMessage;

//导入自定义组件
import vLoading from "../directives/loading";
import vLazy from "../directives/lazy";
Vue.directive("loading", vLoading);
Vue.directive("lazy", vLazy);


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

/* import * as blogApi from "./api/blog"

blogApi.getBlogTypes().then((r) => {
  console.log("博客分类",r);
})

blogApi.getBlogs().then((r) => {
  console.log("博客", r);
}) */

