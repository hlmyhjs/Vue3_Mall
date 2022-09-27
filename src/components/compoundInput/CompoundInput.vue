<template>
  <div class="compound-input">
    <div class="Input-group Input-group--append">
      <div class="Input__wrapper">
        <input
          class="Input__inner"
          type="text"
          autocomplete="off"
          autofocus="autofocus"
          :placeholder="placeholder"
          :value="modelValue"
          @input="input"
        />
      </div>
      <slot> </slot>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['update:modelValue'])

defineProps({
  modelValue: [String, Number],
  placeholder: {
    type: String
  }
})

const input = (e) => {
  emit('update:modelValue', e.target.value)
}
</script>

<style lang="scss" scoped>
.compound-input {
  margin-bottom: 20px;
}

.Input-group {
  display: inline-flex;
  width: 90%;
  align-items: stretch;

  height: 42px;
  position: relative;
  font-size: 14px;
  line-height: 42px;
  box-sizing: border-box;

  .Input__wrapper {
    width: 70%;
    display: inline-flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    padding: 1px 11px;
    background-color: #ffffff;
    border-radius: 4px;
    border: 0.5px solid #dcdfe6;
    &:hover {
      border: 0.5px solid #c0c4cc;
    }

    input {
      overflow: visible;
      font-family: inherit;
      font-size: 100%;
      line-height: 1.15;
      margin: 0;
      touch-action: manipulation;
    }

    .Input__inner {
      width: 100%;
      flex-grow: 1;
      color: #606266;
      font-size: inherit;
      height: calc(42px - 2px);
      line-height: calc(42px - 2px);
      padding: 0;
      outline: none;
      border: none;
      background: none;
      box-sizing: border-box;
    }
  }
}

.Input-group--append > .Input__wrapper {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
