<template>
  <floor title="猜你喜欢">
    <van-skeleton title :row="3" :loading="loading">
      <CardList :product-data="productData"></CardList>
    </van-skeleton>
  </floor>
</template>

<script setup>
import { Floor, CardList } from 'components'

defineProps({
  productData: {
    type: Array
  },
  loading: Boolean
})
</script>
