<template>
  <div class="Swiper">
    <van-swipe
      class="my-swipe"
      :autoplay="autoplay"
      :duration="duration"
      :initial-swipe="initialSwipe"
      :loop="loop"
      :show-indicators="showIndicators"
      :indicator-color="indicatorColor"
      :stop-propagation="stopPropagation"
    >
      <van-swipe-item v-for="item in images" :key="item.id" @click="itemClick(item)">
        <img :src="item.img_url" class="swipe-img" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script setup>
defineProps({
  images: Array,
  autoplay: {
    type: [Number, String]
  },
  duration: {
    type: [Number, String],
    default: 500
  },
  initialSwipe: {
    type: [Number, String],
    default: 0
  },
  width: {
    type: [Number, String],
    default: 'auto'
  },
  height: {
    type: [Number, String],
    default: 'auto'
  },
  loop: {
    type: Boolean,
    default: true
  },
  showIndicators: {
    type: Boolean,
    default: true
  },
  stopPropagation: {
    type: Boolean,
    default: false
  },
  indicatorColor: {
    type: String,
    default: '#e02e24'
  },
  url_name: {
    type: String
  }
})

const emits = defineEmits(['click'])
const itemClick = (item) => {
  emits('click', item)
}
</script>

<style lang="scss" scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 0;
  text-align: center;
  .swipe-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
