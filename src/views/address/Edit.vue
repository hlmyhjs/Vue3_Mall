<template>
  <nav-bar :get-edit-option="getEditOpt"></nav-bar>
  <edit-address :get-edit-option="getEditOpt"></edit-address>
</template>

<script setup>
import { computed } from 'vue'
import NavBar from './components/NavBar'
import EditAddress from './components/EditAddress'

const getEditOpt = computed(() => JSON.parse(sessionStorage.getItem('addressOpt')))
</script>

<style lang="scss" scoped></style>
