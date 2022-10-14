<template>
  <div class="card">
    <div class="title">
      <span>{{ title }}</span>
    </div>
    <div class="content">
      <slot>内容</slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: '卡片标题'
  }
})
</script>

<style lang="scss" scoped>
.card {
  padding: 5px 10px;
  margin-top: 10px;
  background-color: #fff;
  border-radius: 8px;
  .title {
    height: 40px;
    line-height: 40px;
    position: relative;
    font-size: 15px;
    &:before {
      background-color: $primary;
      color: $primary;
      content: 'l';
      margin-right: 10px;
    }
    &:after {
      position: absolute;
      box-sizing: border-box;
      content: ' ';
      pointer-events: none;
      right: 0px;
      bottom: 0;
      left: 0px;
      border-bottom: 1px solid #ebedf0;
      // border-bottom: 1px solid #f2f3f5;
      // transform: scaleY(0.5);
    }
  }
  .content {
    font-size: 14px;
  }
}
</style>
