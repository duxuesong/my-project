/**
 * @Title:地块信息表
 * @Author: DuXueSong
 * @Date: 2020/9/22
 */
<template>
  <AntModal
    ref="modalElement"
    :closable="true"
    modalTitle="地块信息查询"
    :modalWidth="850"
    @closeModal="closeModal"
  >
    <template slot="content">
      <div class="modal-content">
        <a-table
          bordered
          :rowKey="record=>record.dkbm"
          :pagination="false"
          class="table-wrap"
          :rowSelection="{onChange:onSelected}"
          :columns="columns"
          :data-source="tableData"
        />
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
            @click="saveHandle"
          >确定</a-button>
        </span>
      </div>
    </template>
  </AntModal>
</template>

<script>
import { AntModal } from '@/components'
export default {
  name: 'Index',
  components: {
    AntModal
  },
  props: {
    tableData: Array,
    columns: Array
  },
  data () {
    return {
      selectedRows: []
    }
  },
  methods: {
    /**
     * @Title: 显示模态框
     * @Author: DuXueSong
     * @Date: 2020/9/22
     */
    showModal () {
      this.$refs.modalElement.showModal()
    },

    /**
     * @Title: 关闭模态框
     * @Author: DuXueSong
     * @Date: 2020/9/22
     */
    closeModal () {
      this.$refs.modalElement.closeModal()
      this.$emit('modalClose')
    },

    /**
     * @Title: 保存
     * @Author: DuXueSong
     * @Date: 2020/9/22
     */
    saveHandle () {
      const { selectedRows } = this._data
      if (selectedRows.length) {
        this.$emit('handleSelected', selectedRows)
        this.closeModal()
      } else {
        this.$message.warning('请勾选需要的地块信息')
      }
    },
    onSelected (selectedRowKeys, selectRows) {
      this._data.selectedRows = selectRows
    }
  }
}
</script>

<style scoped>
.modal-content {
  margin: 30px;
  display: flex;
  min-height: 180px;
  justify-content: space-between;
}
.custom-ant-form-style {
  width: 100%;
}
.modal-content .custom-ant-form-style >>> .ant-form-item-label {
  margin-bottom: 0;
  margin-right: 10px;
  line-height: 32px;
}
</style>
