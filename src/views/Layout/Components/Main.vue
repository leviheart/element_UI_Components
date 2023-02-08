<template>
  <div id="main-wrap">
    <div class="main-content">
      <div class="content">
        <!-- scrollbar组件暴露了 native, wrapStyle, wrapClass, viewClass, viewStyle, noresize, tag 这7个 props属性 -->
        <el-scrollbar
          class="scroll-container"
          wrap-style="overflow-x:hidden;"
          view-style="height:100vh;"
        >
          <!-- 子路由显示区 -->
          <keep-alive>
            <!-- 需要缓存 -->
            <router-view v-if="$route.meta.keepAlive" />
          </keep-alive>
          <!-- 不需要缓存 -->
          <router-view v-if="!$route.meta.keepAlive" />
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "layoutMain",
};
</script>
<style lang="scss" scoped>
@import "~@/styles/scssconfig.scss";
#main-wrap {
  height: 100vh;
}
.main-content {
  width: 100%;
  height: 100%;
  padding-top: $layoutHeader + 30px;
  padding-right: 30px;
  @include webkit(box-sizing, border-box);
  @include webkit(transition, all 0.3s ease 0s);
}
.open {
  .main-content {
    padding-left: $navMenu + 30;
  }
}
.close {
  .main-content {
    padding-left: $navMenuMin + 30;
  }
}
.content {
  width: 100%;
  height: 100%;
  padding: 30px 30px 0 30px;
  background-color: #fff;
  @include webkit(box-sizing, border-box);
}
.scroll-container {
  height: 100%;
}
</style>