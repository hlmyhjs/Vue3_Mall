<template>
  <!-- https://router.vuejs.org/zh/api/#router-view-%E7%9A%84-v-slot -->
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" v-if="$route.meta.keepAlive" :key="$route.name" />
    </keep-alive>
    <component :is="Component" v-if="!$route.meta.keepAlive" :key="$route.name" />
  </router-view>
</template>
