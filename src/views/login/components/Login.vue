<template>
  <div class="login">
    <name-login v-show="isNameLogin" ref="nameLoginRef" :form-data="formData"></name-login>
    <sms-login v-show="!isNameLogin" ref="smsLoginRef" :form-data="formData"></sms-login>
    <button class="common-btn" @click="login(isNameLogin)">登录</button>
    <div class="login-bottom">
      <div v-show="isNameLogin">
        <span @click="loginCode">验证码登录</span> | <span @click="goResetPass">忘记密码</span> |
        <span @click="goRegister">快速注册</span>
      </div>
      <span v-show="!isNameLogin" @click="loginCode">密码登录</span>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { Toast } from 'vant'
import NameLogin from './NameLogin'
import SmsLogin from './SmsLogin'
import { encrypt } from '@/utils/encrypt'
import { loginApi, authCodeLogin } from '@/api/user'

const formData = reactive({
  type: '3',
  username: '',
  verifyCode: '',
  password: ''
})

const route = useRoute()
const router = useRouter()
const store = useStore()
const smsLoginRef = ref(null)
const nameLoginRef = ref(null)
const isNameLogin = ref(true)
const loginCode = () => (isNameLogin.value = !isNameLogin.value)
const login = async (loginType) => {
  if (loginType) {
    // 账号登录
    if (nameLoginRef.value.validate()) {
      const encryptText = encrypt(formData.password)
      const submitForm = Object.assign({}, formData)
      submitForm.password = encryptText
      const res = await loginApi(submitForm)
      if (res?.success) {
        Toast(res.msg)
        store.commit('user/setToken', res.data)
        router.push('/account')
      }
    }
  } else {
    // 验证码登录
    if (smsLoginRef.value.validate()) {
      const verifyCode = encrypt(formData.verifyCode)
      const submitForm = Object.assign({}, formData)
      submitForm.verifyCode = verifyCode
      const res = await authCodeLogin(submitForm)
      if (res?.success) {
        Toast(res.msg)
        store.commit('user/setToken', res.data)
        router.push('/account')
      }
    }
  }
}

if (route.params?.username) formData.username = route.params.username

const goResetPass = () => router.push('/resetPassword')
const goRegister = () => router.push('/register')
</script>

<style lang="scss" scoped>
.login {
  margin-top: 10%;
  text-align: center;
  position: relative;
  .login-bottom {
    margin-top: 15px;
    font-size: 16px;
    span {
      padding: 5px;
    }
  }
}
</style>
