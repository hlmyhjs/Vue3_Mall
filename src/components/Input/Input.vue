<template>
  <input
    class="Input"
    :placeholder="placeholder"
    :name="name"
    :disabled="disabled"
    :value="modelValue"
    :type="type"
    @input="handleInput"
  />
</template>

<script setup>
defineProps({
  placeholder: {
    type: String
  },
  name: {
    type: String
  },
  disabled: {
    type: Boolean
  },
  modelValue: {
    type: String
  },
  type: {
    type: String,
    default: 'text'
  }
})

const emits = defineEmits(['update:modelValue'])
const handleInput = (e) => {
  emits('update:modelValue', e.target.value)
}
</script>

<style lang="scss" scoped>
.Input {
  width: 90%;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: 14px;
  height: 42px;
  line-height: 42px;
  outline: none;
  padding: 0 15px;
  margin-bottom: 20px;
  &:focus {
    outline: none;
    border-color: #c0c4cc;
  }
  &:hover {
    border-color: #c0c4cc;
  }
  &.is-disabled {
    border-color: #e4e7ed;
    color: #c0c4cc;
    cursor: not-allowed;
  }
}
</style>
