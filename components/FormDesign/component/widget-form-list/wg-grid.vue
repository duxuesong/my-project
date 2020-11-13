/**
* @author Leslie
* @date 2019-08-13 17:42
*/

<template>
  <div class="widget-item-list-wrapper">
    <a-row :gutter="formData.gutter">
      <a-col
        :class="{'form-grid-col':type!=='create'}"
        v-for="(item,index) in options"
        :key="index"
        :span="item.col"
      >
        <WidgetDraggable
          inline
          formSource="grid"
          :list="list"
          :formConfig="formConfig"
          :pageData="data.children[index]"
          :selectWg="selectWg"
          :form="form"
          :showEmpty="false"
          @formUpdate="formUpdateHandle($event, index)"
          @detailUpdate="detailUpdateHandle($event, index)"
          @setPrevData="setPrevDataHandle($event, index)"
        />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import WidgetDraggable from '../widget-draggable'
export default {
  name: 'WgGrid',
  components: {
    WidgetDraggable
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
    formData () {
      return this.data.form
    },
    options () {
      const { col } = this.formData
      let arr = []
      switch (col) {
        case '24':
          arr = [
            {
              col: 24
            }
          ]
          break
        case '12':
          arr = [
            {
              col: 12
            },
            {
              col: 12
            }
          ]
          break
        case '8':
          arr = [
            {
              col: 8
            },
            {
              col: 8
            },
            {
              col: 8
            }
          ]
          break
        case '6':
          arr = [
            {
              col: 6
            },
            {
              col: 6
            },
            {
              col: 6
            },
            {
              col: 6
            }
          ]
          break
        default:
          break
      }
      return arr
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
