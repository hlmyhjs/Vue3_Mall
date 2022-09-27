<template>
  <div class="order-menu">
    <ul>
      <li v-for="item in menuData" :key="item.id" class="order-menu-item" @click="goPath(item.path)">
        <div class="item-icon">
          <img :src="item.img" alt="" />
        </div>
        <div class="item-text">
          <h2>{{ item.name }}</h2>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Toast } from 'vant'
import { getItem } from '@/utils/storage'

const menuData = reactive([
  {
    id: 1,
    name: '待付款',
    img: 'https://s3.bmp.ovh/imgs/2022/06/10/b7368a5725410bf6.png',
    path: '/myOrder'
  },
  {
    id: 2,
    name: '待发货',
    img: 'https://s3.bmp.ovh/imgs/2022/06/10/1c384f338beba485.png',
    path: '/myOrder'
  },
  {
    id: 3,
    name: '待收货',
    img: 'https://s3.bmp.ovh/imgs/2022/06/10/69a7d6f41ac3b2c5.png',
    path: '/myOrder'
  },
  {
    id: 4,
    name: '待评价',
    img: 'https://s3.bmp.ovh/imgs/2022/06/10/bd5690486088fa1f.png',
    path: '/myOrder'
  },
  {
    id: 5,
    name: '退款/售后',
    img: 'https://s3.bmp.ovh/imgs/2022/06/10/f6a6ac91a5c3beba.png',
    path: '/myOrder'
  }
])

const router = useRouter()
const token = getItem('token')
const goPath = (path) => {
  if (!token) {
    router.push('/login')
    return
  }
  path ? router.push(path) : Toast('暂未开发')
}
</script>

<style lang="scss" scoped>
.order-menu ul {
  background: #fff;
  padding: 5px 0;
  margin-top: 10px;
  overflow: hidden;
  display: flex;
  .order-menu-item {
    padding: 5px 0;
    width: 20%;
    .item-icon {
      width: 35px;
      height: 35px;
      margin: 0 auto;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .item-text {
      text-align: center;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      padding-top: 1.6px;
      h2 {
        font-size: 12.8px;
        padding-top: 6.4px;
      }
    }
  }
}
</style>
