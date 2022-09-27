<template>
  <card title="收货地址">
    <van-skeleton title avatar :row="2" :loading="loading">
      <div v-if="addrData && defaultAddr" class="address">
        <div class="left">
          <span class="iconfont icon-map"></span>
          <div>
            <span>{{ defaultAddr.name }} </span>
            <span>{{ defaultAddr.tel }}</span>
            <p>{{ formatAddr }}</p>
          </div>
        </div>
        <span class="iconfont icon-arrow-right" @click="goAddress"></span>
      </div>
      <div v-else class="selectAddr" @click="goAddress">
        <div class="left">
          <span class="iconfont icon-tianjia"></span>
          <span>选择收货地址</span>
        </div>
        <span class="iconfont icon-arrow-right"></span>
      </div>
    </van-skeleton>
  </card>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { Card } from 'components'
import { updateOrderAddr } from '@/api/order'

const router = useRouter()
const goAddress = () =>
  router.push({
    path: '/address',
    query: {
      type: 'select'
    }
  })

const props = defineProps({
  addrData: {
    type: Object
  },
  orderId: String,
  loading: Boolean
})

const defaultAddr = computed(() => props.addrData.filter((element) => element.isDefault === true)[0])
const formatAddr = computed(() => {
  const { province, city, county, addressDetail } = defaultAddr.value
  return province + ' ' + city + ' ' + county + ' ' + addressDetail
})

if (props.addrData && defaultAddr.value) updateOrderAddr(props.orderId, defaultAddr.value.id)
</script>

<style lang="scss" scoped>
.address {
  background-color: #fff;
  border-radius: 8px;
  height: 70px;
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    display: flex;
    align-items: center;
    & > div {
      padding: 0 10px;
      margin-left: 10px;
      /* 当文本超过三行时自动变为省略号 */
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      line-clamp: 3;
      -webkit-box-orient: vertical;
      span:nth-child(1) {
        text-align: center;
        font-size: 24px;
      }
    }
    & > div > span:nth-child(1) {
      margin-right: 5px;
      font-size: 22px;
    }
    & > div > p {
      margin-top: 3px;
    }
  }
}

.icon-arrow-right {
  font-size: 20px;
  text-align: center;
  width: 50px;
  padding: 10px 0;
}

.selectAddr {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  .left {
    .icon-tianjia {
      display: inline-block;
      width: 30px;
      height: 30px;
      background-color: $primary;
      line-height: 30px;
      border-radius: 2px;
      margin-left: 10px;
      font-size: 30px;
      color: #fff;
    }
    span:nth-child(2) {
      margin-left: 15px;
      vertical-align: super;
    }
  }
}
</style>
