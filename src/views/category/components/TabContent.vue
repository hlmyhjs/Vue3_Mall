<template>
  <scroll
    ref="scrollRef"
    class="tab-content-scroll"
    :bounce="{ top: false, bottom: false }"
    :listen-scroll="true"
    @scroll="listenScroll"
  >
    <div class="tab-content">
      <div class="tab-content-item">
        <ul>
          <div class="content-img">
            <img :src="data.pic" :alt="data.name" />
          </div>
          <div class="content-list">
            <li v-for="item in data.children" :key="item.id" class="content-list-item" @click="contentClick(item)">
              <img :src="item.pic" alt="" />
              <span>{{ item.name }}</span>
            </li>
          </div>
        </ul>
      </div>
    </div>
  </scroll>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Scroll from 'components/scroll/Scroll'
defineProps({
  data: {
    type: [Object, Array]
  }
})

const scrollY = ref(0)
const listenScroll = (position) => {
  scrollY.value = Math.abs(position.y)
  // console.log(scrollY.value);
}

const router = useRouter()
const contentClick = (item) => {
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
.tab-content-scroll {
  background-color: #fff;
  height: 100%;
  margin-left: 100px;
}

.tab-content {
  padding: 5px;
  .tab-content-item {
    margin-bottom: 49px;
    ul {
      display: flex;
      flex-direction: column;
    }
    .item-title {
      height: 30px;
      line-height: 30px;
      margin-left: 10px;
    }
    .content-img {
      padding: 5px;
      img {
        width: 100%;
      }
    }
    .content-list {
      display: flex;
      flex-wrap: wrap;
      background: #fff;
      padding: 4px 0;
      text-align: center;
      .content-list-item {
        width: 33.33%;
        margin-bottom: 16px;
        img {
          width: 65px;
          height: 65px;
          margin-bottom: 5px;
        }
        span {
          display: block;
          font-size: 13px;
          height: 16px;
          line-height: 16px;
          color: #58595b;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
