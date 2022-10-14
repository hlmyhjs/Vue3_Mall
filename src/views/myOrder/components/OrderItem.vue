<template>
  <div v-for="item in list" :key="item.id" class="order-item">
    <div class="order-item-header">
      <div class="left"><span>官方自营旗舰店</span><i class="iconfont icon-arrow-right"></i></div>
      <div class="right">{{ formatStatus(item.status) }}</div>
    </div>
    <div v-for="child in format(item.goods_info)" :key="child.cartId" class="order-item-content">
      <div class="left">
        <div class="goods-img">
          <img :src="child.small_image" alt="" srcset="" />
        </div>
        <div class="name-price">
          <div class="title">{{ child.name }}</div>
          <div class="price">￥{{ child.price }}</div>
        </div>
      </div>
      <div class="right">
        <p>×{{ child.num }}</p>
      </div>
    </div>
    <div class="order-item-footer">
      <div class="left">
        共<span>{{ format(item.goods_info).length }}</span
        >件商品
      </div>
      <div class="right">
        <div @click="delOrder(item.id)">删除订单</div>
        <div v-show="currentIndex === 1" @click="pay(item.id)">立即付款</div>
        <div v-show="currentIndex === 3">提醒发货</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
defineProps({
  list: {
    type: Array,
    default: () => []
  }
})

const format = (data) => JSON.parse(data)
const formatStatus = (data) => {
  switch (data) {
    case 1:
      return '待付款'
    case 3:
      return '待发货'
    case 4:
      return '支付失败'
    default:
      break
  }
}

const emits = defineEmits(['deleteOrder'])
const delOrder = (id) => emits('deleteOrder', id)

const currentIndex = ref('')
const tabName = (tabIndex) => (currentIndex.value = tabIndex)

const pay = (id) => {
  // router.push({
  //   path: "/order",
  //   query: {
  //     orderId: id,
  //   },
  // });
}
defineExpose({
  tabName
})
</script>

<style lang="scss" scoped>
.order-item {
  margin-top: 10px;
  padding: 10px;
  background-color: #fff;
  .order-item-header {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    .left {
      span {
        font-size: 15px;
      }
      i {
        font-size: 20px;
        vertical-align: bottom;
      }
    }
    .right {
      margin-right: 5px;
      color: #999;
    }
  }
  .order-item-content {
    display: flex;
    justify-content: space-between;
    padding: 10px 0px;
    .left {
      display: flex;
      .goods-img {
        width: 100px;
        img {
          width: 100%;
        }
      }
      .name-price {
        width: 230px;
        padding: 0 8px;
        .title {
          font-size: 16px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .price {
          margin-top: 10px;
          font-size: 16px;
        }
      }
    }
    .right {
      display: flex;
      align-items: center;
      margin-right: 5px;
      font-size: 16px;
    }
  }
  .order-item-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      margin-left: 10px;
      font-size: 16px;
      span {
        color: $primary;
      }
    }
    .right {
      display: flex;
      div {
        padding: 6px 12px;
        margin-right: 10px;
        border: 1px solid #9999;
        border-radius: 16px;
        font-size: 14px;
        &:nth-child(1) {
          border-color: $primary;
          color: $primary;
        }
      }
    }
  }
}
</style>
