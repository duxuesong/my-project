/** * @author Leslie * @date 2019-08-12 17:46 */

<template>
  <div
    class="widget-item-list-wrapper"
    :class="formStyle"
    :style="{ width: formData.formWidth + '%' }"
    v-if="!formData.hidden"
  >
    <div v-if="formConfig.formLayout !== 'top'" class="form-layout-flex">
      <div class="form-label" :style="{ width: formConfig.labelCol + 'px' }" v-if="container !== 'table'">
        <span>
          <span v-if="formData.required" class="form-required-mark">*</span>
          {{ formData.label }}
        </span>
      </div>
      <div class="form-control">
        <a-form-item>
          <a-input
            :disabled="formData.edit === false && formData.required === false"
            v-decorator="[
              `${formData.apiKey}`,
              {
                rules: [
                  { required: formData.required, message: '请输入信息' },
                  {
                    validator: this.checkName //自定义的校验函数
                  }
                ],
                initialValue: formData.initialValue
              }
            ]"
            :placeholder="formData.placeholder || '请输入'"
            :size="formConfig.widgetSize"
          />
        </a-form-item>
      </div>
    </div>
    <template v-else>
      <div class="form-label" v-if="container !== 'table'">
        <span>
          <span v-if="formData.required" class="form-required-mark">*</span>
          {{ formData.label }}
        </span>
      </div>
      <div class="form-control">
        <a-form-item>
          <a-input
            :disabled="formData.edit === false && formData.required === false"
            v-decorator="[
              `${formData.apiKey}`,
              {
                rules: [
                  { required: formData.required, message: '请输入信息' },
                  {
                    validator: checkName,
                    validateTrigger: 'onBlur'
                  }
                ],
                initialValue: formData.initialValue
              }
            ]"
            :placeholder="formData.placeholder || '请输入'"
            :size="formConfig.widgetSize"
          />
        </a-form-item>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'Index',
  props: {
    data: Object,
    formConfig: Object,
    container: String
  },
  computed: {
    formStyle () {
      return {
        'left-layout': this.formConfig.formLayout === 'left',
        'right-layout': this.formConfig.formLayout === 'right',
        'top-layout': this.formConfig.formLayout === 'top'
      }
    },
    formData () {
      return this.data.form
    }
  },
  methods: {
    // 正则验证
    checkName (rule, value, callback) {
      const { validate, apiKey, required } = this.formData
      if (!validate || !apiKey || (!value && !required)) return callback()
      if (!value && required) return callback(new Error('请填写信息'))
      let flag
      let text
      switch (validate) {
        case 'identity_card':
          flag = /^[0-9]{17}[0-9X]$/.test(value)
          text = '身份证号码'
          break
        case 'phone':
          flag = /^1[3456789]\d{9}$/.test(value)
          text = '手机号码'
          break
        case 'email':
          flag = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/.test(value)
          text = '电子邮箱'
          break
        case 'bank_account':
          flag = /^([1-9]{1})(\d{14}|\d{18})$/.test(value)
          text = '银行账户'
          break
        case 'postal_code':
          flag = /^[0-9]\d{5}(?!\d)$/.test(value)
          text = '邮政编码'
          break
        case 'numbers_and_letters':
          flag = /^[A-Za-z0-9]+$/.test(value)
          text = '数字和字母'
          break
        case 'numbers':
          flag = /^[0-9]*$/.test(value)
          text = '数字'
          break
        case 'letters':
          flag = /^[A-Za-z]+$/.test(value)
          text = '字母'
          break
        case 'integer':
          flag = /^-?[1-9]\d*$/.test(value)
          text = '整数'
          break
        case 'money':
          flag = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(value)
          text = '金额'
          break
        case 'url':
          flag = /^(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]$/.test(value)
          text = '网址'
          break
        case 'chinese_characters':
          flag = /^[\u4e00-\u9fa5]{0,}$/.test(value)
          text = '汉字'
          break
        default:
          break
      }
      if (!flag) {
        callback(new Error(`您输入的${text}格式不正确，请重输`))
      } else {
        callback()
      }
    }
  }
}
</script>

<style scoped>
.widget-item-list-wrapper >>> .ant-input::placeholder {
  color: #bfbfbf;
}

.widget-item-list-wrapper >>> .ant-input {
  line-height: 32px;
}
.form-control >>> .ant-form-item {
  width: 100%;
}
</style>
