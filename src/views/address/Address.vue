<template>
  <nav-bar></nav-bar>
  <div v-if="!loading">
    <AddressList v-if="addressData.length" :address-list="addressData" @getAddressList="getAddressList"></AddressList>
    <div v-else class="address-empty">
      <h2>收货地址空空的, 点击下方按钮去新增一个吧</h2>
      <a class="add" @click="toEdit('add')"><span>+ 新增收货地址</span></a>
    </div>
  </div>
  <van-loading v-else type="spinner" style="position: absolute; left: 50%; top: 40%; transform: translate(-50%)">
    正在拼命加载中…
  </van-loading>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import NavBar from './components/NavBar'
import AddressList from './components/AddressList'
import { addressList } from '@/api/address'

const addressData = ref([])
const loading = ref(true)
const getAddressList = async () => {
  const res = await addressList()
  addressData.value = res.data
  loading.value = false
}
getAddressList()
const router = useRouter()
const route = useRoute()
const isSelect = route.query.type === 'select'
const toEdit = (editOpt) => {
  sessionStorage.setItem('addressOpt', JSON.stringify({ type: editOpt, isSelect }))
  router.push({
    name: 'AddressEdit',
    params: {
      addressOpt: JSON.stringify({ type: editOpt, isSelect })
    }
  })
}
</script>

<style lang="scss" scoped>
.address-empty {
  text-align: center;
  margin-top: 50%;
  .goShopping {
    border: none;
    background: $primary;
    color: #fff;
    padding: 5px 10px;
    margin-top: 10px;
  }
}

.add {
  display: inline-block;
  background: $primary;
  border-radius: 5px;
  z-index: 1;
  padding: 7px;
  color: #fff;
  margin-top: 10px;
  &:active {
    background: $primary;
    color: #edbbb8;
  }
}
</style>
