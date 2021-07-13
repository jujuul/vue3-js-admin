<template>
  <div class="account">
    <div class="account__form">
      <a-form
        name="custom-validation"
        ref="ruleForm"
        :model="accountForm"
        :rules="rulesForm"
        :layout="formState.layout"
        @finish="handleFinish"
      >
        <label>用户名</label>
        <a-form-item name="username">
          <a-input
            v-model="accountForm.username"
            type="text"
            autocomplete="off"
          />
        </a-form-item>
        <label>密码</label>
        <a-form-item name="password">
          <a-input
            v-model="accountForm.password"
            type="password"
            autocomplete="off"
          />
        </a-form-item>
        <label>确认密码</label>
        <a-form-item name="validPassword">
          <a-input
            v-model="accountForm.validPassword"
            type="password"
            autocomplete="off"
          />
        </a-form-item>
        <label>验证码</label>
        <a-form-item name="code">
          <a-row gutter="15">
            <a-col :span="14">
              <a-input
                v-model="accountForm.code"
                type="text"
                autocomplate="off"
              ></a-input>
            </a-col>
            <a-col :span="10">
              <a-button type="primary" block>获取验证码</a-button>
            </a-col>
          </a-row>
        </a-form-item>
        <a-form-item>
          <Captcha />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" block>注册</a-button>
        </a-form-item>
      </a-form>
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
    const formState = reactive({
      layout: 'horizontal',
    })
    const formConfig = reactive({
      accountForm: {
        username: '',
        password: '',
        validPassword: '',
        code: '',
      },
      rulesForm: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        validPassword: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
      },
    })
    const data = toRefs(formConfig)
    console.log(data)
    const handleFinish = () => {
      alert(1)
    }
    return {
      handleFinish,
      ...data,
      formState,
    }
  },
}
</script>

<style lang="scss">
@import './style.scss';
</style>
