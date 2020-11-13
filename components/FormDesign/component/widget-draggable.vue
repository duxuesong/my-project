/**
* @author Leslie
* @date 2019-08-13 17:51
*/

<template>
  <draggable
    :group="{
      name:'widget',
      put: putHandle
    }"
    v-model="pageData.list"
    :data-type="formSource"
    ghostClass="ghost"
    :swapThreshold="0.5"
    :animation="100"
    :move="moveHandle"
    @add="handleWidgetAdd"
    @change="changeHandle"
    class="widget-form-list"
    :class="{'empty-container': !pageData.list.length && showEmpty&&formDesignType===0, 'inline-draggable': inline, 'empty-container-move': !pageData.list.length && showEmpty&&formDesignType===1}"
  >
    <template v-for="(item,index) in pageData.list">
      <div
        :data-type="item.type"
        :class="{active: selectWg && selectWg.key && selectWg.key === item.key, 'widget-view':formDesignType===0, 'border':(formDesignType===0||formDesignType===1)&&item.type!=='tab', 'widget-view-move':formDesignType===1}"
        :key="index"
        @click.stop="handleSelectWidget(index)"
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
          :selectWg="selectWg"
          :formConfig="formConfig"
          :list="list"
          :form="form"
          @detailUpdate="detailUpdateHandle"
          @formUpdate="formUpdateHandle"
          @updateOrigin="updateOriginHandle"
        />
        <WgTable
          v-else-if="item.type === 'table'"
          :data="item"
          :selectWg="selectWg"
          :formConfig="formConfig"
          :list="list"
          :form="form"
          @detailUpdate="detailUpdateHandle"
          @formUpdate="formUpdateHandle"
          @updateOrigin="updateOriginHandle"
        />
        <WgTab
          style="background:white;"
          v-else-if="item.type === 'tab'"
          :data="item"
          :selectWg="selectWg"
          :formConfig="formConfig"
          :list="list"
          :form="form"
          @detailUpdate="detailUpdateHandle"
          @formUpdate="formUpdateHandle"
          @updateOrigin="updateOriginHandle"
        />
        <div
          class="widget-view-action"
          v-if="selectWg && selectWg.key && selectWg.key === item.key"
        >
          <div
            class="widget-view-action-item copy-action"
            title="复制"
            @click="handleWidgetClone(index)"
            v-if="item.type !== 'grid' && item.type !== 'table' && item.type !== 'tab'"
          >
            <a-icon type="copy" />
          </div>
          <div
            class="widget-view-action-item delete-action"
            title="删除"
            @click.stop="handleWidgetDelete(index)"
          >
            <a-icon type="delete" />
          </div>
        </div>
      </div>
    </template>
  </draggable>
</template>

<script>
import { mapGetters } from 'vuex'
import Draggable from 'vuedraggable'
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
import Utils from '../utils'

const WgGrid = () => import('./widget-form-list/wg-grid')

export default {
  name: 'WidgetDraggable',
  components: {
    Draggable,
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
    WgGrid,
    WgTable,
    WgButton,
    WgTab,
    WgDivider,
    WgInputCode
  },
  props: {
    list: String,
    formConfig: Object,
    showEmpty: {
      type: Boolean,
      default: true
    },
    inline: {
      type: Boolean,
      default: false
    },
    pageData: {
      type: Object,
      default: () => {
        return {
          list: [],
          formList: [],
          config: {}
        }
      }
    },
    selectWg: Object,
    formSource: String,
    form: Object
  },
  computed: {
    ...mapGetters([
      'formDesignType'
    ]),
    paddingStyle () {
      return {
        paddingTop: this.formConfig.formPadding.top + 'px',
        paddingRight: this.formConfig.formPadding.right + 'px',
        paddingBottom: this.formConfig.formPadding.bottom + 'px',
        paddingLeft: this.formConfig.formPadding.left + 'px',
        maxWidth: this.formDesignType === 0 ? '' : '450px'
      }
    }
  },
  methods: {

    /**
     * @title 放置表单事件
     * 返回 false 则取消放置 , 返回 true 则正常放置
     */
    putHandle () {
      // 限制表格组件每列只能放置一个组件
      if (this.formSource === 'table') {
        if (this.pageData.list.length === 1) {
          return false
        }
      }
      return true
    },

    /**
     * @title 限制于栅格或表格并行的组件拖动至栅格或表格
     */
    moveHandle (evt) {
      return (evt.to.dataset.type !== 'grid' && evt.to.dataset.type !== 'table' && evt.to.dataset.type !== 'tab')
    },

    /**
     * @title 数组元素交换位置
     */
    swapArr (arr, index1, index2) {
      arr[index1] = arr.splice(index2, 1, arr[index1])[0]
      return arr
    },

    /**
     * @title form改变事件(添加、移动)
     */
    changeHandle (evt) {
      let type = null
      Object.keys(evt).forEach(item => {
        type = item
      })
      const _pageData = Utils.deepClone(this.pageData)
      if (type === 'added') {
        _pageData[this.list].splice(evt.added.newIndex)
      } else if (type === 'moved') {
        _pageData[this.list] = this.swapArr(_pageData[this.list], evt.moved.newIndex, evt.moved.oldIndex)
      }
      this.$emit('setPrevData', _pageData)
    },

    /**
     * @title 添加表单
     */
    handleWidgetAdd (evt) {
      const _pageData = { ...this.pageData }
      const newIndex = evt.newIndex
      const elKey = Date.now() + '_' + Math.ceil(Math.random() * 1000000)
      const newObj = Utils.deepClone(_pageData[this.list][newIndex])
      newObj.key = _pageData[this.list][newIndex].type + '_' + elKey
      _pageData[this.list][newIndex] = newObj
      this.$emit('formUpdate', {
        type: 'default',
        data: _pageData,
        updateType: newObj.type
      })
      this.$emit('detailUpdate', newObj, 1)
    },

    /**
     * @title 点击选中表单
     */
    handleSelectWidget (index) {
      const { pageData } = this
      const data = pageData['list'][index]
      this.$emit('detailUpdate', data)
    },

    /**
     * @title 删除方法
     */
    handleWidgetDelete (index) {
      const _pageData = { ...this.pageData }
      if (_pageData[this.list].length - 1 === index) {
        if (index === 0) {
          this.$emit('detailUpdate', {})
        } else {
          const selectWg = _pageData[this.list][index - 1]
          this.$emit('detailUpdate', selectWg)
        }
      } else {
        const selectWg = _pageData[this.list][index + 1]
        this.$emit('detailUpdate', selectWg)
      }
      _pageData[this.list].splice(index, 1)
      this.$nextTick(() => {
        this.$emit('formUpdate', {
          type: 'default',
          data: _pageData
        })
      })
    },

    /**
     * @title 复制方法
     */
    handleWidgetClone (index) {
      const _pageData = { ...this.pageData }
      const cloneData = Utils.deepClone(_pageData[this.list][index])
      cloneData.key = _pageData[this.list][index].type + '_' + Date.now() + '_' + Math.ceil(Math.random() * 1000000)
      _pageData[this.list].splice(index, 0, cloneData)
      this.$nextTick(() => {
        const selectWg = _pageData[this.list][index + 1]
        this.$emit('detailUpdate', selectWg)
      })
    },

    /**
     * @title 选中表单数据更新
     */
    detailUpdateHandle (data) {
      this.$emit('detailUpdate', data)
    },

    /**
     * @title 根据文本类型渲染文字
     */
    renderTypeText (type) {
      const arr = [
        {
          type: 'grid',
          name: '栅格'
        },
        {
          type: 'table',
          name: '表格'
        },
        {
          type: 'tab',
          name: '选项卡'
        },
        {
          type: 'checkBox',
          name: '复选框'
        },
        {
          type: 'radio',
          name: '单选框'
        },
        {
          type: 'uploadFile',
          name: '文件上传'
        },
        {
          type: 'uploadPicture',
          name: '图片上传'
        },
        {
          type: 'staticText',
          name: '文本'
        }
      ]
      const obj = arr.filter(item => item.type === type)[0]
      if (!obj) return type
      return obj.name
    },

    /**
     * @title 布局类表单数据更新
     */
    formUpdateHandle (type, key, index, data, updateType) {
      let rollback = false
      const _data = { ...data }
      // 限制组件嵌套规则
      // 1.栅格不能套栅格、表格不能套表格、栅格与表格皆不能互套
      // 2.表格中不能添加复选框、单选框、文件上传、图片上传、文本
      if (
        type === 'grid' && updateType === 'grid' ||
        type === 'tab' && updateType === 'tab' ||
        type === 'tab' && updateType === 'grid' ||
        (type === 'table' && updateType === 'table') ||
        (type === 'table' && updateType === 'grid') ||
        (type === 'grid' && updateType === 'table') ||
        (type === 'table' && (updateType === 'checkBox' || updateType === 'radio' || updateType === 'uploadFile' || updateType === 'uploadPicture' || updateType === 'staticText'))
      ) {
        rollback = true
        const warnText = `${this.renderTypeText(type)}组件中不允许添加${this.renderTypeText(updateType)}组件`
        if (this.$message) {
          this.$message.warning(warnText)
        } else {
          this.$antMessage.warning(warnText)
        }
      }
      this.$emit('formUpdate', {
        type, data: _data, key, index, rollback
      })
    },

    /**
     * @title 容器类组件表单变化时更新上一状态的数据
     */
    updateOriginHandle (params) {
      this.$emit('setPrevData', params)
    },

    /**
    * @title 保存时获取到最新数据
    */
    saveHandle () {
      const _pageData = { ...this.pageData }
      this.$emit('formUpdate', {
        type: 'default',
        data: _pageData
      }, this.formConfig)
    }

  }
}
</script>
