/**
* @author Leslie
* @date 2019-08-13 10:22
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
          <a-time-picker
            :disabled="formData.edit=== false&&formData.required===false"
            :placeholder="formData.placeholder"
            :format="formData.format"
            :size="formConfig.widgetSize"
            v-decorator="[
              `${formData.apiKey}`,
              {
                rules: [{ required: formData.required, message: '请选择时间' }],
              }]"
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
          <a-time-picker
            :disabled="formData.edit=== false&&formData.required===false"
            :placeholder="formData.placeholder"
            :format="formData.format"
            :size="formConfig.widgetSize"
            v-decorator="[
              `${formData.apiKey}`,
              {
                rules: [{ required: formData.required, message: '请选择时间' }],
              }]"
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
.widget-item-list-wrapper >>> .ant-time-picker input::placeholder {
  color: #bfbfbf;
}

.widget-item-list-wrapper >>> .ant-time-picker input {
  line-height: 32px;
}
</style>
