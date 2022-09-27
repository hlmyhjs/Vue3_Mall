<template>
  <nav-bar class="border-1px">
    <template #left>
      <div class="logo">
        <span style="vertical-align: baseline" @click="goHome">LOGO</span>
      </div>
    </template>
    <template #center>
      <div class="search" @click="goSearch">
        <i class="iconfont icon-search"></i>
        <span>搜您喜欢的...</span>
      </div>
    </template>
    <template #right>
      <div class="kefu">
        <i class="iconfont icon-service"></i>
      </div>
    </template>
  </nav-bar>
</template>

<script setup>
import { useRouter } from 'vue-router'
import NavBar from 'components/navbar/NavBar'

const router = useRouter()
const goSearch = () => router.push('/search')
const goHome = () => router.push('/home')
</script>

<style lang="scss" scoped>
.logo {
  margin-left: 10px;
  span {
    font-size: 16px;
  }
}

.search {
  display: flex;
  align-items: center;
  width: 96%;
  height: 30px;
  margin-left: 25px;
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

.kefu {
  i {
    font-size: 23px;
  }
}
</style>
