import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/views/Layout/Layout.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Layout",
    component: Layout,
    meta: {
      name: "路由管理",
      icon: "user",
    },
    children: [
      {
        path: "home",
        name: "Home",
        component: () => import("../views/Home.vue"),
        // meta: { btnPermissions: ["admin", "supper", "normal"] }, //页面需要的权限
        meta: {
          name: "首页",
          icon: "console",
        },
      },
      {
        path: "form",
        name: "Form",
        component: () => import("../views/Form.vue"),
        // meta: { btnPermissions: ['admin','supper'] }
        meta: {
          name: "表单",
          icon: "info",
        },
      },
      {
        path: "table",
        name: "Table",
        component: () => import("../views/Table/Index"),
        // meta: { btnPermissions: ['admin'] }
        meta: {
          name: "表格",
          icon: "minus",
        },
      },
      {
        path: "about",
        name: "About",
        component: () => import("../views/About.vue"),
        meta: {
          name: "关于",
          icon: "plus",
        },
      },
      {
        path: "*",
        name: "NotFound",
        component: () => import("../views/NotFound.vue"),
        meta: {
          name: "404",
          icon: "exclamation",
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: "/dist/",
  routes,
});

export default router;
