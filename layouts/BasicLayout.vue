<template>
  <div class="basic-layout">
    <div class="header">
      <Header />
    </div>
    <div class="container-wrap">
      <div class="sider">
        <Sider />
      </div>
      <div class="content">
        <nuxt />
      </div>
    </div>
  </div>
</template>
<script>
// import "ant-design-vue/dist/antd-with-locales.js";
// import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
// import moment from 'moment';
// import 'moment/locale/zh-cn';
import Header from '@/components/top/header'
import Sider from '@/components/top/sider'
export default {
  name: 'BasicLayout',
  comonents: { Header, Sider },
  data () {
    return {
    }
  }
}
</script>
<style>
html,
body,
#__nuxt,
#__layout,
#__layout > div {
  height: 100%;
}
ol,
ul,
dl,
p {
  padding: 0;
  margin: 0;
  list-style: none;
}
</style>
<style scoped>
.header {
  width: 100%;
  height: 70px;
  /* border-bottom: 1px solid #ccc; */
}
.container-wrap {
  width: 100%;
  height: calc(100% - 70px);
  display: flex;
}
.sider {
  width: 270px;
  height: 100%;
  /* border-right: 1px solid #ccc; */
}
.content {
  margin: 25px;
}
</style>