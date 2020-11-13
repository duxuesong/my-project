/** * @author Leslie * @date 2019-08-12 18:34 */

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
            v-if="formData.required?formData.required:formData.isRequired"
            class="form-required-mark"
          >*</span>
          {{ formData.label }}
        </span>
      </div>
      <div class="form-control">
        <a-form-item>
          <a-select
            :disabled="formData.edit=== false&&formData.required===false"
            v-decorator="[
              `${formData.apiKey}`,
              {
                rules: [{ required: formData.required?formData.required:formData.isRequired, message: '请选择' }]
              }
            ]"
            :showSearch="formData.showSearch"
            :mode="formData.multiple ? 'multiple' : 'default'"
            :placeholder="formData.placeholder || '请选择'"
            :size="formConfig.widgetSize"
          >
            <a-select-option
              v-for="(item, index) in selectOptions"
              :key="index"
              :value="item.value"
            >{{
              item.label
            }}</a-select-option>
          </a-select>
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
            v-if="formData.required?formData.required:formData.isRequired"
            class="form-required-mark"
          >*</span>
          {{ formData.label }}
        </span>
      </div>
      <div class="form-control">
        <a-form-item>
          <a-select
            v-decorator="[
              `${formData.apiKey}`,
              {
                rules: [{ required: formData.required?formData.required:formData.isRequired, message: '请选择' }]
              }
            ]"
            :showSearch="formData.showSearch"
            :mode="formData.multiple ? 'multiple' : 'default'"
            :disabled="formData.edit=== false&&formData.required===false"
            :placeholder="formData.placeholder || '请选择'"
            :size="formConfig.widgetSize"
          >
            <a-select-option
              v-for="(item, index) in selectOptions"
              :key="index"
              :value="item.value"
            >{{
              item.label
            }}</a-select-option>
          </a-select>
        </a-form-item>
      </div>
    </template>
  </div>
</template>

<script>
import { getDictItem } from '@/api/dic'
export default {
  name: 'Index',
  props: {
    data: Object,
    formConfig: Object,
    container: String
  },
  data () {
    return {
      selectOptions: []
    }
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
    },
    dictionary () {
      return this.formData.dictionary
    }
  },
  created () {
    if (this.dictionary !== '' && this.formData.dataType === 'dictionary') {
      this.getDictionarData(this.dictionary)
    } else {
      this._data.selectOptions = this.formData.options
    }
  },
  watch: {
    /**
    * @Title: 监听字典值的变化
    * @Author: DuXueSong
    * @Date: 2020/9/2
    */
    dictionary (newVal, oldVal) {
      this.getDictionarData(newVal)
    }
  },
  methods: {
    /**
    * @Title: 获取字典数据
    * @Author: DuXueSong
    * @Date: 2020/9/1
    */
    getDictionarData (id) {
      const data = []
      getDictItem(id).then(res => {
        if (!Array.isArray(res)) return
        if (!res.length) return
        res.map(item => {
          const obj = {
            label: item.itemText,
            value: item.id
          }
          data.push(obj)
        })
        this._data.selectOptions = data
      })
    }
  }
}
</script>

<style scoped>
.widget-item-list-wrapper >>> .ant-select {
  width: 100%;
}
.widget-item-list-wrapper >>> .ant-select-disabled .ant-select-selection {
  background: #fff;
}
.widget-item-list-wrapper >>> .ant-form-item {
  width: 100%;
}
</style>
