<template>
  <div class="login-bg">
    <NavBar title="用户注册"></NavBar>
    <div class="login">
      <sms-login ref="CodeRef" :form-data="formData"></sms-login>
      <Input v-model.trim="formData.password" placeholder="输入密码" type="password" />
      <Input v-model.trim="formData.rePassword" placeholder="确认密码" type="password" />
      <button class="common-btn" @click="_register">注册</button>
      <div class="login-bottom">
        <span @click="goLogin">立即登录</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Toast } from 'vant'
import NavBar from './components/NavBar'
import SmsLogin from './components/SmsLogin'
import Input from 'components/Input/Input'
import { confirmPassword } from '@/utils/validate'
import { encrypt } from '@/utils/encrypt'
import { register } from '@/api/user'

const router = useRouter()
const formData = reactive({
  type: '1',
  username: '',
  verifyCode: '',
  password: '',
  rePassword: ''
})

const CodeRef = ref(null)
const _register = async () => {
  const { password, rePassword } = formData
  const verifyRes = CodeRef.value.validate() && confirmPassword(password, rePassword)
  if (verifyRes) {
    const password = encrypt(formData.password)
    const rePassword = encrypt(formData.rePassword)
    const verifyCode = encrypt(formData.verifyCode)
    const temp = Object.assign({}, formData)
    temp.password = password
    temp.rePassword = rePassword
    temp.verifyCode = verifyCode
    const res = await register(temp)
    if (res.success) {
      Toast(res.msg)
      router.push({
        name: 'Login',
        params: {
          username: res?.data?.username
        }
      })
    }
  }
}

const goLogin = () => router.push('/login')
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
