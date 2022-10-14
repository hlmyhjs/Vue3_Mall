<template>
  <nav-bar class="border-1px">
    <template #center>
      <span>购物车</span>
    </template>
    <template #right>
      <span @click="changeStatus">{{ modelValue ? '完成' : '编辑' }}</span>
    </template>
  </nav-bar>
</template>

<script setup>
import NavBar from 'components/navbar/NavBar'

const props = defineProps({
  modelValue: {
    type: Boolean
  }
})

const emits = defineEmits(['update:modelValue'])
const changeStatus = () => {
  emits('update:modelValue', !props.modelValue)
}
</script>

<style lang="scss" scoped>
span {
  font-size: 16px;
}
</style>
