/**
 * @Title:数据库表
 * @Author: DuXueSong
 * @Date: 2020/9/25
 */
<template>
  <AntModal
    ref="modalElement"
    :closable="true"
    modalTitle="数据库表"
    class="data-sheet"
    :modalWidth="850"
    @closeModal="closeModal"
  >
    <template slot="content">
      <div class="modal-content">
        <div class="search-wrap">
          <a-form-item
            label="表名"
            :label-col="{ span: 2 }"
            :wrapper-col="{ span: 22 }"
          >
            <a-select
              v-model="value"
              placeholder="请选择表名"
              style="width:100%;"
              option-label-prop="label"
              @change="changeHandle"
            >
              <a-select-option
                :value="item.id"
                :label="item.tableName"
                v-for="(item,index) in selectOptions"
                :key="index"
              >
                {{ item.tableName }} {{ item.tableDescribe }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </div>
        <a-table
          bordered
          :loading="tableLoading"
          :rowKey="record=>record.keyStr"
          :pagination="false"
          class="table-wrap"
          :rowSelection="{onChange:onSelected, type:'radio'}"
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
import AntModal from '@/components/AntModal'
import { getSubstanceList, getSubstanceTableData } from '@/api/substance'
export default {
  name: 'DataSheetModal',
  components: {
    AntModal
  },
  data () {
    return {
      selectedRows: [],
      tableData: [],
      columns: [
        {
          title: '字段名',
          dataIndex: 'columnName'
        },
        {
          title: '字段key值',
          dataIndex: 'keyStr'
        },
        {
          title: '字段备注',
          dataIndex: 'columnRemark'
        }
      ],
      value: '',
      selectOptions: [],
      tableLoading: false
    }
  },
  created () {
    this._data.tableLoading = true
    getSubstanceList({ pageNumber: 1, pageSize: 999 }).then(res => {
      if (res && res.content) {
        this._data.selectOptions = res.content
        this._data.value = res.content[0].id
        this.changeHandle(res.content[0].id)
      }
    })
  },
  methods: {
    /**
     * @Title: 显示模态框
     * @Author: DuXueSong
     * @Date: 2020/9/25
     */
    showModal () {
      this.$refs.modalElement.showModal()
    },

    /**
     * @Title: 关闭模态框
     * @Author: DuXueSong
     * @Date: 2020/9/25
     */
    closeModal () {
      this.$refs.modalElement.closeModal()
      this.$emit('modalClose')
    },

    /**
     * @Title: 下拉框变化
     * @Author: DuXueSong
     * @Date: 2020/9/25
     */
    changeHandle (val) {
      this._data.tableLoading = true
      getSubstanceTableData(val).then(res => {
        if (res) {
          this._data.tableData = res
          this._data.tableLoading = false
        }
      }).catch((err) => {
        this._data.tableLoading = false
        console.log(err)
      })
    },

    /**
     * @Title: 保存
     * @Author: DuXueSong
     * @Date: 2020/9/25
     */
    saveHandle () {
      const { selectedRows } = this._data
      if (selectedRows.length) {
        this.$emit('handleSelected', selectedRows)
        this.closeModal()
      } else {
        this.$message.warning('请勾选需要的表字段')
      }
    },

    /**
     * @Title: 选中
     * @Author: DuXueSong
     * @Date: 2020/9/25
     */
    onSelected (selectedRowKeys, selectRows) {
      this._data.selectedRows = selectRows
      this.$emit('handleSelected', selectRows)
      this.closeModal()
    }
  }
}
</script>

<style scoped>
.modal-content {
  margin: 30px;
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
.search-wrap {
  width: 100%;
  margin: 0 auto;
}
.data-sheet >>> .ant-modal-footer {
  display: none;
}
</style>
