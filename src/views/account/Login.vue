<template>
  <div class="account">
    <div class="account__form">
      <a-form name="custom-validation" ref="formRef">
        <a-form-item>
          <label>用户名</label>
          <a-input type="text" autocomplete="off" />
        </a-form-item>
        <a-form-item>
          <label>密码</label>
          <a-input type="password" autocomplete="off" />
        </a-form-item>
        <a-form-item>
          <Captcha />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" block>登录</a-button>
        </a-form-item>
      </a-form>
      <div class="text-align fs-12 color-white">
        <a class="color-white" href="">忘记密码</a> |
        <router-link class="color-white" to="/register">注册</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import Captcha from '@/components/Captcha'
export default {
  name: 'Login',
  components: { Captcha },
  setup() {
    const formConfig = reactive({
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    })
    const data = toRefs(formConfig)
    return {
      formConfig,
      ...data,
    }
  },
}
</script>

<style lang="scss">
@import './style.scss';
</style>
