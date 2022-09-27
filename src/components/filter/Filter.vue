<template>
  <div class="query-bar border-1px">
    <div v-for="(item, index) in searchList.data" :key="index" class="query-bar-item" @click="changeTab(index)">
      <span :class="searchList.currentIndex === index ? 'active' : ' '">{{ item.name }}</span>
      <div v-show="index !== 0" class="query-bar-item-arrow">
        <i class="iconfont icon-arrow-up" :class="item.sort === 1 ? 'active' : ''"></i>
        <i class="iconfont icon-arrow-down" :class="item.sort === 2 ? 'active' : ''"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useRoute } from 'vue-router'

const routes = useRoute()
const searchList = reactive({
  currentIndex: 0,
  data: [
    { searchKey: routes.query.key, name: '综合', key: 'id' },
    { searchKey: routes.query.key, name: '价格', sort: 0, key: 'price' },
    { searchKey: routes.query.key, name: '销量', sort: 0, key: 'sales' }
  ]
})

const orderBy = computed(() => {
  const obj = searchList.data[searchList.currentIndex]
  //判断是升序还是降序
  const val = obj.sort == '1' ? 'asc' : 'desc'
  return {
    key: [obj.key][0],
    value: val
  }
})

const emits = defineEmits(['getFilterParam'])

const changeTab = (index) => {
  searchList.currentIndex = index
  //点击的下标对应数据的哪一个
  const item = searchList.data[index]
  //取消所有的状态值===》都变成0
  searchList.data.forEach((val, i) => {
    if (i != index) {
      val.sort = 0
    }
  })
  //当前点击的改变状态
  item.sort = index === searchList.currentIndex ? (item.sort === 1 ? 2 : 1) : ''
  //发送请求进行数据排序
  emits('getFilterParam', orderBy.value)
}
</script>

<style lang="scss" scoped>
.query-bar {
  z-index: 1000;
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  padding: 10px 13px;
  .query-bar-item {
    align-items: center;
    color: #222;
    display: flex;
    font-size: 15px;
    .query-bar-item-arrow {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 8px;
      line-height: 8px;
      margin-left: 5px;
      font-weight: 600;
    }
  }
}

.active {
  color: $primary;
}
</style>
