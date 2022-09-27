<template>
  <div>
    <cartList-item v-for="item in cartlistData" :key="item.cartId" :item-info="item"></cartList-item>
  </div>
</template>

<script setup>
import CartListItem from './CartListItem'

defineProps({
  cartlistData: {
    type: Object
  }
})
</script>

<style lang="scss" scoped></style>
