<template>
  <div class="my-order">
    <nav-bar></nav-bar>
    <van-tabs v-model="key" :color="'#e9232c'" :title-active-color="'#e9232c'" class="order-tab" @click-tab="changeTab">
      <van-tab v-for="item in tabList" :key="item.id" :title="item.title" :name="item.value"></van-tab>
    </van-tabs>
    <div v-if="!loading">
      <div class="order-container">
        <order-item v-if="list.length > 0" ref="order" :list="list" @deleteOrder="deleteOrder"></order-item>
        <div v-else class="s_null">
          <p class="tip">该分类暂无订单</p>
          <p class="small">换一个试试吧～</p>
        </div>
      </div>
    </div>
    <van-loading v-else type="spinner" style="position: absolute; left: 50%; top: 40%; transform: translate(-50%)">
      正在拼命加载中…
    </van-loading>
  </div>
</template>

<script setup>
import { ref, reactive, toRefs } from 'vue'
import { Toast, Dialog } from 'vant'
import NavBar from './components/NavBar'
import OrderItem from './components/OrderItem'
import { orderList, delOrders } from '@/api/order'

const init = reactive({
  key: '',
  loading: true
})
const { key, loading } = toRefs(init)

const tabList = reactive([
  { title: '全部', value: '' },
  { title: '待付款', value: 1 },
  { title: '待发货', value: 3 },
  { title: '待收货', value: 4 },
  { title: '待评价', value: 5 },
  { title: '退款/售后', value: 6 }
])

const list = ref([])
const getOrderList = async () => {
  const res = await orderList({ status: init.key })
  list.value = res.data.list
  init.loading = false
}
getOrderList()

const deleteOrder = async (id) => {
  Dialog.confirm({
    message: '确认要删除该订单?'
  })
    .then(async () => {
      const res = await delOrders(id)
      if (res.success) {
        Toast(res.msg)
        getOrderList()
      }
    })
    .catch(() => {
      // console.log("取消删除");
    })
}

const order = ref(null)
const changeTab = (category) => {
  init.key = category.name
  if (init.key !== 6) {
    init.loading = true
    getOrderList().then(() => {
      if (list.value.length !== 0) order.value.tabName(init.key)
    })
  } else {
    list.value = []
  }
}
</script>

<style lang="scss" scoped>
.order-container {
  position: fixed;
  top: 80px;
  bottom: 0;
  overflow: auto;
  width: 100%;
  &::-webkit-scrollbar {
    width: 0 !important;
  }
}

.order-tab {
  z-index: 100;
  &::after {
    position: absolute;
    box-sizing: border-box;
    content: ' ';
    pointer-events: none;
    right: 0px;
    bottom: 0;
    left: 0px;
    border-bottom: 0.5px solid #ebedf0;
  }
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
