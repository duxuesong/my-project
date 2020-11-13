/** * @author Leslie * @date 2019-08-13 13:02 */

<template>
  <div
    class="widget-item-list-wrapper"
    :class="formStyle"
    v-if="!formData.hidden"
  >
    <div
      v-if="formConfig.formLayout !== 'top'"
      class="form-layout-flex"
    >
      <div>
        <a-button
          :type="formData.buttonType"
          :size="formConfig.widgetSize"
          style="height:30px"
        >
          {{ formData.initialValue }}
        </a-button>
      </div>
    </div>
    <template v-else>
      <div>
        <a-button
          :type="formData.buttonType"
          :size="formConfig.widgetSize"
        >
          {{ formData.initialValue }}
        </a-button>
      </div>
    </template>
  </div>
</template>

<script>
import { Cascader } from 'ant-design-vue'

export default {
  name: 'Index',
  props: {
    data: Object,
    formConfig: Object,
    container: String
  },
  components: { Cascader },
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
.widget-item-list-wrapper >>> .ant-cascader-picker input::placeholder {
  color: #bfbfbf;
}

.widget-item-list-wrapper >>> .ant-cascader-picker input {
  line-height: 32px;
}
</style>
