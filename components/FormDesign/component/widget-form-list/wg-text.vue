/**
* @author Leslie
* @date 2019-08-13 17:33
*/

<template>
  <div
    class="widget-item-list-wrapper"
    v-if="!formData.hidden"
  >
    <div :style="data.style">{{ formData.label }}</div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  props: {
    data: Object
  },
  computed: {
    formData () {
      return this.data.form
    }
  }
}
</script>
