<template>
  <tab-bar>
    <tab-bar-item v-for="item in TabBarItemList" :key="item.id" :link="item.to">
      <template #icon>
        <van-badge v-if="item.id === 3" :content="!total ? '' : total" max="99">
          <img :src="item.icon" alt="" />
        </van-badge>
        <img v-else :src="item.icon" alt="" />
      </template>
      <template #active-icon>
        <van-badge v-if="item.id === 3" :content="!total ? '' : total" max="99">
          <img :src="item.activeIcon" alt="" />
        </van-badge>
        <img v-else :src="item.activeIcon" alt="" />
      </template>
      <template #text
        ><span>{{ item.text }}</span></template
      >
    </tab-bar-item>
  </tab-bar>
</template>

<script setup>
import { reactive, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import TabBar from './TabBar'
import TabBarItem from './tabBarItem'

const TabBarItemList = reactive([
  {
    id: 1,
    icon: require('assets/img/tabbar/home.svg'),
    activeIcon: require('assets/img/tabbar/home_active.svg'),
    text: '首页',
    to: 'home'
  },
  {
    id: 2,
    icon: require('assets/img/tabbar/category.svg'),
    activeIcon: require('assets/img/tabbar/category_active.svg'),
    text: '分类',
    to: 'category'
  },
  {
    id: 3,
    icon: require('assets/img/tabbar/cart.svg'),
    activeIcon: require('assets/img/tabbar/cart_active.svg'),
    text: '购物车',
    to: 'cart'
  },
  {
    id: 4,
    icon: require('assets/img/tabbar/profile.svg'),
    activeIcon: require('assets/img/tabbar/profile_active.svg'),
    text: '我的',
    to: 'account'
  }
])

const { state, dispatch, getters } = useStore()
const route = useRoute()

onMounted(async () => {
  const token = getters.token
  const path = route.path
  if (token && !['/home', '/category'].includes(path)) {
    dispatch('cart/getCartList')
  }
})

const total = computed(() => state.cart.cartCount)
</script>

<style lang="scss">
.van-badge--top-right {
  top: 8px;
  right: -2px;
}
</style>
