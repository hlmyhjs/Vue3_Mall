<template>
  <div class="addr-list">
    <ul>
      <li
        v-for="item in addressList"
        :key="item.id"
        class="addr-list-item"
        :style="{ paddingLeft: isSelect ? '30px' : '' }"
        @click.stop="selectAddr(item.id)"
      >
        <div class="item-top">
          <div class="item-top-left">
            <span class="name">{{ item.name }}</span>
            <span class="phone">{{ item.tel }}</span>
            <span v-show="item.isDefault" class="default">默认</span>
          </div>
          <div class="item-top-right">
            <a v-show="!isSelect" class="remove" @click.stop="remove(item.id)">删除</a>
          </div>
        </div>
        <div class="item-bottom">
          <div class="item-bottom-left">
            <p class="address">
              {{ item.province + '&nbsp; ' + item.city + '&nbsp; ' + item.county }}
            </p>
            <p class="address-detail">{{ item.addressDetail }}</p>
          </div>
          <div class="item-bottom-right">
            <a v-show="!isSelect" class="edit" @click.stop="edit(item)">编辑</a>
          </div>
        </div>
      </li>
    </ul>

    <a class="add" @click="edit('add')"><span>+ 新增收货地址</span></a>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { Dialog, Toast } from 'vant'
import { delAddress, setDefault } from '@/api/address'

defineProps({
  addressList: {
    type: Array,
    default: () => []
  }
})

const router = useRouter()
const route = useRoute()
const emits = defineEmits(['getAddressList'])

const remove = (id) => {
  Dialog.confirm({
    // title: "标题",
    message: '确认要删除该地址吗?'
  })
    .then(async () => {
      const res = await delAddress(id)
      if (res?.success) {
        Toast(res.msg)
        emits('getAddressList')
      }
    })
    .catch(() => {
      // console.log("取消删除");
    })
}

const isSelect = route.query.type === 'select'
const edit = (opt) => {
  sessionStorage.setItem('addressOpt', JSON.stringify({ type: opt, isSelect }))
  router.push({
    name: 'AddressEdit',
    params: {
      addressOpt: JSON.stringify({ type: opt, isSelect })
    }
  })
}

const selectAddr = async (id) => {
  if (route.path === '/address' && route.query.type === 'select') {
    const res = await setDefault(id)
    if (res.success) {
      if (route.query.from === 'edit') {
        router.go(-2) // 点击新增, 并没有新增二直接点击返回通过go(-2)回到订单页
      } else if (route.query.from === 'add') {
        router.go(-3) // 如果是在地址页新建地址然后选择地址则通过go(-3)回到订单页
      } else {
        router.back() // 如果是在地址列表直接选择的就通过back()回到订单页
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.scroll {
  bottom: 0;
}
.addr-list-item {
  padding: 10px;
  margin-top: 10px;
  background: #fff;
  .item-top,
  .item-bottom {
    display: flex;
    justify-content: space-between;
  }
  .item-top-left {
    font-size: 16px;
    .phone {
      margin-left: 10px;
    }
    .default {
      background: $primary;
      color: #fff;
      padding: 0 3px;
      border-radius: 3px;
      font-size: 10px;
      margin-left: 5px;
    }
    span {
      vertical-align: middle;
    }
  }
  .item-top-right,
  .item-bottom-right {
    font-size: 14px;
    a:active {
      background: #ebebeb;
      color: #58595b;
    }
  }
  .item-bottom {
    margin-top: 16px;
    align-items: flex-end;
    .item-bottom-left {
      font-size: 14px;
      color: #7f7f7f;
      width: 75%;
      .address-detail {
        margin-top: 3px;
      }
    }
  }
}

.remove,
.edit {
  display: inline-block;
  color: #58595b;
  position: relative;
  height: 27px;
  width: 45px;
  line-height: 27px;
  text-align: center;
  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    right: -100%;
    bottom: -100%;
    left: 0;
    transform-origin: 0 0;
    pointer-events: none;
    transform: scale(0.5);
    width: 200%;
    box-sizing: border-box;
    border: 1px solid #9c9c9c;
    border-radius: 8px;
  }
}

.add {
  position: fixed;
  bottom: 30px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 200px;
  background: $primary;
  border-radius: 5px;
  z-index: 1;
  padding: 7px;
  text-align: center;
  color: #fff;
  font-size: 16px;
  &:active {
    background: $activePrimary;
    color: $activeTextColor;
  }
}
</style>
