import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { btnPermissions: ["admin", "supper", "normal"] }, //页面需要的权限
    children: [
      {
        path: "/form",
        name: "Form",
        component: () => import("../views/Form.vue"),
        meta: { btnPermissions: ['admin','supper'] }
      },
      {
        path: "/table",
        name: "Table",
        component: () => import("../views/Table/Index"),
        meta: { btnPermissions: ['admin'] }
      },
      {
        path: "/about",
        name: "About",
        component: () => import("../views/About.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
