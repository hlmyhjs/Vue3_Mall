<template>
  <nav-bar :class="{ 'border-1px': isShow }">
    <template #left>
      <div v-show="!isShow" class="goBack" @click="goBack">
        <i class="iconfont icon-arrow-left"></i>
      </div>
      <div v-show="isShow" class="common" :style="styleOpt" @click="goBack">
        <i class="iconfont icon-arrow-left"></i>
      </div>
    </template>
    <template #center>
      <div v-show="isShow" class="title-item" :style="styleOpt">
        <ul>
          <li
            v-for="(item, index) in titleInfos"
            :key="index"
            :class="{ active: index === currentIndex }"
            @click="itemClick(index)"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </template>
    <template #right>
      <div v-show="!isShow" class="goHome">
        <i class="iconfont icon-home goHome-i-size"></i>
      </div>
      <div v-show="isShow" class="common" :style="styleOpt">
        <i class="iconfont icon-home goHome-i-size"></i>
      </div>
    </template>
  </nav-bar>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from 'components/navbar/NavBar'

const emits = defineEmits(['itemClick'])
const router = useRouter()
const goBack = () => router.back()
const titleInfos = reactive(['商品评价', '商品详情'])
const currentIndex = ref(0)
const headerClick = ref(false) // 是否点击顶部选项滚动到对应模块
const itemClick = (index) => {
  currentIndex.value = index
  emits('itemClick', index)
}

const props = defineProps({
  position: {
    type: Number
  }
})

const opacity = ref(0)
const styleOpt = reactive({
  opacity: opacity,
  background: '#fff'
})
const isShow = ref(false)
watch(
  () => props.position,
  (scrollY) => {
    opacity.value = opacity.value > 1 ? 1 : scrollY / 500
    isShow.value = scrollY >= 80

    if (!headerClick.value) {
      // 如果不是通过点击顶部选项滚动到对应模块
      currentIndex.value = scrollY < 544 ? 0 : 1 // 就让currentIndex的值跟随scrollX的大小而变化
    }
  }
)

defineExpose({
  headerClick
})
</script>

<style lang="scss" scoped>
.nav-bar {
  background-color: rgba(255, 255, 255, 0);
}

.goBack,
.goHome {
  width: 34px;
  height: 34px;
  line-height: 34px;
  margin: 5px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.3);
  color: #fff;
  i {
    font-size: 28px;
  }
  .goHome-i-size {
    font-size: 25px;
  }
}
.common {
  width: 100%;
  height: 100%;
  color: #222;
  i {
    font-size: 28px;
  }
  .goHome-i-size {
    font-size: 25px;
  }
}

.title-item {
  width: 100%;
  ul {
    display: flex;
    justify-content: space-evenly;
    color: black;
    padding: 0 17px;
    li {
      font-size: 16px;
    }
  }
}

.active {
  position: relative;
  &:after {
    display: block;
    position: absolute;
    bottom: 0;
    width: 100%;
    border-bottom: 2px solid red;
    content: '';
  }
}
</style>
