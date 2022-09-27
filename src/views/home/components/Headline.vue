<template>
  <div class="news-box">
    <div class="news-icon">
      <i class="iconfont icon-gonggao"></i>
    </div>
    <div class="news-content">
      <span>重要公告 | 所有商品均为展示专用</span>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.news-box {
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 5px;
  background: #fff;
  margin-top: 5px;
  border-top: 1px solid #f3f3f3;
  border-bottom: 1px solid #f3f3f3;
  font-size: 14px;
  .news-icon {
    width: 40px;
    text-align: center;
    i {
      vertical-align: middle;
      font-size: 19px;
      color: #ec6d72;
    }
  }
  .news-content {
    span {
      font-size: 13px;
    }
  }
}
</style>
