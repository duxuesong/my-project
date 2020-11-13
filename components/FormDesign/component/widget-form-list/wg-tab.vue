/**
* @author Leslie
* @date 2019-08-13 17:42
*/

<template>
  <div
    class="widget-item-list-wrapper"
    style="padding:10px 20px;"
    v-if="!dataFlag.hidden"
  >
    <div
      class="form-label"
      style="margin-bottom:10px;"
    >
      {{ dataFlag.form.label }}
    </div>
    <div>
      <a-tabs
        v-model="dataFlag.form.defaultValue"
        :tab-position="dataFlag.form.tabPosition"
        :type="dataFlag.form.type"
      >

        <a-tab-pane
          :key="item.value+''"
          :tab="item.label"
          style="padding:0 20px;"
          v-for="(item, index) in options"
        >
          <WidgetDraggable
            inline
            formSource="tab"
            :list="list"
            :formConfig="formConfig"
            :pageData="dataFlag.children[index]"
            :selectWg="selectWg"
            :form="form"
            :showEmpty="false"
            @formUpdate="formUpdateHandle($event, index)"
            @detailUpdate="detailUpdateHandle($event, index)"
            @setPrevData="setPrevDataHandle($event, index)"
          />
        </a-tab-pane>
      </a-tabs>
    </div>

  </div>
</template>

<script>

export default {
  name: 'WgTab',
  components: {
    WidgetDraggable: () => import('../widget-draggable')
  },
  props: {
    data: Object,
    list: String,
    formConfig: Object,
    selectWg: Object,
    type: String,
    form: Object
  },
  computed: {
    dataFlag () {
      return this.data
    },
    options () {
      if (this.data.form.options.isArray) {
        return this.data.form.options
      } else {
        const result = Object.keys(this.data.form.options).map(item => (this.data.form.options[item]))
        return result
      }
    }
  },
  methods: {

    /**
     * @title 存储上一状态数据
     */
    setPrevDataHandle (params, index) {
      const data = this.data
      this.$emit('updateOrigin', { type: data.type, key: data.key, index, data: params })
    },

    /**
     * @title 详情数据更新
     */
    detailUpdateHandle (selectWg) {
      this.$emit('detailUpdate', selectWg)
    },

    /**
     * @title 表单数据更新
     */
    formUpdateHandle (data, index) {
      const { key, type } = this.data
      this.$emit('formUpdate', type, key, index, data.data, data.updateType)
    }
  }
}
</script>

<style scoped lang="less">
.form-grid-col {
  border: 1px dashed #999;
}
</style>
