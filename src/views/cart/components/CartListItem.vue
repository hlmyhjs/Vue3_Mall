<template>
  <div class="shop-container">
    <div class="content">
      <div class="selector">
        <CheckButton v-model="itemInfo.checked" @click="checkedChange(itemInfo)"></CheckButton>
      </div>
      <div class="img-area">
        <img :src="itemInfo.small_image" alt="" />
      </div>
      <div class="info-area">
        <div class="title-price">
          <p class="title">{{ itemInfo.name }}</p>
          <span class="price">¥{{ itemInfo.price }}</span>
        </div>
        <div class="count-remove-content">
          <div class="count-remove">
            <div>
              <van-stepper
                v-model="itemInfo.num"
                integer
                max="20"
                disable-input
                @plus="increment(itemInfo)"
                @minus="decrement(itemInfo)"
              />
            </div>
            <i class="iconfont icon-ashbin" @click="removCart(itemInfo)"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import CheckButton from 'components/checkButton/CheckButton'
import { Toast, Dialog } from 'vant'
import { delCarts, updateCart } from '@/api/cart'

defineProps({
  itemInfo: {
    type: Object
  }
})

const { commit } = useStore()

const checkedChange = async (cartItem) => {
  const selected = !cartItem.checked
  const res = await updateCart(cartItem.cartId, { selected })
  if (res.success) commit('cart/SELECTED_SINGLE_GOODS', { goodsId: cartItem.goodsId })
}

const increment = async (cartItem) => {
  cartItem.num += 1
  const res = await updateCart(cartItem.cartId, { number: cartItem.num })
  if (res.success) {
    const obj = {}
    obj.cartId = cartItem.cartId
    obj.goodsId = cartItem.goodsId
    obj.name = cartItem.name
    obj.small_image = cartItem.small_image
    obj.price = cartItem.price
    commit('cart/ADD_GOODS', obj)
  }
}

const decrement = async (cartItem) => {
  cartItem.num -= 1
  const res = await updateCart(cartItem.cartId, { number: cartItem.num })
  if (res.success) commit('cart/REDUCE_CART', { goodsId: cartItem.goodsId })
}

const removCart = (cartItem) => {
  Dialog.confirm({
    // title: "标题",
    message: '确认将这1个宝贝删除?'
  })
    .then(async () => {
      const res = await delCarts([cartItem.cartId])
      if (res.success) {
        Toast({ message: res.msg, duration: 1000 })
        commit('cart/REMOVE_CART', { goodsId: cartItem.goodsId })
      }
    })
    .catch(() => {
      // console.log("取消删除");
    })
}
</script>

<style lang="scss" scoped>
.shop-container {
  width: 100%;
  margin-top: 5px;
  border-bottom: 1px solid #e8e8e8;
  .content {
    display: flex;
    // align-items: center;
    background: #fff;
    padding: 5px 0;

    .selector {
      width: 10%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .img-area {
      width: 80px;
      height: 100px;
      margin-right: 5px;
      padding: 5px;
      background-color: #fff;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .info-area {
      flex: 1;
      width: 0%;

      // display: flex;
      // flex-direction: column;
      padding-right: 5px;

      position: relative;

      .title {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-bottom: 10px;
        font-size: 16px;
      }

      .price {
        color: #f2270c;
        font-size: 16px;
      }

      .count-remove-content {
        position: absolute;
        bottom: 0;
        width: 100%;
        .count-remove {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
          .iconfont {
            font-size: 25px;
            padding: 5px;
            color: red;
          }
        }
      }
    }
  }
}
</style>
