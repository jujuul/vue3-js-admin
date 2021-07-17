<template>
  <div class="account">
    <div class="account__form">
      <a-form
        name="custom-validation"
        ref="ruleForm"
        :model="account_form"
        :rules="rules_form"
        :layout="formState.layout"
        @finish="handleFinish"
      >
        <label>用户名</label>
        <a-form-item name="username">
          <a-input
            v-model:value="account_form.username"
            type="text"
            autocomplete="off"
          />
        </a-form-item>
        <label>密码</label>
        <a-form-item name="password">
          <a-input-password
            v-model:value="account_form.password"
            type="password"
            autocomplete="off"
          />
        </a-form-item>
        <label>确认密码</label>
        <a-form-item name="validPassword">
          <a-input-password
            v-model:value="account_form.validPassword"
            type="password"
            autocomplete="off"
          />
        </a-form-item>
        <label>验证码</label>
        <a-form-item name="code">
          <a-row gutter="15">
            <a-col :span="14">
              <a-input
                v-model:value="account_form.code"
                type="text"
                maxlength="6"
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
          <a-button
            type="primary"
            @click="handleFinish"
            html-type="submit"
            block
            >注册
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import {
  checkPhone,
  checkPassword,
  checkRePassword,
  checkCode,
} from '@/utils/validate'
import { reactive, toRefs } from '@vue/reactivity'
import Captcha from '@/components/Captcha'

export default {
  name: 'Login',
  components: { Captcha },
  setup() {
    const validUsername = async (rule, value) => {
      // 校验为空时
      if (!value) {
        return Promise.reject('请输入用户名')
      } else if (!checkPhone(value)) {
        return Promise.reject('请输入正确的手机号')
      } else {
        return Promise.resolve()
      }
    }
    const validPassword = async (rule, value) => {
      const password = formConfig.account_form.password
      // 密码为空时
      if (!value) {
        return Promise.reject('请输入密码')
      } else if (!checkPassword(value)) {
        return Promise.reject('请输入符合格式的密码(数字或字母，6-20位)')
      } else if (password && value) {
        if (password !== value) {
          return Promise.reject('两次密码不一致')
        }
      } else {
        return Promise.resolve()
      }
    }
    const validRePassword = async (rule, value) => {
      const password = formConfig.account_form.password
      // 密码为空时
      if (!value) {
        return Promise.reject('请输入密码')
      } else if (password && value) {
        if (!checkRePassword(password, value)) {
          return Promise.reject('两次密码不一致')
        }
      } else {
        return Promise.resolve()
      }
    }
    const validCode = async (rule, value) => {
      if (!value) {
        return Promise.reject('请输入验证码')
      } else if (!checkCode(value)) {
        return Promise.reject('请输入6位的验证码')
      } else {
        return Promise.resolve()
      }
    }
    const formState = reactive({
      layout: 'horizontal',
    })
    const formConfig = reactive({
      account_form: {
        username: '',
        password: '',
        validPassword: '',
        code: '',
      },
      rules_form: {
        username: [
          { required: true, validator: validUsername, trigger: 'blur' },
        ],
        password: [
          { required: true, validator: validPassword, trigger: 'blur' },
        ],
        validPassword: [
          { required: true, validator: validRePassword, trigger: 'blur' },
        ],
        code: [{ required: true, validator: validCode, trigger: 'blur' }],
      },
    })
    const data = toRefs(formConfig)
    console.log(data)
    const handleFinish = (value) => {
      console.log(value)
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
