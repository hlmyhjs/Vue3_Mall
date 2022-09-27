<template>
  <div class="m-select-wrap">
    <input
      v-model="selectName"
      :class="['u-select-input f16', color === 'blue' ? '' : 'white-color']"
      type="text"
      readonly
      @click="openSelect"
      @blur="onBlur"
    />
    <div @click="openSelect">
      <i :class="['m-icon-arrow-down', { rotate: rotate }]"></i>
    </div>
    <div
      :class="['m-options-panel f16', showOptions ? 'show' : 'hidden']"
      :style="`height: ${selectData.length * 44}px;`"
    >
      <p
        v-for="(item, index) in selectData"
        :key="index"
        class="u-option"
        :class="{ selected: index === currentIndex }"
        @mousedown="getValue(item.name, item.value, index)"
      >
        {{ item.name }}
      </p>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  selectData: {
    type: Array,
    default: () => {
      return []
    }
  },
  selValue: {
    type: null,
    default: undefined
  },
  color: {
    type: String,
    default: () => {
      return 'blue'
    }
  }
})

const selectValue = ref(props.selValue)
const selectName = computed(() => {
  for (const item of props.selectData) {
    if (item.value === selectValue.value) {
      return item.name
    }
  }
  return ''
})

const showOptions = ref(false)
const rotate = ref(false)
const emits = defineEmits(['getValue'])
const openSelect = () => {
  showOptions.value = !showOptions.value
  rotate.value = !rotate.value
}

const currentIndex = ref(0)
const getValue = (name, value, index) => {
  currentIndex.value = index
  selectValue.value = value
  emits('getValue', name, value, index)
}
const onBlur = () => {
  showOptions.value = false
  rotate.value = false
}
</script>

<style lang="scss" scoped>
.m-select-wrap {
  width: 100%;
  height: 42px;
  line-height: 42px;
  position: relative;
  border-radius: 2px;
  border: 0.5px solid #dcdfe6;

  padding: 0 10px;
  background: #fff;
  box-sizing: border-box;

  font-size: 16px;
  .u-select-input {
    width: 100%;
    height: 100%;
    background: #3a79ee;
    color: #ffffff;
    height: 40px;
    line-height: 40px;
    padding: 0;
    vertical-align: text-bottom;
    cursor: pointer;
    border: none; // 取消边框线
    outline: none; // 取消激活线
  }
  .white-color {
    background: #ffffff;
    color: #353535;
  }
  .m-icon-arrow-down {
    // 下三角样式
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 8px solid #333;

    position: absolute;
    top: 17px;
    right: 12px;
    transition: transform 0.3s ease-in-out;
  }
  .rotate {
    position: absolute;
    top: 17px;
    right: 12px;
    transition: transform 0.3s ease-in-out;
    transform: rotate(180deg);
  }
  .m-options-panel {
    position: absolute;
    background: #ffffff;
    width: 100%;
    top: 46px;
    left: 0;
    color: #706f94;
    z-index: 2;
    border: 1px solid #dddddd;
    border-radius: 4px;
    padding-bottom: 6px;

    padding: 0 3px;
    box-sizing: border-box;
    .u-option {
      margin: auto;
      width: 100%;
      height: 40px;
      line-height: 40px;
      margin-top: 4px;
      margin-bottom: 4px;
      cursor: pointer;
      color: #353535;
      border-radius: 2px;
    }
  }
  .show {
    display: block;
  }
  .hidden {
    display: none;
  }

  .selected {
    background: #e2445c;
    color: #fff !important;
  }
}
</style>
