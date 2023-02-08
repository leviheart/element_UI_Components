import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// UI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// iconfont 可使用阿里图标库
import "./styles/icon/iconfont.css";
// 自定义全局组件
import "./icons";
// axios
import axios from "axios";
import has from "./directive/permissionDir";

Vue.prototype.$axios = axios; //全局注册，使用方法为:this.$axios
Vue.config.productionTip = false;
Vue.use(ElementUI);

router.beforeEach((to, from, next) => {
  next();
  console.log(to, from, `Previous path: ${from.path}`);
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
