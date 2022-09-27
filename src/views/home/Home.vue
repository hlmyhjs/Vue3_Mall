<template>
  <div class="home">
    <!-- 顶部导航栏 -->
    <home-nav-bar></home-nav-bar>
    <scroll
      ref="scrollRef"
      :pulldown="scrollTop"
      :pullup="loadMore"
      :listen-scroll="true"
      :before-scroll="true"
      @scroll="listenScroll"
      @afterScroll="afterScroll"
    >
      <!-- 轮播图 -->
      <van-skeleton title :row="3" :loading="homeData.loading">
        <swiper :images="homeData.swipers" :autoplay="3000"></swiper>
      </van-skeleton>
      <!-- 分类 -->
      <icons :icons="homeData.icons" :loading="homeData.loading"></icons>
      <!-- 头条, 公告 -->
      <van-skeleton title :row="2" :loading="homeData.loading">
        <head-line></head-line>
      </van-skeleton>
      <!-- 新人专享 -->
      <newcomer v-if="homeData.newcomers" :newcomers="homeData.newcomers" :loading="homeData.loading"></newcomer>
      <!-- 爆款推荐 -->
      <recommend :recommend-data="homeData.recommends" :loading="homeData.loading"></recommend>
      <!-- 猜你喜欢 -->
      <product :product-data="products.list" :loading="homeData.loading"></product>
      <div class="not-more">
        <span v-if="more">加载中......</span>
        <span v-else>没有更多了</span>
      </div>
    </scroll>
    <!-- 回到顶部 -->
    <back-top v-show="showBackTop" @backToTop="backToTop"></back-top>
    <!-- 底部导航栏 -->
    <tab-bar></tab-bar>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useStore } from 'vuex'
import { Toast } from 'vant'
import { homePage, getHomeData } from '@/api/homePage'
import { TabBar, Scroll, Swiper, Icons, BackTop } from 'components'
import { HomeNavBar, Newcomer, Recommend, Product } from './components'
import HeadLine from './components/Headline'
import { getItem } from '@/utils/storage'

const store = useStore()
const homeData = reactive({
  swipers: [],
  icons: [],
  seckills: {},
  recommends: [],
  loading: true
})
const products = reactive({
  pageNum: 1,
  pageSize: 10,
  list: []
})

onMounted(async () => {
  const token = getItem('token')
  if (token) store.dispatch('cart/getCartList')

  Toast.loading({
    message: '加载中...',
    forbidClick: true
  })
  const {
    data: { banners, catitems, recommends, newcomers }
  } = await homePage()
  homeData.swipers = banners
  homeData.icons = catitems
  homeData.newcomers = newcomers
  homeData.recommends = recommends
  homeData.loading = false
  getHomeProducts() // 获取首页猜你喜欢数据
  Toast.clear()
})

// 顶部下拉加载触发
const scrollTop = () => {
  // console.log('scroll顶部下拉')
}

// 滚动到底部触发上拉加载触发
const loadMore = () => getHomeProducts('pullUp')

const more = ref(false)

const getHomeProducts = (type) => {
  getHomeData(type, products.pageNum).then((res) => {
    const goodsList = res.data.list
    products.list.push(...goodsList)
    if (goodsList.length !== 0) {
      more.value = true
      products.pageNum += 1
      scrollRef?.value?.finishPullUp()
    } else {
      more.value = false
    }
  })
}

const showBackTop = ref(false)
// 滚动过程中触发
const listenScroll = (position) => {
  showBackTop.value = position.y < -1000
}

// 滚动结束事件派发
const afterScroll = () => {
  // console.log('结束了滚动');
}

const scrollRef = ref(null)
const backToTop = () => scrollRef.value.scrollTo(0, 0, 800) // x轴, y轴, 时间
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.not-more {
  align-items: center;
  display: flex;
  justify-content: center;
  color: #999;
  font-size: 13px;
  padding: 18px;
}
</style>
