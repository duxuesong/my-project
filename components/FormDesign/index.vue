/** * @author Leslie * @date 2019-08-12 13:39 */

<template>
  <div class="form-design-wrapper">
    <div class="form-classify-wrapper">
      <div class="form-item-wrapper">
        <h3 class="form-classify-title-text">基础字段</h3>
        <div class="form-item-content">
          <draggable
            tag="ul"
            class="form-item-list"
            :list="basicComponents"
            :group="{ name: 'widget', pull: 'clone', put: false }"
            :sort="false"
            ghostClass="ghost"
          >
            <li
              class="form-edit-widget-label"
              :data-type="item.type"
              v-for="(item, index) in basicComponents"
              :key="index"
            >
              <span class="icon iconfont" :class="item.icon" style="margin:0 10px;" v-if="item.icon"></span>
              <span>{{ item.name }}</span>
            </li>
          </draggable>
        </div>
        <h3 class="form-classify-title-text">高级字段</h3>
        <div class="form-item-content">
          <draggable
            tag="ul"
            class="form-item-list"
            :list="imgComponents"
            :group="{ name: 'widget', pull: 'clone', put: false }"
            :sort="false"
            ghostClass="ghost"
          >
            <li
              class="form-edit-widget-label"
              :data-type="item.type"
              v-for="(item, index) in imgComponents"
              :key="index"
            >
              <!-- <img
                v-if="item.icon"
                style="margin:0 10px;"
                :src="item.icon"
                alt=""
              > -->
              <span class="icon iconfont" :class="item.icon" style="margin:0 10px;" v-if="item.icon"></span>
              <span>{{ item.name }}</span>
            </li>
          </draggable>
        </div>
        <h3
          class="form-classify-title-text"
          v-if="formDesignType === 0"
        >布局字段</h3>
        <div
          class="form-item-content"
          v-if="formDesignType === 0"
        >
          <draggable
            tag="ul"
            class="form-item-list"
            :list="assistComponents"
            :group="{ name: 'widget', pull: 'clone', put: false }"
            :sort="false"
            ghostClass="ghost"
          >
            <li
              class="form-edit-widget-label"
              :data-type="item.type"
              v-for="(item, index) in assistComponents"
              :key="index"
            >
              <!-- <img
                v-if="item.icon"
                style="margin:0 10px;"
                :src="item.icon"
                alt=""
              > -->
              <span class="icon iconfont" :class="item.icon" style="margin:0 10px;" v-if="item.icon"></span>
              <span>{{ item.name }}</span>
            </li>
          </draggable>
        </div>
      </div>
    </div>
    <div class="form-content-wrapper">
      <WidgetForm
        list="list"
        :formData="formData"
        :formConfig="formConfig"
        :id="id"
      />
    </div>
    <div class="form-detail-wrapper">
      <ConfigDetail
        ref="configDetail"
        :detailData="selectData"
        :formConfig="formConfig"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Draggable from 'vuedraggable'
import WidgetForm from './component/widget-form'
import ConfigDetail from './component/widget-config'
import allWidget from './json/widget.json'
import pageConfigData from './json/page-config.json'

export default {
  name: 'Index',
  props: {
    id: String
  },
  components: {
    Draggable,
    WidgetForm,
    ConfigDetail
  },
  provide () {
    return {
      FormDesign: this
    }
  },
  data () {
    return {
      basicComponents: allWidget.basicComponents,
      imgComponents: allWidget.imgComponents,
      assistComponents: allWidget.assistComponents,
      formConfig: pageConfigData,
      formData: {
        list: [],
        formList: [],
        config: {}
      },
      selectData: {}
    }
  },
  computed: {
    ...mapGetters(['formDesignType'])
  },
  mounted () {
    this.$nextTick(() => {
      // 防止火狐浏览器拖拽的时候以新标签打开
      document.body.ondrop = (event) => {
        event.preventDefault()
        event.stopPropagation()
      }
    })
  },
  methods: {
    /**
     * @title 设置表单主体区数据
     */
    setFormData (data) {
      this._data.formData = data
    },

    /**
     * @title 设置详情的数据
     */
    setDetailData (data, activeTab) {
      this._data.selectData = data
      if (activeTab) {
        this.$refs['configDetail'].toggleTabHandle(activeTab)
      }
    },

    /**
     * @title 更新表单属性数据
     */
    updateFormConfig (params) {
      const _config = { ...this._data.formConfig }
      this._data.formConfig = { ..._config, ...params }
    },

    /**
     * @title 查找字段的索引位置
     */
    getWidgetData (arr, key) {
      if (!arr.length || !key) return
      const loop = data => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].key === key) {
            return data[i]
          } else {
            const child = data[i].children
            const len = child ? child.length : 0
            if (child && len) {
              for (let j = 0; j < len; j++) {
                for (let k = 0; k < child[j].list.length; k++) {
                  if (child[j].list[k].key === key) {
                    return child[j].list[k]
                  }
                }
              }
              // return loop(childData)
            }
          }
        }
      }
      return loop(arr)
    },

    /**
     * @title 更新字段属性数据
     */
    updateWidgetConfig (key, params) {
      const obj = this.getWidgetData(this._data.formData.list, key)
      if (!obj) return
      obj.form = { ...obj.form, ...params }
    }
  }
}
</script>

<style lang="less">
@import url('./style/index.less');
@import url('./style/widget.less');
@import url('./style/config.less');
</style>
