<template>
  <div class="product-bar">
    <div class="product-row">
      <div class="product-row-left">
        <div class="product-row-item">
          <i class="iconfont icon-service"></i>
          <p class="product-row-item-title">客服</p>
        </div>
        <div class="product-row-item" @click="goCart">
          <van-badge :content="!total ? '' : total" max="99">
            <i class="iconfont icon-cart-Empty"></i>
          </van-badge>
          <p class="product-row-item-title">购物车</p>
        </div>
        <div class="product-row-item">
          <i class="iconfont icon-collection"></i>
          <p class="product-row-item-title">收藏</p>
        </div>
      </div>
      <div class="product-row-right">
        <div class="product-row-btn" @click="addCart">加入购物车</div>
        <div class="product-row-btn">立即购买</div>
      </div>
    </div>
    <div class="product-blank"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()

const emits = defineEmits(['addToCart'])

const addCart = () => emits('addToCart')

const goCart = () => router.push({ path: '/cart' })

const total = computed(() => store.state.cart.cartCount)
</script>

<style lang="scss" scoped>
.product-bar {
  position: relative;
  width: 100%;
  .product-row {
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #fff;
    display: flex;
    height: 49px;
    width: 100%;
    z-index: 99;
    .product-row-left {
      display: flex;
      width: 42%;
      .product-row-item {
        align-items: center;
        border-right: 1px solid #9993;
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: relative;
        width: 33.3%;
        border-top: 1px solid #eaeaea;
        i {
          font-size: 22px;
        }
      }
      .product-row-item-title {
        font-size: 13px;
        margin-top: 2px;
      }
    }
    .product-row-right {
      display: flex;
      flex: 1 1;
      .product-row-btn:first-child {
        background-color: $primary;
      }
      .product-row-btn {
        background-color: #ffbd0d;
        color: #fff;
        font-size: 13.75px;
        line-height: 49px;
        text-align: center;
        width: 50%;
      }
    }
  }
}
</style>
