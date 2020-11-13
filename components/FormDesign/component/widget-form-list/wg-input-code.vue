/**
 *@Title: 编码生成器
 * @author DuXueSong
 * @date 2020-9-17
 */

<template>
  <div
    class="widget-item-list-wrapper"
    :class="formStyle"
    :style="{ width: formData.formWidth + '%' }"
    v-if="!formData.hidden"
  >
    <div
      v-if="formConfig.formLayout !== 'top'"
      class="form-layout-flex"
    >
      <div
        class="form-label"
        :style="{ width: formConfig.labelCol + 'px' }"
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
          <a-input
            class="input-wrap"
            :disabled="formData.edit === false && formData.required === false"
            v-decorator="[
              `${formData.apiKey}`,
              {
                rules: [{ required: formData.required, message: '请生成编码' }]
              }
            ]"
            :size="formConfig.widgetSize"
          >
            <a-button
              class="btn"
              type="primary"
              @click="getCode"
            >{{ formData.btnContent.length?formData.btnContent:'生成' }}</a-button>
          </a-input>
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
          <a-input
            class="input-wrap"
            :disabled="formData.edit === false && formData.required === false"
            v-decorator="[
              `${formData.apiKey}`,
              {
                rules: [{ required: formData.required, message: '请生成编码' }]
              }
            ]"
            :size="formConfig.widgetSize"
          >
            <span
              slot="addonAfter"
              @click="getCode"
            >{{ formData.btnContent.length?formData.btnContent:'生成' }}</span>
          </a-input>
        </a-form-item>
      </div>
    </template>
  </div>
</template>

<script>
import { generateEncodeByCode } from '@/api/encode'
export default {
  name: 'Index',
  props: {
    data: Object,
    formConfig: Object,
    container: String,
    form: Object
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
    /**
     * @Title: 生成编码
     * @Author: DuXueSong
     * @Date: 2020/9/17
     */
    getCode () {
      const { encoderCode, apiKey } = this.formData
      if (!apiKey) return
      generateEncodeByCode(encoderCode).then(res => {
        if (res) {
          this.$nextTick(() => {
            this.form.setFieldsValue({
              [`${apiKey}`]: res
            })
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
@import (reference) '~@/global.less';
.widget-item-list-wrapper /deep/ .ant-input-group > .ant-input:last-child,
.widget-item-list-wrapper /deep/ .ant-input-group-addon:last-child {
  cursor: pointer;
  color: #fff;
  // background: @primary-color;
  background: #2f54eb;
}
.widget-item-list-wrapper /deep/ .ant-input::placeholder {
  color: #bfbfbf;
}

.widget-item-list-wrapper /deep/ .ant-input {
  line-height: 32px;
}
.widget-item-list-wrapper /deep/ .btn:hover,
.btn:focus,
.btn.focus {
  color: #fff;
}
.btn {
  position: absolute;
  right: 0px;
}
.input {
  position: relative;
}
</style>
