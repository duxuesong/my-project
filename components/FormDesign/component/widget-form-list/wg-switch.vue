/**
* @author Leslie
* @date 2019-08-13 11:41
*/

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
      <div
        class="form-label"
        :style="{width: formConfig.labelCol + 'px'}"
        v-if="container !== 'table'"
      >
        <span>{{ formData.label }}</span>
      </div>
      <div class="form-control">
        <a-form-item>
          <a-switch
            v-decorator="[
              `${formData.apiKey}`,
              {
                initialValue:true,
                valuePropName: 'checked'
              }
            ]"
            :disabled="formData.edit=== false&&formData.required===false"
            checkedChildren="开"
            unCheckedChildren="关"
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
        <span>{{ formData.label }}</span>
      </div>
      <div class="form-control">
        <a-form-item>
          <a-switch
            v-decorator="[
              `${formData.apiKey}`,
              {
                initialValue:true,
                valuePropName: 'checked'
              }
            ]"
            :disabled="formData.edit=== false&&formData.required===false"
            checkedChildren="开"
            unCheckedChildren="关"
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

<style scoped lang="less">
.form-control {
  height: 32px;
  line-height: 32px;
  align-items: center;
}
</style>
