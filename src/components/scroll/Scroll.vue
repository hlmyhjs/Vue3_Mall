<!-- 以下内容参考自:
https://cloud.tencent.com/developer/article/1942722

https://zhuanlan.zhihu.com/p/27407024

better-scroll文档: https://better-scroll.github.io/docs/zh-CN/
 -->

<template>
  <div ref="wrapper" :class="{ wrapper: true, x: props.scrollX }">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'
import ObserveImage from '@better-scroll/observe-image'
import MouseWheel from '@better-scroll/mouse-wheel'
import Pullup from '@better-scroll/pull-up'
import Pulldown from '@better-scroll/pull-down'

let bscroll = BScroll
const wrapper = ref(null)
BScroll.use(ObserveDOM)
BScroll.use(ObserveImage)
BScroll.use(MouseWheel)
BScroll.use(Pullup)
BScroll.use(Pulldown)
const emit = defineEmits(['ckick', 'beforeScroll', 'afterScroll', 'scroll'])
// const emit = defineEmits(["ckick", "beforeScroll", "afterScroll", "scroll", "backTop"]);

const props = defineProps({
  /**
   * 1 滚动的时候会派发scroll事件，会截流。
   * 2 滚动的时候实时派发scroll事件，不会截流。
   * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
   *
   * 对于 v2.1.0 版本，对 probeType 做了一次统一
   * 1. probeType 为 0，在任何时候都不派发 scroll 事件，
   * 2. probeType 为 1，仅仅当手指按在滚动区域上，每隔 momentumLimitTime 毫秒派发一次 scroll 事件，
   * 3. probeType 为 2，仅仅当手指按在滚动区域上，一直派发 scroll 事件，
   * 4. probeType 为 3，任何时候都派发 scroll 事件，包括调用 scrollTo 或者触发 momentum 滚动动画
   */
  probeType: {
    type: Number, // Number: 1, 2, 3
    required: false,
    default: 1
  },

  /**
   * 是否开启横向滚动，默认纵向滚动。
   * 开启横向滚动需要将传入元素设置为横向例如：display:inline-block
   */
  /**
   * 当设置为 true 的时候，可以开启纵向滚动。
    备注：当设置 eventPassthrough 为 'vertical' 的时候，该配置无效
   */
  // scrollX: {
  scrollY: {
    type: Boolean,
    required: false,
    default: false
  },

  /**
   * 点击列表是否派发click事件
   * BetterScroll 默认会阻止浏览器的原生 click 事件。当设置为 true，BetterScroll 会派发一个 click 事件，我们会给派发的 event 参数加一个私有属性 _constructed，值为 true
   */
  click: {
    type: Boolean,
    default: true
  },
  /**
   * 是否派发滚动事件
   */
  listenScroll: {
    type: Boolean,
    default: false
  },
  /**
   * 是否派发滚动到底部的事件，用于上拉加载
   */
  pullup: {
    type: Function,
    default: null
  },
  /**
   * 是否派发顶部下拉的事件，用于下拉刷新
   */
  pulldown: {
    type: Function,
    default: null
  },
  /**
   * 是否派发列表滚动开始的事件
   */
  beforeScroll: {
    type: Boolean,
    default: false
  },
  /**
   * 是否派发列表滚动开始的事件
   */
  afterScroll: {
    type: Boolean,
    default: false
  },
  /**
   * 当滚动超过边缘的时候会有一小段回弹动画。设置为 true 则开启动画。 直接设定为Boolean时表示开启边界回弹: 关闭 || 开启四个方向,
   * 也可以单独对某个方向设定
   */
  bounce: {
    type: Object,
    // eslint-disable-next-line vue/require-valid-default-prop
    default: {
      left: false, // 开启左边界回弹
      right: false, // 开启右边界回弹
      top: false,
      bottom: true
    }
  }
})

onMounted(() => {
  // 保证在DOM渲染完毕后初始化better-scroll
  setTimeout(() => {
    _initScroll()
  }, 20)
})

const _initScroll = () => {
  bscroll = new BScroll(wrapper.value, {
    scrollX: props.scrollX,
    probeType: props.probeType,
    click: props.click,
    bounce: props.bounce,
    observeDOM: true,
    observeImage: true,
    mouseWheel: true,
    pullDownRefresh: true,
    pullUpLoad: true
  })
  /**
   * 如果开启了滚动前事件派发
   */
  if (props.beforeScroll) {
    bscroll.on('beforeScrollStart', () => {
      emit('beforeScroll')
    })
  }

  /**
   * 如果开启了滚动(滚动中)事件派发
   */
  if (props.listenScroll) {
    // bscroll.on('scroll', (position: { x: number; y: number }) => {
    bscroll.on('scroll', (position) => {
      emit('scroll', position)
    })
  }

  /**
   * 如果开启了滚动结束事件派发
   */
  if (props.beforeScroll) {
    bscroll.on('scrollEnd', () => {
      emit('afterScroll')
    })
  }

  // 派发滚动到底部的事件，用于上拉加载
  if (props.pullup !== null) {
    bscroll.on('pullingUp', () => {
      try {
        props.pullup().then(() => {
          bscroll.finishPullUp()
        })
      } catch (e) {
        // 传入非 Promise 函数
        // bscroll.finishPullUp();
      }
    })
  }

  if (props.pulldown !== null) {
    bscroll.on('pullingDown', () => {
      try {
        props.pulldown().then(() => {
          bscroll.finishPullDown()
        })
      } catch (e) {
        // 传入非 Promise 函数
        bscroll.finishPullDown()
      }
    })
  }
}

const disable = () => {
  // 代理better-scroll的disable方法
  bscroll && bscroll.disable()
}
const enable = () => {
  // 代理better-scroll的enable方法
  bscroll && bscroll.enable()
}
const refresh = () => {
  // 代理better-scroll的refresh方法
  bscroll && bscroll.refresh()
}

function scrollTo() {
  // 代理better-scroll的scrollTo方法
  bscroll && bscroll.scrollTo.apply(bscroll, arguments)
}
// const scrollToElement = () => {
function scrollToElement() {
  // 代理better-scroll的scrollToElement方法
  bscroll && bscroll.scrollToElement.apply(bscroll, arguments)
}

const finishPullUp = () => {
  bscroll && bscroll.finishPullUp && bscroll.finishPullUp()
}

// const closePullUp = () => {
//   bscroll && bscroll.closePullUp && bscroll.closePullUp();
// };

defineExpose({
  disable,
  enable,
  refresh,
  scrollTo,
  scrollToElement,
  finishPullUp
  // closePullUp,
})
</script>

<style lang="scss" scoped>
.wrapper {
  overflow: hidden;
  // 解决底部导航遮住部分scroll区域问题
  position: absolute;
  top: 43.71px;
  bottom: 49px;
  left: 0;
  right: 0;
  .content {
    display: block;
  }
  // 开启横向滚动
  &.x {
    white-space: nowrap;
    .content {
      display: inline-block;
    }
  }
}
</style>
