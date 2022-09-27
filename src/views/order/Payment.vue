<template>
  <div class="pay-res">
    <div v-if="payStatus"><h2>支付成功, 即将跳转支付前界面...</h2></div>
    <div v-else><h2>支付失败</h2></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { successPayment } from '@/api/pay'
import { delCarts } from '@/api/cart'

const routes = useRoute()
const router = useRouter()
const { state, commit } = useStore()
commit('cart/INIT_SHOP_CART')
const cartIds = []
state.cart.selectArr.forEach((element) => {
  cartIds.push(element.cartId)
})

const payStatus = ref(true)
const data = {
  out_trade_no: routes.query.out_trade_no,
  trade_no: routes.query.trade_no
}
const paymentRes = async () => {
  const res = await successPayment(data)
  if (res.success && res.code == 2) {
    const res = await delCarts(cartIds) // 删除购物车商品
    if (res.success) router.push('/home')
  } else {
    payStatus.value = false
  }
}
paymentRes()
</script>

<style lang="scss" scoped>
.pay-res {
  text-align: center;
  margin-top: 10px;
}
</style>
