<template>
  <div class="footer">
    <div class="pay_one">
      合计:&nbsp;&nbsp;<span>￥</span><span>{{ getters['cart/totalPrice'] }}</span>
    </div>
    <div class="pay_two">
      <p @click="goPayment">提交订单({{ getters['cart/selectedNumber'] }})</p>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { Toast } from 'vant'
import { updateOrderStatus } from '@/api/order'
import { payment } from '@/api/pay.js'

const { state, getters, commit } = useStore()
commit('cart/INIT_SHOP_CART')
const names = []
const cartIds = []
state.cart.selectArr.forEach((element) => {
  names.push(element.name)
  cartIds.push(element.cartId)
})
const props = defineProps({
  orderId: String,
  addr: Number
})
const goPayment = async () => {
  if (props.addr === 0) {
    Toast('请先选择收货地址后再支付')
    return
  }
  // 修改订单状态 未支付->待支付
  const res = await updateOrderStatus(props.orderId, 2)
  if (res.success) {
    const dataOrder = {
      orderId: parseInt(props.orderId),
      // price: getters['cart/totalPrice'],
      price: '0.1',
      name: state.cart.selectArr[0].name,
      // name: names,
      returnUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'http://159.75.19.17' // 支付成功后跳转的链接
    }
    const res = await payment(dataOrder)
    if (res.success) {
      //打开支付宝支付的页面
      window.location.href = res.data.paymentUrl
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  height: 60px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  padding: 0px 15px;
  align-items: center;
  box-shadow: 0 0 10px #ccc;
}

.pay_one {
  & > span:nth-child(1) {
    font-size: 15px;
    color: $primary;
  }
  & > span:nth-child(2) {
    font-size: 22px;
    font-weight: bold;
    color: $primary;
  }
}

.pay_two {
  padding: 0 5px;
  height: 42px;
  border-radius: 5px;
  background-color: $primary;
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    color: #fff;
    font-size: 17px;
  }
}
</style>
