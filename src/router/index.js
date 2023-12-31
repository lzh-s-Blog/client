import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import { titleController } from "@/utils";
Vue.use(VueRouter); //使用一个插件

const router = new VueRouter({
  //路由配置
  routes, //路由匹配规则
  mode: "history",
});

router.afterEach((to, from) => {
  //console.log(to.meta.title)
  if (to.meta.title) {
    titleController.setRouteTitle(to.meta.title);
  }
})

export default router; 