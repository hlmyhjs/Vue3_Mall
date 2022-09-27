<template>
  <swiper
    :modules="modules"
    :slides-per-view="1"
    :speed="500"
    :loop="true"
    :space-between="0"
    :autoplay="{ delay: 3000, disableOnInteraction: false }"
    effect="fade"
    :pagination="paginationOpt"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide v-for="item in images" :key="item.id">
      <img class="swiper-img" :src="item.img_url" alt="" />
    </swiper-slide>
  </swiper>
</template>

<script setup>
/**
 * 参数说明:
 * speed: 切换速度，即slider自动滑动开始到结束的时间（单位ms），也是触摸滑动时释放至贴合的时间。
 * loop: 循环
 * space-between: 轮播图之间的间距
 * autoplay: 设置自动播放样式属性
 * effect: 设置淡出样式效果
 * autoplay中的delay: 自动切换的时间间隔，单位ms
 * autoplay中的disableOnInteraction: 用户操作swiper之后，是否禁止autoplay。默认为true：停止。
    如果设置为false，用户操作swiper之后自动切换不会停止，每次都会重新启动autoplay。
    操作包括触碰(touch)，拖动，点击pagination等。
  pagination: 分页器
 */

// 参考: https://juejin.cn/post/7091796748624101384     https://swiperjs.com/vue
import { reactive } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
//  引入想要效果模块
// import { Autoplay, EffectFade } from "swiper";
import { Autoplay, Pagination } from 'swiper'
// 引入样式
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/effect-fade'
import 'swiper/scss/pagination'

// const modules = [Autoplay, EffectFade]
const modules = [Autoplay, Pagination]

const onSwiper = (swiper) => {
  // console.log(swiper);
}

// 图片时会切换调用此函数
const onSlideChange = () => {}

// https://www.swiper.com.cn/api/pagination/299.html
const paginationOpt = reactive({
  clickable: true,
  /**
   * 分页器样式类型，可选:
      bullets  圆点（默认）
      fraction  分式 (数字)
      progressbar  进度条
      custom 自定义
           */
  type: 'fraction'
})

defineProps({
  images: {
    type: Array
  }
})
</script>

<style lang="scss" scoped>
.swiper:deep() {
  .swiper-slide {
    height: 414px;
    line-height: 414px;
    text-align: center;
  }
  .swiper-pagination {
    // 针对类型为数字的样式设置
    left: 85%;
    width: 45px;
    z-index: 2;
    background: rgba(0, 0, 0, 0.3);
    color: #fff;
    padding: 2px;
    overflow: hidden;
    border-radius: 2px;
    font-size: 10px;
    span {
      vertical-align: baseline;
    }

    // 针对类型为bullets(圆点)的样式设置
    .swiper-pagination-bullet {
      background: #ffffff;
    }
    .swiper-pagination-bullet-active {
      background: $primary;
    }
  }
}

.swiper-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
