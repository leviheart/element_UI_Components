<template>
  <el-form
    ref="form"
    :model="field"
    :label-width="labelWidth"
    :label-position="labelPosition"
    :class="{ 'label-block': labelPosition === 'top' }"
  >
    <el-row :gutter="gutter">
      <template v-for="item in form_item">
        <!-- 由于初始form_item是[],所以会提示,但不影响 -->
        <el-col :key="item.prop" :span="item.col || col">
          <el-form-item
            :label="item.label"
            :prop="item.prop"
            :label-width="item.label_width"
          >
            <span v-if="item.label_html" slot="label" class="label-html">
              <span>{{ item.label_html.label }}</span>
              <span
                @click="
                  item.label_html.callback && item.label_html.callback(item)
                "
                v-html="item.label_html.html"
              />
            </span>
            <slot v-if="item.type === 'slot'" :name="item.slot_name"></slot>
            <!-- component是vue内置组件,component的使用具有is属性,可以根据is的值动态渲染不同的组件 -->
            <component
              v-else
              :value.sync="field[item.prop]"
              :disabled="disabled[item.prop]"
              :is="`com-${item.type}`"
              :config="item"
              @callback="callback"
            />
          </el-form-item>
        </el-col>
      </template>
      <el-col :span="colButton">
        <div class="button-group">
          <el-button type="primary" @click="submit">提交</el-button>
          <el-button @click="reset">重置</el-button>
          <el-button
            v-for="item in button"
            :loading="item.loading"
            :key="item.key"
            :type="item.type"
            @click="item.callback && item.callback(item)"
            >{{ item.label }}</el-button
          >
        </div>
      </el-col>
    </el-row>

    <!-- <el-form-item>
            <el-button v-for="item in button" :loading="item.loading" :key="item.key" :type="item.type" @click="handlerButton(item)">{{ item.label }}</el-button>
        </el-form-item> -->
  </el-form>
</template>

<script>
// 自动化的规则，通type属性，自动读到目录组件
// 使用了 require.context 函数来动态加载目录中的组件，并将它们注册到当前组件中。
// 然后使用 props 属性来定义组件可以接收的参数，并使用 components 属性来注册这些动态加载的组件。
const modules = {};
const files = require.context("../control", true, /\index.vue$/);
files.keys().forEach((item) => {
  const key = item.split("/");
  const name = key[1];
  // 组件集成
  modules[`com-${name}`] = files(item).default;
});
console.log(modules);
export default {
  name: "Form",
  components: {
    ...modules,
  },
  props: {
    item: {
      type: Array,
      default: () => [],
    },
    field: {
      type: Object,
      default: () => ({}),
    },
    hidden: {
      type: Object,
      default: () => ({}),
    },
    disabled: {
      type: Object,
      default: () => ({}),
    },
    button: {
      type: Array,
      default: () => [],
    },
    beforeSubmit: Function,
    col: {
      type: Number,
      default: 24,
    },
    colButton: {
      type: Number,
      default: 0,
    },
    gutter: {
      type: Number,
      default: 0,
    },
    labelWidth: {
      type: String,
      default: "100px",
    },
    labelPosition: {
      type: String,
      default: "right",
    },
    validateSubmitField: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      form_item: [],
    };
  },
  beforeMount() {
    console.log(
      this.$attrs,
      "这是在父子组件里层层传递还未被props所接收的所有属性"
    );
    this.form_item = this.item;
  },
  methods: {
    submit() {
      /**
       * string, array, number
       */
      const request_data = {};
      for (const key in this.field) {
        if (this.field[key]) {
          request_data[key] = this.field[key];
        }
      }
      this.$emit("callback", request_data, "search");
    },
    reset() {
      this.$emit("callback", {}, "init");
      this.$refs.form.resetFields();
    },
    cancel(data) {
      console.log("重置表单");
    },
    callback(params) {},
  },
};
</script>

<style lang="scss" scoped>
::v-deep.label-block .el-form-item__label {
  display: flex;
}
.label-html {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.button-group {
  float: right;
}
</style>
