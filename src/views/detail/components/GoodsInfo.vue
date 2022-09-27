<template>
  <div class="product-details">
    <div class="comment-header" style="padding-left: 0.62rem">
      <div class="comment-header-left">商品详情</div>
    </div>
    <div class="img-list">
      <div v-for="(item, index) in goods_imgs" :key="index">
        <img :src="item.img_url" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  goods_imgs: {
    type: Array
  }
})
</script>

<style lang="scss" scoped>
.product-details {
  background-color: #fff;
  margin-top: 10px;
  padding: 10px 0;
  width: 100%;

  .comment-header {
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding-left: 15px;
    .comment-header-left {
      color: #222;
      font-size: 15px;
      font-weight: 700;
      &.comment-header-left:before {
        background-color: $primary;
        color: $primary;
        content: 'l';
        margin-right: 5px;
      }
    }
  }
  .img-list {
    margin-top: 7.5px;
    width: 100%;
    img {
      width: 100%;
    }
  }
}
</style>
