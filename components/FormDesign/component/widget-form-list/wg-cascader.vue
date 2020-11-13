/**
* @author Leslie
* @date 2019-08-13 13:02
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
          <Cascader
            :fieldNames="{ label: 'xzqmc', value: 'xzqdm', children: 'children' }"
            :options="areaData"
            :placeholder="formData.placeholder"
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
          <Cascader
            :fieldNames="{ label: 'xzqmc', value: 'xzqdm', children: 'children' }"
            :options="areaData"
            :placeholder="formData.placeholder"
            :size="formConfig.widgetSize"
          />
        </a-form-item>
      </div>
    </template>
  </div>
</template>

<script>
import { Cascader } from 'ant-design-vue'
import { getAreaList } from '@/api/area'
export default {
  name: 'Index',
  props: {
    data: Object,
    formConfig: Object,
    container: String
  },
  data () {
    return {
      areaData: []
    }
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
  },
  created () {
    this.getArear()
  },
  methods: {
    /**
     * @Title: 获取字典数据
     * @Author: DuXueSong
     * @Date: 2020/9/1
     */
    getArear () {
      getAreaList().then(res => {
        if (!res && !res.length) return
        this._data.areaData = res
      })
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
