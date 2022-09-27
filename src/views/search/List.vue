<template>
  <div v-if="!loading">
    <div class="query-bar-container">
      <div v-if="searchData.length !== 0">
        <!-- 筛选部分 -->
        <Filter @getFilterParam="getFilterParam"></Filter>

        <!-- 商品列表 -->
        <scroll
          ref="scrollRef"
          class="scroll"
          :listen-scroll="true"
          :bounce="{ top: false, bottom: false }"
          @scroll="listenScroll"
        >
          <SearchList v-show="searchData.length !== 0" :product-data="searchData"></SearchList>
        </scroll>
      </div>

      <div v-else class="s_null">
        <p class="tip">抱歉！暂无相关商品</p>
        <p class="small">换个关键词试试吧～</p>
      </div>
    </div>
  </div>
  <van-loading v-else type="spinner" style="position: absolute; left: 50%; top: 40%; transform: translate(-50%)">
    正在拼命加载中…
  </van-loading>
  <back-top v-show="showBackTop" @backToTop="backToTop"></back-top>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { searchGoods } from '@/api/search'
import Scroll from 'components/scroll/Scroll'
import BackTop from 'components/backTop/BackTop'
import SearchList from 'components/list/CardList'
import Filter from 'components/filter/Filter'

const filterParam = ref()
const getFilterParam = (param) => {
  filterParam.value = param
}

watch(
  () => filterParam.value,
  (value) => {
    getSearchList(null, value)
  }
)

const routes = useRoute()
const searchData = ref([])
const loading = ref(true)
const getSearchList = async (key, filter) => {
  if (key) {
    const { data } = await searchGoods(routes.query.key, filter)
    searchData.value = data.list
    loading.value = false
  }
  const { data } = await searchGoods(routes.query.key, filter)
  searchData.value = data.list
  loading.value = false
}
getSearchList()

const scrollRef = ref(null)
const backToTop = () => scrollRef.value.scrollTo(0, 0, 800) // x轴, y轴, 时间

const scrollPositionY = ref(0)
const showBackTop = ref(false)
const listenScroll = (position) => {
  scrollPositionY.value = Math.abs(position.y)
  showBackTop.value = position.y < -1000
}

onBeforeRouteUpdate(() => {
  getSearchList(routes.query.key, filterParam.value)
})
</script>

<style lang="scss" scoped>
.scroll {
  top: 80px;
  bottom: 0;
}

.back-top {
  bottom: 30px;
}

.s_null {
  margin-top: 50%;
  padding: 10px;
  text-align: center;
  .tip {
    line-height: 1;
    text-align: center;
    margin-bottom: 15px;
    font-size: 16px;
    color: #333;
  }
  .small {
    font-size: 14px;
    color: #999;
  }
}
</style>
