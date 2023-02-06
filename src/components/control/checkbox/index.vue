<template>
  <el-checkbox-group v-model="val" @change="handlerChange">
    <el-checkbox
      v-for="item in option"
      :key="item.id"
      :label="item[props.value]"
      >{{ item[props.label] }}</el-checkbox
    >
  </el-checkbox-group>
</template>

<script>
import { props, mixin } from "../basis";
export default {
  name: "CheckboxComponent",
  mixins: [mixin],
  props: {
    ...props,
  },
  data() {
    return {
      val: [],
    };
  },
  computed: {},
  watch: {},
  methods: {},
};
</script>
<style></style>
// 传入的值props,option
// 复选框绑定的数据val为被选中,变动时触发handlerChange
// label属性对应checkbox的显示的文字,如果与val里的匹配则被选中