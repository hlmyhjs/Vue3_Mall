<template>
  <nav-bar class="border-1px">
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

defineProps({
  title: String
})

const router = useRouter()
const goBack = () => router.back()
</script>

<style lang="scss" scoped>
.nav-left {
  display: flex;
  justify-content: center;
  i {
    font-size: 30px;
  }
}
.nav-center {
  span {
    font-size: 16px;
  }
}
</style>
