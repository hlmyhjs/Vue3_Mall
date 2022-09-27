<template>
  <card title="商品信息">
    <van-skeleton title avatar :row="2" :loading="loading">
      <div v-for="(item, index) in goodsList" :key="index" class="goods">
        <div class="left">
          <img :src="item.small_image" alt="" />
        </div>
        <div class="right">
          <div class="text">
            <span>{{ item.name }}</span>
            <span>x {{ item.num }}</span>
          </div>
          <div class="text_2"><span>黑色</span><span>L码</span></div>
          <div class="price_line">
            <div class="price_one">
              <span>￥</span><span>{{ item.price }}</span>
            </div>
            <!-- <div class="price_two">
            ￥<span>{{ item.old_price }}</span>
          </div> -->
          </div>
        </div>
      </div>
    </van-skeleton>
  </card>
</template>

<script setup>
import { Card } from 'components'

defineProps({
  goodsList: {
    type: Array,
    default: () => []
  },
  loading: Boolean
})
</script>

<style lang="scss" scoped>
.goods {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  background-color: #fff;
  margin-top: 10px;
  border-radius: 8px;
  .left {
    width: 180px;
    img {
      width: 100%;
    }
  }
}

.goods .right .text {
  // padding-top: 5px;
  padding-bottom: 5px;
}

.goods .right .text > span:nth-child(1) {
  font-size: 16px;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  padding: 0 10px;
}

.goods .right .text > span:nth-child(2) {
  width: 120px;
  font-size: 20px;
  text-align: center;
}

.goods .right .text {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
}

.goods .right .text_2 > span {
  background-color: rgba(223, 223, 223, 0.5);
  color: rgb(66, 66, 66);
  margin-left: 10px;
  padding: 2px 6px;
  border-radius: 4px;
}

.goods .right .text_2 {
  margin-top: 5px;
  margin-bottom: 8px;
}

.goods .right .price_line {
  margin-left: 10px;
}

.goods .right .price_line .price_one > span:nth-child(1) {
  color: $primary;
  font-size: 16px;
}

.goods .right .price_line .price_one > span:nth-child(2) {
  color: $primary;
  font-size: 18px;
}

.price_one,
.price_two {
  float: left;
}

.goods .right .price_line .price_two {
  color: rgb(168, 168, 168);
  text-decoration: line-through;
  margin-left: 15px;
  padding-top: 4px;
}
</style>
