<template>
  <div class="edit-address">
    <van-address-edit
      v-if="getEditOption?.type === 'add'"
      :area-list="areaList"
      :show-set-default="!addresOpt.isSelect"
      @save="onAdd"
    />

    <van-address-edit
      v-else
      :address-info="getEditOption?.type"
      :area-list="areaList"
      show-set-default
      show-search-result
      @save="onUpdate"
    />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { Toast } from 'vant'
import { areaList } from '@vant/area-data' // 省市区数据
import { createAddress, updateAddr, setDefault } from '@/api/address'

const props = defineProps({
  getEditOption: Object
})

const router = useRouter()
const addresOpt = JSON.parse(sessionStorage.getItem('addressOpt'))
const onUpdate = async (content) => {
  if (!content.isDefault) {
    const res = await updateAddr(content)
    if (res?.success) {
      Toast(res.msg)
      router.push('/address')
    }
  } else {
    const res = await updateAddr(content)
    if (res?.success) {
      const id = content.id
      const setDefaultRes = await setDefault(id)
      if (setDefaultRes.success) {
        Toast(res.msg)
        router.push('/address')
      }
    }
  }
  sessionStorage.removeItem('addressOpt')
}

const onAdd = async (content) => {
  if (!content.isDefault) {
    const res = await createAddress(content)
    if (res?.success) {
      Toast(res.msg)
      if (!props.getEditOption.isSelect) {
        router.push('/address')
      } else {
        router.push('/address?type=select&from=add')
      }
    }
  } else {
    const res = await createAddress(content)
    if (res?.success) {
      const id = res.data.id
      const setDefaultRes = await setDefault(id)
      if (setDefaultRes.success) {
        Toast(res.msg)
        router.push('/address')
      }
    }
  }
  sessionStorage.removeItem('addressOpt')
}
</script>

<style lang="scss" scoped>
.edit-address {
  position: relative;
  background-color: #f7f7f7;
  &::before {
    position: absolute;
    box-sizing: border-box;
    content: ' ';
    pointer-events: none;
    right: 16px;
    top: 0;
    left: 16px;
    border-top: 1px solid #ebedf0;
    transform: scaleY(0.5);
  }
  .van-address-edit {
    padding: 0;
  }
  :deep(.van-address-edit__buttons) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
  :deep(.van-button--danger) {
    background-color: $primary;
  }
  :deep(.van-button--default) {
    width: 128px;
    height: 17.0667px;
  }
}

:deep(.van-switch--on) {
  background: $primary;
}
</style>
