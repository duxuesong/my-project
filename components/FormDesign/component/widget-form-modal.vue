<template>
  <AntModal
    ref="modalElement"
    :closable="true"
    modalTitle="表单预览"
    :modalWidth="850"
    @closeModal="closeModal"
  >
    <template slot="content">
      <div
        class="modal-content"
        :class="{'modal-content-move':formDesignType===1}"
        ref="addDepartmentModal"
      >
        <a-form
          :layout="formLayout"
          :form="form"
        >
          <WidgetFormCreate
            :formData="formData"
            :formConfig="formConfig"
            :list="list"
            :form="form"
            :class="{'modal-content-form-move':formDesignType===1}"
          />
        </a-form>
      </div>
    </template>
    <template slot="footer-action">
      <div class="footer-action-wrapper">
        <span class="footer-action-main">
          <a-button
            key="back"
            @click="closeModal"
          >取消</a-button>
          <a-button
            key="submit"
            type="primary"
            @click="closeModal"
          >确定</a-button>
        </span>
      </div>
    </template>
  </AntModal>
</template>

<script>
import { mapGetters } from 'vuex'
import { AntModal } from '@/components'
import WidgetFormCreate from './widget-form-create'
export default {
  name: 'WidgetFormModal',
  components: {
    AntModal,
    WidgetFormCreate
  },
  props: {
    formDataList: Object,
    formConfig: Object,
    list: String
  },
  computed: {
    ...mapGetters([
      'formDesignType'
    ]),
    formData () {
      let data = []
      if (this.formDataList) {
        data = this.formDataList.list
      }
      return data
    }
  },
  data () {
    return {
      formLayout: 'vertical',
      selectModelType: [],
      modalContent: () => { }
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  mounted () {
    this.modalContent = () => this.$refs.ModalContent
  },
  methods: {
    /**
     * @title 显示模态框
     * */
    showModal () {
      this.$refs.modalElement.showModal()
    },

    /**
     * @title 关闭模态框
     * */
    closeModal () {
      this.$refs.modalElement.closeModal()
      this.$emit('modalClose')
    },
    beforeDestroy () {
      // 模态框完全关闭后 , 将data重置为初始状态
      Object.assign(this.$data, this.$options.data())
    }
  }
}
</script>

<style scoped>
.modal-content {
  max-height: 700px;
  overflow-y: auto;
  padding: 24px;
}
.modal-content-move {
  height: 700px;
  background-image: url('../img/move.png');
  background-repeat: no-repeat;
  background-position: center 10%;
  background-size: 540px;
  padding-top: 75px;
  padding: 24px;
}
.modal-content-form-move {
  margin: 0 auto;
  width: 320px;
  padding: 20px;
  height: 525px;
  margin-top: 55px;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
