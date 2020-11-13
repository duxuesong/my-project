<template>
  <div class="header-wrap">
    <h1 class="prject-title">Demo-Project</h1>
    <a-avatar
      class="project-avatar"
      size="large"
      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
      @click="logOut"
    />
    <!-- <a-button
      @click="logOut"
      type="primary"
    >退出</a-button> -->
  </div>
</template>
<script>
export default {
  name: 'index',
  data () {
    return {}
  },
  methods: {
    logOut () {
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
<style scoped>
.header-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  padding: 0 20px;
  background-color: #1890ff;
}
.prject-title {
  color: #fff;
}
.project-avatar {
  border-radius: 50%;
  border: 2px solid #fff;
  cursor: pointer;
}
</style>