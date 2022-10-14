<template>
  <nav-bar>
    <template #left>
      <div class="nav-left" @click="goBack">
        <i class="iconfont icon-arrow-left"></i>
      </div>
    </template>
    <template #center>
      <span>{{ title }}</span>
    </template>
  </nav-bar>
</template>

<script setup>
import { useRouter } from 'vue-router'
import NavBar from 'components/navbar/NavBar'

const router = useRouter()
const goBack = () => router.back()

defineProps({
  title: {
    type: undefined // 不校验
  }
})
</script>

<style lang="scss" scoped>
.nav-bar {
  background-color: rgb(255, 255, 255);
  color: #222;
  .nav-center {
    span {
      font-size: 16px;
    }
  }
}
.nav-left {
  display: flex;
  justify-content: center;
  i {
    font-size: 30px;
  }
}
</style>
