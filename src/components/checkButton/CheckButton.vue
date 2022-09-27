<template>
  <div>
    <div class="icon-selector" :class="{ 'selector-active': checked }" @click="selectItem">
      <img src="~/assets/img/cart/tick.svg" alt="" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

/**
 * 更多关于v-model的用法:
 * https://v3.cn.vuejs.org/guide/migration/v-model.html#%E6%A6%82%E8%A7%88
 * https://v3.cn.vuejs.org/guide/component-custom-events.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E4%BA%8B%E4%BB%B6
 */
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: true
  }
})

// const emits = defineEmits(["checkBtnClick"]);
const emits = defineEmits(['click'])

const selectItem = () => {
  // emits("checkBtnClick");
  emits('click')
}

const checked = ref(props.modelValue)
watch(
  () => props.modelValue,
  (newValue) => {
    checked.value = newValue
  }
)
</script>

<style lang="scss" scoped>
.icon-selector {
  position: relative;
  margin: 0;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #ccc;
  cursor: pointer;
}

.selector-active {
  background-color: $primary;
  border-color: $primary;
}
</style>
