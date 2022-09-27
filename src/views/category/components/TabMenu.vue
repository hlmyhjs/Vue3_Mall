<template>
  <scroll
    ref="scrollRef"
    class="tab-menu"
    :bounce="{ top: false, bottom: false }"
    :listen-scroll="true"
    @scroll="listenScroll"
  >
    <div class="menu-list">
      <ul>
        <li
          v-for="(item, index) in data"
          :key="item.id"
          class="menu-list-item"
          :class="{ active: currentIndex === index }"
          @click="menuClick(index, item.id)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </scroll>
</template>

<script setup>
import { ref } from 'vue'
import Scroll from 'components/scroll/Scroll'

defineProps({
  data: {
    type: Array
  }
})

const emits = defineEmits(['tabMenuClick'])

const currentIndex = ref(0)
const menuClick = (index, id) => {
  currentIndex.value = index
  emits('tabMenuClick', id)
}

const scrollY = ref(0)
const listenScroll = (position) => {
  scrollY.value = Math.abs(position.y)
  // console.log(scrollY.value);
}
</script>

<style lang="scss" scoped>
.tab-menu {
  background-color: #f7f8fa;
  height: 100%;
  width: 100px;
  box-sizing: border-box;
  // top: 0;
  // bottom: 49px;
}

.menu-list-item {
  position: relative;
  height: 45px;
  line-height: 45px;
  text-align: center;
  font-size: 14px;
}

.menu-list-item.active {
  color: $primary;
  // font-weight: 700;
  background-color: #fff;
  // &:after {
  &::before {
    content: '';
    display: block;
    width: 2px;
    height: 50%;
    background: #ff5934;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
