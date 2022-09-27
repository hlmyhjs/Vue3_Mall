<template>
  <div class="swiperbox">
    <swiper
      :slides-per-view="1"
      :space-between="30"
      :loop="true"
      :centered-slides="true"
      :pagination="{
        clickable: true
      }"
      :autoplay="{
        delay: 2500,
        disableOnInteraction: false
      }"
      :navigation="showNavigation"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide v-for="item in bannerList" :key="item.id">
        <!-- <a :href="item.link"> -->
        <a href="#" class="swiper-link">
          <img :src="item.image_src" alt="" />
        </a>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue' // swiper所需组件
// 这是分页器和对应方法，swiper好像在6的时候就已经分离了分页器和一些其他工具
import { Autoplay, Navigation, Pagination, A11y } from 'swiper'
// 引入swiper样式，对应css 如果使用less或者css只需要把scss改为对应的即可
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
//默认滑动效果（这里面注释掉的可以不要）
// const onSwiper = swiper => {
// 	console.log(swiper);
// };
// const onSlideChange = e => {
// 	// swiper切换的时候执行的方法
// 	console.log('slide change', e.activeIndex)
// };
// setup语法糖只需要这样创建一个变量就可以正常使用分页器和对应功能，如果没有这个数组则无法使用对应功能
const modules = [Autoplay, Pagination, Navigation, A11y]

// 控制分页器是否显示
const showNavigation = ref(false)

defineProps({
  bannerList: {
    type: Array
  }
})
</script>

<style lang="scss" scoped>
.mySwiper {
  width: 100%;
  background: #fff;
}
.swiper-slide {
  text-align: center;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.mySwiper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.swiper-link {
  display: inline-block;
  width: 100%;
  height: 100%;
}

:deep(.swiper-pagination) .swiper-pagination-bullet.swiper-pagination-bullet-active {
  background-color: $primary;
}
:deep(.swiper-pagination-bullet) {
  background-color: #fff;
}

/* 分页器间距 */
.swiper-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet,
:deep(.swiper-pagination-horizontal.swiper-pagination-bullets) .swiper-pagination-bullet {
  margin: 0 6px;
}

/* 左右箭头颜色 */
:deep(.swiper-button-prev),
:deep(.swiper-button-next) {
  color: #fff;
}

:deep(.swiper-button-next:after),
:deep(.swiper-button-prev:after) {
  font-size: 16px;
}
</style>
