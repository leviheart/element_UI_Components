<template>
  <button
    type="button"
    @click="change"
    class="a-button"
    :disabled="disabled || loading || load"
    :class="[theme, isBorder, isRound, sizes, blockCss]"
    :style="[minWidthCss]"
  >
    <span>
      <i v-if="loading || load" class="iconfont icon-prefix icon-loading"></i>
      <i v-if="iconPerfix" class="iconfont icon-prefix" :class="iconPerfix"></i>
      <slot />
      <i v-if="iconSuffix" class="iconfont icon-suffix" :class="iconSuffix"></i>
    </span>
  </button>
</template>

<script>
export default {
  name: "AButton",
  props: {
    type: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "",
    },
    minWidth: {
      type: String,
      default: "",
    },
    perfix: {
      type: String,
      default: "",
    },
    suffix: {
      type: String,
      default: "",
    },
    loading: Boolean, // 默认false
    border: Boolean, // 默认false
    round: Boolean, // 默认false
    disabled: Boolean, // 默认false
    block: Boolean, // 默认false
    beforeChange: Function, //传入的beforeChange应该是个promise对象
  },
  computed: {
    //样式主题
    theme() {
      return this.type ? `a-button-${this.type}` : "";
    },
    //样式尺寸
    sizes() {
      return this.size ? `a-button-${this.size}` : "";
    },
    //样式边框
    isBorder() {
      return this.border ? "is-border" : "";
    },
    //样式圆角
    isRound() {
      return this.round ? "is-round" : "";
    },
    //按钮最小宽度
    minWidthCss() {
      if (!this.minWidth) {
        return "";
      }
      return { "min-width": this.minWidth };
    },
    //前缀图标
    iconPerfix() {
      return this.perfix ? `icon-${this.perfix}` : "";
    },
    //后缀图标
    iconSuffix() {
      return this.suffix ? `icon-${this.suffix}` : "";
    },
    //块级样式 换行
    blockCss() {
      return this.block ? "a-button-block" : "";
    },
  },
  data() {
    return {
      load: false,
    };
  },
  methods: {
    // 事件回调
    change() {
      if (typeof this.beforeChange === "function") {
        this.load = true;
        this.beforeChange()
          .then((response) => {
            this.load = false;
          })
          .catch(() => {
            this.load = false;
          });
      }
      this.$emit("click");
    },
  },
};
</script>

<style lang="scss" scoped>
// .scss 文件中的变量被 Vue 的编译器解析了，导致变量值无法正确转换为 CSS 代码。
// @import url(./button.scss);
// 解决这个问题的方法是，在 @import 的文件路径前加上 ~ 号。例如：
@import "~./button.scss";
// 这样 Vue 编译器就不会对 .scss 文件进行解析，变量的值就可以正确转换为 CSS 代码。
</style>
