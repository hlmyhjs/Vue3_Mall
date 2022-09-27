<template>
  <div class="category">
    <nav-bar></nav-bar>
    <div v-if="!loading" class="cate-content">
      <tab-menu :data="tabMenuData" @tabMenuClick="tabMenuClick"></tab-menu>
      <tab-content :data="tabContentData"></tab-content>
    </div>
  </div>
  <tab-bar></tab-bar>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Toast } from 'vant'
import TabBar from 'components/tabbar'
import NavBar from './components/NavBar'
import TabMenu from './components/TabMenu'
import TabContent from './components/TabContent'
import { categories } from '@/api/categories'

const loading = ref(true)
const tabMenuData = ref([])
const tabContentData = ref([])
const _tabContent = ref([])

onMounted(async () => {
  Toast.loading('加载中...')
  const { data } = await categories()
  tabContentData.value = data[0]
  Toast.clear()
  data.forEach((item) => {
    tabMenuData.value.push({
      id: item.id,
      name: item.name,
      img_url: item.img_url
    })
    _tabContent.value.push({ id: item.id, name: item.name, pic: item.pic, children: item.children })
  })
  loading.value = false
})

const tabMenuClick = (id) => {
  tabContentData.value = _tabContent.value.filter((item) => item.id === id)[0]
}
</script>
