/** * @author Leslie * @date 2019-08-15 08:51 */

<template>
  <div class="wrapper">
    <div
      v-if="detailData === undefined || JSON.stringify(detailData) === '{}'"
      class="empty-wrapper"
    >
      <div class="empty-svg-wrapper">
        <img src="../../img/empty_icon.svg" />
      </div>
      <span class="empty-text">请选中主体区域内的表单<br />查看字段配置信息</span>
    </div>
    <div v-else>
      <a-form
        :layout="formLayout"
        :form="form"
      >
        <a-form-item
          :label="detailData.type === 'staticText' ? '文本内容' : '标题'"
          v-if="
            detailData.type !== 'button' &&
              detailData.type !== 'grid' &&
              detailData.type !== 'table' &&
              detailData.type !== 'divider'
          "
        >
          <a-input
            v-decorator="['label']"
            placeholder="请输入"
          />
        </a-form-item>

        <template
          v-if="
            detailData.type !== 'inputCode' &&
              detailData.type !== 'select' &&
              detailData.type !== 'staticText' &&
              detailData.type !== 'radio' &&
              detailData.type !== 'checkBox' &&
              detailData.type !== 'timePicker' &&
              detailData.type !== 'datePicker' &&
              detailData.type !== 'switch' &&
              detailData.type !== 'uploadFile' &&
              detailData.type !== 'uploadPicture' &&
              detailData.type !== 'tab' &&
              detailData.type !== 'grid' &&
              detailData.type !== 'table' &&
              detailData.type !== 'divider'
          ">
          <a-form-item label="默认值">
            <a-input
              v-decorator="['initialValue']"
              placeholder="请输入字段默认值"
            />
          </a-form-item>
        </template>

        <a-form-item
          label="宽度"
          v-if="
            detailData.type !== 'inputCode' &&
              detailData.type !== 'button' &&
              detailData.type !== 'tab' &&
              detailData.type !== 'grid' &&
              detailData.type !== 'table' &&
              detailData.type !== 'divider'
          "
        >
          <a-input-number
            v-decorator="['formWidth']"
            :min="0"
            :max="100"
            :formatter="value => `${value}%`"
            :parser="value => value.replace('%', '')"
          />
        </a-form-item>

        <a-form-item
          label="占位文本"
          v-if="
            detailData.type !== 'inputCode' &&
              detailData.type !== 'radio' &&
              detailData.type !== 'checkBox' &&
              detailData.type !== 'divider' &&
              detailData.type !== 'switch' &&
              detailData.type !== 'button' &&
              detailData.type !== 'staticText' &&
              detailData.type !== 'uploadFile' &&
              detailData.type !== 'uploadPicture' &&
              detailData.type !== 'datePicker' &&
              detailData.type !== 'tab' &&
              detailData.type !== 'grid' &&
              detailData.type !== 'table'
          "
        >
          <a-input
            v-decorator="['placeholder']"
            placeholder="请输入占位文本"
          />
        </a-form-item>

        <template v-if="detailData.type === 'select'">
          <a-form-item
            label="支持多选"
            class="custom-form-item-flex-row"
          >
            <a-switch
              v-decorator="['multiple', { valuePropName: 'checked' }]"
              checkedChildren="是"
              unCheckedChildren="否"
            />
          </a-form-item>

          <a-form-item
            label="支持搜索"
            class="custom-form-item-flex-row"
          >
            <a-switch
              v-decorator="['showSearch', { valuePropName: 'checked' }]"
              checkedChildren="是"
              unCheckedChildren="否"
            />
          </a-form-item>
        </template>

        <template
          v-if=" detailData.type === 'select' ||
            detailData.type === 'radio' ||
            detailData.type === 'checkBox' ||
            detailData.type === 'tab'
          ">
          <a-form-item
            label="单选按钮的样式类型"
            v-if="detailData.type === 'radio'"
          >
            <a-radio-group
              v-decorator="['buttonStyle']"
              button-style="solid"
            >
              <a-radio-button value="dot">dot</a-radio-button>
              <a-radio-button value="button">button</a-radio-button>
            </a-radio-group>
          </a-form-item>
          <a-form-item
            label="数据选项"
            class="form-item-no-border form-item-no-padding-bottom form-item-margin-bottom-4"
            v-if="detailData.type !== 'tab'"
          >
            <a-radio-group
              v-decorator="['dataType']"
              button-style="solid"
            >
              <a-radio-button
                value="static"
                v-if="detailData.type !== 'treeSelect' && detailData.type !== 'cascader'"
              >静态数据</a-radio-button>
              <a-radio-button value="remote">远端数据</a-radio-button>
              <a-radio-button value="dictionary">数据字典</a-radio-button>
            </a-radio-group>
          </a-form-item>
          <div v-show="detailData.form.dataType === 'static' || detailData.type === 'tab'">
            <a-form-item
              class="form-item-no-border form-item-no-padding-bottom form-item-margin-bottom-8"
              v-if="detailData.type === 'checkBox'"
            >
              <a-checkbox-group
                class="select-source-data-control"
                name="radioGroup"
                style="width: 100%;padding-top: 12px;"
                v-decorator="['defaultValue']"
              >
                <div
                  class="dynamic-form-item-content"
                  v-for="(k, index) in form.getFieldValue('keys')"
                  :key="index"
                >
                  <a-checkbox
                    class="dynamic-radio-item"
                    :value="k.value"
                  ></a-checkbox>
                  <div class="dynamic-input-item">
                    <a-form-item
                      class="form-item-no-border form-item-no-padding-bottom form-item-no-margin-bottom"
                      style="margin-right: 8px;"
                    >
                      <a-input
                        v-decorator="[
                          `options[${index}].label`,
                          {
                            validateTrigger: ['change', 'blur'],
                            rules: [
                              {
                                required: true,
                                whitespace: true,
                                message: '标签不能位空'
                              }
                            ]
                          }
                        ]"
                        placeholder="标签"
                        style="margin-right: 8px;"
                      />
                    </a-form-item>
                    <a-form-item class="form-item-no-border form-item-no-padding-bottom form-item-no-margin-bottom">
                      <a-input
                        v-decorator="[
                          `options[${index}].value`,
                          {
                            validateTrigger: ['change', 'blur'],
                            rules: [
                              {
                                required: true,
                                whitespace: true,
                                message: '值不能位空'
                              }
                            ]
                          }
                        ]"
                        placeholder="标签"
                        style="margin-right: 8px;"
                      />
                      <div
                        class="dynamic-action-item"
                        @click="() => remove(k, index)"
                      >
                        <a-icon type="minus" />
                      </div>
                    </a-form-item>
                  </div>
                </div>
              </a-checkbox-group>
            </a-form-item>
            <a-form-item
              class="form-item-no-border form-item-no-padding-bottom form-item-margin-bottom-8"
              v-if="detailData.type !== 'checkBox'"
            >
              <a-radio-group
                class="select-source-data-control"
                name="radioGroup"
                style="width: 100%;padding-top: 12px;"
                v-decorator="['defaultValue']"
              >
                <div
                  class="dynamic-form-item-content"
                  v-for="(k, index) in form.getFieldValue('keys')"
                  :key="index"
                >
                  <a-radio
                    class="dynamic-radio-item"
                    :value="k.value"
                  ></a-radio>
                  <div class="dynamic-input-item">
                    <a-form-item
                      class="form-item-no-border form-item-no-padding-bottom form-item-no-margin-bottom"
                      style="margin-right: 8px;"
                    >
                      <a-input
                        v-decorator="[
                          `options[${index}].label`,
                          {
                            validateTrigger: ['change', 'blur'],
                            rules: [
                              {
                                required: true,
                                whitespace: true,
                                message: '标签不能位空'
                              }
                            ]
                          }
                        ]"
                        placeholder="标签"
                        style="margin-right: 8px;"
                      />
                    </a-form-item>
                    <a-form-item class="form-item-no-border form-item-no-padding-bottom form-item-no-margin-bottom">
                      <a-input
                        v-decorator="[
                          `options[${index}].value`,
                          {
                            validateTrigger: ['change', 'blur'],
                            rules: [
                              {
                                required: true,
                                whitespace: true,
                                message: '值不能位空'
                              }
                            ]
                          }
                        ]"
                        placeholder="标签"
                        style="margin-right: 8px;"
                      />
                      <div
                        class="dynamic-action-item"
                        @click="() => remove(k, index)"
                      >
                        <a-icon type="minus" />
                      </div>
                    </a-form-item>
                  </div>
                </div>
              </a-radio-group>
            </a-form-item>
            <a-form-item>
              <a-button
                type="dashed"
                style="width: 100%"
                @click="add"
              >
                <a-icon type="plus" /> 添加选项
              </a-button>
            </a-form-item>
          </div>
          <div v-show="detailData.form.dataType === 'remote'">
            <a-form-item label="远端数据接口">
              <a-input
                v-decorator="['apiKey2']"
                placeholder="请输入对应的数据接口"
              />
            </a-form-item>
          </div>
          <div v-show="detailData.form.dataType === 'dictionary'">
            <a-form-item label="数据字典">
              <a-select v-decorator="['dictionary']">
                <a-select-option
                  v-for="item in dicData"
                  :value="item.id"
                  :key="item.id"
                >
                  {{ item.dictName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </div>
        </template>

        <a-form-item
          label="数据绑定Key"
          v-if="detailData.type !== 'divider'"
        >
          <a-col :span="19">
            <a-input
              v-decorator="['apiKey']"
              placeholder="请输入对应的数据库字段"
            />
          </a-col>
          <a-col :span="5">
            <a-button
              type="primary"
              @click="getDataSheet"
            >查询</a-button>
          </a-col>

        </a-form-item>
        <template v-if="detailData.type === 'textArea'">
          <a-form-item label="最小行">
            <a-input-number
              v-decorator="['minRows']"
              :min="0"
              :max="100"
              :formatter="value => `${value}`"
            />
          </a-form-item>
          <a-form-item label="最大行">
            <a-input-number
              v-decorator="['maxRows']"
              :min="0"
              :max="100"
              :formatter="value => `${value}`"
            />
          </a-form-item>
        </template>
        <template v-if="detailData.type === 'inputNumber'">
          <a-form-item label="最小值">
            <a-input-number
              v-decorator="['min']"
              :min="0"
              :formatter="value => `${value}`"
            />
          </a-form-item>
          <a-form-item label="最大值">
            <a-input-number
              v-decorator="['max']"
              :min="0"
              :max="1000000"
              :formatter="value => `${value}`"
            />
          </a-form-item>
          <a-form-item label="步长">
            <a-input-number
              v-decorator="['step']"
              :min="0"
              :formatter="value => `${value}`"
            />
          </a-form-item>
          <a-form-item label="值的精度">
            <a-input-number
              v-decorator="['precision']"
              :min="0"
              :max="8"
              :formatter="value => `${value}`"
            />
          </a-form-item>
          <a-form-item label="输入框高度">
            <a-input-number
              v-decorator="['widgetSize']"
              :min="0"
              :max="100"
              :formatter="value => `${value}`"
            />
          </a-form-item>
        </template>
        <template v-if="detailData.type === 'uploadFile' || detailData.type === 'uploadPicture'">
          <!-- <a-form-item label="上传地址">
            <a-input
              v-decorator="['uploadUrl']"
              placeholder="请输入需要上传的地址"
            />
          </a-form-item> -->
          <a-form-item label="支持的类型">
            <a-row>
              <a-checkbox-group v-decorator="['checkedList']">
                <a-col
                  :span="12"
                  v-for="item in detailData.fileType"
                  :key="item.id"
                  style="margin:15px 0;"
                >
                  <a-checkbox :value="item.value">
                    {{ item.label }}
                  </a-checkbox>
                </a-col>
              </a-checkbox-group>
            </a-row>
          </a-form-item>
        </template>
        <template v-if="detailData.type === 'datePicker' || detailData.type === 'timePicker'">
          <a-form-item
            label="日期类型"
            v-if="detailData.type === 'datePicker'"
          >
            <a-select v-decorator="['pickerType']">
              <a-select-option
                v-for="time in detailData.dateType"
                :value="time.label"
                :key="time.id"
              >
                {{ time.value }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="格式">
            <a-select v-decorator="['format']">
              <a-select-option
                v-for="time in detailData.dateData"
                :value="time.label"
                :key="time.id"
              >
                {{ time.value }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </template>
        <template v-if="detailData.type === 'button'">
          <a-form-item label="类型">
            <a-select v-decorator="['buttonType']">
              <a-select-option
                v-for="time in detailData.buttonData"
                :value="time.label"
                :key="time.id"
              >
                {{ time.value }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </template>
        <template v-if="detailData.type === 'input'">
          <a-form-item
            label="校验方式"
          >
            <a-select v-decorator="['validate']">
              <a-select-option
                v-for="time in detailData.validateRule"
                :value="time.label"
                :key="time.label"
              >
                {{ time.value }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="指定为项目名称">
            <a-checkbox v-decorator="['isProjectName', { valuePropName: 'checked' }]">
              是
            </a-checkbox>
          </a-form-item>
        </template>
        <a-form-item
          label="操作属性"
          style="padding-bottom: 12px;"
          v-if="detailData.type === 'select' || detailData.type === 'input'"
        >
          <a-row>
            <a-col :span="8">
              <a-form-item class="custom-form-item-style">
                <a-checkbox v-decorator="['actionConfig.readOnly', { valuePropName: 'checked' }]">
                  只读
                </a-checkbox>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form-item>

        <a-form-item
          label="校验"
          v-if="detailData.isRequired"
        >
          <a-checkbox v-decorator="['isRequired', { valuePropName: 'checked' }]">
            必填
          </a-checkbox>
        </a-form-item>
        <template v-if="detailData.type === 'tab'">
          <a-form-item label="位置">
            <a-select v-decorator="['tabPosition']">
              <a-select-option
                v-for="item in detailData.positionData"
                :value="item.label"
                :key="item.value"
              >
                {{ item.value }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="风格">
            <a-select v-decorator="['type']">
              <a-select-option
                v-for="item in detailData.styleData"
                :value="item.label"
                :key="item.id"
              >
                {{ item.value }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </template>
        <template v-if="detailData.type === 'divider'">
          <a-form-item label="展示文本">
            <a-input
              v-decorator="['text']"
              placeholder="显示在分割线上的文字"
            />
          </a-form-item>
          <a-form-item label="文本方向">
            <a-radio-group
              v-decorator="['orientation']"
              :style="{ marginBottom: '8px' }"
              button-style="solid"
            >
              <a-radio-button value="left">
                左边
              </a-radio-button>
              <a-radio-button value="center">
                中间
              </a-radio-button>
              <a-radio-button value="right">
                右边
              </a-radio-button>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="线形">
            <a-radio-group
              v-decorator="['dashed']"
              :style="{ marginBottom: '8px' }"
              button-style="solid"
            >
              <a-radio-button value="true">
                虚线
              </a-radio-button>
              <a-radio-button value="false">
                实线
              </a-radio-button>
            </a-radio-group>
          </a-form-item>
        </template>
        <template v-if="detailData.type !== 'grid' && detailData.type !== 'table'">
          <a-form-item label="权限配置">
            <a-checkbox v-decorator="['isCanConfigAuth', { valuePropName: 'checked' }]">
              允许
            </a-checkbox>
          </a-form-item>
        </template>
        <template v-if="detailData.type === 'grid'">
          <a-form-item label="栅格间隔">
            <a-input-number
              v-decorator="['gutter']"
              :min="0"
              :max="24"
              :formatter="value => `${value}`"
            />
          </a-form-item>
          <a-form-item label="栅格配置">
            <a-radio-group
              v-decorator="['col']"
              :style="{ marginBottom: '8px' }"
              button-style="solid"
            >
              <a-radio-button value="24">
                一行
              </a-radio-button>
              <a-radio-button value="12">
                两列
              </a-radio-button>
              <a-radio-button value="8">
                三列
              </a-radio-button>
              <a-radio-button value="6">
                四列
              </a-radio-button>
            </a-radio-group>
          </a-form-item>
        </template>
        <template v-if="detailData.type === 'inputCode'">
          <a-form-item label="编码器代码">
            <a-select v-decorator="['encoderCode']">
              <a-select-option
                v-for="item in encodeList"
                :value="item.encoderCode"
                :key="item.encoderCode"
              >
                {{ item.encoderCode }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="按钮内容">
            <a-input
              v-decorator="['btnContent']"
              placeholder="请输入按钮内容"
            />
          </a-form-item>
        </template>
        <template v-if="detailData.type === 'table'">
          <a-form-item class="form-item-no-border form-item-no-padding-bottom form-item-margin-bottom-8">
            <div
              class="dynamic-form-item-content"
              v-for="(k, index) in form.getFieldValue('keys')"
              :key="index"
            >
              <div class="dynamic-input-item">
                <a-form-item class="form-item-no-border form-item-no-padding-bottom form-item-no-margin-bottom">
                  <a-input
                    v-decorator="[
                      `options[${index}].label`,
                      {
                        validateTrigger: ['change', 'blur'],
                        rules: [
                          {
                            required: true,
                            whitespace: true,
                            message: '值不能位空'
                          }
                        ]
                      }
                    ]"
                    placeholder="标签"
                    style="margin-right: 8px;"
                  />
                  <div
                    class="dynamic-action-item"
                    @click="() => remove(k, index)"
                  >
                    <a-icon type="minus" />
                  </div>
                </a-form-item>
              </div>
            </div>
          </a-form-item>
          <a-form-item>
            <a-button
              type="dashed"
              style="width: 100%"
              @click="add"
            >
              <a-icon type="plus" /> 添加选项
            </a-button>
          </a-form-item>
        </template>
      </a-form>
    </div>
    <DataSheetModal
      ref="DataSheetModal"
      @handleSelected="setApikeyValue"
    />
  </div>
</template>

<script>
import { getDicList } from '@/api/dic'
import { getEncodeLists } from '@/api/encode'
import DataSheetModal from './modules/DataSheetModal'
import Utils from '../../utils'

export default {
  name: 'Index',
  inject: ['FormDesign'],
  props: {
    detailData: Object
  },
  components: {
    DataSheetModal
  },
  data () {
    return {
      formLayout: 'vertical',
      dicData: [],
      encodeList: []
    }
  },
  created () {
    /**
     * @Title: 获取所有字典
     * @Author: DuXueSong
     * @Date: 2020/9/1
     */
    getDicList({ pageNumber: 1, pageSize: 999 }).then(res => {
      if (res && res.content) {
        this._data.dicData = res.content
      }
    })

    /**
     * @Title: 获取编码器数据列表
     * @Author: DuXueSong
     * @Date: 2020/9/17
     */
    getEncodeLists({ pageNumber: 1, pageSize: 999 }).then(res => {
      if (res && res.content) {
        this._data.encodeList = res.content
      }
    })

    this.form = this.$form.createForm(this, {
      onValuesChange: (props, value) => {
        this.updateData(value)
      }
    })
    this.form.getFieldDecorator('keys', { initialValue: [], preserve: true })
  },
  watch: {
    detailData: {
      handler (newVal, oldVal) {
        if (oldVal !== undefined) {
          if ((newVal.key && !oldVal.key) || newVal.key !== oldVal.key) {
            this.setFormData()
          }
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    /**
     * @title 初始化设置表单数据
     */
    setFormData () {
      if (!this.detailData || !this.detailData.form) return
      const { form } = this.detailData
      //  选项数据处理
      if (form.options && !form.options.isArray) {
        const result = Object.keys(form.options).map(item => form.options[item])
        form.options = result
      }
      setTimeout(() => {
        this.form.setFieldsValue({ ...form })
      })
      if (form.options && form.options.length) {
        this.form.setFieldsValue({
          keys: form.options
        })
      }
    },

    /**
     * @title 更新数据
     */
    updateData (value) {
      if (!this.detailData || !this.detailData.key) return
      const params = { ...value }
      if (params.options) {
        const options = this.form.getFieldValue('options')
        const _options = { ...options }
        Object.keys(params.options).forEach(key => {
          _options[key] = { ..._options[key], ...params.options[key] }
        })
        params.options = { ..._options }
        const result = Object.keys(_options).map(item => _options[item])
        this.form.setFieldsValue({
          keys: result
        })
      }
      this.FormDesign.updateWidgetConfig(this.detailData.key, params)
    },

    remove (k, i) {
      const { form } = this
      const keys = form.getFieldValue('keys')
      form.setFieldsValue({
        keys: keys.filter((key, index) => index !== i)
      })
      const options = this.form.getFieldValue('options')
      const _options = Utils.deepClone(options)
      if (_options && _options.length) {
        _options.splice(i, 1)
      }
      this.FormDesign.updateWidgetConfig(this.detailData.key, { options: _options })
      this.$nextTick(() => {
        this.setFormData()
      })
    },

    add () {
      const { form } = this
      const keys = form.getFieldValue('keys')
      const obj = {
        label: '新选项',
        value: ''
      }
      const nextKeys = keys.concat(obj)
      form.setFieldsValue({
        keys: nextKeys
      })
    },

    /**
     * @Title: 显示模态框
     * @Author: DuXueSong
     * @Date: 2020/9/22
     */
    getDataSheet () {
      this.$refs.DataSheetModal.showModal()
    },

    /**
     * @Title: 显示模态框
     * @Author: DuXueSong
     * @Date: 2020/9/22
     */
    setApikeyValue (data) {
      this.form.setFieldsValue({
        apiKey: data[0].keyStr
      })
    }
  }
}
</script>

<style scoped>
@import url('../../style/reset.css');
</style>

<style scoped lang="less">
.wrapper {
  width: 100%;
  height: 100%;
  padding: 16px;

  .empty-wrapper {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
    align-items: center;
    justify-content: center;

    .empty-svg-wrapper {
      width: 120px;
      height: 120px;

      & > img {
        width: 100%;
      }
    }

    .empty-text {
      text-align: center;
      font-size: 13px;
      color: #999;
    }
  }
}
</style>
