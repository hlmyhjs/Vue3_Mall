<template>
  <div class="detail">
    <nav-bar ref="nav" :position="scrollPositionY" @itemClick="titleClick"></nav-bar>
    <scroll
      ref="scrollRef"
      :probe-type="3"
      class="scroll"
      :bounce="{ top: false, bottom: false }"
      :listen-scroll="true"
      @scroll="listenScroll"
    >
      <swiper :images="goods_swiper" :url_name="'img_url'"></swiper>
      <base-info :base_info="base_info"></base-info>
      <comment></comment>
      <goods-info :goods_imgs="goods_imgs"></goods-info>
    </scroll>
    <back-top v-show="showBackTop" @backToTop="backToTop"></back-top>
    <bottom-bar @addToCart="addToCart"></bottom-bar>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { Toast } from 'vant'
import { Scroll, BackTop } from 'components'
import { NavBar, Swiper, BaseInfo, Comment, GoodsInfo, BottomBar } from './components'
import { goodsDetail } from '@/api/detail'
import { addCart } from '@/api/cart'
import { getItem } from '@/utils/storage'

const router = useRouter()
const { dispatch, commit } = useStore()
const token = getItem('token')
const scrollPositionY = ref(0)
const showBackTop = ref(false)
const listenScroll = (position) => {
  scrollPositionY.value = Math.abs(position.y)
  showBackTop.value = position.y < -1000
}

let coment = ''
let goodsInfos = ''
nextTick(function () {
  coment = document.getElementsByClassName('comment-list')[0]
  goodsInfos = document.getElementsByClassName('product-details')[0]
  /**
   * 可以用element.offsetTop结合scrollRef.value.scrollTo来控制跳转到指定元素
   */
  // console.log(coment.offsetTop, goodsInfos.offsetTop);
  // console.log(coment.value.$el.offsetTop);
})

const scrollRef = ref(null)
const nav = ref(null)
let target = ''
let timer = 0
// 滚动到指定元素: https://better-scroll.github.io/docs/zh-CN/guide/base-scroll-api.html#scrolltoelement-el-time-offsetx-offsety-easing
// on 方法: https://better-scroll.github.io/docs/zh-CN/guide/base-scroll-api.html#on-type-fn-context
// 滚动到指定位置: https://better-scroll.github.io/docs/zh-CN/guide/base-scroll-api.html#%E6%96%B9%E6%B3%95
const titleClick = (themeIndex) => {
  nav.value.headerClick = true // 将nav组件的headerClick赋值为true表示正在通过点击顶部选项滚动到对应模块
  target = themeIndex === 0 ? coment : goodsInfos
  const time = 800 // 滚动时间
  scrollRef.value.scrollToElement(target, time, 0, -43) // 目标元素, 时间, x轴, y轴
  clearTimeout(timer)
  timer = setTimeout(() => {
    nav.value.headerClick = false // 页面滚动到对应位置后将headerClick重新改为false
  }, time)
}

const backToTop = () => scrollRef.value.scrollTo(0, 0, 400) // x轴, y轴, 时间

const goods_swiper = ref([])
const goods_imgs = ref([])
const base_info = ref({})
const routes = useRoute()
const loading = ref(true)
const goods_id = ref(routes.query.id)
const getGoodsDetail = async () => {
  Toast.loading('加载中...')
  const { data } = await goodsDetail(goods_id.value)

  goods_swiper.value = data.goods_banners
  goods_imgs.value = data.goods_imgs

  delete data.goods_banners
  delete data.goods_imgs
  base_info.value = data

  if (token) dispatch('cart/getCartList')
  loading.value = false
  Toast.clear()
}
getGoodsDetail()

const addToCart = async () => {
  if (!token) {
    Toast('请先登录')
    router.push('/login')
    return
  }
  const res = await addCart(parseInt(goods_id.value))
  if (res?.success) {
    const obj = {}
    obj.goodsId = goods_id.value
    obj.name = base_info.value.goods_name
    obj.small_image = goods_swiper.value[0].img_url
    obj.price = base_info.value.price
    commit('cart/ADD_GOODS', obj)
    Toast(res.msg)
  }
}
</script>

<style lang="scss" scoped>
.scroll {
  top: 0;
}

.custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 2px 5px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.1);
}
</style>
