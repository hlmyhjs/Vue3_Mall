<template>
  <div class="history">
    <history-header>
      <template #left><i class="iconfont icon-history"></i><span>搜索历史</span></template>
      <template #right><i class="iconfont icon-ashbin" @click="clearHistory"></i></template>
    </history-header>
    <history-body>
      <div class="historyList">
        <span v-for="(item, index) in historyList" :key="index" @click="goSearch(item)">{{ item }}</span>
      </div>
    </history-body>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Dialog } from 'vant'
import HistoryHeader from './Header'
import HistoryBody from './content'
import { getItem, removeItem } from '@/utils/storage'
import emitter from '@/utils/eventbus'

const historyList = ref(getItem('searchList') || [])

const clearHistory = () => {
  Dialog.confirm({
    message: '确认要删除搜索历史吗?'
  })
    .then(() => {
      // 删除本地存储
      removeItem('searchList')
      // 清除数据
      historyList.value = []
    })
    .catch(() => {
      // console.log("取消删除");
    })
}

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
.history {
  background: #fff;
}
i {
  vertical-align: bottom;
}
.icon-history {
  font-size: 20px;
}
.icon-ashbin {
  font-size: 23px;
}

.historyList {
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
