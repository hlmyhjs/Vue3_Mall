<template>
  <nav-bar :title="categoryTitle"></nav-bar>
  <div v-if="!loading">
    <Filter @getFilterParam="getFilterParam"></Filter>
    <scroll class="scroll" :bounce="{ top: false, bottom: false }">
      <category-list v-if="productData.length" :product-data="productData"></category-list>
      <div v-else class="s_null">
        <p class="tip">抱歉！暂无相关商品</p>
        <p class="small">换个分类试试吧～</p>
      </div>
    </scroll>
  </div>
  <van-loading v-else type="spinner" style="position: absolute; left: 50%; top: 40%; transform: translate(-50%)">
    正在拼命加载中…
  </van-loading>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from './components/DetailNavBar'
import Filter from 'components/filter/Filter'
import Scroll from 'components/scroll/Scroll'
import CategoryList from 'components/list/CardList'
import { goodscategory } from '@/api/category'

const route = useRoute()
const id = route.params.id
const categoryTitle = ref(route.params.key)
const productData = ref([])
const loading = ref(true)
const getGoodscategory = async (id, filters) => {
  const { data } = await goodscategory(id, filters)
  productData.value = data.list
  loading.value = false
}
getGoodscategory(id)

const filterParam = ref()
const getFilterParam = (param) => {
  filterParam.value = param
}

watch(
  () => filterParam.value,
  (value) => {
    getGoodscategory(id, value)
  }
)
</script>

<style lang="scss" scoped>
.scroll {
  top: 80px;
  bottom: 0;
}

.s_null {
  margin-top: 50%;
  padding: 10px;
  // color: #999;
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
