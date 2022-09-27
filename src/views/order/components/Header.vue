<template>
  <div class="title">
    <div class="title-left"><slot name="left"></slot></div>
    <div class="title-right"><slot name="right"></slot></div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 10px 15px 0;
  color: #9c9c9c;
}
</style>
