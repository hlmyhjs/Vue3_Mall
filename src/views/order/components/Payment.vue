<template>
  <card title="支付方式">
    <ul>
      <li v-for="(item, index) in payMethod" :key="index" class="ctn-item" @click="itemClick(index)">
        <div class="left">
          <i class="iconfont" :class="item.icon"></i>
          <span>{{ item.name }}</span>
        </div>
        <div class="right">
          <i
            class="iconfont icon-yuanxingweixuanzhong"
            :class="currentIndex === index ? 'icon-yuanxingxuanzhongfill' : ''"
          ></i>
        </div>
      </li>
    </ul>
  </card>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Toast } from 'vant'
import { Card } from 'components'

const payMethod = reactive([
  { id: 1, name: '微信支付', icon: 'icon-weixinzhifu wx' },
  { id: 2, name: '支付宝支付', icon: 'icon-zhifubao zfb' },
  { id: 3, name: '余额支付', icon: 'icon-yue ye' }
])

// const isCheck = ref(false)
// const checkBtnClick = () => {
//   isCheck.value = !isCheck.value
// }

const currentIndex = ref(1)
const itemClick = (index) => {
  currentIndex.value = index
  if (index !== 1) {
    Toast('暂时只支持支付宝支付')
    // currentIndex.value = 1;
    return
  }
}
</script>

<style lang="scss" scoped>
.ctn-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  &:after {
    position: absolute;
    box-sizing: border-box;
    content: ' ';
    pointer-events: none;
    right: 0px;
    bottom: 0;
    left: 0px;
    border-bottom: 1px solid #f2f3f5;
  }
  &:nth-last-child(1)::after {
    border-bottom: none;
  }

  .left {
    height: 45px;
    line-height: 45px;
    i {
      font-size: 20px;
      vertical-align: middle;
    }
    img {
      width: 30px;
      height: 30px;
      vertical-align: middle;
    }
    span {
      vertical-align: initial;
      margin-left: 10px;
    }
  }
  .right {
    i {
      font-size: 20px;
    }
  }
}

.wx {
  color: #01ca00;
}
.zfb {
  color: #039deb;
}
.ye {
  color: #61be5f;
}

.icon-yuanxingxuanzhongfill {
  color: $primary;
}
</style>
