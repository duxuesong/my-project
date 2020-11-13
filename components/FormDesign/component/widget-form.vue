/**
* @author Leslie
* @date 2019-08-12 15:32
*/

<template>
  <div class="widget-form-wrapper">
    <div class="form-content-title">
      <div class="form-view-list">
        <span
          class="form-view-list-item"
          :class="{'active':formDesignType===0}"
          @click="formTypeHandle(0)"
        >PC表单</span>
        <span
          class="form-view-list-item"
          :class="{'active':formDesignType===1}"
          @click="formTypeHandle(1)"
        >手机表单</span>

      </div>
      <div class="form-action-list">
        <span
          class="form-action-item"
          @click="resetHandle"
        >
          <a-icon type="sync" /><span>重置</span>
        </span>
        <span
          class="form-action-item"
          @click="previewHandle"
        >
          <a-icon
            type="eye"
            style="font-size: 14px;"
          /><span>预览</span>
        </span>
        <span
          class="form-action-item"
          @click="saveDesignHandle"
        >
          <a-icon
            type="save"
            style="font-size: 14px;"
          /><span>保存</span>
        </span>
        <span
          class="form-action-item"
          @click="delHandle"
          v-if="(formDesignType===0&&desginPcId.length) || (formDesignType===1&&desginMoveId.length)"
        >
          <a-icon
            type="delete"
            style="font-size: 14px;"
          /><span>删除</span>
        </span>
      </div>
    </div>

    <div :class="{'form-scroll-wrapper':formDesignType===0,'form-scroll-wrapper-move':formDesignType===1}">
      <a-form
        :layout="formLayout"
        :form="form"
        class="drag-wrap"
      >
        <WidgetDraggable
          ref="WidgetDraggable"
          :list="list"
          :formConfig="formConfig"
          :pageData="formData"
          :selectWg="selectWg"
          :form="form"
          @formUpdate="formUpdateHandle"
          @detailUpdate="detailUpdateHandle"
          @setPrevData="setPrevDataHandle"
        />
      </a-form>
    </div>
    <WidgetFormModal
      ref="WidgetFormModal"
      :formDataList="formDataList"
      :formConfig="formConfig"
      :list="list"
    />

    <Loading
      v-if="isLoading"
      isFullScreen
      text="加载中..."
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import WidgetDraggable from './widget-draggable'
import Utils from '../utils'
import WidgetFormModal from './widget-form-modal'
import { Loading } from '@/components'
import { updateFormDesignData, deleteFormDesignData, formDesignFindData } from '@/api/formDesign.js'

export default {
  name: 'WidgetForm',
  provide () {
    return {
      WidgetForm: this
    }
  },
  components: {
    WidgetDraggable,
    WidgetFormModal,
    Loading
  },
  inject: ['FormDesign'],
  props: {
    list: String,
    formConfig: Object,
    formData: Object,
    saveFormData: String,
    id: String
  },
  data () {
    return {
      formLayout: 'vertical',
      originData: {
        list: [],
        formList: [],
        config: {}
      },
      selectWg: {},
      formDataList: {},
      dataJsonPc: {},
      dataSonMove: {},
      desginPcId: '',
      desginMoveId: '',
      isLoading: false
    }
  },
  computed: {
    ...mapGetters([
      'formDesignType'
    ]),
    saveForm () {
      return this.saveFormData
    }
  },
  created () {
    this.form = this.$form.createForm(this)
    this.SET_FORM_DESIGN_TYPE(0)
    if (!this.id.length) return
    this._data.isLoading = true
    this.getDesignMoveList()
    this.getDesignPcList()
  },
  methods: {
    ...mapMutations(['SET_FORM_DESIGN_TYPE']),

    /**
     * @title 获取pc表单的设计文件
     */
    getDesignPcList () {
      formDesignFindData(this.id, 0).then(res => {
        if (!res.length) {
          this._data.isLoading = false
          return
        }
        if (res) {
          this._data.dataJsonPc = JSON.parse(res[0].desginJson)
          this._data.desginPcId = res[0].id
          this.FormDesign.setFormData(this._data.dataJsonPc)
          this.detailUpdateHandle(this._data.dataJsonPc.list[0])
          this._data.isLoading = false
        }
      })
    },
    /**
      * @title 获取手机表单的设计文件
      */
    getDesignMoveList () {
      formDesignFindData(this.id, 1).then(res => {
        if (!res.length) return
        if (res) {
          this._data.dataJsonMove = JSON.parse(res[0].desginJson)
          this._data.desginMoveId = res[0].id
        }
      })
    },

    /**
     * @title 详情数据更新
     */
    detailUpdateHandle (selectWg, activeTab) {
      this._data.selectWg = selectWg
      this.FormDesign.setDetailData(selectWg, activeTab)
    },

    /**
     * @title 将数据更新至外层
     */
    updateFormData (data) {
      this._data.formDataList = data
      this.FormDesign.setFormData(data)
    },

    /**
     * @title 存储上一状态数据
     */
    setPrevDataHandle (params) {
      const _originData = { ...this.formData }
      if (!params.type) {
        this._data.originData = params
      } else {
        if (params.type === 'grid' || params.type === 'table' || params.type === 'tab') {
          const dataIndex = _originData.list.findIndex(item => item.key === params.key)
          const targetData = _originData.list[dataIndex]
          targetData.children[params.index] = params.data
          this._data.originData = _originData
        }
      }
    },

    /**
     * @title 表单数据更新
     */
    formUpdateHandle (params) {
      const _pageData = Utils.deepClone(this.formData)
      if (params.type === 'default') {
        this.updateFormData(params.data)
        // this._data.pageData = params.data
      } else if (params.type === 'grid' || params.type === 'table' || params.type === 'tab') {
        // 判断是否需要回滚
        if (!params.rollback) {
          const dataIndex = _pageData.list.findIndex(item => item.key === params.key)
          const targetData = _pageData.list[dataIndex]
          targetData.children[params.index] = params.data
          // this._data.pageData = _pageData;
          this.updateFormData(_pageData)
        } else {
          const originData = Utils.deepClone(this._data.originData)
          const dataIndex = _pageData.list.findIndex(item => item.key === params.key)
          const targetData = _pageData.list[dataIndex]
          targetData.children[params.index] = params.data
          // this._data.pageData = _pageData;
          this.updateFormData(_pageData)
          setTimeout(() => {
            // this._data.pageData = originData;
            this.updateFormData(originData)
          }, 0)
        }
      }
    },

    //  预览
    previewHandle () {
      this.$refs.WidgetDraggable.saveHandle()
      this.$refs.WidgetFormModal.showModal()
    },

    // 重置
    resetHandle () {
      this.FormDesign.setFormData()
      this.detailUpdateHandle({})
    },

    // 保存
    saveDesignHandle () {
      this.$refs.WidgetDraggable.saveHandle()
      this._data.formDataList.formConfig = this.formConfig
      if (this._data.formDataList.list.length === 0) {
        return
      }
      const params = {
        desginJson: JSON.stringify(this._data.formDataList),
        desginType: this.formDesignType,
        formId: this.id
      }
      if (this.formDesignType === 0) {
        params.id = this._data.desginPcId
        updateFormDesignData(params).then(res => {
          this.$message.success('表单保存成功')
          this.getDesignPcList()
        })
      } else {
        params.id = this._data.desginMoveId
        updateFormDesignData(params).then(res => {
          this.$message.success('表单保存成功')
          this.getDesignMoveList()
        })
      }
    },

    // 删除
    delHandle () {
      switch (this.formDesignType) {
        case 0:
          if (!this._data.desginPcId) {
            return
          }
          deleteFormDesignData(this._data.desginPcId).then(res => {
            this._data.desginPcId = ''
            this.getDesignPcList()
          })
          break
        case 1:
          if (!this._data.desginMoveId) {
            return
          }
          deleteFormDesignData(this._data.desginMoveId).then(res => {
            this._data.desginMoveId = ''
            this.getDesignMoveList()
          })
          break
        default:
      }
    },

    // 表单类型切换
    formTypeHandle (val) {
      this.SET_FORM_DESIGN_TYPE(val)
      switch (val) {
        case 0:
          if (!this._data.desginPcId) {
            this.resetHandle()
          } else {
            this.FormDesign.setFormData(this._data.dataJsonPc)
            this.detailUpdateHandle(this._data.dataJsonPc.list[0])
          }
          break
        case 1:
          if (!this._data.desginMoveId) {
            this.resetHandle()
          } else {
            this.FormDesign.setFormData(this._data.dataJsonMove)
            this.detailUpdateHandle(this._data.dataJsonMove.list[0])
          }
          break
        default:
      }
    }
  }
}
</script>
