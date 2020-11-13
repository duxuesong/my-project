/**
* @author Leslie
* @date 2019-08-13 12:53
*/

<template>
  <div
    class="widget-item-list-wrapper"
    :class="formStyle"
    :style="{width: formData.formWidth + '%'}"
    v-if="!formData.hidden"
  >
    <div
      v-if="formConfig.formLayout !== 'top'"
      class="form-layout-flex"
    >
      <div
        class="form-label"
        :style="{width: formConfig.labelCol + 'px'}"
        v-if="container !== 'table'"
      >
        <span>{{ formData.label }}</span>
      </div>
      <div class="form-control">
        <a-form-item>
          <a-upload
            listType="picture-card"
            :accept="formData.checkedList.toString()"
            :beforeUpload="beforeUpload"
            :customRequest="() => {}"
            :fileList="fileList"
            :remove="handleRemove"
            @preview="handlePreviewFile"
          >
            <div v-if="fileList.length < 3">
              <a-icon type="plus" />
              <div class="ant-upload-text">点击上传</div>
            </div>
          </a-upload>
          <a-modal
            :visible="previewVisible"
            :footer="null"
            @cancel="handleCancel"
          >
            <img
              alt="example"
              style="width: 100%"
              :src="previewImage"
            />
          </a-modal>
        </a-form-item>
      </div>
    </div>
    <template v-else>
      <div
        class="form-label"
        v-if="container !== 'table'"
      >
        <span>{{ formData.label }}</span>
      </div>
      <div class="form-control">
        <a-form-item>
          <a-upload
            listType="picture-card"
            :accept="formData.checkedList.toString()"
            :beforeUpload="beforeUpload"
            :customRequest="() => {}"
            :fileList="fileList"
            :remove="handleRemove"
            @preview="handlePreviewFile"
          >
            <div v-if="fileList.length < 3">
              <a-icon type="plus" />
              <div class="ant-upload-text">点击上传</div>
            </div>
          </a-upload>
          <a-modal
            :visible="previewVisible"
            :footer="null"
            @cancel="handleCancel"
          >
            <img
              alt="example"
              style="width: 100%"
              :src="previewImage"
            />
          </a-modal>
        </a-form-item>
      </div>
    </template>
  </div>
</template>

<script>
import { uploadFile } from '@/api/common'
export default {
  name: 'Index',
  props: {
    data: Object,
    formConfig: Object,
    container: String,
    form: Object
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
      return this.data.form
    }
  },
  data () {
    return {
      fileList: [],
      previewVisible: false,
      previewImage: ''
    }
  },
  watch: {
    formData: {
      handler (newVal) {
        const { apiKey } = newVal
        if (apiKey.length) {
          this.form.getFieldDecorator([`${apiKey}`], {
            initialValue: [],
            preserve: true
          })
          if (this.form.getFieldValue(`${apiKey}`).length) {
            this._data.fileList = this.form.getFieldValue(`${apiKey}`)
          }
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    /**
     * @Title: 上传图片
     * @Author: DuXueSong
     * @Date:  2020/9/25
     */
    beforeUpload (file) {
      const { apiKey, checkedList } = this.formData
      const { fileList } = this._data
      const fileType = '.' + file.type.split('/')[1]
      const isAllowedType = checkedList.findIndex(item => item === fileType)
      const typeList = []

      checkedList.map(item => {
        typeList.push(item.split('.')[1])
      })
      console.log(typeList, checkedList, 'typeList')
      if (isAllowedType === -1) {
        this.$message.error(`格式有误,请选择格式为${typeList.toString()}的图片!`)
        return
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('文件大小不能超过2MB!')
        return
      }
      if (!apiKey.length) return this.$message.warning('请绑定key值')
      if (isLt2M && isAllowedType !== -1 && apiKey.length) {
        const formData = new FormData()
        formData.append('file', file)
        uploadFile(formData).then(res => {
          if (res) {
            fileList.push({
              uid: res.id,
              name: res.fileName,
              url: res.url
            })
            setTimeout(() => {
              this.form.setFieldsValue({
                [`${apiKey}`]: fileList
              })
            })
          }
        })
      }
    },

    /**
     * @Title: 删除图片
     * @Author: DuXueSong
     * @Date:  2020/9/27
     */
    handleRemove (file) {
      const { apiKey } = this.formData
      const { fileList } = this._data
      const index = fileList.findIndex(item => item.url === file.url)
      if (index !== -1) {
        fileList.splice(index, 1)
        setTimeout(() => {
          this.form.setFieldsValue({
            [`${apiKey}`]: fileList
          })
        })
      }
    },

    /**
     * @Title: 图片预览
     * @Author: DuXueSong
     * @Date:  2020/9/27
     */
    handlePreviewFile (file) {
      this._data.previewImage = file.url
      this._data.previewVisible = true
    },

    /**
     * @Title: 关闭预览
     * @Author: DuXueSong
     * @Date:  2020/9/27
     */
    handleCancel () {
      this._data.previewVisible = false
    }
  }
}
</script>

<style scoped>
.form-control >>> .anticon.anticon-plus {
  font-size: 18px;
}

.form-control >>> .ant-upload-text {
  font-size: 12px;
  margin-top: 6px;
}
</style>
