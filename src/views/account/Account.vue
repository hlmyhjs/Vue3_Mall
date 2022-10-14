<template>
  <header class="header">
    <span>个人中心</span>
  </header>
  <div class="account">
    <user-info :username="username" :login-state="loginState"></user-info>
    <order-menu></order-menu>
    <list-view></list-view>
  </div>
  <tab-bar></tab-bar>
</template>

<script setup>
import { computed } from 'vue'
import TabBar from 'components/tabbar'
import UserInfo from './components/UserInfo'
import OrderMenu from './components/OrderMenu'
import ListView from './components/ListView'
import { getItem } from '@/utils/storage'

const user = getItem('user_info')
const username = computed(() => user?.username || '热心市民李先生')
const loginState = computed(() => user?.loginStatus)
</script>

<style lang="scss" scoped>
.header {
  height: 44px;
  line-height: 44px;
  text-align: center;
  background: #b64e4b;
  color: #fff;
  font-size: 16px;
}

.account {
  margin-top: -1px;
}
</style>
