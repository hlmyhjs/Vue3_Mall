<template>
  <nav-bar>
    <template #left>
      <i class="iconfont icon-arrow-left" @click="goBack"></i>
    </template>
    <template #center>
      <div class="search-bd">
        <div class="search-wrapper">
          <i class="iconfont icon-search"></i>
          <input v-model="searchStr" class="search-input" type="text" @keyup.enter="search" />
          <i
            ref="icon-close"
            class="iconfont icon-close"
            :class="{ hide_icon_close: isShowCloseIcon }"
            @click="clear"
          ></i>
        </div>
      </div>
    </template>
    <template #right>
      <div class="search-btn" @click="search">
        <span style="vertical-align: baseline">搜索</span>
      </div>
    </template>
  </nav-bar>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Toast } from 'vant'
import NavBar from 'components/navbar/NavBar'
import { setItem, getItem } from '@/utils/storage'
import emitter from '@/utils/eventbus'

const route = useRoute()

const query = ref(route.query.key)
const searchStr = ref(query.value || '')

const isShowCloseIcon = ref(true)

const clear = () => {
  searchStr.value = ''
  isShowCloseIcon.value = true
}
const router = useRouter()
const goBack = () => router.back()

onMounted(() => {
  emitter.on('searchHistoryKey', (msg) => {
    searchStr.value = msg
  })
})
onUnmounted(() => {
  emitter.off('searchHistoryKey')
})

watch(searchStr, (val) => (isShowCloseIcon.value = searchStr.value.length === 0))

const searchArr = ref([])
const search = () => {
  //如果搜索的关键字是没有的，那就直接return
  if (!searchStr.value) {
    Toast('请输入商品名称')
    return
  } else {
    //判断有无搜索历史数据
    if (!getItem('searchList')) {
      // 没有
      setItem('searchList', '[]')
    } else {
      // 有
      searchArr.value = getItem('searchList')
    }
    // 增加数据
    searchArr.value.unshift(searchStr.value)
    // 去重
    const newArr = new Set(searchArr.value)
    // 本地存储赋值
    setItem('searchList', JSON.stringify(Array.from(newArr)))

    if (route.name === 'searchIndex' && !route.query.key) {
      router.push({
        path: '/search/list',
        query: {
          key: searchStr.value
        }
      })
    } else if (route.name === 'list' && route.query.key) {
      // 当处于搜索列表页并且有搜索关键词时
      if (searchStr.value !== route.query.key) {
        // 判断关键词有没有发生改变, 如果有改变将新值作为搜索key跳转到搜索列表页
        router.push({
          path: '/search/list',
          query: {
            key: searchStr.value
          }
        })
      }
    } else {
      router.push({
        path: '/search'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-bar {
  background-color: #fff;
  // border-bottom: 1px solid #e5e5e5;
  color: #222;
  // vertical-align: baseline;
  i {
    font-size: 28px;
  }
}

input {
  background: none;
  outline: none;
  border: none;
}
input:focus {
  border: none;
}

.search-bd {
  width: 100%;
  .search-wrapper {
    display: flex;
    align-items: center;
    height: 30px;
    background-color: #f3f3f3;
    margin: 0 auto;
    border-radius: 15px;
    .search-input {
      width: 88%;
      font-size: 13px;
    }
    .icon-search {
      margin: 0 3px 0 10px;
      font-size: 18px;
      color: #b8b8b8;
    }
    .icon-close {
      // opacity: 0;
      // visibility: hidden;
      width: 29px;
      height: 29px;
      line-height: 29px;
      padding-right: 8px;
      font-size: 14px;
      color: #b8b8b8;
      &::before {
        border: 1px #ccc solid;
        border-radius: 50%;
      }
    }
  }
}
:deep(.nav-right) {
  width: 60px;
  span {
    font-size: 16px;
  }
}
.hide_icon_close {
  // opacity: 0;
  visibility: hidden;
}
</style>
