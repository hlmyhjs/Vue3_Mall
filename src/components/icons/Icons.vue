<template>
  <div class="icons-wrapper">
    <van-skeleton title :row="2" :loading="loading">
      <ul>
        <li v-for="item in icons" :key="item.id" class="icons-item" @click="iconItemClick(item)">
          <img :src="item.image_src" alt="" />
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </van-skeleton>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

defineProps({
  icons: {
    type: Object
  },
  loading: Boolean
})

const router = useRouter()
const iconItemClick = (item) => {
  router.push({
    name: 'categoryDetail',
    params: {
      key: item.name,
      id: item.id
    }
  })
}
</script>

<style lang="scss" scoped>
.icons-wrapper {
  background-color: #fff;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 10px 0;
    .icons-item {
      flex: 20%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 10px;
      color: #222;
      font-size: 14px;
      img {
        display: block;
        width: 42px;
        height: 42px;
        padding: 0 15px 12px;
      }
      span {
        font-size: 14px;
      }
    }
  }
}
</style>
