<template>
  <nav-bar>
    <template #left>
      <div class="nav-left" @click="goBack">
        <i class="iconfont icon-arrow-left"></i>
      </div>
    </template>
    <template #center>
      <span>我的订单</span>
    </template>
  </nav-bar>
</template>

<script setup>
import { useRouter } from 'vue-router'
import NavBar from 'components/navbar/NavBar'

const router = useRouter()
const goBack = () => router.back()
</script>

<style lang="scss" scoped>
.nav-bar {
  background-color: rgb(255, 255, 255);
  color: #222;
  &::after {
    position: absolute;
    box-sizing: border-box;
    content: ' ';
    pointer-events: none;
    right: 0px;
    bottom: 0;
    left: 0px;
    border-bottom: 0.5px solid #ebedf0;
  }
}
.nav-center {
  span {
    font-size: 16px;
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
