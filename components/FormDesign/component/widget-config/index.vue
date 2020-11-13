/**
* @author Leslie
* @date 2019-08-12 17:17
*/

<template>
  <div class="form-config-wrapper">
    <div class="detail-tab-title">
      <div class="tab-item" :class="{ active: activeTab === 1 }" @click="toggleTabHandle(1)">字段属性</div>
      <div class="tab-item" :class="{ active: activeTab === 2 }" @click="toggleTabHandle(2)">表单属性</div>
    </div>
    <div class="detail-tab-content">
      <WidgetConfig :detailData="detailData" v-show="activeTab === 1"/>
      <formConfig v-show="activeTab === 2"/>
    </div>
  </div>
</template>

<script>

  import WidgetConfig from './widget-config'
  import FormConfig from './form-config'

  export default {
    name: 'Index',
    props: {
      detailData: Object,
      formConfig: Object
    },
    inject: ['FormDesign'],
    components: {
      WidgetConfig,
      FormConfig
    },
    data () {
      return {
        activeTab: 1
      }
    },
    methods: {
      /**
       * @title 切换Tab
       */
      toggleTabHandle (data) {
        this._data.activeTab = data
      }
    }
  }
</script>

<style scoped lang="less">
  .detail-tab-content {
    position: absolute;
    left: 0;
    right: 0;
    top: 56px;
    bottom: 0;
    overflow-y: auto;
  }
</style>
