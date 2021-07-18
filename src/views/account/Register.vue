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
              <a-button
                type="primary"
                @click="getCode"
                :disabled="button_disabled"
                :loading="button_loading"
                block
                >{{ button_text }}</a-button
              >
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
} from '@/utils/validate';
import { message } from 'ant-design-vue';
import { reactive, toRefs } from '@vue/reactivity';
import Captcha from '@/components/Captcha';

export default {
  name: 'Login',
  components: { Captcha },
  setup() {
    const validUsername = async (rule, value) => {
      // 校验为空时
      if (!value) {
        return Promise.reject('请输入用户名');
      } else if (!checkPhone(value)) {
        return Promise.reject('请输入正确的手机号');
      } else {
        return Promise.resolve();
      }
    };
    const validPassword = async (rule, value) => {
      const password = formConfig.account_form.password;
      // 密码为空时
      if (!value) {
        return Promise.reject('请输入密码');
      } else if (!checkPassword(value)) {
        return Promise.reject('请输入符合格式的密码(数字或字母，6-20位)');
      } else if (password && value) {
        if (password !== value) {
          return Promise.reject('两次密码不一致');
        }
      } else {
        return Promise.resolve();
      }
    };
    const validRePassword = async (rule, value) => {
      const password = formConfig.account_form.password;
      // 密码为空时
      if (!value) {
        return Promise.reject('请输入密码');
      } else if (password && value) {
        if (!checkRePassword(password, value)) {
          return Promise.reject('两次密码不一致');
        }
      } else {
        return Promise.resolve();
      }
    };
    const validCode = async (rule, value) => {
      if (!value) {
        return Promise.reject('请输入验证码');
      } else if (!checkCode(value)) {
        return Promise.reject('请输入6位的验证码');
      } else {
        return Promise.resolve();
      }
    };
    const formState = reactive({
      layout: 'horizontal',
    });
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
    });
    const dataItem = reactive({
      button_text: '获取',
      button_loading: false,
      button_disabled: false,
      sec: 3,
      timer: null,
    });
    const form = toRefs(formConfig);
    const data = toRefs(dataItem);
    const handleFinish = (value) => {
      console.log(value);
    };
    const getCode = () => {
      // 如果用户名不存在
      if (!formConfig.account_form.username) {
        message.error('请输入用户名');
        return;
      }
      dataItem.timer = setInterval(() => {
        const s = dataItem.sec--;
        dataItem.button_text = `${s}秒`;
        dataItem.button_disabled = true;
        if (s <= 0) {
          clearInterval(dataItem.timer);
          dataItem.button_text = '重新获取';
          dataItem.button_disabled = false;
          dataItem.sec = 3;
        }
      }, 1000);
    };
    return {
      handleFinish,
      ...form,
      ...data,
      formState,
      getCode,
    };
  },
};
</script>

<style lang="scss">
@import './style.scss';
</style>
