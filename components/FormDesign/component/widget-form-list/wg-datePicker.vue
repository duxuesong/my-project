/**
* @author Leslie
* @date 2019-08-13 11:09
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
        <template v-if="formData.pickerType === 'date'">
          <a-form-item>
            <a-date-picker
              :disabled="formData.edit=== false&&formData.required===false"
              v-decorator="[
                `${formData.apiKey}`,
                {
                  rules: [{ required: formData.required, message: '请选择日期' }],
                }]"
              :size="formConfig.widgetSize"
              :format="formData.format"
              :show-time="formData.format=== 'YYYY-MM-DD HH:mm:ss'?{ defaultValue: moment('00:00:00', 'HH:mm:ss') }: false"
            />
          </a-form-item>
        </template>
        <template v-else-if="formData.pickerType === 'month'">
          <a-form-item>
            <a-month-picker
              :disabled="formData.edit=== false&&formData.required===false"
              v-decorator="[
                `${formData.apiKey}`,
                {
                  rules: [{ required: formData.required, message: '请选择日期' }],
                }]"
              :size="formConfig.widgetSize"
              :format="formData.format"
            />
          </a-form-item>
        </template>
        <template v-else-if="formData.pickerType === 'dateRange'">
          <a-form-item>
            <a-date-picker
              :disabled="formData.edit=== false&&formData.required===false"
              v-decorator="[
                `${formData.apiKey}`,
                {
                  rules: [{ required: formData.required, message: '请选择日期' }],
                }]"
              :size="formConfig.widgetSize"
              style="width: 48%;"
              :format="formData.format"
              :show-time="formData.format=== 'YYYY-MM-DD HH:mm:ss'?{ defaultValue: moment('00:00:00', 'HH:mm:ss') }: ''"
            />
            <span style="width: 4%;text-align: center;">至</span>
            <a-date-picker
              :disabled="formData.edit=== false&&formData.required===false"
              v-decorator="[
                `${formData.apiKey}`,
                {
                  rules: [{ required: formData.required, message: '请选择日期' }],
                }]"
              :size="formConfig.widgetSize"
              style="width: 48%;"
              :format="formData.format"
            />
          </a-form-item>
        </template>
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
        <template v-if="formData.pickerType === 'date'">
          <a-form-item>
            <a-date-picker
              :disabled="formData.edit=== false&&formData.required===false"
              v-decorator="[
                `${formData.apiKey}`,
                {
                  rules: [{ required: formData.required, message: '请选择日期' }],
                }]"
              :size="formConfig.widgetSize"
              :format="formData.format"
              @change="onChange"
              :show-time="formData.format=== 'YYYY-MM-DD HH:mm:ss'?{ defaultValue: moment('00:00:00', 'HH:mm:ss') }: false"
            />
          </a-form-item>
        </template>
        <template v-else-if="formData.pickerType === 'month'">
          <a-form-item>
            <a-month-picker
              v-decorator="[`${formData.apiKey}`]"
              r
              :size="formConfig.widgetSize"
              :format="formData.format"
            />
          </a-form-item>
        </template>
        <template v-else-if="formData.pickerType === 'dateRange'">
          <a-form-item>
            <a-date-picker
              v-decorator="[`${formData.apiKey}`]"
              :size="formConfig.widgetSize"
              style="width: 48%;"
              :format="formData.format"
            />
            <span style="width: 4%;text-align: center;">至</span>

            <a-date-picker
              v-decorator="[`${formData.apiKey}`]"
              :size="formConfig.widgetSize"
              style="width: 48%;"
              :format="formData.format"
            />
          </a-form-item>
        </template>
      </div>
    </template>
  </div>
</template>

<script>
import moment from 'moment'
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
    moment,
    onChange (date, dateString) {
      console.log(dateString, 'dateString')
    }
  }
}
</script>

<style scoped>
.widget-item-list-wrapper >>> .ant-calendar-picker input::placeholder {
  color: #bfbfbf;
}

.widget-item-list-wrapper >>> .ant-calendar-picker input {
  line-height: 32px;
}

.widget-item-list-wrapper .form-control {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
