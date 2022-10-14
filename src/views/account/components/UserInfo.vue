<template>
  <div class="user-info">
    <div class="avatar">
      <img
        src="https://img.zcool.cn/community/01629f5b10ec78a801202e6090eb63.png?x-oss-process=image/auto-orient,1"
        alt=""
      />
    </div>
    <div class="nickname">
      <span v-show="loginState">用户{{ username }}</span>
      <span v-show="!loginState" @click="router.push('/login')">登录/注册</span>
    </div>
    <div class="profile">
      <span style="font-size: 20px" class="iconfont icon-arrow-right"></span>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

defineProps({
  username: String,
  loginState: Boolean
})

const router = useRouter()
</script>

<style lang="scss" scoped>
.user-info {
  padding: 12px 15px;
  display: flex;
  align-items: center;
  height: 64px;
  background: #b64e4b;
  padding-right: 0;
  .avatar {
    width: 60px;
    height: 60px;
    margin-right: 10px;
    img {
      width: 100%;
      height: 100%;
      border: 2px solid #ffffff;
      border-radius: 100%;
    }
  }
  .nickname {
    color: #fff;
    font-weight: bold;
    flex: 1;
    font-size: 16px;
  }
  .profile {
    color: #fff;
    padding-right: 15px;
    font-size: 18px;
  }
}
</style>
