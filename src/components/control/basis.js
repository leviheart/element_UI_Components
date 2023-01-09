export const props = {
  config: {
    type: Object,
    default: () => ({}),
  },
  value: {
    type: [String, Number, Array, Boolean],
    default: "",
  },
  disabled: Boolean,
};
/* mixin 是 Vue.js 中的一个功能，可以让你在多个组件之间复用代码。
这样，您就可以在多个组件中使用相同的方法、计算属性、生命周期钩子等。
在项目中，mixins 数组包含一个对象 mixin。
在组件中使用 mixins 数组，可以将 mixin 中的所有成员复制到组件实例中。 */
export const mixin = {
  data() {
    return {
      option: [],
      // 默认值
      props: {
        label: "label",
        value: "value",
      },
    };
  },
  computed: {
    url() {
      return this.config?.url;
    },
    initRequest() {
      return this.config?.init_request;
    },
    method() {
      return this.config?.method || "get";
    },
    fetchSearch() {
      return this.config?.fetch_search;
    },
    keyword() {
      return this.config?.keyword || "keyword";
    },
    multiple() {
      return this.config?.multiple;
    },
    options() {
      return this.config?.options;
    },
  },
  watch: {
    config: {
      handler(newValue) {
        this.initOptions();
        this.initProps();
      },
      immediate: true,
    },
    value: {
      handler(newValue) {
        this.val = newValue;
      },
      immediate: true,
    },
    options: {
      handler(newValue) {
        if (Array.isArray(newValue)) {
          this.option = newValue;
        }
      },
      immediate: true,
    },
  },
  methods: {
    handlerChange(value) {
      this.$emit("update:value", value);
      // 回调
      this.$emit("callback", {
        value,
        config: this.config,
      });
      // 是否有回调函数
      if (
        this.config.callback &&
        Object.prototype.toString.call(this.config.callback) ===
          "[object Function]"
      ) {
        this.config.callback(this.val);
      }
    },
    /** 初始化下拉数据 */
    initOptions() {
      if (this.url) {
        this.fetchOptions();
        return false;
      }
      const option = this.config.options;
      if (option && Array.isArray(option) && option.length > 0) {
        this.option = option;
      }
    },
    /**
     * 异步请求
     */
    fetchOptions() {
      this.initRequest && this.getOption();
    },
    /**
     * 异步关键字请求
     */
    keywordRequest(query) {
      query && this.fetchSearch && this.getOption(query);
    },
    /**
     * 获取option列表
     */
    getOption(value) {
      const request_data = {
        url: this.url,
        method: this.method,
      };
      // 参数处理
      /**
       * get、post、delete、put
       */
      if (this.method === "get") {
        request_data.params = value ? { [this.keyword]: value } : {};
      }
      if (this.method === "post") {
        request_data.data = value ? { [this.keyword]: value } : {};
      }
      // 接口的请求
      this.$axios(request_data).then((response) => {
        console.log(response,"下拉菜单接口")
        this.option = response.data.data;
      });
    },
    /** label和value初始化 */
    initProps() {
      const option = this.config.props;
      // 获取默认值的key
      const keys = Object.keys(this.props);
      if (
        option &&
        Object.prototype.toString.call(option) === "[object Object]"
      ) {
        for (const key in option) {
          if (keys.includes(key)) {
            this.props[key] = option[key];
          }
        }
      }
    },
  },
};
