<template>
  <div>
    <Divider
      v-if="!formData.text.length"
      :dashed="formData.dashed==='false'?false:true"
      :orientation="formData.orientation"
    ></Divider>
    <Divider
      v-else
      :dashed="formData.dashed==='false'?false:true"
      :orientation="formData.orientation"
    >{{ formData.text }}</Divider>
  </div>
</template>
<script>
import { Divider } from 'ant-design-vue'
export default {
  name: 'WgDivier',
  props: {
    data: Object,
    formConfig: Object,
    container: String
  },
  components: {
    Divider
  },
  computed: {
    formData () {
      return this.data.form
    }
  },
  data () {
    return {

    }
  }
}
</script>
<style scoped></style>
