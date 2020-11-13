/**
* @author Leslie
* @date 2019-08-13 09:36
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
        <span>{{ formData.label }}</span>
      </div>
      <div class="form-control">
        <a-form-item>
          <a-radio-group
            class="radio-group-wrapper"
            :size="formConfig.widgetSize"
            v-decorator="[
              `${formData.apiKey}`,
              {
                initialValue: formData.defaultValue
              }]"
          >
            <template v-if="formData.buttonStyle === 'dot'">
              <a-radio
                :disabled="formData.edit=== false&&formData.required===false"
                v-for="(item,index) in selectOptions"
                :key="index"
                :value="item.value"
              >{{ item.label }}</a-radio>
            </template>
            <template v-if="formData.buttonStyle === 'button'">
              <a-radio-button
                :disabled="formData.edit=== false&&formData.required===false"
                v-for="(item,index) in selectOptions"
                :key="index"
                :value="item.value"
              >{{ item.label }}</a-radio-button>
            </template>
          </a-radio-group>

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
          <a-radio-group
            class="radio-group-wrapper"
            :size="formConfig.widgetSize"
            v-decorator="[
              `${formData.apiKey}`,
              {
                initialValue: formData.defaultValue
              }]"
          >
            <template v-if="formData.buttonStyle === 'dot'">
              <a-radio
                :disabled="formData.edit=== false&&formData.required===false"
                v-for="(item,index) in selectOptions"
                :key="index"
                :value="item.value"
              >{{ item.label }}</a-radio>
            </template>
            <template v-if="formData.buttonStyle === 'button'">
              <a-radio-button
                v-for="(item,index) in selectOptions"
                :disabled="formData.edit=== false&&formData.required===false"
                :key="index"
                :value="item.value"
              >{{ item.label }}</a-radio-button>
            </template>

          </a-radio-group>
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

<style scoped lang="less">
.ant-radio-group {
  line-height: 32px;
}
</style>
