<template>
  <div class="layout">
    <NavBar></NavBar>
    <scroll ref="scrollRef" class="scroll" :bounce="{ top: false, bottom: false }">
      <div v-if="!loading">
        <div class="content">
          <Address :addr-data="addr" :order-id="orderId" :loading="loading"></Address>
          <GoodsInfo :goods-list="goodsList" :loading="loading"></GoodsInfo>
          <Payment></Payment>
        </div>
      </div>
      <van-loading v-else type="spinner" style="position: absolute; left: 50%; top: 40%; transform: translate(-50%)">
        正在拼命加载中…
      </van-loading>
    </scroll>
    <Footer :order-id="orderId" :addr="addr.length"></Footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Scroll } from 'components'
import { NavBar, Address, GoodsInfo, Footer, Payment } from './components'
import { addressList } from '@/api/address'
import { selectOrderById } from '@/api/order'

const routes = useRoute()
const orderId = routes.query.orderId

const addr = ref([])
const goodsList = ref([])
const loading = ref(true)
onMounted(async () => {
  const addressData = await addressList()
  addr.value = addressData.data
  // 查询订单
  const res = await selectOrderById(orderId)
  goodsList.value = JSON.parse(res.data.goods_info)
  loading.value = false
})
</script>

<style lang="scss" scoped></style>
