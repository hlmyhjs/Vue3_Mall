<template>
  <div class="login-sms">
    <Input v-model.trim="formData.username" placeholder="QQ邮箱"></Input>
    <compound-input v-model="formData.verifyCode" placeholder="输入验证码">
      <button
        class="m-btn"
        :class="_countDown ? '_countDown' : ''"
        :disabled="verifyContent.disabled"
        @click="obtainVerifyCode"
      >
        {{ verifyContent.text }}
      </button>
    </compound-input>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { Toast } from 'vant'
import CompoundInput from 'components/compoundInput/CompoundInput'
import Input from 'components/Input/Input'
import { valideCode, valideMail } from '@/utils/validate'
import { sendCode } from '@/api/user'

// 参考: https://www.jianshu.com/p/56e28a089790
// 获取验证码按钮
const verifyContent = reactive({
  disabled: false,
  text: '获取验证码'
})

const props = defineProps({
  formData: {
    type: Object
  }
})

// 发送验证码
const obtainVerifyCode = async () => {
  const { username, type } = props.formData
  if (valideMail(username)) {
    const res = await sendCode({ username, type }) // 发送验证码
    if (res.success) Toast(res.msg)
    countDown()
  }
}

const _countDown = ref(false)
// 倒计时方法
const countDown = () => {
  let time = 60
  const timer = setInterval(() => {
    if (time == 0) {
      clearInterval(timer)
      verifyContent.disabled = false
      _countDown.value = false
      verifyContent.text = '获取验证码'
    } else {
      verifyContent.disabled = true
      _countDown.value = true
      verifyContent.text = `重新获取${time}s`
      time--
    }
  }, 1000)
}

const validate = () => valideMail(props.formData.username) && valideCode(props.formData.verifyCode)

defineExpose({
  validate
})
</script>

<style lang="scss" scoped>
.m-select-wrap {
  width: 30%;
}
.username,
.password {
  display: flex;
  width: 90%;
  margin: 0 auto;
  input {
    width: 70%;
  }
  select {
    width: 30%;
    height: 42px;
    border: 1px solid #dcdfe6;
    color: #757575;
    outline: none;
    font-size: 16px;
  }
  button {
    width: 30%;
    height: 42px;
  }
}

// 验证码
.m-btn {
  margin: 0;
  padding: 0;
  height: 42px;
  line-height: 42px;
  border: none;

  width: 30%;
  background: $primary;
  color: #fff;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
._countDown {
  background-color: #f7f5fa !important;
  color: #909399 !important;
  border: 0.5px solid #c0c4cc !important;
  border-left: none !important;
}
</style>
