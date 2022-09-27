<template>
  <nav-bar v-model="isEdit"></nav-bar>
  <div class="cart-container">
    <div v-if="cartListLen !== 0">
      <cart-list :cartlist-data="cartListData"></cart-list>
    </div>
    <div v-else class="cartEmpty">
      <h2>购物车空荡荡的, 去首页逛逛吧</h2>
      <button class="goShopping" @click="goShopping">去逛逛</button>
    </div>
  </div>
  <bottom-bar :is-edit="isEdit"></bottom-bar>
  <tab-bar></tab-bar>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import TabBar from 'components/tabbar'
import { NavBar, CartList, BottomBar } from './components'

const { state } = useStore()
const router = useRouter()
const goShopping = () => router.push('/home')
const cartListData = computed(() => state.cart.shopCart)
const cartListLen = computed(() => Object.getOwnPropertyNames(state.cart.shopCart).length)
const isEdit = ref(false)
</script>

<style lang="scss" scoped>
.cart-container {
  position: fixed;
  top: 43px;
  bottom: 95px;
  overflow: auto;
  width: 100%;
  &::-webkit-scrollbar {
    width: 0 !important;
  }
}

.cart-list-scroll {
  bottom: 100px;
}
.nav-left {
  display: flex;
  justify-content: center;
  i {
    font-size: 30px;
  }
}

.cartEmpty {
  text-align: center;
  margin-top: 50%;
  .goShopping {
    border: none;
    background: $primary;
    color: #fff;
    padding: 5px 10px;
    margin-top: 10px;
    border-radius: 6px;
  }
}
</style>
