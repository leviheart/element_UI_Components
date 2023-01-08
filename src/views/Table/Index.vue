<template>
  <div class="table-wrap">
    <div class="table-content">
      <!-- merge 合并单元格
		  on-load 是否开启接口请求完成后的数据回调 onload回调函数
		  checkbox 是否开启多选框
		  init-checked 默认勾选 -->
      <!-- :search="true"  开启搜索功能 -->
      <!-- search_button,search_item,search_field是从./search里解构的对象属性 -->
      <!-- 接口传参 get方法 default-params post方法 data -->
      <a-table
        ref="table"
        url="/api/name/"
        merge
        on-load
        checkbox
        init-checked
        @onload="onload"
        :column="column"
        :list="tableData"
        :check-list.sync="check_list"
        :search="true"
        :gutter="20"
        :col-button="18"
        :button="search_button"
        :item="search_item"
        :field="search_field"
        :data="data_1"
        :default-params="default_params"
      >
        <!-- operation="slot"里的slot只对jumn(slot.data)里回传的负责  里的operation只对slot_name负责-->
        <template v-slot:operation="slot">
          <a-button type="primary" size="mini" @click="jumn(slot.data)"
            >编辑</a-button
          >
          <a-button size="mini">删除</a-button>
        </template>
      </a-table>
    </div>
  </div>
</template>
<script>
import Search from "./search";
export default {
  name: "Home",
  components: {
    "a-button": () => import("@/components/button"),
    "a-table": () => import("@/components/table"),
  },
  data() {
    return {
      ...Search,
      //sort: 'custom' sort_by: 'id' 设置排序
      column: [
        { label: "ID", prop: "id" },
        { label: "姓名", prop: "name" },
        { label: "数值1", prop: "amount1" },
        { label: "数值2", prop: "amount2" },
        {
          label: "数值3",
          prop: "amount3",
          type: "function",
          callback: () => {
            return 111;
          },
        },
        {
          label: "操作",
          prop: "operation",
          type: "slot",
          slot_name: "operation",
          // render_header: (h, { column, $index }) => {
          // render_header用来自定义表头
          //   return <div>43dfsgdsfg</div>;
          // },
        },
      ],
      tableData: [
        {
          id: "1",
          name: "张三",
          amount1: "234",
          amount2: "4.43",
          amount3: 10,
        },
        {
          id: "1",
          name: "张三",
          amount1: "165",
          amount2: "4.43",
          amount3: 12,
        },
        {
          id: "1",
          name: "张三",
          amount1: "324",
          amount2: "4.43",
          amount3: 9,
        },
        {
          id: "2",
          name: "李四",
          amount1: "165",
          amount2: "4.43",
          amount3: 12,
        },
        {
          id: "2",
          name: "李四",
          amount1: "324",
          amount2: "4.43",
          amount3: 9,
        },
        {
          id: "3",
          name: "王五",
          amount1: "165",
          amount2: "4.43",
          amount3: 12,
        },
        {
          id: "3",
          name: "王五",
          amount1: "324",
          amount2: "4.43",
          amount3: 9,
        },
        {
          id: "3",
          name: "王五",
          amount1: "324",
          amount2: "4.43",
          amount3: 9,
        },
        {
          id: "4",
          name: "刘六",
          amount1: "324",
          amount2: "4.43",
          amount3: 9,
        },
        {
          id: "4",
          name: "刘六",
          amount1: "324",
          amount2: "4.43",
          amount3: 9,
        },
      ],
      data_1: {
        name: 22,
      },
      params_1: {
        name: 255555,
      },
      check_list: [],
      search_field: {
        a: "",
        b: "",
      },
      default_params: {
        category: 10,
      },
      search_button: [
        { label: "下载", type: "primary", callback: (data) => this.aaa(data) },
      ],
    };
  },
  watch: {
    check_list: {
      handler(value) {},
    },
  },
  mounted() {},
  methods: {
    aaa(data) {
      console.log(345, this.$refs.table.request_data_backup);
    },
    getCheckList() {
      // console.log(this.check_list)
    },
    onload(data) {
      console.log(data);
    },
    formatData(data) {
      const first_data = [data[0]];
      return first_data;
    },
    jumn(data) {
      console.log(data);
    },
    category(value) {
      this.default_params.category = value;
    },
    mergeSpan({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex === 0 || rowIndex === 3) {
          return {
            rowspan: 3, // 合并的行
            colspan: 1, // 合并的列
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.table-wrap {
  margin: auto;
  background-color: #f8f8f8;
  height: 100vh;
}

.table-content {
  background-color: #fff;
  width: 1440px;
  padding: 16px;
  margin: auto;
}

::v-deep.el-table .el-table__cell {
  padding: 7px 0;
}

::v-deep.el-table tr th {
  background-color: #ebf4f7;
  border-bottom: 1px solid #e5e5e5;
}
</style>
