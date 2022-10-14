<template>
  <div class="list-view">
    <ul>
      <li v-for="item in ListViewData" :key="item.id" class="list-view-item" @click="goPath(item)">
        <div class="item-icon">
          <i class="iconfont" :class="item.icon"></i>
        </div>
        <div class="item-text">{{ item.name }}</div>
        <div class="item-right">
          {{ item.rightText }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Toast } from 'vant'

const ListViewData = reactive([
  {
    id: 1,
    name: '地址管理',
    icon: 'icon-map',
    rightText: '',
    path: '/address'
  },
  {
    id: 2,
    name: '用户权益',
    icon: 'icon-vip',
    rightText: '签到送积分',
    path: ''
  },
  {
    id: 3,
    name: '积分商城',
    icon: 'icon-gift',
    rightText: '',
    path: ''
  },
  {
    id: 4,
    name: '帮助中心',
    icon: 'icon-help',
    rightText: '',
    path: ''
  },
  {
    id: 5,
    name: '设置',
    icon: 'icon-set',
    rightText: '修改密码',
    path: '/resetPassword'
  },
  {
    id: 6,
    name: '关于',
    icon: 'icon-prompt',
    rightText: '',
    path: ''
  },
  {
    id: 7,
    name: '退出登录',
    icon: 'icon-switch',
    rightText: '',
    path: '/login'
  }
])

const router = useRouter()
const store = useStore()
const goPath = (item) =>
  item.id !== 7
    ? item.path
      ? router.push(item.path)
      : Toast({ message: '暂未开发', duration: 500 })
    : store.commit('user/loginOut')
</script>

<style lang="scss" scoped>
.list-view {
  margin-top: 10px;
  background: #fff;
  .list-view-item {
    position: relative;
    padding: 12px 15px;
    display: flex;
    align-items: center;
    &::after {
      content: '';
      position: absolute;
      z-index: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      border-bottom: 1px solid #e8e8e8;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
      -webkit-transform-origin: 0 100%;
      transform-origin: 0 100%;
    }
    .item-icon {
      width: 25px;
      height: 25px;
      margin-right: 8px;
      i {
        vertical-align: -webkit-baseline-middle;
        font-size: 20px;
      }
    }
    .item-text {
      flex: 1;
      color: #525252;
      font-size: 12.8px;
    }
    .item-right {
      text-align: right;
      color: #a6a6a6;
      padding-right: 20px;
      position: relative;
      font-size: 12.8px;
      &:after {
        content: ' ';
        display: inline-block;
        height: 9px;
        width: 9px;
        border-width: 2px 2px 0 0;
        border-color: #cacaca;
        border-style: solid;
        transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
        position: absolute;
        top: 50%;
        margin-top: -6px;
        right: 2px;
        border-radius: 2px;
      }
    }
  }
}
</style>
