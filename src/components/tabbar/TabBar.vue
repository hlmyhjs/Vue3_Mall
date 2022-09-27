<template>
  <div class="tabbar">
    <slot></slot>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.tabbar {
  /* 本身的样式 */
  background-color: #fff;
  height: 49px;
  border-top: 1px solid #eee;
  box-shadow: 0rem -1px 1px rgba(150, 150, 150, 0.08);

  /* 定位相关 */
  position: fixed;
  left: 0;
  right: 0;
  // bottom: 0;
  bottom: -1px;

  /* 利用flex进行布局 */
  display: flex;
  text-align: center;
}
</style>
