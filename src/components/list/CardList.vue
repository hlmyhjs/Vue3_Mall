<template>
  <div class="card-list-container">
    <div v-for="item in productData" :key="item.Id" class="goods-item" @click="goToDetail(item.id)">
      <div class="goods-img-container">
        <!-- <img class="goods-img" alt="" :src="item.goods_img" /> -->
        <img v-lazy="item.goods_img" class="goods-img" alt="" />
        <span v-show="item.Slogan" class="goods-slogan">
          {{ item.Slogan }}
        </span>
      </div>
      <div class="goods-info">
        <h3 class="goods-title">{{ item.goods_name }}</h3>
        <div class="goods-price">
          <span>{{ item.price }}</span>
          <span class="old-price">￥{{ item.old_price }}</span>
        </div>
        <div class="sale-num">已售{{ item.sales }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

defineProps({
  productData: {
    type: Array
  }
})

const router = useRouter()
const goToDetail = (id) => {
  router.push({
    path: '/detail',
    query: {
      id
    }
  })
}
</script>

<style lang="scss" scoped>
.card-list-container {
  padding: 5px 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .goods-item {
    width: calc(50% - 5px);
    background-color: #fff;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    position: relative;
    .goods-img-container {
      position: relative;
      width: 100%;
      .goods-img {
        height: 100%;
        width: 100%;
        display: block;
      }
      .goods-slogan {
        background-color: rgba(0, 0, 0, 0.3);
        bottom: 0;
        color: #fff;
        font-size: 12.5px;
        height: 22.5px;
        left: 0;
        line-height: 22.5px;
        overflow: hidden;
        position: absolute;
        text-align: center;
        text-overflow: ellipsis;
        width: 100%;
        word-break: break-all;
      }
    }
    .goods-info {
      padding: 5px;
      .goods-title {
        font-size: 14px;
        line-height: 1.6;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
      }
      .goods-price {
        align-items: flex-end;
        color: $primary;
        display: flex;
        font-size: 17px;
        margin-top: 5px;
        &:before {
          content: '￥';
          font-size: 14px;
          font-weight: 400;
        }
        .old-price {
          font-size: 12.5px;
          margin-left: 5px;
          text-decoration: line-through;
          color: rgb(153, 153, 153);
        }
      }
      .sale-num {
        color: #999;
        font-size: 12.5px;
        margin-top: 3px;
        padding-left: 3px;
      }
    }
  }
}
</style>
