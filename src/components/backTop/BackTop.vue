<template>
  <div class="back-top" @click="backTop">
    <slot> <i class="iconfont icon-arrow-up"></i> <span>顶部</span> </slot>
  </div>
</template>

<script setup>
const emit = defineEmits(['backToTop'])

const backTop = () => {
  emit('backToTop')
}
</script>

<style lang="scss" scoped>
.back-top {
  position: fixed;
  bottom: 66px;
  right: 16px;
  z-index: 5000;
  width: 40px;
  height: 40px;
  background-color: #fff;
  border: 0.01rem solid #e2e2e2;
  border-radius: 50%;
  box-shadow: 0 0 2px 0 rgba(0, 0, 255, 0.2);
  text-align: center;
  i {
    display: block;
    margin-bottom: -2px;
    color: #58595b;
  }
  span {
    font-size: 13px;
    color: #58595b;
  }
}
</style>
