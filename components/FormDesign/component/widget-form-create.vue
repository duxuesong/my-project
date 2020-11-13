<template>
  <section class="container">
    <div
      class="form-create-wrap"
      v-for="item in dataSource"
      :key="item.key"
    >
      <WgInput
        v-if="item.type === 'input'"
        :data="item"
        :formConfig="formConfig"
        :container="formSource"
      />
      <WgSelect
        v-else-if="item.type === 'select'"
        :data="item"
        :formConfig="formConfig"
        :container="formSource"
      />
      <WgTextArea
        v-else-if="item.type === 'textArea'"
        :data="item"
        :formConfig="formConfig"
        :container="formSource"
      />
      <WgInputNumber
        v-else-if="item.type === 'inputNumber'"
        :data="item"
        :formConfig="formConfig"
        :container="formSource"
      />
      <WgRadio
        v-else-if="item.type === 'radio'"
        :data="item"
        :formConfig="formConfig"
        :container="formSource"
      />
      <WgCheckBox
        v-else-if="item.type === 'checkBox'"
        :data="item"
        :formConfig="formConfig"
        :container="formSource"
      />
      <WgTimePicker
        v-else-if="item.type === 'timePicker'"
        :data="item"
        :formConfig="formConfig"
        :container="formSource"
      />
      <WgDatePicker
        v-else-if="item.type === 'datePicker'"
        :data="item"
        :formConfig="formConfig"
        :container="formSource"
      />
      <WgSwitch
        v-else-if="item.type === 'switch'"
        :data="item"
        :formConfig="formConfig"
        :container="formSource"
      />
      <WgButton
        v-else-if="item.type === 'button'"
        :data="item"
        :formConfig="formConfig"
        :container="formSource"
      />
      <WgUploadFile
        v-else-if="item.type === 'uploadFile'"
        :data="item"
        :formConfig="formConfig"
        :container="formSource"
        :form="form"
      />
      <WgUploadPicture
        v-else-if="item.type === 'uploadPicture'"
        :data="item"
        :formConfig="formConfig"
        :container="formSource"
        :form="form"
      />
      <WgCascader
        v-else-if="item.type === 'cascader'"
        :data="item"
        :formConfig="formConfig"
        :container="formSource"
      />
      <WgText
        v-else-if="item.type === 'staticText'"
        :data="item"
        :formConfig="formConfig"
        :container="formSource"
      />
      <WgDivider
        v-else-if="item.type === 'divider'"
        :data="item"
        :formConfig="formConfig"
        :container="formSource"
      />
      <WgInputCode
        v-else-if="item.type === 'inputCode'"
        :data="item"
        :formConfig="formConfig"
        :container="formSource"
        :form="form"
      />
      <WgGrid
        v-else-if="item.type === 'grid'"
        :data="item"
        :selectWg="{}"
        :formConfig="formConfig"
        :form="form"
        :list="list"
        :type="'create'"
      />
      <WgTab
        v-else-if="item.type === 'tab'"
        :data="item"
        :selectWg="{}"
        :formConfig="formConfig"
        :list="list"
        :form="form"
        :type="'create'"
      />
      <WgTable
        v-else-if="item.type === 'table'"
        :data="item"
        :selectWg="{}"
        :formConfig="formConfig"
        :list="list"
        :form="form"
        :type="'create'"
      />
    </div>
  </section>

</template>
<script>
import WgInput from './widget-form-list/wg-input'
import WgSelect from './widget-form-list/wg-select'
import WgTextArea from './widget-form-list/wg-textArea'
import WgInputNumber from './widget-form-list/wg-inputNumber'
import WgRadio from './widget-form-list/wg-radio'
import WgCheckBox from './widget-form-list/wg-checkBox'
import WgTimePicker from './widget-form-list/wg-timePicker'
import WgDatePicker from './widget-form-list/wg-datePicker'
import WgSwitch from './widget-form-list/wg-switch'
import WgUploadFile from './widget-form-list/wg-uploadFile'
import WgUploadPicture from './widget-form-list/wg-uploadPicture'
import WgCascader from './widget-form-list/wg-cascader'
import WgText from './widget-form-list/wg-text'
import WgTable from './widget-form-list/wg-table'
import WgButton from './widget-form-list/wg-button'
import WgTab from './widget-form-list/wg-tab'
import WgDivider from './widget-form-list/wg-divider'
import WgInputCode from './widget-form-list/wg-input-code'
import WgGrid from './widget-form-list/wg-grid'
// const WgGrid = () => import('./widget-form-list/wg-grid')

export default {
  name: 'WidgetFormCreate',
  props: {
    formData: Array,
    formConfig: Object,
    list: String,
    form: Object
  },

  computed: {
    dataSource () {
      return this.formData
    }
  },
  components: {
    WgInput,
    WgSelect,
    WgTextArea,
    WgInputNumber,
    WgRadio,
    WgCheckBox,
    WgTimePicker,
    WgDatePicker,
    WgSwitch,
    WgUploadFile,
    WgUploadPicture,
    WgCascader,
    WgText,
    WgTable,
    WgButton,
    WgGrid,
    WgTab,
    WgDivider,
    WgInputCode
  },
  data () {
    return {
      formSource: ''
    }
  }
}
</script>
<style scoped>
.form-create-wrap {
  min-height: 70px;
  margin-bottom: 10px;
}
.form-create-wrap >>> .form-required-mark {
  color: #f5222d;
  margin-right: 4px;
}
.form-create-wrap >>> .ant-input[disabled] {
  background: #fff;
}
</style>
