<template>
  <floor title="爆款推荐">
    <van-skeleton title :row="3" :loading="loading">
      <recommend :recommend-data="recommendData"></recommend>
    </van-skeleton>
  </floor>
</template>

<script setup>
import Floor from 'components/floor/floor'
import Recommend from 'components/list/ViewList'

defineProps({
  recommendData: Array,
  loading: Boolean
})
</script>
