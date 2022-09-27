<template>
  <div class="hotSearch">
    <history-header>
      <template #left><i class="iconfont icon-hot"></i><span>热门搜索</span></template>
      <template #right
        ><i class="iconfont" :class="[isHide ? 'icon-Notvisible' : 'icon-browse']" @click="hideHotSearch"></i
      ></template>
    </history-header>
    <history-body>
      <div class="hotSearchList">
        <span v-for="item in hotSearchList" v-show="!isHide" :key="item.id" @click="goSearch(item.name)">{{
          item.name
        }}</span>
        <div v-show="isHide" style="padding: 25px 0px 35px; margin: 0 auto; color: #9c9c9c">已隐藏热门搜索</div>
      </div>
    </history-body>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import HistoryHeader from './Header'
import HistoryBody from './content'
import emitter from '@/utils/eventbus'

const hotSearchList = reactive([
  { id: 1, name: 'T恤' },
  { id: 2, name: '卫衣' },
  { id: 3, name: '短外套' },
  { id: 4, name: '牛仔裤' },
  { id: 5, name: '休闲裤' },
  { id: 6, name: '包包' },
  { id: 7, name: '帽子' },
  { id: 8, name: '外套' }
])

const isHide = ref(false)
const hideHotSearch = () => (isHide.value = !isHide.value)

const router = useRouter()
const goSearch = (key) => {
  router.push({
    path: '/search/list',
    query: {
      key
    }
  })
  emitter.emit('searchHistoryKey', key)
}
</script>

<style lang="scss" scoped>
.hotSearch {
  background: #fff;
  padding-top: 10px;
}
i {
  vertical-align: bottom;
}
.icon-hot {
  font-size: 20px;
}
.icon-browse,
.icon-Notvisible {
  font-size: 23px;
}

.hotSearchList {
  display: flex;
  flex-wrap: wrap;
  span {
    display: inline-block;
    height: 21.12px;
    line-height: 21.12px;
    padding: 2px 10px;
    font-size: 14px;
    border-radius: 30px;
    background: #f0f2f5;
    margin: 0 10px 10px 0;
    text-align: center;
    color: #666666;
    min-width: 24.16px;
    max-width: 100px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
