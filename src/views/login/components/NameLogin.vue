<template>
  <div class="login-name">
    <Input v-model.trim="formData.username" placeholder="QQ邮箱"></Input>
    <Input v-model.trim="formData.password" placeholder="输入密码" type="password"></Input>
  </div>
</template>

<script setup>
import { validateLogin } from '@/utils/validate'
import Input from 'components/Input/Input'

const props = defineProps({
  formData: {
    type: Object
  }
})

const validate = () => validateLogin(props.formData)

defineExpose({
  validate
})
</script>

<style lang="scss" scoped></style>
