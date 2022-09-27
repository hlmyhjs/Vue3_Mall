<template>
  <div class="nav-bar">
    <div class="nav-left"><slot name="left"></slot></div>
    <div class="nav-center"><slot name="center">标题</slot></div>
    <div class="nav-right"><slot name="right"></slot></div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.nav-bar {
  position: relative;
  z-index: 10;
  display: flex;
  height: 44px;
  line-height: 44px;
  text-align: center;
  color: #444;
  background-color: #fff;
}

.nav-left {
  width: 44px;
}

.nav-center {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.nav-right {
  width: 44px;
}
</style>
