<template>
  <div class="login-wrap">
    <div class="login-container">
      <div class="login-title">Demo Project</div>
      <a-form :form="form">
        <a-form-item>
          <a-input
            v-decorator="[
          'userName',
          { rules: [{ required: true, message: 'Please input your username!' }] },
        ]"
            placeholder="Username"
            size="large"
          >
            <a-icon
              slot="prefix"
              type="user"
              style="color:rgba(0,0,0,.25)"
            />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-decorator="[
          'password',
          { rules: [{ required: true, message: 'Please input your Password!' }] },
        ]"
            type="password"
            placeholder="Password"
            size="large"
          >
            <a-icon
              slot="prefix"
              type="lock"
              style="color:rgba(0,0,0,.25)"
            />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button
            class="submit-btn"
            type="primary"
            html-type="submit"
            size="large"
            @click="handleSubmit"
          >
            Log in
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form: this.$form.createForm(this)
    };
  },
  // created () {
  //   this.form = this.$form.createForm(this);
  // },
  methods: {
    handleSubmit (e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          const { userName, password } = values
          if (userName === 'admin' && password === '123456') return this.$router.push({ name: 'index' })
          this.$message.error('账号或密码不正确，请重输')
          console.log('Received values of form: ', values);
        }
      });
    },
  },
};
</script>
<style>
html,
body,
#__nuxt,
#__layout,
#__layout > div {
  height: 100%;
}
.login-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("../../assets/login-bg.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.login-container {
  width: 400px;
  height: 350px;
  /* background: rgba(255, 255, 255, 0.5);
  border-radius: 3px; */
}
.login-title {
  font-size: 32px;
  text-align: center;
  margin-bottom: 30px;
}
.submit-btn {
  width: 100%;
  text-align: center;
}
</style>