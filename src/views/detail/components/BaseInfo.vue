<template>
  <div class="product-info">
    <div class="product-title">{{ base_info.goods_name }}</div>
    <div class="product-desc">品质细挑严选，赠送运费险</div>
    <div class="price-row">
      <div class="price-new">{{ base_info.price }}</div>
      <div class="price-old">{{ base_info.old_price }}</div>
    </div>
    <div class="product-info-footer">
      <div class="product-server-row">
        <p class="product-server-item">· 48小时发货</p>
        <p class="product-server-item">· 7天无理由退货</p>
        <p class="product-server-item">· 全场包邮</p>
      </div>
      <p class="sale-num">
        已售 <span>{{ base_info.sales }}</span>
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  // eslint-disable-next-line vue/prop-name-casing
  base_info: {
    type: Object
  }
})
</script>

<style lang="scss" scoped>
.product-info {
  background-color: #fff;
  margin-bottom: 10px;
  padding: 10px;
  box-sizing: border-box; // 解决右边距失效问题
  width: 100%;
  border-top: 1px solid #e3e5e9;
  .product-title {
    color: #222;
    font-size: 16px;
    font-weight: 600;
    margin-top: 6.25px;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
  }
  .product-desc {
    color: #999;
    font-size: 13px;
    margin-top: 7px;
  }
  .price-row {
    height: 28px;
    align-items: flex-end;
    display: flex;
    .price-new {
      color: $primary;
      font-size: 22px;
      font-weight: 700;
      &:before {
        content: '￥';
        font-size: 15px;
        font-weight: 400;
      }
    }
    .price-old {
      color: #999;
      font-size: 12.5px;
      margin-left: 5px;
      text-decoration: line-through;
      &:before {
        content: '￥';
      }
    }
  }
  .product-info-footer {
    border-top: 1px solid #9999994d;
    color: #999;
    display: flex;
    font-size: 11.25px;
    justify-content: space-between;
    margin-top: 7.5px;
    padding-top: 6.25px;
    .product-server-row {
      display: flex;
      .product-server-item {
        margin-right: 5px;
      }
    }
    .sale-num span {
      vertical-align: baseline;
      color: $primary;
    }
  }
}
</style>
