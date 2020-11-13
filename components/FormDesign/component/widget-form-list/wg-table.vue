/** * @author Leslie * @date 2019-08-15 08:59 */

<template>
  <div
    class="widget-item-list-wrapper"
    :class="formStyle"
  >
    <div
      v-if="formConfig.formLayout !== 'top'"
      class="form-layout-flex"
    >
      <div
        class="form-label"
        :style="{ width: formConfig.labelCol + 'px' }"
      >
        <span>{{ data.label }}</span>
      </div>
      <div
        class="form-control"
        v-if="type !== 'create'"
      >
        <div
          class="form-table-row"
          :class="{ border: type === 'create' }"
          v-for="(item, index) in option"
          :key="index"
        >
          <div
            class="form-table-title"
            :class="{ border: type === 'create' }"
          >{{ item.label }}</div>
          <div class="form-table-content">
            <div
              class="table-content"
              v-for="(item1, index1) in tableData"
              :key="index1"
            >
              <WidgetDraggable
                inline
                formSource="table"
                :list="list"
                :formConfig="formConfig"
                :pageData="data.children[index]"
                :selectWg="selectWg"
                :showEmpty="false"
                @formUpdate="formUpdateHandle($event, index)"
                @detailUpdate="detailUpdateHandle($event, index)"
                @setPrevData="setPrevDataHandle($event, index)"
              />
              <div
                v-if="index === option.length - 1"
                class="btn-wrap"
              >
                <a-tag
                  color="blue"
                  class="tag"
                  @click="addTableRow"
                >新增</a-tag>
                <a-tag
                  color="blue"
                  class="tag"
                  v-if="tableData.length > 1"
                  @click="deleteTableRow(index1)"
                >删除</a-tag>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="form-table-content"
        v-if="type === 'create'"
      >
        <a-form-item>
          <a-table
            :columns="columns"
            :data-source="tableData"
            :customRow="rowClick"
            :pagination="false"
            bordered
          >
            <template
              slot="serialNumber"
              slot-scope="text, record, index"
            >
              <div class="editable-row-operations">
                <span v-if="index !== currIndex || index === 0">
                  {{ `${index + 1}` }}
                </span>
                <span v-if="index === currIndex && index !== 0">
                  <a-icon
                    @click="deleteTableRow(index)"
                    type="minus-circle"
                    theme="filled"
                    class="icon"
                  />
                </span>
              </div>
            </template>
            <template
              v-for="col in colList"
              :slot="col"
              slot-scope="text, record"
            >
              <div :key="col">
                <a-textarea
                  v-if="getFormType(col) === 'textArea'"
                  :value="text"
                  @change="e => handleChange(e.target.value, record.key, col)"
                />
                <a-select
                  :default-value="text"
                  v-else-if="getFormType(col) === 'select'"
                  @change="handleChange($event, record.key, col)"
                >
                  <a-select-option
                    v-for="(item, index) in selectOptions"
                    :key="index"
                    :value="item.value"
                  >{{
                    item.label
                  }}</a-select-option>
                </a-select>
                <a-input
                  v-else
                  style="margin: -5px 0"
                  :value="text"
                  @change="e => handleChange(e.target.value, record.key, col)"
                />
              </div>
            </template>
          </a-table>
        </a-form-item>
        <a-button
          color="blue"
          type="primary"
          style="margin-top:3px;"
          @click="() => addTableRow()"
        >新增</a-button>
      </div>
    </div>
    <template v-else>
      <div class="form-label">
        <span>{{ data.label }}</span>
      </div>
      <div
        class="
          form-control"
        v-if="type !== 'create'"
      >
        <div
          class="form-table-row"
          :class="{ border: type === 'create' }"
          v-for="(item, index) in option"
          :key="index"
        >
          <div
            class="form-table-title"
            :class="{ border: type === 'create' }"
          >
            {{ item.label }}
          </div>
          <div
            class="table-content"
            v-for="(item1, index1) in tableData"
            :key="index1"
          >
            <WidgetDraggable
              inline
              formSource="table"
              :list="list"
              :formConfig="formConfig"
              :pageData="data.children[index]"
              :selectWg="selectWg"
              :showEmpty="false"
              @formUpdate="formUpdateHandle($event, index)"
              @detailUpdate="detailUpdateHandle($event, index)"
              @setPrevData="setPrevDataHandle($event, index)"
            />
            <div
              v-if="index === option.length - 1"
              class="btn-wrap"
            >
              <a-tag
                color="blue"
                class="tag"
                @click="addTableRow"
              >新增</a-tag>
              <a-tag
                color="blue"
                class="tag"
                v-if="tableData.length > 1"
                @click="deleteTableRow(index1)"
              >删除</a-tag>
            </div>
          </div>
        </div>
      </div>
      <div
        class="form-table-content"
        v-if="type === 'create'"
      >
        <a-form-item>
          <a-table
            :columns="columns"
            :data-source="tableData"
            :customRow="rowClick"
            :pagination="false"
            bordered
          >
            <template
              slot="serialNumber"
              slot-scope="text, record, index"
            >
              <div class="editable-row-operations">
                <span v-if="index !== currIndex || index === 0">
                  {{ `${index + 1}` }}
                </span>
                <span v-if="index === currIndex && index !== 0">
                  <a-icon
                    @click="deleteTableRow(index)"
                    type="minus-circle"
                    theme="filled"
                    class="icon"
                  />
                </span>
              </div>
            </template>
            <template
              v-for="col in colList"
              :slot="col"
              slot-scope="text, record"
            >
              <div :key="col">
                <a-textarea
                  v-if="getFormType(col) === 'textArea'"
                  :value="text"
                  @change="e => handleChange(e.target.value, record.key, col)"
                />
                <a-select
                  :default-value="text"
                  v-else-if="getFormType(col) === 'select'"
                  @change="handleChange($event, record.key, col)"
                >
                  <a-select-option
                    v-for="(item, index) in selectOptions"
                    :key="index"
                    :value="item.value"
                  >{{
                    item.label
                  }}</a-select-option>
                </a-select>
                <a-input
                  v-else
                  style="margin: -5px 0"
                  :value="text"
                  @change="e => handleChange(e.target.value, record.key, col)"
                />
              </div>
            </template>
          </a-table>
        </a-form-item>
        <a-button
          color="blue"
          type="primary"
          style="margin-top:3px;"
          @click="() => addTableRow()"
        >新增</a-button>
      </div>
    </template>
  </div>
</template>

<script>
import { getDictItem } from '@/api/dic'
export default {
  name: 'Index',
  props: {
    data: Object,
    formConfig: Object,
    list: String,
    selectWg: Object,
    type: String,
    form: Object
  },
  components: {
    WidgetDraggable: () => import('../widget-draggable')
  },
  data () {
    return {
      tableData: [],
      resultObject: {},
      colList: [],
      columns: [
        {
          title: '序号',
          dataIndex: 'serialNumber',
          align: 'center',
          width: 80,
          scopedSlots: { customRender: 'serialNumber' }
        }
      ],
      typeList: [],
      selectOptions: [],
      currIndex: -1
    }
  },
  computed: {
    formStyle () {
      return {
        'left-layout': this.formConfig.formLayout === 'left',
        'right-layout': this.formConfig.formLayout === 'right',
        'top-layout': this.formConfig.formLayout === 'top'
      }
    },
    formData () {
      this.form.getFieldDecorator([`${this.data.form.apiKey}`], {
        initialValue: [],
        preserve: true
      })
      return this.data
    },
    option () {
      const { options } = this.formData.form
      const arr = []
      if (this.type === 'create') {
        for (const key in options) {
          arr.push(options[key])
        }
        arr.push({ label: '操作' })
        return arr
      } else {
        return options
      }
    }
  },
  watch: {
    formData: {
      handler (newVal) {
        const { apiKey } = this.formData.form
        const { type } = this
        this._data.tableData = []
        this._data.colList = []
        this._data.columns = [
          {
            title: '序号',
            dataIndex: 'serialNumber',
            align: 'center',
            width: 80,
            scopedSlots: { customRender: 'serialNumber' }
          }
        ]
        this._data.typeList = []
        const arr = []
        let isEmpty = false
        let index = 0
        newVal.children.map(item => {
          item.list.forEach(l => {
            if (type && type === 'create' && !l.form.apiKey) {
              isEmpty = true
              return
            }
            const obj = {
              title: this.option[index].label,
              key: `${l.form.apiKey}`,
              align: 'center',
              width: 200,
              dataIndex: `${l.form.apiKey}`,
              scopedSlots: { customRender: `${l.form.apiKey}` }
            }
            this._data.columns.push(obj)
            this._data.colList.push(l.form.apiKey)
            arr.push({ [`${l.form.apiKey}`]: '' })
            this._data.typeList.push({ type: l.type, apiKey: l.form.apiKey, options: l.type === 'select' ? l : [] })
            index++
          })
        })
        if (isEmpty) return this.$message.warning('请绑定key值')
        this._data.resultObject = arr.reduce(function (result, currentObject) {
          for (var key in currentObject) {
            if (currentObject.hasOwnProperty(key)) {
              result[key] = currentObject[key]
            }
          }
          return result
        }, {})
        this._data.tableData.push({
          ...this._data.resultObject,
          key: `${Date.now()}_${Math.ceil(Math.random() * 1000000)}`
        })
        setTimeout(() => {
          if (apiKey.length && this.form.getFieldValue(`${apiKey}`).length) {
            this._data.tableData = this.form.getFieldValue(`${apiKey}`)
          }
        }, 100)
      },
      deep: true,
      immediate: true
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
    },

    /**
     * @Title: 新增一行
     * @Author: DuXueSong
     * @Date: 2020/9/22
     */
    addTableRow () {
      const { resultObject } = this._data
      this._data.tableData.push({ ...resultObject, key: `${Date.now()}_${Math.ceil(Math.random() * 1000000)}` })
      const { apiKey } = this.formData.form
      const { tableData } = this._data
      this.form.setFieldsValue({
        [`${apiKey}`]: tableData
      })
    },

    /**
     * @Title: 删除一行
     * @Author: DuXueSong
     * @Date: 2020/9/22
     */
    deleteTableRow (index) {
      this._data.tableData.splice(index, 1)
      const { apiKey } = this.formData.form
      const { tableData } = this._data
      this.form.setFieldsValue({
        [`${apiKey}`]: tableData
      })
    },

    /**
     * @Title: value值变动的时候
     * @Author: DuXueSong
     * @Date: 2020/9/22
     */
    handleChange (value, key, column) {
      const newData = [...this._data.tableData]
      const { apiKey } = this.formData.form
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target[column] = value
        this.form.setFieldsValue({
          [`${apiKey}`]: newData
        })
        this._data.tableData = newData
      }
    },

    /**
     * @Title: 获取要渲染的表单类型
     * @Author: DuXueSong
     * @Date: 2020/9/23
     */
    getFormType (data) {
      const { typeList } = this._data
      const list = typeList.filter(item => item.apiKey === data)[0]
      if (list.type === 'select') {
        if (list.options.form.dictionary !== '' && list.options.form.dataType === 'dictionary') {
          const data = []
          getDictItem(list.options.form.dictionary).then(res => {
            if (!Array.isArray(res)) return
            if (!res.length) return
            res.map(item => {
              const obj = {
                label: item.itemText,
                value: item.id
              }
              data.push(obj)
            })
            this._data.selectOptions = data
          })
        } else {
          this._data.selectOptions = list.options.form.options
        }
      }
      return list.type
    },

    /**
     * @Title: 表格行事件
     * @Author: DuXueSong
     * @Date: 2020/9/23
     */
    rowClick (record, index) {
      return {
        on: {
          mouseenter: () => {
            this._data.currIndex = index
          },
          mouseleave: () => {
            this._data.currIndex = -1
          }
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.widget-item-list-wrapper /deep/ .ant-form-item {
  margin-bottom: 0;
  padding: 8px;
}
.form-control {
  display: flex;
  flex: 1;
  flex-direction: row;
  .form-table-row:last-child {
    border-bottom: 1px dashed #999;
  }
  .form-table-row {
    display: flex;
    flex-direction: column;
    flex: 1;
    border: 1px dashed #999;
    // border-right: none;

    .form-table-title {
      height: 38px;
      line-height: 38px;
      background-color: #f5f7f9;
      text-align: center;
      border-bottom: 1px dashed #999;
    }
  }
  .form-table-content {
    padding: 5px;
  }
  .table-content {
    border-bottom: 1px dashed #999;
  }
  .table-content:last-child {
    border-bottom: none;
  }
  .btn-wrap {
    text-align: center;
    padding: 13px 0;
    .tag {
      cursor: pointer;
    }
  }
}
.icon {
  color: red;
  font-size: 23px;
  cursor: pointer;
}
</style>
