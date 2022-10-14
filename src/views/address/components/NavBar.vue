<template>
  <nav-bar>
    <template #left>
      <div class="nav-left" @click="goBack">
        <i class="iconfont icon-arrow-left"></i>
      </div>
    </template>
    <template #center>
      <span>{{ formatAddrTitlte }}</span>
    </template>
    <template #right>
      <div v-show="!addresOpt" class="nav-left" @click="router.push('/account')">
        <i class="iconfont icon-account"></i>
      </div>
    </template>
  </nav-bar>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import NavBar from 'components/navbar/NavBar'

const router = useRouter()
const route = useRoute()
const addresOpt = JSON.parse(sessionStorage.getItem('addressOpt'))
const goBack = () => {
  if (!route.query.type) {
    if (route.path === '/address') {
      router.replace('/account')
    } else {
      if (!addresOpt.isSelect) {
        router.replace('/address')
      } else {
        router.replace('/address?type=select&from=edit')
      }
    }
  } else if (route.query.from === 'edit') {
    router.go(-2)
  } else if (route.query.from === 'add') {
    router.go(-3)
  } else {
    router.back()
  }
}

const props = defineProps({
  getEditOption: {
    type: Object
  }
})

const formatAddrTitlte = computed(() =>
  props.getEditOption?.type ? (props.getEditOption?.type === 'add' ? '新增地址' : '修改地址') : '收货地址'
)
</script>

<style lang="scss" scoped>
.nav-bar {
  background-color: rgb(255, 255, 255);
  color: #222;
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
.nav-center {
  span {
    font-size: 16px;
  }
}
.nav-left {
  display: flex;
  justify-content: center;
  i {
    font-size: 30px;
  }
}
</style>
