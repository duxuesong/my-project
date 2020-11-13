/**
* @author Leslie
* @date 2019-08-13 09:22
*/

<template>
  <div
    class="widget-item-list-wrapper"
    :class="formStyle"
    :style="{width: formData.formWidth + '%'}"
    v-if="!formData.hidden"
  >
    <div
      v-if="formConfig.formLayout !== 'top'"
      class="form-layout-flex"
    >
      <div
        class="form-label"
        :style="{width: formConfig.labelCol + 'px'}"
        v-if="container !== 'table'"
      >
        <span>
          <span
            v-if="formData.required"
            class="form-required-mark"
          >*</span>
          {{ formData.label }}
        </span>
      </div>
      <div class="form-control">
        <a-form-item>
          <a-input-number
            :placeholder="formData.placeholder"
            :disabled="formData.edit=== false&&formData.required===false"
            v-decorator="[
              `${formData.apiKey}`,
              {
                rules: [{ required:formData.required, message: '请输入信息' }],
                initialValue: formData.initialValue
              }]"
            :min="formData.min"
            :max="formData.max"
            :step="formData.step"
            :precision="formData.precision"
            :size="formConfig.widgetSize"
          />
        </a-form-item>
      </div>
    </div>
    <template v-else>
      <div
        class="form-label"
        v-if="container !== 'table'"
      >
        <span>
          <span
            v-if="formData.required"
            class="form-required-mark"
          >*</span>
          {{ formData.label }}
        </span>
      </div>
      <div class="form-control">
        <a-form-item>
          <a-input-number
            :placeholder="formData.placeholder"
            :disabled="formData.edit=== false&&formData.required===false"
            v-decorator="[
              `${formData.apiKey}`,
              {
                rules: [{ required:formData.required, message: '请输入信息' }],
                initialValue: formData.initialValue
              }]"
            :min="formData.min"
            :max="formData.max"
            :step="formData.step"
            :precision="formData.precision"
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
  }
}
</script>

<style scoped>
.widget-item-list-wrapper >>> .ant-input-number input::placeholder {
  color: #bfbfbf;
}

.widget-item-list-wrapper >>> .ant-input-number {
  line-height: 1;
}
</style>
