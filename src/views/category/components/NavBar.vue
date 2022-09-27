<template>
  <nav-bar class="border-1px">
    <template #left>
      <div class="nav-left" @click="goBack">
        <i class="iconfont icon-arrow-left"></i>
      </div>
    </template>
    <template #center>
      <div class="search" @click="goSearch">
        <i class="iconfont icon-search"></i>
        <span>搜您喜欢的...</span>
      </div>
    </template>
    <template #right>
      <div class="nav-right" @click="goBack">
        <i class="iconfont icon-home"></i>
      </div>
    </template>
  </nav-bar>
</template>

<script setup>
import { useRouter } from 'vue-router'
import NavBar from 'components/navbar/NavBar'

const router = useRouter()
const goSearch = () => router.push('/search')
const goBack = () => router.push('/home')
</script>

<style lang="scss" scoped>
.nav-left {
  display: flex;
  justify-content: center;
  i {
    font-size: 30px;
  }
}

.search {
  display: flex;
  align-items: center;
  width: 100%;
  height: 30px;
  background-color: #f3f3f3;
  border-radius: 15px;
  i {
    padding: 0 5px;
    font-size: 20px;
    color: #ccc;
  }
  span {
    font-size: 14px;
    color: #ccc;
  }
}
.icon-home {
  font-size: 27px;
}
</style>
