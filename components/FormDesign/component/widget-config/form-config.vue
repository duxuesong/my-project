/**
* @author Leslie
* @date 2019-08-15 08:51
*/

<template>
  <div class="wrapper">
    <a-form :layout="formLayout" :form="form" >
      <a-form-item
        label="标签对齐方式"
      >
        <a-radio-group
          v-decorator="['formLayout']"
          button-style="solid"
        >
          <a-radio-button value="left">左对齐</a-radio-button>
          <a-radio-button value="right">右对齐</a-radio-button>
          <a-radio-button value="top">顶对齐</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        label="表单字段宽度"
      >
        <a-input-number
          v-decorator="['labelCol']"
          :min="20"
          :max="200"
        />
      </a-form-item>
      <a-form-item
        label="组件尺寸"
      >
        <a-radio-group
          v-decorator="['widgetSize']"
          button-style="solid"
        >
          <a-radio-button value="large">大</a-radio-button>
          <a-radio-button value="default">中</a-radio-button>
          <a-radio-button value="small">小</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        class="custom-form-item-wrapper-flex"
        label="表单内边距"
      >
        <div class="custom-form-item-flex-list">
          <a-form-item class="custom-form-item-style">
            <span class="custom-form-item-label">上</span>
            <a-input-number
              v-decorator="['formPadding.top']"
              addonBefore="上"
            />
          </a-form-item>
          <a-form-item class="custom-form-item-style">
            <span class="custom-form-item-label">右</span>
            <a-input-number
              v-decorator="['formPadding.right']"
              addonBefore="右"
            />
          </a-form-item>
        </div>
        <div class="custom-form-item-flex-list">
          <a-form-item class="custom-form-item-style">
            <span class="custom-form-item-label">下</span>
            <a-input-number
              v-decorator="['formPadding.bottom']"
              addonBefore="下"
            />
          </a-form-item>
          <a-form-item class="custom-form-item-style">
            <span class="custom-form-item-label">左</span>
            <a-input-number
              v-decorator="['formPadding.left']"
              addonBefore="左"
            />
          </a-form-item>
        </div>
      </a-form-item>
      <a-form-item
        label="允许打印"
        class="custom-form-item-flex-row"
      >
        <a-switch
          v-decorator="['isPrint', { valuePropName: 'checked' }]"
          checkedChildren="是"
          unCheckedChildren="否"
        />
      </a-form-item>
    </a-form>
  </div>
</template>

<script>

  import formConfig from '../../json/page-config.json'

  export default {
    name: 'Index',
    inject: ['FormDesign'],
    data () {
      return {
        formData: formConfig,
        formLayout: 'vertical'
      }
    },
    created () {
      this.form = this.$form.createForm(this, {
        onValuesChange: (props, value) => {
          this.updateData(value)
        }
      })
    },
    mounted () {
      // 设置表单数据
      const { formData } = this._data
      setTimeout(() => {
        this.form.setFieldsValue({ ...formData })
      }, 0)
    },
    methods: {
      /**
       * @title 更新数据
       */
      updateData (value) {
        const params = { ...value }
        if (params.formPadding) {
          const formData = this.form.getFieldsValue()
          params.formPadding = { ...formData.formPadding, ...params.formPadding }
        }
        this.FormDesign.updateFormConfig(params)
      }
    }
  }
</script>

<style scoped>
  @import url("../../style/reset.css");
</style>

<style scoped lang="less">
  .wrapper {
    width: 100%;
    height: 100%;
    padding: 16px;
  }
</style>
