<template>
  <div class="floor-box">
    <header class="floor-title">
      <span>{{ title }}</span>
    </header>

    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: '楼层标题'
  }
})
</script>

<style lang="scss" scoped>
.floor-box {
  background: #fff;
  margin-top: 10px;
  padding: 8px 0;
  .floor-title {
    top: 0px;
    width: 100%;
    height: 25px;
    line-height: 25px;
    text-align: center;
    font-size: 18px;
    span {
      position: relative;
      &::after {
        content: '';
        display: block;
        position: absolute;
        right: -20px;
        top: 50%;
        margin-top: -4px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #d4c0a7;
      }
      &::before {
        content: '';
        display: block;
        position: absolute;
        top: 50%;
        left: -20px;
        margin-top: -4px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #d4c0a7;
      }
    }
  }
}
</style>
