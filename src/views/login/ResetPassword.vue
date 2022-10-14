<template>
  <div class="login-bg">
    <NavBar title="重置密码"></NavBar>
    <div class="login">
      <sms-login ref="CodeRef" :form-data="formData"></sms-login>
      <Input v-model.trim="formData.newPassword" placeholder="输入新密码" type="password" />
      <Input v-model.trim="formData.reNewPassword" placeholder="确认新密码" type="password" />
      <button class="common-btn" @click="resetPwd">确认重置</button>
      <div class="login-bottom">
        <span @click="goLogin">立即登录</span> |
        <span @click="goRegister">快速注册</span>
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
import { removeAllItem } from '@/utils/storage'
import { encrypt } from '@/utils/encrypt'
import { changePassword } from '@/api/user'

const formData = reactive({
  type: '2',
  username: '',
  newPassword: '',
  reNewPassword: '',
  verifyCode: ''
})

const CodeRef = ref(null)
const resetPwd = async () => {
  const { newPassword, reNewPassword } = formData
  const verifyRes = CodeRef.value.validate() && confirmPassword(newPassword, reNewPassword)
  if (verifyRes) {
    const newPassword = encrypt(formData.newPassword)
    const reNewPassword = encrypt(formData.reNewPassword)
    const verifyCode = encrypt(formData.verifyCode)
    const temp = Object.assign({}, formData)
    temp.newPassword = newPassword
    temp.reNewPassword = reNewPassword
    temp.verifyCode = verifyCode
    const res = await changePassword(temp)
    if (res?.success) {
      Toast(res.msg)
      removeAllItem()
      router.push({
        name: 'Login',
        params: {
          username: res?.data?.username
        }
      })
    }
  }
}

const router = useRouter()
const goLogin = () => router.push('/login')
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
