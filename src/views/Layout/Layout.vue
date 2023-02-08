<template>
  <div id="layout" :class="[menuStatus ? 'close' : 'open']">
    <LayoutHeader />
    <LayoutMain />
    <LayoutNav />
  </div>
</template>
<script>
//静态引入 用于常驻的小组件
//这种情况下组件的代码在项目启动时就已经加载了,始终存在于浏览器的内存中。
import LayoutHeader from "./Components/Header";
import LayoutMain from "./Components/Main";
import LayoutNav from "./Components/Nav";
// import { LayoutHeader, LayoutMain, LayoutNav } from './Components'
export default {
  name: "Layout",
  components: {
    LayoutHeader,
    LayoutMain,
    LayoutNav,
  },
  computed: {
    menuStatus() {
      return this.$store.state.app.isCollapse;
    },
  },
};
</script>
<style lang="scss" scoped>
</style>