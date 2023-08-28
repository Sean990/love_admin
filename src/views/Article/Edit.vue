<template>
  <div class="color">
    <a-card>
      <a-spin :spinning="spinning" tip="Loading...">
        <a-form :form="form" @submit="handleSubmit">
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="故事标题"
            hasFeedback
            validateStatus="success"
          >
            <a-input
              placeholder="请输入故事标题"
              v-decorator="[
                'title',
                { rules: [{ required: true, message: '请输入故事标题' }] },
              ]"
              :disabled="isEdit"
            ></a-input>
          </a-form-item>
          <a-form-item>
            <!-- Create toolbar container -->
          <div id="toolbar" style="line-height: normal">
            <!-- Add font size dropdown -->
            <select class="ql-size">
              <option value="small">小</option>
              <!-- Note a missing, thus falsy value, is used to reset to default -->
              <option selected>默认</option>
              <option value="large">大</option>
              <option value="huge">超大</option>
            </select>
            <!-- Add a bold button -->
            <button class="ql-bold"></button>
          </div>
            <quill-editor
              ref="myQuillEditor"
              v-model="content"
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @ready="onEditorReady($event)"
            />
          </a-form-item>
          <a-form-item v-bind="buttonCol">
            <a-row>
              <a-col span="6">
                <a-button type="primary" html-type="submit">提交</a-button>
              </a-col>
              <a-col span="10">
                <a-button @click="handleGoBack">返回</a-button>
              </a-col>
              <a-col span="8"></a-col>
            </a-row>
          </a-form-item>
        </a-form>
      </a-spin>
    </a-card>
  </div>
</template>

<script>
// require styles
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";

import { quillEditor } from "vue-quill-editor";

import moment from "moment";
import pick from "lodash.pick";
export default {
  name: "ArticleEdit",
  components: {
    quillEditor,
  },
  data() {
    return {
      isEdit: false,
      spinning: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
      buttonCol: {
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 12, offset: 5 },
        },
      },
      content: "",
      editorOption: {
        /* quill options */
        placeholder: "输入故事内容",
        modules: {
          toolbar: '#toolbar'
          // [
          // { 'direction': 'rtl' },
          //   "clean",
          //   { header: [1, 2, 3, 4, 5, 6, false] },
          //   { size: ["small", false, "large", "huge"] },
          //   "bold",
          //   "italic",
          //   "strike",
          //   "underline",
          //   "link",
          //   { align: [] },
          //   { list: "ordered" },
          //   { list: "bullet" },
          //   "blockquote",
          //   "code-block",
          //   { indent: "-1" },
          //   { indent: "+1" },
          //   { background: [] },
          //   { color: [] },
          //   "image",
          // ],
        },
      },
      form: this.$form.createForm(this),
      id: 0,
    };
  },
  created() {},
  mounted() {
    this.spinning = true;
    this.$nextTick(() => {
      this.loadEditInfo(this.record);
      this.spinning = false;
    });
  },
  methods: {
    onEditorBlur(quill) {
      console.log("editor blur!", quill);
    },
    onEditorFocus(quill) {
      console.log("editor focus!", quill);
    },
    onEditorReady(quill) {
      console.log("editor ready!", quill);
    },
    handleGoBack() {
      this.$emit("onGoBack");
    },
    handleSubmit() {
      const {
        form: { validateFields },
      } = this;
      validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
        } else {
          return false;
        }
      });
    },
    handleGetInfo() {},
    loadEditInfo(data) {
      const { form } = this;
      // ajax
      console.log(`将加载 ${this.id} 信息到表单`);
      new Promise((resolve) => {
        setTimeout(resolve, 1500);
      }).then(() => {
        const formData = pick(data, [
          "title",
          "callNo",
          "status",
          "description",
        ]);
        console.log("formData", formData);
        form.setFieldsValue(formData);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
