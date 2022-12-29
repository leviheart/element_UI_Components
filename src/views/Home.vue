<template>
  <div style="width: 500px; margin: 50px auto;">
    <a-form :item="form_item" :field="form_field" :button="form_button" :before-submit="submitForm">
      <template v-slot:classroom>
        <a-select :config="select_classroom">
          <template v-slot:select="slot">
            <div style="font-size: 30px;">{{ slot.data.class_name }}</div>
          </template>
        </a-select>
      </template>
    </a-form>
  </div>
</template>
<script>
import { FormItem } from 'element-ui';

export default {
    name: "Home",
    components: {
      'a-form': () => import("@/components/form"),
      'a-button': () => import("@/components/button"),
      'a-select': () => import("@/components/control/select"),
    },
    data(){
      const validateName = (rule, value, callback) => {
        if(value && value !== '10') {
          callback(new Error("请输入10"))
        }else{
          callback()
        }
      }
      return {
          form_item: [
            { 
              type: 'input', 
              prop: "name", 
              label: "姓名",
              required: true,
            },
            { 
              type: 'upload', 
              prop: "file", 
              label: "文件",
              model: "card",
              url: "/api/upload/",
              method: "post",
              accept: ".zip, .rar, .jpg",
              multiple: true,
              limit: 3,
              max_size: 2,
              show_file: true,
            },
            { 
              type: 'date',
              model: "datetimerange",
              prop: "createDate",
              start_placeholder: "请选择开始创建日期",
              end_placeholder: "请选择结创建日期",
              range: "至",
              label: "日期",
              required: true
            },
            // { 
            //   type: 'checkbox',
            //   prop: "food", 
            //   label: "食物",
            //   required: true,
            //   options: [
            //     { label: "苹果", value: '1' },
            //     { label: "杨梅", value: '2' },
            //     { label: "芒果", value: '3' },
            //   ]
            // },
            // { 
            //   type: 'radio',
            //   prop: "car", 
            //   label: "交通工具",
            //   required: true,
            //   options: [
            //     { label: "汽车", value: '1' },
            //     { label: "高铁", value: '2' },
            //     { label: "飞机", value: '3' },
            //   ]
            // },
            // { 
            //   type: 'select',
            //   prop: "class_room", 
            //   label: "教室",
            //   required: true,
            //   props: {
            //     label: "name"
            //   },
            //   options: [
            //     { name: "vue.js一班", value: 1 },
            //     { name: "vue.js二班", value: 2 },
            //     { name: "vue.js三班", value: 3 },
            //   ]
            // },
            { 
              type: 'select',
              prop: "class_room1", 
              label: "异步教室",
              required: true,
              props: {
                label: 'class_name',
                value: 'id'
              },
              fetch_search: true,
              keyword: 'aaaaa',
              url: '/api/classroom/',
              callback: (data) => this.selectClassRoom(data),
            }
          ],
          form_field: {
            name: "",
            file: "",
            food: [],
            car: "",
            createDate: [],
            class_room: "",
            class_room1: "",
          },
          form_button: [
            // 确定按钮，取消按钮和其他按钮
            { label: "提交", key: 'submit', type: 'primary' },
            { label: "重置", key: 'cancel', type: 'danger', border: true, callback: (data) => this.cancel(data) },
            { label: "下一步", key: 'next', type: 'success', border: true, callback: (data) => this.next(data) }
          ],
          select_classroom: { 
            props: {
              label: 'class_name',
              value: 'id'
            },
            init_request: true,
            fetch_search: true,
            keyword: 'aaaaa',
            url: '/api/classroom/',
            callback: (data) => this.selectClassRoom(data)
          },
      }
    },
    beforeMount(){
      this.getDetailed()
    },
    mounted(){},
    methods: {
      getDetailed(){
        this.$axios({url: '/api/detailed/'}).then(response => {
          const data = response.data
          this.form_field = response.data
          // 还原日期字段
          this.form_field.createDate = [response.data.start_date, response.data.end_date]
          // 异步教室的默认下拉
          const options = [{class_name: data.class_item.label, id: data.class_item.id }]
          const select = this.form_item.filter(elem => elem.prop === 'class_room1')
          if(select.length > 0) {
            this.$set(select[0], 'options', options)
          }
        })
      },
      apiFuncitonSwitch(){
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve()
          }, 2000)
        })
      },
      submitForm(){
        return new Promise((resolve, reject) => {
          console.log(this.form_field)
          setTimeout(() => {
            reject()
          }, 2000)
        })
      },
      cancel(data){
        console.log(data)
      },
      next(data){
        console.log(data)
      },
      selectClassRoom(data){
        this.form_field.class_room1 = data
      },
      phoneEnter(value){
        this.form_item[1].send_account = value
      },
      apiGetSms(){
        return new Promise((resolve, reject) => {
          this.$axios('/api/code/').then(response => {
            this.$message.success(response.data.data)
            resolve()
          })
        })
      }
    }
};
</script>
<style lang="scss">
.select1 .el-select-dropdown__item { height: 50px; }
</style>
