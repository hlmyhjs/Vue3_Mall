<template>
  <div class="tabBar">
    <div class="tabBarLeft">
      <CheckButton v-model="isSelectedAll" class="select-all" @click="selectedAll(isSelectedAll)"></CheckButton>
      <span>全选</span>
      <div v-if="!isEdit" class="selectAll">
        合计:<span class="totalPrice">{{ totalPrice }}</span>
      </div>
    </div>
    <div class="tabBarRight">
      <button v-if="!isEdit" class="pay" @click="toPay">去结算({{ goodsCount }})</button>
      <button v-else class="pay" @click="deletAMultiple">删除({{ goodsCount }})</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Toast, Dialog } from 'vant'
import CheckButton from 'components/checkButton/CheckButton'
import { selectAll, delCarts } from '@/api/cart'
import { createOrder } from '@/api/order'

defineProps({
  isEdit: Boolean
})

const { state, commit, getters } = useStore()
// const { state, commit } = useStore()

// 选中的商品总件数
const goodsCount = computed(() => Object.values(state.cart.shopCart).filter((value) => value.checked).length)
// 选中商品的总价格
const totalPrice = computed(() => {
  let totalPrice = 0
  Object.values(state.cart.shopCart).forEach((goods, index) => {
    if (goods.checked) {
      totalPrice += goods.num * Number(goods.price)
    }
  })
  return '￥' + Number(totalPrice).toFixed(2)
})
// 商品是否全选
const isSelectedAll = computed(() => Object.values(state.cart.shopCart).every((value) => value.checked))

// 4. 全选和取消全选
const selectedAll = async (isSelected) => {
  const res = await selectAll({ flag: !isSelected }) // 如果已经是全选则将isSelected取反
  if (res.success) commit('cart/SELECTED_ALL_GOODS', { isSelected })
}

const deletAMultiple = async () => {
  commit('cart/INIT_SHOP_CART')
  const selectcartId = []
  const goodsId = []
  state.cart.selectArr.forEach((item) => {
    selectcartId.push(item.cartId)
    goodsId.push(item.goodsId)
  })
  if (selectcartId.length === 0) {
    Toast('请选择要删除的商品')
    return
  }

  Dialog.confirm({
    // title: "标题",
    message: `确认将这${selectcartId.length}个宝贝删除?`
  })
    .then(async () => {
      const res = await delCarts(selectcartId)
      if (res.success) {
        Toast(res.msg)
        commit('cart/REMOVE_CART', { goodsId })
      }
    })
    .catch(() => {
      // console.log("取消删除");
    })
}

const router = useRouter()
const toPay = async () => {
  commit('cart/INIT_SHOP_CART')
  if (goodsCount.value > 0) {
    const res = await createOrder({
      // 创建订单
      address_id: 1,
      goods_info: JSON.stringify(state.cart.selectArr),
      total: getters['cart/totalPrice'].toString()
      // total: '0.1'
    })
    if (res.success) {
      router.push({
        path: '/order',
        query: {
          orderId: res.data.id
        }
      })
    }
  } else {
    Toast('请先选择商品后结算')
    return
  }
}
</script>

<style lang="scss" scoped>
.tabBar {
  position: fixed;
  bottom: 49px;
  width: 100%;
  height: 49px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #eeeeee;
  .tabBarLeft {
    display: flex;
    align-items: center;
    margin-left: 10px;
    .selectAll {
      margin-left: 20px;
      font-size: 20px;
      .totalPrice {
        color: #e9232c;
        font-size: 20px;
      }
    }
    span {
      font-size: 16px;
      margin-left: 10px;
    }
  }
  .tabBarRight {
    .pay {
      border: none;
      padding: 0 15px;
      height: 40px;
      background-color: $primary;
      border-radius: 20px;
      margin-right: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      color: #fff;
    }
  }
}
</style>
