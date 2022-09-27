<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-show="!isActive" class="item-icon">
      <slot name="icon"></slot>
    </div>
    <div v-show="isActive" class="item-active-icon">
      <slot name="active-icon"></slot>
    </div>
    <div class="item-text" :class="isActive ? 'active' : ''">
      <slot name="text"></slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const props = defineProps({
  link: {
    type: String,
    required: true
  }
})

const router = useRouter()
const itemClick = () => {
  router.replace(props.link)
}

const route = useRoute()
const isActive = computed(() => route.path.indexOf(props.link) !== -1)
</script>

<style lang="scss" scope>
.tab-bar-item {
  flex: 1;
}

.item-icon img,
.item-active-icon img {
  width: 28.8px;
  height: 28.8px;
  margin-top: 2px;
  vertical-align: middle;
}

.item-text {
  font-size: 12px;
  color: #333;
}

.active {
  color: #b0352f;
}
</style>
