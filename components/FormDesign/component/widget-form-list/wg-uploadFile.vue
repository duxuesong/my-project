/**
* @author Leslie
* @date 2019-08-13 12:00
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
            name="file"
            :accept="formData.checkedList.toString()"
            :beforeUpload="beforeUpload"
            :show-upload-list="false"
            :customRequest="() => {}"
          >
            <a-tooltip
              placement="topLeft"
              title="点击上传"
              v-if="formData.apiKey.length&&form.getFieldValue(`${formData.apiKey}`).length"
            >
              <img
                class="img-wrap"
                :src="form.getFieldValue(`${formData.apiKey}`)"
                alt=""
              >
            </a-tooltip>
            <a-button
              :size="formConfig.widgetSize"
              v-else
            >
              <a-icon type="upload" /> 点击上传
            </a-button>
          </a-upload>
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
            name="file"
            :accept="formData.checkedList.toString()"
            :beforeUpload="beforeUpload"
            :show-upload-list="false"
            :customRequest="() => {}"
          >
            <a-tooltip
              placement="topLeft"
              title="点击上传"
              v-if="formData.apiKey.length&&form.getFieldValue(`${formData.apiKey}`).length"
            >
              <img
                class="img-wrap"
                :src="form.getFieldValue(`${formData.apiKey}`)"
                alt=""
              >
            </a-tooltip>
            <a-button
              :size="formConfig.widgetSize"
              v-else
            >
              <a-icon type="upload" /> 点击上传
            </a-button>
          </a-upload>
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
  watch: {
    formData: {
      handler (newVal) {
        const { apiKey } = newVal
        if (apiKey.length) {
          this.form.getFieldDecorator([`${apiKey}`], {
            initialValue: [],
            preserve: true
          })
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
      const fileType = '.' + file.type.split('/')[1]
      const isAllowedType = checkedList.findIndex(item => item === fileType)
      const typeList = []
      checkedList.map(item => {
        typeList.push(item.split('.')[1])
      })
      if (isAllowedType === -1) {
        this.$message.error(`格式有误,请选择格式为${typeList.toString()}的图片或文件!`)
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
            let imgUrl
            const type = res.fileName.split('.')[1]
            const picture = type === 'png' || type === 'jpg' || type === 'jpeg'
            const pdf = type === 'pdf'
            const ppt = type === 'ppt'
            const xls = type === 'xls' || type === 'xlsx'
            const doc = type === 'doc' || type === 'docx'
            if (picture) {
              imgUrl = res.url
            } else if (pdf) {
              imgUrl = require('@/components/FormDesign/img/pdf.png')
            } else if (ppt) {
              imgUrl = require('@/components/FormDesign/img/ppt.png')
            } else if (xls) {
              imgUrl = require('@/components/FormDesign/img/xls.png')
            } else if (doc) {
              imgUrl = require('@/components/FormDesign/img/doc.png')
            }
            setTimeout(() => {
              this.form.setFieldsValue({
                [`${apiKey}`]: imgUrl
              })
            })
          }
        })
      }
    }
  }
}
</script>
<style scoped>
.img-wrap {
  width: 50px;
  height: 50px;
}
</style>
